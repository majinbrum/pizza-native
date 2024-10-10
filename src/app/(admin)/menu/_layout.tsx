import Colors from "@/src/constants/Colors";
import FontAwesome from "@expo/vector-icons/FontAwesome6";
import { Link, Stack } from "expo-router";
import { Pressable } from "react-native";

export default function MenuStack() {
	return (
		<Stack>
			{/* primo metodo per cambiare titolo dello screen*/}
			<Stack.Screen
				name='index'
				options={{
					title: "Menu",
					headerRight: () => (
						<Link href='/(admin)/menu/create' asChild>
							<Pressable>{({ pressed }) => <FontAwesome name='circle-plus' size={20} color={Colors.light.tint} style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }} />}</Pressable>
						</Link>
					),
				}}
			/>
		</Stack>
	);
}
