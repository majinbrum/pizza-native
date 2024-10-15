import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome6";
import { Redirect, Tabs } from "expo-router";

import Colors from "@/src/constants/Colors";
import { useColorScheme } from "@/src/components/useColorScheme";
import { useClientOnlyValue } from "@/src/components/useClientOnlyValue";
import { useAuth } from "@/src/providers/AuthProvider";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: { name: React.ComponentProps<typeof FontAwesome>["name"]; color: string }) {
	return (
		<FontAwesome
			size={20}
			style={{ marginBottom: -3 }}
			{...props}
		/>
	);
}

export default function TabLayout() {
	console.log("(user)/_layout");
	const colorScheme = useColorScheme();
	const { session } = useAuth();

	if (!session) {
		console.log("redirect to sign-in from user layout");
		return <Redirect href={"/sign-in"} />;
	}

	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
				// Disable the static render of the header on web
				// to prevent a hydration error in React Navigation v6.
				headerShown: useClientOnlyValue(false, true),
			}}>
			<Tabs.Screen
				name='index'
				options={{ href: null }}
			/>
			<Tabs.Screen
				name='menu'
				options={{
					title: "Menu",
					headerShown: false,
					tabBarIcon: ({ color }) => (
						<TabBarIcon
							name='utensils'
							color={color}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name='orders'
				options={{
					title: "Orders",
					headerShown: false,
					tabBarIcon: ({ color }) => (
						<TabBarIcon
							name='list-ul'
							color={color}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name='profile'
				options={{
					title: "Profile",
					tabBarIcon: ({ color }) => (
						<TabBarIcon
							name='circle-user'
							color={color}
						/>
					),
				}}
			/>
		</Tabs>
	);
}
