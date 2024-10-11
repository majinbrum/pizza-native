import "react-native-url-polyfill/auto";
import * as SecureStore from "expo-secure-store";
import { createClient } from "@supabase/supabase-js";

const ExpoSecureStoreAdapter = {
	getItem: (key: string) => {
		return SecureStore.getItemAsync(key);
	},
	setItem: (key: string, value: string) => {
		SecureStore.setItemAsync(key, value);
	},
	removeItem: (key: string) => {
		SecureStore.deleteItemAsync(key);
	},
};

const supabaseUrl = "https://lhcmeejhamxllisjizjf.supabase.co";
// anon public is safe to use in the browser because we will use auth from the user
const supabaseAnonKey =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxoY21lZWpoYW14bGxpc2ppempmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg2ODM3NTEsImV4cCI6MjA0NDI1OTc1MX0.xBLwkJa231MyEslxTptXDEG-BwPTsFYaGs4Mp-I7H5g";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
	auth: {
		storage: ExpoSecureStoreAdapter as any,
		autoRefreshToken: true,
		persistSession: true,
		detectSessionInUrl: false,
	},
});
