// import orders from "@/assets/data/orders";
import { useOrderDetails, useUpdateOrder } from "@/src/api/orders";
import OrderItemListItem from "@/src/components/OrderItemListItem";
import OrderListItem from "@/src/components/OrderListItem";
import Colors from "@/src/constants/Colors";
import { notifyUserAboutOrderUpdate } from "@/src/lib/notifications";
import { OrderStatusList } from "@/src/types";

import { Stack, useLocalSearchParams } from "expo-router";
import { View, StyleSheet, Text, FlatList, Pressable, ActivityIndicator } from "react-native";

const OrderDetailsScreen = () => {
	const { id: idString } = useLocalSearchParams();

	// const order = orders.find((order) => order.id.toString() === id);
	// if (!order) return <Text>Order not found.</Text>;

	const id = parseFloat(typeof idString === "string" ? idString : idString[0]); // if it's just a string, return it, otherwise if it's an array, return the first item
	const { data: order, isLoading, error } = useOrderDetails(id);

	const { mutate: updateOrder } = useUpdateOrder();

	const updateStatus = async (status: string) => {
		await updateOrder({ id: id, updatedFields: { status } });

		// console.log("Notify:", order?.user_id);
		if (order) {
			// everything but replace the status with the new one
			await notifyUserAboutOrderUpdate({ ...order, status });
		}
	};

	if (isLoading) return <ActivityIndicator />;
	if (error || !order) return <Text>Failed to fetch.</Text>;

	return (
		<View style={styles.container}>
			<Stack.Screen options={{ title: `Order #${id}` }} />

			<FlatList
				data={order.order_items}
				renderItem={({ item }) => <OrderItemListItem orderItem={item} />}
				contentContainerStyle={{ gap: 10 }}
				ListHeaderComponent={() => <OrderListItem order={order} />}
				ListFooterComponent={() => (
					<>
						<Text style={{ fontWeight: "bold" }}>Status</Text>
						<View style={{ flexDirection: "row", gap: 5 }}>
							{OrderStatusList.map((status) => (
								<Pressable
									key={status}
									onPress={() => updateStatus(status)}
									style={{
										borderColor: Colors.light.tint,
										borderWidth: 1,
										padding: 10,
										borderRadius: 5,
										marginVertical: 10,
										backgroundColor: order.status === status ? Colors.light.tint : "transparent",
									}}>
									<Text
										style={{
											color: order.status === status ? "white" : Colors.light.tint,
										}}>
										{status}
									</Text>
								</Pressable>
							))}
						</View>
					</>
				)}
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
