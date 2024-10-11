import { MaterialTopTabNavigationEventMap, MaterialTopTabNavigationOptions, createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { withLayoutContext } from "expo-router";
import { ParamListBase, TabNavigationState } from "@react-navigation/native";

// nasconendo in orders/layout l'header, le tab vanno a nascondersi sotto la nav dello smartphone, quindi utilizziamo una SafeAreaView
import { SafeAreaView } from "react-native-safe-area-context";

const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext<MaterialTopTabNavigationOptions, typeof Navigator, TabNavigationState<ParamListBase>, MaterialTopTabNavigationEventMap>(Navigator);

export default function OrdersTabLayout() {
	return (
		// flex:1 per fargli prendere tutto lo schermo
		// backgroundColor per sfondo della nav dello smartphone
		// edges top per applicare il padding solo sulla parte superiore dello schermo
		<SafeAreaView
			edges={["top"]}
			style={{ flex: 1, backgroundColor: "white" }}>
			<MaterialTopTabs>
				<MaterialTopTabs.Screen
					name='index'
					options={{ title: "Active" }}
				/>
				<MaterialTopTabs.Screen
					name='archive'
					options={{ title: "Archive" }}
				/>
			</MaterialTopTabs>
		</SafeAreaView>
	);
}
