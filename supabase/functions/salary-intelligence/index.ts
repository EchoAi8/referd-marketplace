import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface SalaryRequest {
  jobTitle: string;
  location: string;
  yearsExperience: number;
  industry: string;
  currentSalary: number;
  companySize: string;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { jobTitle, location, yearsExperience, industry, currentSalary, companySize } = await req.json() as SalaryRequest;

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const prompt = `You are a salary intelligence analyst with access to comprehensive market data. Analyze the following profile and provide accurate salary insights based on current UK market conditions.

Profile:
- Job Title: ${jobTitle}
- Location: ${location}
- Years of Experience: ${yearsExperience}
- Industry: ${industry}
- Current Salary: £${currentSalary.toLocaleString()}
- Company Size: ${companySize} employees

Provide a JSON response with the following structure:
{
  "currentSalary": ${currentSalary},
  "marketAverage": <calculated market average for this role/location/experience>,
  "percentile": <what percentile their salary falls into, 1-100>,
  "status": "<above|below|at>",
  "difference": <absolute difference from market average>,
  "industryInsights": [
    "<insight about salary trends in this industry>",
    "<insight about demand for this role>",
    "<insight about location-specific factors>",
    "<insight about experience level impact>",
    "<insight about skills that increase earning potential>"
  ],
  "recommendations": [
    "<actionable recommendation to increase earning potential>",
    "<skill or certification that could boost salary>",
    "<negotiation or career move advice>"
  ]
}

Base your analysis on realistic UK salary data for 2024-2025. Be specific and data-driven in your insights. The percentile should reflect where their current salary sits compared to the market (50 = exactly average, above 50 = above average, below 50 = below average).`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          {
            role: "system",
            content: "You are a salary intelligence expert. Always respond with valid JSON only, no markdown formatting or code blocks."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.3,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Service temporarily unavailable. Please try again later." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error("Failed to analyze salary data");
    }

    const aiResponse = await response.json();
    const content = aiResponse.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error("No response from AI");
    }

    // Parse the JSON response, handling potential markdown code blocks
    let cleanContent = content.trim();
    if (cleanContent.startsWith("```json")) {
      cleanContent = cleanContent.slice(7);
    }
    if (cleanContent.startsWith("```")) {
      cleanContent = cleanContent.slice(3);
    }
    if (cleanContent.endsWith("```")) {
      cleanContent = cleanContent.slice(0, -3);
    }

    const salaryData = JSON.parse(cleanContent.trim());

    return new Response(
      JSON.stringify(salaryData),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Salary intelligence error:", error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : "Failed to analyze salary data" 
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
