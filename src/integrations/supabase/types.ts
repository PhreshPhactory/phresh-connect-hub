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
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      affiliate_signups: {
        Row: {
          country: string | null
          created_at: string
          email: string
          facebook: string | null
          full_name: string
          id: string
          instagram: string | null
          newsletter_opt_in: boolean
          paypal: string | null
          phone: string | null
          product_categories: string[]
          text_contact: string | null
          tiktok: string | null
          twitter: string | null
          whatsapp: string | null
          youtube: string | null
        }
        Insert: {
          country?: string | null
          created_at?: string
          email: string
          facebook?: string | null
          full_name: string
          id?: string
          instagram?: string | null
          newsletter_opt_in?: boolean
          paypal?: string | null
          phone?: string | null
          product_categories?: string[]
          text_contact?: string | null
          tiktok?: string | null
          twitter?: string | null
          whatsapp?: string | null
          youtube?: string | null
        }
        Update: {
          country?: string | null
          created_at?: string
          email?: string
          facebook?: string | null
          full_name?: string
          id?: string
          instagram?: string | null
          newsletter_opt_in?: boolean
          paypal?: string | null
          phone?: string | null
          product_categories?: string[]
          text_contact?: string | null
          tiktok?: string | null
          twitter?: string | null
          whatsapp?: string | null
          youtube?: string | null
        }
        Relationships: []
      }
      blog_analytics: {
        Row: {
          blog_post_id: string
          id: string
          referrer: string | null
          user_agent: string | null
          viewed_at: string
        }
        Insert: {
          blog_post_id: string
          id?: string
          referrer?: string | null
          user_agent?: string | null
          viewed_at?: string
        }
        Update: {
          blog_post_id?: string
          id?: string
          referrer?: string | null
          user_agent?: string | null
          viewed_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "blog_analytics_blog_post_id_fkey"
            columns: ["blog_post_id"]
            isOneToOne: false
            referencedRelation: "blog_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      blog_posts: {
        Row: {
          brand_name: string | null
          category: string
          content: string
          created_at: string
          excerpt: string | null
          feature_image: string | null
          id: string
          language: string
          products: Json | null
          published: boolean
          shopping_link: string | null
          shorts_url: string | null
          slug: string
          title: string
          updated_at: string
          video_url: string | null
          view_count: number
        }
        Insert: {
          brand_name?: string | null
          category: string
          content: string
          created_at?: string
          excerpt?: string | null
          feature_image?: string | null
          id?: string
          language?: string
          products?: Json | null
          published?: boolean
          shopping_link?: string | null
          shorts_url?: string | null
          slug: string
          title: string
          updated_at?: string
          video_url?: string | null
          view_count?: number
        }
        Update: {
          brand_name?: string | null
          category?: string
          content?: string
          created_at?: string
          excerpt?: string | null
          feature_image?: string | null
          id?: string
          language?: string
          products?: Json | null
          published?: boolean
          shopping_link?: string | null
          shorts_url?: string | null
          slug?: string
          title?: string
          updated_at?: string
          video_url?: string | null
          view_count?: number
        }
        Relationships: []
      }
      brand_contacts: {
        Row: {
          brand_email: string | null
          brand_instagram: string | null
          brand_name: string
          brand_tiktok: string | null
          brand_website: string | null
          brand_whatsapp: string | null
          brand_youtube: string | null
          created_at: string
          id: string
          notes: string | null
          updated_at: string
        }
        Insert: {
          brand_email?: string | null
          brand_instagram?: string | null
          brand_name: string
          brand_tiktok?: string | null
          brand_website?: string | null
          brand_whatsapp?: string | null
          brand_youtube?: string | null
          created_at?: string
          id?: string
          notes?: string | null
          updated_at?: string
        }
        Update: {
          brand_email?: string | null
          brand_instagram?: string | null
          brand_name?: string
          brand_tiktok?: string | null
          brand_website?: string | null
          brand_whatsapp?: string | null
          brand_youtube?: string | null
          created_at?: string
          id?: string
          notes?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      brand_links: {
        Row: {
          created_at: string
          display_order: number
          id: string
          is_featured: boolean
          name: string
          updated_at: string
          url: string
        }
        Insert: {
          created_at?: string
          display_order?: number
          id?: string
          is_featured?: boolean
          name: string
          updated_at?: string
          url: string
        }
        Update: {
          created_at?: string
          display_order?: number
          id?: string
          is_featured?: boolean
          name?: string
          updated_at?: string
          url?: string
        }
        Relationships: []
      }
      holiday_sprint_applications: {
        Row: {
          affiliate_platform: string | null
          biggest_challenge: string
          brand_name: string
          brand_website: string | null
          created_at: string
          desired_results: string
          email: string
          full_name: string
          has_affiliate_program: boolean
          id: string
          materials_urls: string[] | null
          products_description: string
          social_handle: string | null
        }
        Insert: {
          affiliate_platform?: string | null
          biggest_challenge: string
          brand_name: string
          brand_website?: string | null
          created_at?: string
          desired_results: string
          email: string
          full_name: string
          has_affiliate_program: boolean
          id?: string
          materials_urls?: string[] | null
          products_description: string
          social_handle?: string | null
        }
        Update: {
          affiliate_platform?: string | null
          biggest_challenge?: string
          brand_name?: string
          brand_website?: string | null
          created_at?: string
          desired_results?: string
          email?: string
          full_name?: string
          has_affiliate_program?: boolean
          id?: string
          materials_urls?: string[] | null
          products_description?: string
          social_handle?: string | null
        }
        Relationships: []
      }
      link_clicks: {
        Row: {
          clicked_at: string
          id: string
          link_name: string
          link_url: string
          referrer: string | null
          user_agent: string | null
        }
        Insert: {
          clicked_at?: string
          id?: string
          link_name: string
          link_url: string
          referrer?: string | null
          user_agent?: string | null
        }
        Update: {
          clicked_at?: string
          id?: string
          link_name?: string
          link_url?: string
          referrer?: string | null
          user_agent?: string | null
        }
        Relationships: []
      }
      newsletter_editions: {
        Row: {
          content: string
          cover_image: string | null
          created_at: string
          featured_creator: string | null
          id: string
          published: boolean
          published_at: string | null
          slug: string
          subtitle: string | null
          title: string
          updated_at: string
        }
        Insert: {
          content?: string
          cover_image?: string | null
          created_at?: string
          featured_creator?: string | null
          id?: string
          published?: boolean
          published_at?: string | null
          slug: string
          subtitle?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          content?: string
          cover_image?: string | null
          created_at?: string
          featured_creator?: string | null
          id?: string
          published?: boolean
          published_at?: string | null
          slug?: string
          subtitle?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      newsletter_subscribers: {
        Row: {
          created_at: string
          email: string
          id: string
          name: string | null
          source: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          name?: string | null
          source: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          name?: string | null
          source?: string
        }
        Relationships: []
      }
      press_contacts: {
        Row: {
          categories: string[] | null
          contact_notes: string | null
          created_at: string
          email: string
          first_name: string
          id: string
          last_contacted_at: string | null
          last_name: string
          linkedin: string | null
          linkedin_connected: boolean | null
          location_string: string | null
          phone: string | null
          priority: string | null
          publications: string | null
          title: string | null
          topics: string[] | null
          twitter: string | null
          updated_at: string
        }
        Insert: {
          categories?: string[] | null
          contact_notes?: string | null
          created_at?: string
          email: string
          first_name: string
          id?: string
          last_contacted_at?: string | null
          last_name: string
          linkedin?: string | null
          linkedin_connected?: boolean | null
          location_string?: string | null
          phone?: string | null
          priority?: string | null
          publications?: string | null
          title?: string | null
          topics?: string[] | null
          twitter?: string | null
          updated_at?: string
        }
        Update: {
          categories?: string[] | null
          contact_notes?: string | null
          created_at?: string
          email?: string
          first_name?: string
          id?: string
          last_contacted_at?: string | null
          last_name?: string
          linkedin?: string | null
          linkedin_connected?: boolean | null
          location_string?: string | null
          phone?: string | null
          priority?: string | null
          publications?: string | null
          title?: string | null
          topics?: string[] | null
          twitter?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      socially_selling_food_enrollments: {
        Row: {
          accommodations: string | null
          business_city_state: string
          business_name: string | null
          business_website: string
          confidence_level: number
          created_at: string
          email: string
          google_email: string
          id: string
          name: string | null
          payment_status: string
          selected_sessions: string[]
          stripe_session_id: string | null
          total_amount: number | null
          updated_at: string
        }
        Insert: {
          accommodations?: string | null
          business_city_state: string
          business_name?: string | null
          business_website: string
          confidence_level: number
          created_at?: string
          email: string
          google_email: string
          id?: string
          name?: string | null
          payment_status?: string
          selected_sessions: string[]
          stripe_session_id?: string | null
          total_amount?: number | null
          updated_at?: string
        }
        Update: {
          accommodations?: string | null
          business_city_state?: string
          business_name?: string | null
          business_website?: string
          confidence_level?: number
          created_at?: string
          email?: string
          google_email?: string
          id?: string
          name?: string | null
          payment_status?: string
          selected_sessions?: string[]
          stripe_session_id?: string | null
          total_amount?: number | null
          updated_at?: string
        }
        Relationships: []
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
          role?: Database["public"]["Enums"]["app_role"]
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
      video_reel_submissions: {
        Row: {
          brand_email: string
          brand_name: string
          created_at: string
          id: string
          image_urls: string[] | null
          payment_status: string
          product_description: string
          product_name: string
          product_url: string
          stripe_session_id: string | null
          updated_at: string
        }
        Insert: {
          brand_email: string
          brand_name: string
          created_at?: string
          id?: string
          image_urls?: string[] | null
          payment_status?: string
          product_description: string
          product_name: string
          product_url: string
          stripe_session_id?: string | null
          updated_at?: string
        }
        Update: {
          brand_email?: string
          brand_name?: string
          created_at?: string
          id?: string
          image_urls?: string[] | null
          payment_status?: string
          product_description?: string
          product_name?: string
          product_url?: string
          stripe_session_id?: string | null
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_slug: { Args: { title: string }; Returns: string }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_content_manager: { Args: { _user_id: string }; Returns: boolean }
      make_user_admin: { Args: { _user_email: string }; Returns: undefined }
      make_user_editor: { Args: { _user_email: string }; Returns: undefined }
    }
    Enums: {
      app_role: "admin" | "editor" | "user"
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
      app_role: ["admin", "editor", "user"],
    },
  },
} as const
