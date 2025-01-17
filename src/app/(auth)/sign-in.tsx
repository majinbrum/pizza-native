import Button from "@/src/components/Button";
import Colors from "@/src/constants/Colors";
import { supabase } from "@/src/lib/supabase";
import { Link, Stack } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, Alert } from "react-native";

const SignInScreen = () => {
	console.log("redirected to sign-in");

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);

	async function signInWithEmail() {
		setLoading(true);
		const { error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});

		if (error) Alert.alert(error.message);
		setLoading(false);
	}

	return (
		<View style={styles.container}>
			<Stack.Screen
				options={{
					title: "Sign in",
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
				onPress={signInWithEmail}
				disabled={loading}
				text={loading ? "Signing in..." : "Sign in"}
			/>
			<Link
				href={"/sign-up"}
				style={styles.textBtn}>
				Create an account
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

export default SignInScreen;
