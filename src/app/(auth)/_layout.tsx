import { useAuth } from "@/src/providers/AuthProvider";
import { Redirect, Stack } from "expo-router";

export default function AuthLayout() {
	const { session } = useAuth();
	console.log("(auth)/_layout: ", session);
	if (session) return <Redirect href={"/"} />;

	return <Stack />;
}
