import { User } from "@supabase/supabase-js";

export interface IAuthContext {
  auth: true | false;
  user: User;
}