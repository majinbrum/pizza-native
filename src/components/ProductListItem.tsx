import { StyleSheet, Text, Image, Pressable } from "react-native";
import Colors from "@/src/constants/Colors";
import { Tables } from "../types";
import { Href, Link, useSegments } from "expo-router";
import RemoteImage from "./RemoteImage";

export const defaultPizzaImage = "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png";

type ProductListItemProps = {
	// product: Product; // now that we have the database types, we don't have to use the manually written types:
	product: Tables<"products">;
};

const ProductListItem = ({ product }: ProductListItemProps) => {
	const segments = useSegments();
	const path: Href = `/${segments[0]}/menu/${product.id}` as Href;

	return (
		<Link
			href={path}
			asChild>
			<Pressable style={styles.container}>
				<RemoteImage
					// <Image
					// source={{ uri: product.image || defaultPizzaImage }}
					path={product.image}
					fallback={defaultPizzaImage}
					style={styles.image}
					resizeMode='contain'
				/>
				<Text style={styles.title}>{product.name}</Text>
				<Text style={styles.price}>${product.price}</Text>
			</Pressable>
		</Link>
	);
};

export default ProductListItem;

const styles = StyleSheet.create({
	container: {
		backgroundColor: "white",
		padding: 10,
		borderRadius: 20,
		flex: 1,
		maxWidth: "50%",
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
	},
	price: {
		fontSize: 18,
		fontWeight: "bold",
		color: Colors.light.tint,
	},
	image: {
		width: "100%",
		aspectRatio: 1,
	},
});
