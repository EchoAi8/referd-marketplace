import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface LinkedInProfile {
  fullName: string;
  jobTitle: string;
  company: string;
  yearsExperience: number;
  industry: string;
  skills: string[];
  linkedinUrl: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { linkedinUrl, profileData } = await req.json();

    // If profileData is provided directly (from manual input or OAuth callback), use it
    if (profileData) {
      return new Response(
        JSON.stringify({ 
          success: true, 
          data: profileData as LinkedInProfile 
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // For URL-based extraction, we'll use AI to parse publicly visible data
    // Note: Full LinkedIn API integration requires OAuth 2.0 setup
    if (!linkedinUrl) {
      return new Response(
        JSON.stringify({ error: 'LinkedIn URL or profile data is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate LinkedIn URL format
    const linkedinPattern = /^https?:\/\/(www\.)?linkedin\.com\/in\/[\w-]+\/?$/i;
    if (!linkedinPattern.test(linkedinUrl)) {
      return new Response(
        JSON.stringify({ error: 'Invalid LinkedIn profile URL format' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // For now, return a prompt for manual entry since LinkedIn requires OAuth
    // In production, you would integrate with LinkedIn OAuth 2.0 API
    return new Response(
      JSON.stringify({ 
        success: true, 
        requiresManualEntry: true,
        message: 'Please enter your profile details manually or connect via LinkedIn OAuth',
        linkedinUrl
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('LinkedIn import error:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
