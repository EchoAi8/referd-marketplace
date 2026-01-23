export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      job_matches: {
        Row: {
          company: string
          created_at: string
          description: string | null
          external_url: string | null
          id: string
          is_active: boolean | null
          location: string | null
          match_score: number | null
          posted_at: string | null
          salary_range: string | null
          skills_matched: string[] | null
          title: string
        }
        Insert: {
          company: string
          created_at?: string
          description?: string | null
          external_url?: string | null
          id?: string
          is_active?: boolean | null
          location?: string | null
          match_score?: number | null
          posted_at?: string | null
          salary_range?: string | null
          skills_matched?: string[] | null
          title: string
        }
        Update: {
          company?: string
          created_at?: string
          description?: string | null
          external_url?: string | null
          id?: string
          is_active?: boolean | null
          location?: string | null
          match_score?: number | null
          posted_at?: string | null
          salary_range?: string | null
          skills_matched?: string[] | null
          title?: string
        }
        Relationships: []
      }
      market_pulse_results: {
        Row: {
          company_size: string | null
          created_at: string
          current_salary: number | null
          difference: number | null
          full_report: Json | null
          id: string
          industry: string | null
          industry_insights: string[] | null
          job_title: string | null
          market_average: number | null
          percentile: number | null
          recommendations: string[] | null
          status: string | null
          user_id: string
          years_experience: number | null
        }
        Insert: {
          company_size?: string | null
          created_at?: string
          current_salary?: number | null
          difference?: number | null
          full_report?: Json | null
          id?: string
          industry?: string | null
          industry_insights?: string[] | null
          job_title?: string | null
          market_average?: number | null
          percentile?: number | null
          recommendations?: string[] | null
          status?: string | null
          user_id: string
          years_experience?: number | null
        }
        Update: {
          company_size?: string | null
          created_at?: string
          current_salary?: number | null
          difference?: number | null
          full_report?: Json | null
          id?: string
          industry?: string | null
          industry_insights?: string[] | null
          job_title?: string | null
          market_average?: number | null
          percentile?: number | null
          recommendations?: string[] | null
          status?: string | null
          user_id?: string
          years_experience?: number | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          company: string | null
          compensation_expectations: Json | null
          created_at: string
          email: string | null
          experience_level: string | null
          full_name: string | null
          id: string
          industry: string | null
          job_title: string | null
          linkedin_url: string | null
          skills: string[] | null
          updated_at: string
          user_id: string
          years_experience: number | null
        }
        Insert: {
          avatar_url?: string | null
          company?: string | null
          compensation_expectations?: Json | null
          created_at?: string
          email?: string | null
          experience_level?: string | null
          full_name?: string | null
          id?: string
          industry?: string | null
          job_title?: string | null
          linkedin_url?: string | null
          skills?: string[] | null
          updated_at?: string
          user_id: string
          years_experience?: number | null
        }
        Update: {
          avatar_url?: string | null
          company?: string | null
          compensation_expectations?: Json | null
          created_at?: string
          email?: string | null
          experience_level?: string | null
          full_name?: string | null
          id?: string
          industry?: string | null
          job_title?: string | null
          linkedin_url?: string | null
          skills?: string[] | null
          updated_at?: string
          user_id?: string
          years_experience?: number | null
        }
        Relationships: []
      }
      resumes: {
        Row: {
          compensation_expectations: Json | null
          created_at: string
          experience_level: string | null
          experience_years: number | null
          file_name: string | null
          file_url: string | null
          id: string
          parsed_data: Json | null
          skills_extracted: string[] | null
          user_id: string
        }
        Insert: {
          compensation_expectations?: Json | null
          created_at?: string
          experience_level?: string | null
          experience_years?: number | null
          file_name?: string | null
          file_url?: string | null
          id?: string
          parsed_data?: Json | null
          skills_extracted?: string[] | null
          user_id: string
        }
        Update: {
          compensation_expectations?: Json | null
          created_at?: string
          experience_level?: string | null
          experience_years?: number | null
          file_name?: string | null
          file_url?: string | null
          id?: string
          parsed_data?: Json | null
          skills_extracted?: string[] | null
          user_id?: string
        }
        Relationships: []
      }
      user_job_matches: {
        Row: {
          applied_at: string | null
          created_at: string
          id: string
          job_id: string
          match_score: number | null
          skills_matched: string[] | null
          user_id: string
          viewed_at: string | null
        }
        Insert: {
          applied_at?: string | null
          created_at?: string
          id?: string
          job_id: string
          match_score?: number | null
          skills_matched?: string[] | null
          user_id: string
          viewed_at?: string | null
        }
        Update: {
          applied_at?: string | null
          created_at?: string
          id?: string
          job_id?: string
          match_score?: number | null
          skills_matched?: string[] | null
          user_id?: string
          viewed_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_job_matches_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "job_matches"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "talent" | "referrer" | "brand" | "admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["talent", "referrer", "brand", "admin"],
    },
  },
} as const
