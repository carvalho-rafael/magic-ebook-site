export type Ebook = {
  id: number;
  user_id: number;
  title: string;
  description?: string;
  keywords?: string;
  label: string;
  body: string;
  value: string;
  payment_methods?: string;
  visits?: number;
  purchases?: number;
  filename?: string;
  preview_1?: string;
  preview_2?: string;
  preview_3?: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
  user?: {
    id: number;
    name: string;
    mp_public_key?: string;
    has_pix?: boolean;
  };
};
