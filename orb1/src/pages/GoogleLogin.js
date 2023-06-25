// import { createClient } from '@supabase/supabase-js';

// const SUPABASE_KEY = 'SUPABASE_CLIENT_API_KEY';

// const SUPABASE_URL = "https://pmfzuukyinnebcygqakj.supabase.co"

// const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);


// import { createClient } from '@supabase/supabase-js'

// const supabaseUrl = 'https://pmfzuukyinnebcygqakj.supabase.co'
// const supabaseKey = process.env.SUPABASE_KEY
// const supabase = createClient(supabaseUrl, supabaseKey)


// function loginWithGoogle() {
//     const { data, error } = await supabase.auth.signInWithOAuth({
//         provider: 'google'
//     })
// }


  

// function logout() {
//     const {error} = await supabase.auth.signOut()
// }

// export default loginWithGoogle;

// import { createClient } from '@supabase/supabase-js';

// const supabaseUrl = 'https://pmfzuukyinnebcygqakj.supabase.co';
// const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBtZnp1dWt5aW5uZWJjeWdxYWtqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQ1NjEzOTQsImV4cCI6MjAwMDEzNzM5NH0.FoIOU_NitNWyrtLFa_fu2wd51NJ0z4DziR_WOFZCo34';
// const supabase = createClient(supabaseUrl, supabaseKey);

// async function loginWithGoogle() {
//   try {
//     const { data, error } = await supabase.auth.signInWithOAuth({
//       provider: 'google', 
//       options: {
//         customParameters: {
//           prompt: 'select_account',
//           login_hint: 'Continue to Trippin Out',
//         },
//       },
//     });

//     if (error) {
//       // Handle error
//       console.error('Google login error:', error);
//     } else {
//       // Handle successful login
//       console.log('Google login successful:', data);
//     }
//   } catch (error) {
//     // Handle exception
//     console.error('An error occurred during Google login:', error);
//   }
// }

// async function logout() {
//   try {
//     const { error } = await supabase.auth.signOut();

//     if (error) {
//       // Handle error
//       console.error('Logout error:', error);
//     } else {
//       // Handle successful logout
//       console.log('Logout successful');
//     }
//   } catch (error) {
//     // Handle exception
//     console.error('An error occurred during logout:', error);
//   }
// }

// const GoogleLogin = () => {
//   return (
//     <div>
//       {/* Place your JSX components and UI for the Google Login page here */}
//       <button onClick={loginWithGoogle}>Login with Google</button>
//     </div>
//   );
// };
// export default loginWithGoogle;
