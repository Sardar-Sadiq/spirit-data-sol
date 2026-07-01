import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
  const { data, error } = await supabase.from('EmployeesDetails').select('*').not('card_image', 'is', null);
  if (error) {
    console.error('Error fetching:', error);
  } else {
    console.log(`Found ${data.length} records with non-null card_image:`);
    data.slice(0, 5).forEach((rec) => {
      console.log(`- Token: ${rec.qr_token}, Name: ${rec['Full Name']}, card_image: ${rec.card_image}`);
    });
  }
}

check();
