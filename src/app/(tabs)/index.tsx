import { StyleSheet, View } from "react-native";
import products from "@/assets/data/products";
import ProductListItem from "@/src/components/ProductListItem";

export default function MenuScreen() {
	return (
		<View>
			{products.map((product, index) => (
				<ProductListItem key={index} product={product} />
			))}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "white",
		padding: 10,
		borderRadius: 20,
	},
});
