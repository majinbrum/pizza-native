import { Stack } from "expo-router";

export default function MenuStack() {
	return (
		<Stack>
			{/* primo metodo per cambiare titolo dello screen*/}
			<Stack.Screen name='index' options={{ title: "Menu" }} />
		</Stack>
	);
}
