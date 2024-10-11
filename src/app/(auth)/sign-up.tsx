import Button from "@/src/components/Button";
import Colors from "@/src/constants/Colors";
import { Link, Stack } from "expo-router";
import { useState } from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";

const SignUpScreen = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errors, setErrors] = useState("");

	const validateInput = () => {
		setErrors("");
		if (!email) {
			setErrors("Email is required");
			return false;
		}
		if (!password) {
			setErrors("Password is required");
			return false;
		}
		return true;
	};

	const signUp = () => {
		validateInput();
		console.warn("Sign up", email, password);
	};

	return (
		<View style={styles.container}>
			<Stack.Screen
				options={{
					title: "Sign Up",
				}}
			/>

			<Text style={styles.label}>Email</Text>
			<TextInput value={email} onChangeText={setEmail} placeholder='Email' style={styles.input} keyboardType='email-address' />

			<Text style={styles.label}>Password</Text>
			<TextInput value={password} onChangeText={setPassword} placeholder='Password' style={styles.input} secureTextEntry />
			<Text style={{ color: "red" }}>{errors}</Text>

			<Button text='Create account' onPress={signUp} />
			<Link href={"/sign-in"} style={styles.textBtn}>
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