import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import Colors from "../constants/Colors";
import { OrderItem, Tables } from "../types";
import { defaultPizzaImage } from "./ProductListItem";
import RemoteImage from "./RemoteImage";

type OrderItemListItemProps = {
	// orderItem: OrderItem;
	orderItem: { products: Tables<"products"> } & Tables<"order_items">;
};

const OrderItemListItem = ({ orderItem }: OrderItemListItemProps) => {
	return (
		<View style={styles.container}>
			<RemoteImage
				// <Image
				// source={{ uri: orderItem.products.image || defaultPizzaImage }}
				path={orderItem.products.image}
				fallback={defaultPizzaImage}
				style={styles.image}
				resizeMode='contain'
			/>
			<View style={{ flex: 1 }}>
				<Text style={styles.title}>{orderItem.products.name}</Text>
				<View style={styles.subtitleContainer}>
					<Text style={styles.price}>${orderItem.products.price.toFixed(2)}</Text>
					<Text>Size: {orderItem.size}</Text>
				</View>
			</View>
			<Text style={styles.quantity}>{orderItem.quantity}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: "white",
		borderRadius: 10,
		padding: 5,
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
	},
	image: {
		width: 75,
		aspectRatio: 1,
		alignSelf: "center",
		marginRight: 10,
	},
	title: {
		fontWeight: "500",
		fontSize: 16,
		marginBottom: 5,
	},
	subtitleContainer: {
		flexDirection: "row",
		gap: 5,
	},
	quantity: {
		fontWeight: "500",
		fontSize: 18,
	},
	price: {
		color: Colors.light.tint,
		fontWeight: "bold",
	},
});

export default OrderItemListItem;
