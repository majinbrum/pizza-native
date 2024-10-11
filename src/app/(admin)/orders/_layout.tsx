// import { Stack } from "expo-router";

// export default function MenuStack() {
// 	return (
// 		<Stack>
// 			<Stack.Screen name='index' options={{ title: "Orders" }} />
// 		</Stack>
// 	);
// }

import { Stack } from "expo-router";

export default function OrdersLayout() {
	return (
		<Stack>
			<Stack.Screen
				name='(top-tabs)'
				options={{ title: "Orders", headerShown: false }}
			/>
		</Stack>
	);
}
