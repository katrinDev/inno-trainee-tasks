import { supabase } from "../supabase/supabaseClient";
import { SignInForm } from "../pages/signIn/SignIn";
import { SignUpForm } from "../pages/signUp/SignUp";

export default class AuthService {
  static async signOut() {
    return supabase.auth.signOut();
  }

  static async signIn(formData: SignInForm) {
    return supabase.auth.signInWithPassword(formData);
  }

  static async signUp(formData: SignUpForm) {
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
}
