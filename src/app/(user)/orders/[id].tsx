// import orders from "@/assets/data/orders";
import { useOrderDetails } from "@/src/api/orders";
import { useUpdateOrderSubscription } from "@/src/api/orders/subscriptions";
import OrderItemListItem from "@/src/components/OrderItemListItem";
import OrderListItem from "@/src/components/OrderListItem";

import { Stack, useLocalSearchParams } from "expo-router";
import { View, StyleSheet, Text, FlatList, ActivityIndicator } from "react-native";

const OrderDetailsScreen = () => {
	const { id: idString } = useLocalSearchParams();

	const id = parseFloat(typeof idString === "string" ? idString : idString[0]); // if it's just a string, return it, otherwise if it's an array, return the first item
	const { data: order, isLoading, error } = useOrderDetails(id);

	useUpdateOrderSubscription(id);

	// const order = orders.find((order) => order.id.toString() === id);
	// if (!order) return <Text>Order not found.</Text>;

	if (isLoading) return <ActivityIndicator />;
	if (error) return <Text>Failed to fetch.</Text>;

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
