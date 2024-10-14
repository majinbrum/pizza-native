import { StyleSheet, Text, View, Pressable } from "react-native";
import { Tables } from "../types";
import { Href, Link, useSegments } from "expo-router";

export const defaultPizzaImage = "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png";

type OrderListItemProps = {
	// order: Order;
	order: Tables<"orders">;
};

const OrderListItem = ({ order }: OrderListItemProps) => {
	const segments = useSegments();
	const path: Href = `/${segments[0]}/orders/${order.id}` as Href;

	return (
		<Link
			href={path}
			asChild>
			<Pressable>
				<View style={styles.container}>
					<View>
						<Text style={styles.title}>Order #{order.id}</Text>
						<Text style={styles.createdAt}>${order.created_at}</Text>
					</View>
					<View>
						<Text style={styles.status}>{order.status}</Text>
					</View>
				</View>
			</Pressable>
		</Link>
	);
};

export default OrderListItem;

const styles = StyleSheet.create({
	container: {
		backgroundColor: "white",
		padding: 10,
		borderRadius: 10,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	title: {
		fontWeight: "bold",
		marginVertical: 5,
	},
	createdAt: {
		color: "gray",
	},
	status: {
		fontWeight: "500",
	},
});
