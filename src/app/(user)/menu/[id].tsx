import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, Image, StyleSheet, Pressable, ActivityIndicator } from "react-native";
// import products from "@/assets/data/products";
import { defaultPizzaImage } from "@/src/components/ProductListItem";
import { useState } from "react";
import Button from "@/src/components/Button";
import { useCart } from "@/src/providers/CartProvider";
import { PizzaSize } from "@/src/types";
import { useProduct } from "@/src/api/products";
import RemoteImage from "@/src/components/RemoteImage";

const sizes: PizzaSize[] = ["S", "M", "L", "XL"];

const ProductDetailsScreen = () => {
	const { id: idString } = useLocalSearchParams();

	const id = parseFloat(typeof idString === "string" ? idString : idString[0]); // if it's just a string, return it, otherwise if it's an array, return the first item
	const { data: product, error, isLoading } = useProduct(id);

	const { addItem } = useCart();

	const router = useRouter();

	const [selectedSize, setSelectedSize] = useState<PizzaSize>("M");

	// const product = products.find((product) => product.id.toString() === id);

	const addToCart = () => {
		if (!product) return;
		addItem(product, selectedSize);
		router.push("/cart");
	};

	// if (!product) return <Text>Product not found</Text>;

	if (isLoading) return <ActivityIndicator />;

	if (error) {
		return <Text>Failed to fetch products.</Text>;
	}

	return (
		<View style={styles.container}>
			{/* secondo metodo per cambiare titolo dello screen. da qui è più comodo perché si possono usare anche le props */}
			<Stack.Screen options={{ title: product.name }} />

			<RemoteImage
				// <Image
				// source={{ uri: product.image || defaultPizzaImage }}
				path={product?.image}
				fallback={defaultPizzaImage}
				style={styles.image}
			/>

			<Text>Select size</Text>
			<View style={styles.sizes}>
				{sizes.map((size) => (
					<Pressable
						onPress={() => setSelectedSize(size)}
						key={size}
						style={[styles.size, { backgroundColor: selectedSize === size ? "gainsboro" : "white" }]}>
						<Text style={[styles.sizeText, { color: selectedSize === size ? "black" : "gray" }]}>{size}</Text>
					</Pressable>
				))}
			</View>

			<Text style={styles.price}>{product.price}</Text>

			<Button
				text='Add to cart'
				onPress={addToCart}
			/>
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
