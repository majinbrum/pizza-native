import { StyleSheet, Text, View, Image } from "react-native";
import Colors from "@/src/constants/Colors";
import { Product } from "../types";

export const defaultPizzaImage = "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png";

type ProductListItemProps = {
	product: Product;
};

const ProductListItem = ({ product }: ProductListItemProps) => {
	return (
		<View style={styles.container}>
			<Image source={{ uri: product.image || defaultPizzaImage }} style={styles.image} />
			<Text style={styles.title}>{product.name}</Text>
			<Text style={styles.price}>${product.price}</Text>
		</View>
	);
};

export default ProductListItem;

const styles = StyleSheet.create({
	container: {
		backgroundColor: "white",
		padding: 10,
		borderRadius: 20,
	},
	title: {
		fontSize: 32,
		fontWeight: "bold",
	},
	price: {
		fontSize: 20,
		fontWeight: "bold",
		color: Colors.light.tint,
	},
	separator: {
		marginVertical: 30,
		height: 1,
		width: "80%",
	},
	image: {
		width: "100%",
		aspectRatio: 1,
	},
});
