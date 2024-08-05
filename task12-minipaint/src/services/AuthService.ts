import { supabase } from "../supabase/supabaseClient";
import { SignInForm } from "../pages/signIn/SignIn";
import { SignUpForm } from "../pages/signUp/SignUp";

export async function signOut() {
  return supabase.auth.signOut();
}

export async function signIn(formData: SignInForm) {
  return supabase.auth.signInWithPassword(formData);
}

export async function signUp(formData: SignUpForm) {
  return supabase.auth.signUp({
    email: formData.email,
    password: formData.password,
    options: {
      data: {
        full_name: formData.fullName,
      },
    },
  });
}
