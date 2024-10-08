import Colors from "@/src/constants/Colors";
import FontAwesome from "@expo/vector-icons/FontAwesome6";
import { Link, Stack } from "expo-router";
import { Pressable } from "react-native";

export default function MenuStack() {
	return (
		<Stack
			screenOptions={{
				headerRight: () => (
					<Link href='/cart' asChild>
						<Pressable>{({ pressed }) => <FontAwesome name='cart-shopping' size={20} color={Colors.light.tint} style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }} />}</Pressable>
					</Link>
				),
			}}>
			{/* primo metodo per cambiare titolo dello screen*/}
			<Stack.Screen name='index' options={{ title: "Menu" }} />
		</Stack>
	);
}
