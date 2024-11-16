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
      projects: {
        Row: {
          id: string
          name: string
          description: string | null
          status: 'in_development' | 'in_maintenance' | 'in_production' | 'upcoming' | 'archived'
          type: 'frontend' | 'backend' | 'figma'
          client: string | null
          thumbnail: string | null
          created_at: string
          updated_at: string
          created_by: string
          team_id: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          status: 'in_development' | 'in_maintenance' | 'in_production' | 'upcoming' | 'archived'
          type: 'frontend' | 'backend' | 'figma'
          client?: string | null
          thumbnail?: string | null
          created_at?: string
          updated_at?: string
          created_by: string
          team_id: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          status?: 'in_development' | 'in_maintenance' | 'in_production' | 'upcoming' | 'archived'
          type?: 'frontend' | 'backend' | 'figma'
          client?: string | null
          thumbnail?: string | null
          created_at?: string
          updated_at?: string
          created_by?: string
          team_id?: string
        }
      }
      project_environments: {
        Row: {
          id: string
          project_id: string
          env_type: 'development' | 'staging' | 'production' | 'figma'
          frontend_url: string | null
          backend_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          project_id: string
          env_type: 'development' | 'staging' | 'production' | 'figma'
          frontend_url?: string | null
          backend_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          project_id?: string
          env_type?: 'development' | 'staging' | 'production' | 'figma'
          frontend_url?: string | null
          backend_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      project_tech_stack: {
        Row: {
          id: string
          project_id: string
          technology: string
          created_at: string
        }
        Insert: {
          id?: string
          project_id: string
          technology: string
          created_at?: string
        }
        Update: {
          id?: string
          project_id?: string
          technology?: string
          created_at?: string
        }
      }
      teams: {
        Row: {
          id: string
          name: string
          created_at: string
          created_by: string
        }
        Insert: {
          id?: string
          name: string
          created_at?: string
          created_by: string
        }
        Update: {
          id?: string
          name?: string
          created_at?: string
          created_by?: string
        }
      }
      team_members: {
        Row: {
          id: string
          team_id: string
          user_id: string
          role: 'owner' | 'admin' | 'member'
          created_at: string
        }
        Insert: {
          id?: string
          team_id: string
          user_id: string
          role: 'owner' | 'admin' | 'member'
          created_at?: string
        }
        Update: {
          id?: string
          team_id?: string
          user_id?: string
          role?: 'owner' | 'admin' | 'member'
          created_at?: string
        }
      }
    }
  }
}