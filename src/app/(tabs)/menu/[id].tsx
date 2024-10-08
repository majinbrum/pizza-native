import { Stack, useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";

const ProductDetailsScreen = () => {
	const { id } = useLocalSearchParams();
	return (
		<View>
			{/* secondo metodo per cambiare titolo dello screen. da qui è più comodo perché si possono usare anche le props */}
			<Stack.Screen options={{ title: "Product Details: " + id }} />
			<Text>Product Details Screen for id: {id}</Text>
		</View>
	);
};

export default ProductDetailsScreen;
