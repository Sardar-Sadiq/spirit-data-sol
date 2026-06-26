import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
  const { data, error } = await supabase
    .from('EmployeesDetails')
    .select('*')
    .eq('qr_token', '556836_IN')
    .maybeSingle();

  if (error) {
    console.error('Error fetching employee details:', error);
  } else {
    console.log('Employee details:', data);
  }
}

test();
