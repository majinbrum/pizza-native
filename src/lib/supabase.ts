import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import { Database } from "../database.types";

const supabaseUrl = "https://lhcmeejhamxllisjizjf.supabase.co";
// anon public is safe to use in the browser because we will use auth from the user
const supabaseAnonKey =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxoY21lZWpoYW14bGxpc2ppempmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg2ODM3NTEsImV4cCI6MjA0NDI1OTc1MX0.xBLwkJa231MyEslxTptXDEG-BwPTsFYaGs4Mp-I7H5g";

// adding the type <Database> the data fetched in the api/products/index (and wherever they're used) will already be typed automatically
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
	auth: {
		storage: AsyncStorage,
		autoRefreshToken: true,
		persistSession: true,
		detectSessionInUrl: false,
	},
});
