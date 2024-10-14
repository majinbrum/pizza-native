import { ActivityIndicator, FlatList, Text } from "react-native";
// import products from "@/assets/data/products"; // now we fetch them
import ProductListItem from "@/src/components/ProductListItem";

import { useProductsList } from "@/src/api/products";

export default function MenuScreen() {
	const { data: products, error, isLoading } = useProductsList();
	// we use the custom hook we created

	if (isLoading) return <ActivityIndicator />;

	if (error) {
		return <Text>Failed to fetch products.</Text>;
	}

	return (
		<FlatList
			data={products}
			renderItem={({ item }) => <ProductListItem product={item} />}
			numColumns={2}
			contentContainerStyle={{ gap: 10, padding: 10 }}
			columnWrapperStyle={{ gap: 10 }}
		/>
	);
}
