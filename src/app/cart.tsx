import { View, Text, Platform, FlatList } from "react-native";
import { StatusBar } from "expo-status-bar";
// import { useContext } from "react";
// import { CartContext } from "../providers/CartProvider";
import { useCart } from "@/src/providers/CartProvider";
import CartListItem from "@/src/components/CartListItem";
import Button from "../components/Button";

const CartScreen = () => {
	// const { items } = useContext(CartContext);
	const { items, total, checkout } = useCart();

	return (
		<View style={{ padding: 10 }}>
			<FlatList
				data={items}
				renderItem={({ item }) => <CartListItem cartItem={item} />}
				contentContainerStyle={{ padding: 10, gap: 10 }}
			/>

			<Text style={{ marginTop: 20, fontSize: 20, fontWeight: 500 }}>Total: ${total}</Text>
			<Button
				text='Checkout'
				onPress={checkout}
			/>

			{/* Use a light status bar on iOS to account for the black space above the modal */}
			<StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
		</View>
	);
};

export default CartScreen;
