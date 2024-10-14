import { ActivityIndicator, FlatList, Text } from "react-native";
// import orders from "@/assets/data/orders"; // we don't need the manually created orders anymore, we can fetch them
import OrderListItem from "@/src/components/OrderListItem";
import { useAdminOrdersList } from "@/src/api/orders";
import { useInsertOrderSubscription } from "@/src/api/orders/subscriptions";

export default function OrdersScreen() {
	const { data: orders, isLoading, error } = useAdminOrdersList({ archived: false });

	useInsertOrderSubscription();

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
