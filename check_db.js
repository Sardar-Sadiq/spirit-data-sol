import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
  // Query information_schema if we can, or just try some table names
  const { data, error } = await supabase.from('EmployeeDetails').select('*').limit(1);
  console.log('EmployeeDetails:', { data, error });

  const { data: data2, error: error2 } = await supabase.from('Employees Details').select('*').limit(1);
  console.log('Employees Details:', { data: data2, error: error2 });
  
  const { data: data3, error: error3 } = await supabase.from('Employee Details').select('*').limit(1);
  console.log('Employee Details:', { data: data3, error: error3 });

  const { data: data4, error: error4 } = await supabase.from('employee_details').select('*').limit(1);
  console.log('employee_details:', { data: data4, error: error4 });
}

check();
