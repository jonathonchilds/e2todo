export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      tasks: {
        Row: {
          body: string | null
          created_at: string | null
          id: number
          isCompleted: boolean | null
        }
        Insert: {
          body?: string | null
          created_at?: string | null
          id?: number
          isCompleted?: boolean | null
        }
        Update: {
          body?: string | null
          created_at?: string | null
          id?: number
          isCompleted?: boolean | null
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
