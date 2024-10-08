import { Stack, useLocalSearchParams } from "expo-router";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import products from "@/assets/data/products";
import { defaultPizzaImage } from "@/src/components/ProductListItem";
import { useState } from "react";
import Button from "@/src/components/Button";

const sizes = ["S", "M", "L", "XL"];

const ProductDetailsScreen = () => {
	const { id } = useLocalSearchParams();

	const [selectedSize, setSelectedSize] = useState("M");

	const product = products.find((product) => product.id.toString() === id);
	if (!product) return <Text>Product not found</Text>;

	const addToCart = () => {
		console.warn("Adding to cart, size: ", selectedSize);
	};

	return (
		<View style={styles.container}>
			{/* secondo metodo per cambiare titolo dello screen. da qui è più comodo perché si possono usare anche le props */}
			<Stack.Screen options={{ title: product.name }} />

			<Image source={{ uri: product.image || defaultPizzaImage }} style={styles.image} />

			<Text>Select size</Text>
			<View style={styles.sizes}>
				{sizes.map((size) => (
					<Pressable onPress={() => setSelectedSize(size)} key={size} style={[styles.size, { backgroundColor: selectedSize === size ? "gainsboro" : "white" }]}>
						<Text style={[styles.sizeText, { color: selectedSize === size ? "black" : "gray" }]}>{size}</Text>
					</Pressable>
				))}
			</View>

			<Text style={styles.price}>{product.price}</Text>

			<Button text='Add to cart' onPress={addToCart} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: "white",
		flex: 1,
		padding: 10,
	},
	image: {
		width: "100%",
		aspectRatio: 1,
	},
	sizes: {
		flexDirection: "row",
		justifyContent: "space-around",
		marginVertical: 10,
	},
	size: {
		backgroundColor: "gainsboro",
		width: 50,
		aspectRatio: 1,
		borderRadius: 25,
		justifyContent: "center",
		alignItems: "center",
	},
	sizeText: {
		fontSize: 20,
		fontWeight: "500",
	},
	price: {
		fontSize: 18,
		fontWeight: "bold",
		marginTop: "auto",
	},
});

export default ProductDetailsScreen;
