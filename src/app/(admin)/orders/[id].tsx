import orders from "@/assets/data/orders";
import OrderItemListItem from "@/src/components/OrderItemListItem";
import OrderListItem from "@/src/components/OrderListItem";

import { Stack, useLocalSearchParams } from "expo-router";
import { View, StyleSheet, Text, FlatList } from "react-native";

const OrderDetailsScreen = () => {
	const { id } = useLocalSearchParams();

	const order = orders.find((order) => order.id.toString() === id);

	if (!order) return <Text>Order not found.</Text>;

	return (
		<View style={styles.container}>
			<Stack.Screen options={{ title: `Order #${id}` }} />

			<FlatList
				data={order.order_items}
				renderItem={({ item }) => <OrderItemListItem orderItem={item} />}
				contentContainerStyle={{ gap: 10 }}
				ListHeaderComponent={() => <OrderListItem order={order} />}
			/>
		</View>
		// header or footer component of the flatlist for "grouping" components
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 10,
		flex: 1,
		gap: 10,
	},
});

export default OrderDetailsScreen;
