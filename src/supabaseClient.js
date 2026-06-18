import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://ucmakihckbofasskirst.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_llffOcuX0yn1O9h_fpx0WA_OeQCknLA';

export const supabase = createClient(supabaseUrl, supabaseKey);
