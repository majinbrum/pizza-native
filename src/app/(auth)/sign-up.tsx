import Button from "@/src/components/Button";
import Colors from "@/src/constants/Colors";
import { Link, Redirect, router, Stack } from "expo-router";
import { useState } from "react";
import { StyleSheet, View, Text, TextInput, Alert, AppState, ActivityIndicator } from "react-native";

import { supabase } from "@/src/lib/supabase";
import { useAuth } from "@/src/providers/AuthProvider";

// Tells Supabase Auth to continuously refresh the session automatically if
// the app is in the foreground. When this is added, you will continue to receive
// `onAuthStateChange` events with the `TOKEN_REFRESHED` or `SIGNED_OUT` event
// if the user's session is terminated. This should only be registered once.
AppState.addEventListener("change", (state) => {
	if (state === "active") {
		supabase.auth.startAutoRefresh();
	} else {
		supabase.auth.stopAutoRefresh();
	}
});

const SignUpScreen = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);

	async function signUpWithEmail() {
		setLoading(true);
		const {
			data: { session },
			error,
		} = await supabase.auth.signUp({
			email: email,
			password: password,
		});

		if (error) Alert.alert(error.message);
		if (!session) Alert.alert("Something went wrong, please try again.");
		if (session) router.push("/");
		setLoading(false);
	}

	if (loading) return <ActivityIndicator />;

	return (
		<View style={styles.container}>
			<Stack.Screen
				options={{
					title: "Sign Up",
				}}
			/>

			<Text style={styles.label}>Email</Text>
			<TextInput
				value={email}
				onChangeText={setEmail}
				placeholder='Email'
				style={styles.input}
				keyboardType='email-address'
			/>

			<Text style={styles.label}>Password</Text>
			<TextInput
				value={password}
				onChangeText={setPassword}
				placeholder='Password'
				style={styles.input}
				secureTextEntry
			/>

			<Button
				onPress={signUpWithEmail}
				disabled={loading}
				text={loading ? "Creating account..." : "Create account"}
			/>
			<Link
				href={"/sign-in"}
				style={styles.textBtn}>
				Sign in
			</Link>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		padding: 10,
	},
	label: {
		color: "gray",
		fontSize: 18,
	},
	input: {
		backgroundColor: "white",
		padding: 10,
		borderRadius: 5,
		marginTop: 5,
		marginBottom: 20,
	},
	image: {
		width: "50%",
		aspectRatio: 1,
		alignSelf: "center",
	},
	textBtn: {
		fontSize: 18,
		alignSelf: "center",
		fontWeight: "bold",
		color: Colors.light.tint,
		marginVertical: 10,
	},
});

export default SignUpScreen;
