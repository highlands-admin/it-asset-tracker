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
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      asset_computers: {
        Row: {
          asset_id: string
          device_id: string | null
          graphics: string | null
          office_product_key: string | null
          office_version: string | null
          os_product_key: string | null
          os_version: string | null
          processor: string | null
          product_id: string | null
          ram: string | null
          software_source: string | null
          storage: string | null
          system_type: string | null
        }
        Insert: {
          asset_id: string
          device_id?: string | null
          graphics?: string | null
          office_product_key?: string | null
          office_version?: string | null
          os_product_key?: string | null
          os_version?: string | null
          processor?: string | null
          product_id?: string | null
          ram?: string | null
          software_source?: string | null
          storage?: string | null
          system_type?: string | null
        }
        Update: {
          asset_id?: string
          device_id?: string | null
          graphics?: string | null
          office_product_key?: string | null
          office_version?: string | null
          os_product_key?: string | null
          os_version?: string | null
          processor?: string | null
          product_id?: string | null
          ram?: string | null
          software_source?: string | null
          storage?: string | null
          system_type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "asset_computers_asset_id_fkey"
            columns: ["asset_id"]
            isOneToOne: true
            referencedRelation: "assets"
            referencedColumns: ["id"]
          },
        ]
      }
      asset_networks: {
        Row: {
          admin_ssid: string | null
          asset_id: string
          firmware_version: string | null
          isp: string | null
          license_key: string | null
          managed: string | null
          poe: string | null
          port_count: number | null
          purchase_date: string | null
          renewal_date: string | null
          resident_ssid: string | null
          vendor: string | null
          vendor_id: string | null
          vlan: string | null
          warranty_expiry: string | null
          wifi_standard: string | null
        }
        Insert: {
          admin_ssid?: string | null
          asset_id: string
          firmware_version?: string | null
          isp?: string | null
          license_key?: string | null
          managed?: string | null
          poe?: string | null
          port_count?: number | null
          purchase_date?: string | null
          renewal_date?: string | null
          resident_ssid?: string | null
          vendor?: string | null
          vendor_id?: string | null
          vlan?: string | null
          warranty_expiry?: string | null
          wifi_standard?: string | null
        }
        Update: {
          admin_ssid?: string | null
          asset_id?: string
          firmware_version?: string | null
          isp?: string | null
          license_key?: string | null
          managed?: string | null
          poe?: string | null
          port_count?: number | null
          purchase_date?: string | null
          renewal_date?: string | null
          resident_ssid?: string | null
          vendor?: string | null
          vendor_id?: string | null
          vlan?: string | null
          warranty_expiry?: string | null
          wifi_standard?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "asset_networks_asset_id_fkey"
            columns: ["asset_id"]
            isOneToOne: true
            referencedRelation: "assets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "asset_networks_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "vendors"
            referencedColumns: ["id"]
          },
        ]
      }
      asset_phones: {
        Row: {
          activation_code: string | null
          asset_id: string
          avg_monthly_cost: number | null
          carrier: string | null
          cost_type: string | null
          extension: string | null
          last_provisioned: string | null
          line_status: string | null
          line_type: string | null
          mrc_notes: string | null
          private_ip: string | null
          provider: string | null
          public_ip: string | null
          route_to: string | null
        }
        Insert: {
          activation_code?: string | null
          asset_id: string
          avg_monthly_cost?: number | null
          carrier?: string | null
          cost_type?: string | null
          extension?: string | null
          last_provisioned?: string | null
          line_status?: string | null
          line_type?: string | null
          mrc_notes?: string | null
          private_ip?: string | null
          provider?: string | null
          public_ip?: string | null
          route_to?: string | null
        }
        Update: {
          activation_code?: string | null
          asset_id?: string
          avg_monthly_cost?: number | null
          carrier?: string | null
          cost_type?: string | null
          extension?: string | null
          last_provisioned?: string | null
          line_status?: string | null
          line_type?: string | null
          mrc_notes?: string | null
          private_ip?: string | null
          provider?: string | null
          public_ip?: string | null
          route_to?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "asset_phones_asset_id_fkey"
            columns: ["asset_id"]
            isOneToOne: true
            referencedRelation: "assets"
            referencedColumns: ["id"]
          },
        ]
      }
      asset_software: {
        Row: {
          asset_id: string
          office_product_key: string | null
          office_version: string | null
          software_source: string | null
        }
        Insert: {
          asset_id: string
          office_product_key?: string | null
          office_version?: string | null
          software_source?: string | null
        }
        Update: {
          asset_id?: string
          office_product_key?: string | null
          office_version?: string | null
          software_source?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "asset_software_asset_id_fkey"
            columns: ["asset_id"]
            isOneToOne: true
            referencedRelation: "assets"
            referencedColumns: ["id"]
          },
        ]
      }
      assets: {
        Row: {
          assigned_user: string | null
          category: string
          created_at: string
          entry_date: string | null
          hostname: string | null
          id: string
          ip_address: string | null
          last_seen_on_site: string | null
          mac_address: string | null
          make: string | null
          model: string | null
          notes: string | null
          operator_id: string
          property_id: string | null
          serial: string | null
          status: Database["public"]["Enums"]["asset_status"]
          sub_location: string | null
          type: Database["public"]["Enums"]["asset_type"]
          updated_at: string
        }
        Insert: {
          assigned_user?: string | null
          category: string
          created_at?: string
          entry_date?: string | null
          hostname?: string | null
          id?: string
          ip_address?: string | null
          last_seen_on_site?: string | null
          mac_address?: string | null
          make?: string | null
          model?: string | null
          notes?: string | null
          operator_id: string
          property_id?: string | null
          serial?: string | null
          status?: Database["public"]["Enums"]["asset_status"]
          sub_location?: string | null
          type: Database["public"]["Enums"]["asset_type"]
          updated_at?: string
        }
        Update: {
          assigned_user?: string | null
          category?: string
          created_at?: string
          entry_date?: string | null
          hostname?: string | null
          id?: string
          ip_address?: string | null
          last_seen_on_site?: string | null
          mac_address?: string | null
          make?: string | null
          model?: string | null
          notes?: string | null
          operator_id?: string
          property_id?: string | null
          serial?: string | null
          status?: Database["public"]["Enums"]["asset_status"]
          sub_location?: string | null
          type?: Database["public"]["Enums"]["asset_type"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "assets_operator_id_fkey"
            columns: ["operator_id"]
            isOneToOne: false
            referencedRelation: "operators"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assets_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      dids: {
        Row: {
          assigned_to: string | null
          caller_id_name: string | null
          created_at: string
          extension: string | null
          id: string
          line_type: string | null
          monthly_rate: number | null
          notes: string | null
          number: string
          number_source: string | null
          number_type: string | null
          phone_asset_id: string
          provider: string | null
          updated_at: string
        }
        Insert: {
          assigned_to?: string | null
          caller_id_name?: string | null
          created_at?: string
          extension?: string | null
          id?: string
          line_type?: string | null
          monthly_rate?: number | null
          notes?: string | null
          number: string
          number_source?: string | null
          number_type?: string | null
          phone_asset_id: string
          provider?: string | null
          updated_at?: string
        }
        Update: {
          assigned_to?: string | null
          caller_id_name?: string | null
          created_at?: string
          extension?: string | null
          id?: string
          line_type?: string | null
          monthly_rate?: number | null
          notes?: string | null
          number?: string
          number_source?: string | null
          number_type?: string | null
          phone_asset_id?: string
          provider?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "dids_phone_asset_id_fkey"
            columns: ["phone_asset_id"]
            isOneToOne: false
            referencedRelation: "assets"
            referencedColumns: ["id"]
          },
        ]
      }
      network_summaries: {
        Row: {
          admin_ssid: string | null
          ap_make: string | null
          ap_model: string | null
          appliance: string | null
          aps: number | null
          cameras: string | null
          created_at: string
          id: string
          isp: string | null
          isp_account_number: string | null
          isp_monthly_cost: number | null
          isp_plan: string | null
          notes: string | null
          phone_system: string | null
          property_id: string
          resident_ssid: string | null
          router: string | null
          switch_models: string | null
          switches: number | null
          tv: string | null
          tv_account: string | null
          tv_monthly_cost: number | null
          updated_at: string
          wifi_standard: string | null
        }
        Insert: {
          admin_ssid?: string | null
          ap_make?: string | null
          ap_model?: string | null
          appliance?: string | null
          aps?: number | null
          cameras?: string | null
          created_at?: string
          id?: string
          isp?: string | null
          isp_account_number?: string | null
          isp_monthly_cost?: number | null
          isp_plan?: string | null
          notes?: string | null
          phone_system?: string | null
          property_id: string
          resident_ssid?: string | null
          router?: string | null
          switch_models?: string | null
          switches?: number | null
          tv?: string | null
          tv_account?: string | null
          tv_monthly_cost?: number | null
          updated_at?: string
          wifi_standard?: string | null
        }
        Update: {
          admin_ssid?: string | null
          ap_make?: string | null
          ap_model?: string | null
          appliance?: string | null
          aps?: number | null
          cameras?: string | null
          created_at?: string
          id?: string
          isp?: string | null
          isp_account_number?: string | null
          isp_monthly_cost?: number | null
          isp_plan?: string | null
          notes?: string | null
          phone_system?: string | null
          property_id?: string
          resident_ssid?: string | null
          router?: string | null
          switch_models?: string | null
          switches?: number | null
          tv?: string | null
          tv_account?: string | null
          tv_monthly_cost?: number | null
          updated_at?: string
          wifi_standard?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "network_summaries_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: true
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      operator_contacts: {
        Row: {
          created_at: string
          email: string | null
          id: string
          name: string | null
          operator_id: string
          phone: string | null
          title: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          id?: string
          name?: string | null
          operator_id: string
          phone?: string | null
          title?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: string
          name?: string | null
          operator_id?: string
          phone?: string | null
          title?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "operator_contacts_operator_id_fkey"
            columns: ["operator_id"]
            isOneToOne: false
            referencedRelation: "operators"
            referencedColumns: ["id"]
          },
        ]
      }
      operators: {
        Row: {
          city: string | null
          country: string | null
          created_at: string
          id: string
          logo_url: string | null
          name: string
          short_name: string | null
          state: string | null
          street: string | null
          updated_at: string
          web_link: string | null
          zip: string | null
        }
        Insert: {
          city?: string | null
          country?: string | null
          created_at?: string
          id?: string
          logo_url?: string | null
          name: string
          short_name?: string | null
          state?: string | null
          street?: string | null
          updated_at?: string
          web_link?: string | null
          zip?: string | null
        }
        Update: {
          city?: string | null
          country?: string | null
          created_at?: string
          id?: string
          logo_url?: string | null
          name?: string
          short_name?: string | null
          state?: string | null
          street?: string | null
          updated_at?: string
          web_link?: string | null
          zip?: string | null
        }
        Relationships: []
      }
      properties: {
        Row: {
          address: string | null
          created_at: string
          ed_name: string | null
          id: string
          main_phone: string | null
          maintenance_tech: string | null
          name: string
          notes: string | null
          operator_id: string
          short_name: string | null
          slug: string
          updated_at: string
        }
        Insert: {
          address?: string | null
          created_at?: string
          ed_name?: string | null
          id?: string
          main_phone?: string | null
          maintenance_tech?: string | null
          name: string
          notes?: string | null
          operator_id: string
          short_name?: string | null
          slug: string
          updated_at?: string
        }
        Update: {
          address?: string | null
          created_at?: string
          ed_name?: string | null
          id?: string
          main_phone?: string | null
          maintenance_tech?: string | null
          name?: string
          notes?: string | null
          operator_id?: string
          short_name?: string | null
          slug?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "properties_operator_id_fkey"
            columns: ["operator_id"]
            isOneToOne: false
            referencedRelation: "operators"
            referencedColumns: ["id"]
          },
        ]
      }
      vendor_contracts: {
        Row: {
          account_number: string | null
          created_at: string
          description: string | null
          end_date: string | null
          id: string
          monthly_amount: number | null
          notes: string | null
          property_id: string | null
          start_date: string | null
          updated_at: string
          vendor_id: string
        }
        Insert: {
          account_number?: string | null
          created_at?: string
          description?: string | null
          end_date?: string | null
          id?: string
          monthly_amount?: number | null
          notes?: string | null
          property_id?: string | null
          start_date?: string | null
          updated_at?: string
          vendor_id: string
        }
        Update: {
          account_number?: string | null
          created_at?: string
          description?: string | null
          end_date?: string | null
          id?: string
          monthly_amount?: number | null
          notes?: string | null
          property_id?: string | null
          start_date?: string | null
          updated_at?: string
          vendor_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "vendor_contracts_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vendor_contracts_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "vendors"
            referencedColumns: ["id"]
          },
        ]
      }
      vendors: {
        Row: {
          account_number: string | null
          billing_cadence: string | null
          category: string | null
          contact_name: string | null
          contract_expiry: string | null
          contract_start: string | null
          created_at: string
          email: string | null
          id: string
          license_count: number | null
          name: string
          notes: string | null
          operator_id: string
          phone: string | null
          renewal_amount: number | null
          renewal_date: string | null
          renewal_notes: string | null
          updated_at: string
          url_portal: string | null
          url_support: string | null
          url_website: string | null
        }
        Insert: {
          account_number?: string | null
          billing_cadence?: string | null
          category?: string | null
          contact_name?: string | null
          contract_expiry?: string | null
          contract_start?: string | null
          created_at?: string
          email?: string | null
          id?: string
          license_count?: number | null
          name: string
          notes?: string | null
          operator_id: string
          phone?: string | null
          renewal_amount?: number | null
          renewal_date?: string | null
          renewal_notes?: string | null
          updated_at?: string
          url_portal?: string | null
          url_support?: string | null
          url_website?: string | null
        }
        Update: {
          account_number?: string | null
          billing_cadence?: string | null
          category?: string | null
          contact_name?: string | null
          contract_expiry?: string | null
          contract_start?: string | null
          created_at?: string
          email?: string | null
          id?: string
          license_count?: number | null
          name?: string
          notes?: string | null
          operator_id?: string
          phone?: string | null
          renewal_amount?: number | null
          renewal_date?: string | null
          renewal_notes?: string | null
          updated_at?: string
          url_portal?: string | null
          url_support?: string | null
          url_website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "vendors_operator_id_fkey"
            columns: ["operator_id"]
            isOneToOne: false
            referencedRelation: "operators"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      create_asset: { Args: { base: Json; detail?: Json }; Returns: string }
    }
    Enums: {
      asset_status:
        | "Active"
        | "Inactive"
        | "In Repair"
        | "Disposed"
        | "Spare"
        | "Needs Attention"
      asset_type:
        | "computer"
        | "software"
        | "ata"
        | "camera"
        | "network"
        | "phone"
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
      asset_status: [
        "Active",
        "Inactive",
        "In Repair",
        "Disposed",
        "Spare",
        "Needs Attention",
      ],
      asset_type: ["computer", "software", "ata", "camera", "network", "phone"],
    },
  },
} as const
