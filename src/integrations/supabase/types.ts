export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      banners: {
        Row: {
          banner_type: string | null
          banner_url: string | null
          category: string
          content_name: string | null
          created_at: string
          dimensions: string | null
          event_data: Json | null
          generated_text: string | null
          id: string
          title: string
          tmdb_data: Json | null
          user_id: string
        }
        Insert: {
          banner_type?: string | null
          banner_url?: string | null
          category: string
          content_name?: string | null
          created_at?: string
          dimensions?: string | null
          event_data?: Json | null
          generated_text?: string | null
          id?: string
          title: string
          tmdb_data?: Json | null
          user_id: string
        }
        Update: {
          banner_type?: string | null
          banner_url?: string | null
          category?: string
          content_name?: string | null
          created_at?: string
          dimensions?: string | null
          event_data?: Json | null
          generated_text?: string | null
          id?: string
          title?: string
          tmdb_data?: Json | null
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          banners_created_this_month: number | null
          business_name: string | null
          created_at: string
          full_name: string | null
          id: string
          logo_url: string | null
          plan: string | null
          plan_limits: Json | null
          updated_at: string
          user_id: string
        }
        Insert: {
          banners_created_this_month?: number | null
          business_name?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          logo_url?: string | null
          plan?: string | null
          plan_limits?: Json | null
          updated_at?: string
          user_id: string
        }
        Update: {
          banners_created_this_month?: number | null
          business_name?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          logo_url?: string | null
          plan?: string | null
          plan_limits?: Json | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      sports_events: {
        Row: {
          away_logo: string | null
          away_team: string
          created_at: string
          event_id: number
          home_logo: string | null
          home_team: string
          id: string
          league: string | null
          match_date: string
          status: string | null
        }
        Insert: {
          away_logo?: string | null
          away_team: string
          created_at?: string
          event_id: number
          home_logo?: string | null
          home_team: string
          id?: string
          league?: string | null
          match_date: string
          status?: string | null
        }
        Update: {
          away_logo?: string | null
          away_team?: string
          created_at?: string
          event_id?: number
          home_logo?: string | null
          home_team?: string
          id?: string
          league?: string | null
          match_date?: string
          status?: string | null
        }
        Relationships: []
      }
      user_settings: {
        Row: {
          brand_name: string | null
          created_at: string
          id: string
          primary_color: string | null
          secondary_color: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          brand_name?: string | null
          created_at?: string
          id?: string
          primary_color?: string | null
          secondary_color?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          brand_name?: string | null
          created_at?: string
          id?: string
          primary_color?: string | null
          secondary_color?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
