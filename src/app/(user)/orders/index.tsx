import { ActivityIndicator, FlatList, Text } from "react-native";
// import orders from "@/assets/data/orders";
import OrderListItem from "@/src/components/OrderListItem";
import { useMyOrdersList } from "@/src/api/orders";

export default function OrdersScreen() {
	const { data: orders, isLoading, error } = useMyOrdersList();
	if (isLoading) return <ActivityIndicator />;
	if (error) return <Text>Failed to fetch.</Text>;

	return (
		<FlatList
			data={orders}
			renderItem={({ item }) => <OrderListItem order={item} />}
			contentContainerStyle={{ gap: 10, padding: 10 }}
		/>
	);
}
