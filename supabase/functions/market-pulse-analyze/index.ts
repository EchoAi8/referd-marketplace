import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface AnalysisRequest {
  industry: string;
  companySize: string;
  jobTitle: string;
  yearsExperience: number;
  skills: string[];
  baseSalary: number;
  bonus: number;
  equity: number;
  benefits: number;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!,
      { global: { headers: { Authorization: authHeader } } }
    );

    const token = authHeader.replace('Bearer ', '');
    const { data: claimsData, error: claimsError } = await supabase.auth.getUser(token);
    
    if (claimsError || !claimsData?.user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const userId = claimsData.user.id;
    const requestData: AnalysisRequest = await req.json();

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    const totalComp = requestData.baseSalary + requestData.bonus + requestData.equity + requestData.benefits;

    const systemPrompt = `You are a compensation analyst AI. Analyze the user's compensation data and provide market insights.

Based on the provided data, generate a comprehensive market analysis. Return a JSON object with:
- marketAverage: estimated market average total compensation for this role/experience (number)
- percentile: what percentile the user's compensation falls in (1-100)
- status: "above", "below", or "at" market rate
- difference: dollar difference from market average (positive = above, negative = below)
- industryInsights: array of 3-5 specific insights about this industry/role
- recommendations: array of 3-5 actionable recommendations
- salaryRange: { min: number, max: number, median: number } for this role
- growthPotential: percentage salary growth potential in next 2 years
- topPayingCompanies: array of 3 company types/names known for top pay in this field
- skillsPremium: object mapping skills to estimated salary premium percentage

Use realistic market data based on 2024-2025 compensation trends.`;

    const userPrompt = `Analyze this compensation profile:
- Industry: ${requestData.industry}
- Company Size: ${requestData.companySize}
- Job Title: ${requestData.jobTitle}
- Years Experience: ${requestData.yearsExperience}
- Skills: ${requestData.skills?.join(', ') || 'Not specified'}
- Current Total Compensation: $${totalComp.toLocaleString()}
  - Base: $${requestData.baseSalary.toLocaleString()}
  - Bonus: $${requestData.bonus.toLocaleString()}
  - Equity: $${requestData.equity.toLocaleString()}
  - Benefits: $${requestData.benefits.toLocaleString()}`;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-3-flash-preview',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        response_format: { type: 'json_object' }
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'API credits exhausted.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      throw new Error('AI analysis failed');
    }

    const aiResponse = await response.json();
    const content = aiResponse.choices?.[0]?.message?.content;

    let analysisResult;
    try {
      let cleanContent = content.trim();
      if (cleanContent.startsWith('```json')) {
        cleanContent = cleanContent.slice(7);
      } else if (cleanContent.startsWith('```')) {
        cleanContent = cleanContent.slice(3);
      }
      if (cleanContent.endsWith('```')) {
        cleanContent = cleanContent.slice(0, -3);
      }
      analysisResult = JSON.parse(cleanContent.trim());
    } catch {
      console.error('Failed to parse AI response:', content);
      throw new Error('Invalid response format');
    }

    // Store the result in the database
    const { error: insertError } = await supabase
      .from('market_pulse_results')
      .insert({
        user_id: userId,
        current_salary: totalComp,
        market_average: analysisResult.marketAverage,
        percentile: analysisResult.percentile,
        status: analysisResult.status,
        difference: analysisResult.difference,
        industry: requestData.industry,
        job_title: requestData.jobTitle,
        years_experience: requestData.yearsExperience,
        company_size: requestData.companySize,
        industry_insights: analysisResult.industryInsights,
        recommendations: analysisResult.recommendations,
        full_report: analysisResult
      });

    if (insertError) {
      console.error('Failed to store result:', insertError);
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        data: {
          currentSalary: totalComp,
          ...analysisResult
        }
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Market pulse analysis error:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
