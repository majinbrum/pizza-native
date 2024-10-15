import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import { Database } from "../database.types";

import Constants from "expo-constants";

// Types on this are wrong. This exists, and `host` does not.
const origin = (Constants?.expoConfig as unknown as { hostUri?: string })?.hostUri?.split(":").shift();

if (!origin) throw new Error("Could not determine origin");

const supabaseUrl = `http://${origin}:54321`;

// const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || "";
// anon public is safe to use in the browser because we will use auth from the user
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON || "";

// adding the type <Database> the data fetched in the api/products/index (and wherever they're used) will already be typed automatically
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
	auth: {
		storage: AsyncStorage,
		autoRefreshToken: true,
		persistSession: true,
		detectSessionInUrl: false,
	},
});
