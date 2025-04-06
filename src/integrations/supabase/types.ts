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
      crawled_data: {
        Row: {
          content: string | null
          crawl_status: string | null
          created_at: string
          extracted_text: string | null
          html: string | null
          id: string
          media_urls: Json | null
          metadata: Json | null
          preset_category: string | null
          preset_id: string | null
          preset_name: string | null
          sanitized: boolean | null
          title: string | null
          updated_at: string
          url: string
          user_id: string | null
        }
        Insert: {
          content?: string | null
          crawl_status?: string | null
          created_at?: string
          extracted_text?: string | null
          html?: string | null
          id?: string
          media_urls?: Json | null
          metadata?: Json | null
          preset_category?: string | null
          preset_id?: string | null
          preset_name?: string | null
          sanitized?: boolean | null
          title?: string | null
          updated_at?: string
          url: string
          user_id?: string | null
        }
        Update: {
          content?: string | null
          crawl_status?: string | null
          created_at?: string
          extracted_text?: string | null
          html?: string | null
          id?: string
          media_urls?: Json | null
          metadata?: Json | null
          preset_category?: string | null
          preset_id?: string | null
          preset_name?: string | null
          sanitized?: boolean | null
          title?: string | null
          updated_at?: string
          url?: string
          user_id?: string | null
        }
        Relationships: []
      }
      jewelry: {
        Row: {
          brand: string | null
          category: string
          condition: string | null
          created_at: string
          description: string | null
          id: string
          images: string[] | null
          is_authenticated: boolean | null
          materials: string | null
          original_price: number | null
          price: number
          title: string
          updated_at: string
          weight: string | null
        }
        Insert: {
          brand?: string | null
          category: string
          condition?: string | null
          created_at?: string
          description?: string | null
          id?: string
          images?: string[] | null
          is_authenticated?: boolean | null
          materials?: string | null
          original_price?: number | null
          price: number
          title: string
          updated_at?: string
          weight?: string | null
        }
        Update: {
          brand?: string | null
          category?: string
          condition?: string | null
          created_at?: string
          description?: string | null
          id?: string
          images?: string[] | null
          is_authenticated?: boolean | null
          materials?: string | null
          original_price?: number | null
          price?: number
          title?: string
          updated_at?: string
          weight?: string | null
        }
        Relationships: []
      }
      listing_sync_logs: {
        Row: {
          created_at: string | null
          error_message: string | null
          id: string
          platform: string
          platform_listing_id: string | null
          platform_listing_url: string | null
          product_id: string
          status: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          error_message?: string | null
          id?: string
          platform: string
          platform_listing_id?: string | null
          platform_listing_url?: string | null
          product_id: string
          status: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          error_message?: string | null
          id?: string
          platform?: string
          platform_listing_id?: string | null
          platform_listing_url?: string | null
          product_id?: string
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "listing_sync_logs_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      marketplace_credentials: {
        Row: {
          access_token: string | null
          created_at: string | null
          id: string
          is_connected: boolean | null
          platform: string
          refresh_token: string | null
          shop_id: string | null
          token_expires_at: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          access_token?: string | null
          created_at?: string | null
          id?: string
          is_connected?: boolean | null
          platform: string
          refresh_token?: string | null
          shop_id?: string | null
          token_expires_at?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          access_token?: string | null
          created_at?: string | null
          id?: string
          is_connected?: boolean | null
          platform?: string
          refresh_token?: string | null
          shop_id?: string | null
          token_expires_at?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      order_items: {
        Row: {
          created_at: string
          id: string
          jewelry_id: string | null
          order_id: string
          price: number
          quantity: number
        }
        Insert: {
          created_at?: string
          id?: string
          jewelry_id?: string | null
          order_id: string
          price: number
          quantity?: number
        }
        Update: {
          created_at?: string
          id?: string
          jewelry_id?: string | null
          order_id?: string
          price?: number
          quantity?: number
        }
        Relationships: [
          {
            foreignKeyName: "order_items_jewelry_id_fkey"
            columns: ["jewelry_id"]
            isOneToOne: false
            referencedRelation: "jewelry"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          carrier: string | null
          created_at: string
          id: string
          order_status: string
          payment_method: string | null
          shipping_address: Json | null
          total_amount: number
          tracking_number: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          carrier?: string | null
          created_at?: string
          id?: string
          order_status?: string
          payment_method?: string | null
          shipping_address?: Json | null
          total_amount: number
          tracking_number?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          carrier?: string | null
          created_at?: string
          id?: string
          order_status?: string
          payment_method?: string | null
          shipping_address?: Json | null
          total_amount?: number
          tracking_number?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      personas: {
        Row: {
          created_at: string | null
          description: string | null
          genre: string | null
          id: string
          influences: string[] | null
          is_active: boolean | null
          keywords: string[] | null
          name: string
          style: string | null
          themes: string[] | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          genre?: string | null
          id?: string
          influences?: string[] | null
          is_active?: boolean | null
          keywords?: string[] | null
          name: string
          style?: string | null
          themes?: string[] | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          genre?: string | null
          id?: string
          influences?: string[] | null
          is_active?: boolean | null
          keywords?: string[] | null
          name?: string
          style?: string | null
          themes?: string[] | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      products: {
        Row: {
          category: string | null
          created_at: string | null
          description: string | null
          id: string
          image_urls: string[] | null
          metadata: Json | null
          platform_status: Json | null
          price: number | null
          published: boolean | null
          status: string | null
          title: string
          user_id: string
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          image_urls?: string[] | null
          metadata?: Json | null
          platform_status?: Json | null
          price?: number | null
          published?: boolean | null
          status?: string | null
          title: string
          user_id: string
        }
        Update: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          image_urls?: string[] | null
          metadata?: Json | null
          platform_status?: Json | null
          price?: number | null
          published?: boolean | null
          status?: string | null
          title?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          auto_sync_preferences: Json | null
          avatar_url: string | null
          created_at: string
          full_name: string | null
          id: string
          updated_at: string
        }
        Insert: {
          auto_sync_preferences?: Json | null
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          updated_at?: string
        }
        Update: {
          auto_sync_preferences?: Json | null
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      receipts: {
        Row: {
          amount: number
          created_at: string
          currency: string
          id: string
          payment_intent_id: string | null
          receipt_email: string | null
          receipt_url: string | null
          status: string
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          currency: string
          id?: string
          payment_intent_id?: string | null
          receipt_email?: string | null
          receipt_url?: string | null
          status: string
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          currency?: string
          id?: string
          payment_intent_id?: string | null
          receipt_email?: string | null
          receipt_url?: string | null
          status?: string
          user_id?: string
        }
        Relationships: []
      }
      site_pages: {
        Row: {
          chunk_number: number
          content: string
          created_at: string
          embedding: string | null
          id: number
          metadata: Json
          summary: string
          title: string
          url: string
        }
        Insert: {
          chunk_number: number
          content: string
          created_at?: string
          embedding?: string | null
          id?: number
          metadata?: Json
          summary: string
          title: string
          url: string
        }
        Update: {
          chunk_number?: number
          content?: string
          created_at?: string
          embedding?: string | null
          id?: number
          metadata?: Json
          summary?: string
          title?: string
          url?: string
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          cancel_at_period_end: boolean
          created_at: string
          current_period_end: string | null
          current_period_start: string | null
          id: string
          price_id: string
          quantity: number
          status: string
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          cancel_at_period_end?: boolean
          created_at?: string
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          price_id: string
          quantity?: number
          status: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          cancel_at_period_end?: boolean
          created_at?: string
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          price_id?: string
          quantity?: number
          status?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      videos: {
        Row: {
          channel_title: string | null
          description: string | null
          id: string
          like_count: number | null
          niche: string | null
          processed: boolean | null
          processed_at: string | null
          published_at: string | null
          storage_locations: Json | null
          thumbnail: string | null
          timestamp: string | null
          title: string
          video_id: string
          view_count: number | null
        }
        Insert: {
          channel_title?: string | null
          description?: string | null
          id?: string
          like_count?: number | null
          niche?: string | null
          processed?: boolean | null
          processed_at?: string | null
          published_at?: string | null
          storage_locations?: Json | null
          thumbnail?: string | null
          timestamp?: string | null
          title: string
          video_id: string
          view_count?: number | null
        }
        Update: {
          channel_title?: string | null
          description?: string | null
          id?: string
          like_count?: number | null
          niche?: string | null
          processed?: boolean | null
          processed_at?: string | null
          published_at?: string | null
          storage_locations?: Json | null
          thumbnail?: string | null
          timestamp?: string | null
          title?: string
          video_id?: string
          view_count?: number | null
        }
        Relationships: []
      }
      workflow_jobs: {
        Row: {
          attempts: number | null
          completed_at: string | null
          created_at: string
          duration: number | null
          error: string | null
          id: string
          priority: number
          result: Json | null
          started_at: string | null
          status: string
          workflow_id: string
          workflow_name: string
        }
        Insert: {
          attempts?: number | null
          completed_at?: string | null
          created_at?: string
          duration?: number | null
          error?: string | null
          id: string
          priority?: number
          result?: Json | null
          started_at?: string | null
          status: string
          workflow_id: string
          workflow_name: string
        }
        Update: {
          attempts?: number | null
          completed_at?: string | null
          created_at?: string
          duration?: number | null
          error?: string | null
          id?: string
          priority?: number
          result?: Json | null
          started_at?: string | null
          status?: string
          workflow_id?: string
          workflow_name?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      analyze_query_performance: {
        Args: {
          query_text: string
        }
        Returns: {
          plan: Json
          execution_time_ms: number
        }[]
      }
      binary_quantize:
        | {
            Args: {
              "": string
            }
            Returns: unknown
          }
        | {
            Args: {
              "": unknown
            }
            Returns: unknown
          }
      halfvec_avg: {
        Args: {
          "": number[]
        }
        Returns: unknown
      }
      halfvec_out: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      halfvec_send: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      halfvec_typmod_in: {
        Args: {
          "": unknown[]
        }
        Returns: number
      }
      hnsw_bit_support: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      hnsw_halfvec_support: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      hnsw_sparsevec_support: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      hnswhandler: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      is_subscribed: {
        Args: {
          user_uuid: string
        }
        Returns: boolean
      }
      ivfflat_bit_support: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      ivfflat_halfvec_support: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      ivfflathandler: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      l2_norm:
        | {
            Args: {
              "": unknown
            }
            Returns: number
          }
        | {
            Args: {
              "": unknown
            }
            Returns: number
          }
      l2_normalize:
        | {
            Args: {
              "": string
            }
            Returns: string
          }
        | {
            Args: {
              "": unknown
            }
            Returns: unknown
          }
        | {
            Args: {
              "": unknown
            }
            Returns: unknown
          }
      match_site_pages: {
        Args: {
          query_embedding: string
          match_count?: number
          filter?: Json
        }
        Returns: {
          id: number
          url: string
          chunk_number: number
          title: string
          summary: string
          content: string
          metadata: Json
          similarity: number
        }[]
      }
      sparsevec_out: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      sparsevec_send: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      sparsevec_typmod_in: {
        Args: {
          "": unknown[]
        }
        Returns: number
      }
      vector_avg: {
        Args: {
          "": number[]
        }
        Returns: string
      }
      vector_dims:
        | {
            Args: {
              "": string
            }
            Returns: number
          }
        | {
            Args: {
              "": unknown
            }
            Returns: number
          }
      vector_norm: {
        Args: {
          "": string
        }
        Returns: number
      }
      vector_out: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      vector_send: {
        Args: {
          "": string
        }
        Returns: string
      }
      vector_typmod_in: {
        Args: {
          "": unknown[]
        }
        Returns: number
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
