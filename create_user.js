const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://jombvzonhytqcfzdacew.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpvbWJ2em9uaHl0cWNmemRhY2V3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM1NzY3MTEsImV4cCI6MjA4OTE1MjcxMX0.wjMyDebisZ3zyQlCIW9ZRsW8xeY_RgCXkqsW9Hmm7nI';
const supabase = createClient(supabaseUrl, supabaseKey);

async function createTestUser() {
  const email = 'jorge@edtech.com';
  const password = 'Password123!';

  console.log('Intentando crear usuario:', email);
  
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: 'Jorge Docente',
      }
    }
  });

  if (error) {
    console.error('Error:', error.message);
  } else {
    console.log('Usuario creado con éxito:', data.user.email);
    console.log('IMPORTANTE: Si el login falla, revisa si Supabase requiere confirmación por email.');
  }
}

createTestUser();
