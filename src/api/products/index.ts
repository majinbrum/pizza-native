import { supabase } from "@/src/lib/supabase";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// custom hook to reuse in the project
export const useProductsList = () => {
	// fetch without React Query Library
	// useEffect(() => {
	// 	const fetchProducts = async () => {
	// 		const { data, error } = await supabase.from("products").select("*");
	// 	};
	// 	fetchProducts();
	// }, []);

	// const {
	// 	data: products,
	// 	error,
	// 	isLoading,
	// } =
	// instead of destructuring here, we will destructure directly when we call the function, and we use return to get the results back
	return useQuery({
		queryKey: ["products"],
		queryFn: async () => {
			const { data, error } = await supabase.from("products").select("*");

			if (error) {
				throw new Error(error.message);
			}
			return data;
		},
	});
};

export const useProduct = (id: number) => {
	return useQuery({
		queryKey: ["products", id],
		queryFn: async () => {
			const { data, error } = await supabase.from("products").select("*").eq("id", id).single();

			if (error) {
				throw new Error(error.message);
			}
			return data;
		},
	});
};

export const useInsertProduct = () => {
	const queryClient = useQueryClient();

	return useMutation({
		async mutationFn(data: any) {
			const { error, data: newProduct } = await supabase
				.from("products")
				.insert({
					name: data.name,
					image: data.image,
					price: data.price,
				})
				.single();

			if (error) {
				throw new Error(error.message);
			}
			return newProduct;
		},
		async onSuccess() {
			await queryClient.invalidateQueries({ queryKey: ["products"] });
		},
	});
};

export const useUpdateProduct = () => {
	const queryClient = useQueryClient();

	return useMutation({
		async mutationFn(data: any) {
			const { error, data: updatedProduct } = await supabase
				.from("products")
				.update({
					name: data.name,
					image: data.image,
					price: data.price,
				})
				.eq("id", data.id)
				.select()
				.single();

			if (error) {
				throw new Error(error.message);
			}
			return updatedProduct;
		},
		async onSuccess(_, { id }) {
			await queryClient.invalidateQueries({ queryKey: ["products"] });
			await queryClient.invalidateQueries({ queryKey: ["products", id] });
		},
	});
};

export const useDeleteProduct = () => {
	const queryClient = useQueryClient();

	return useMutation({
		async mutationFn(id: number) {
			const { error } = await supabase.from("products").delete().eq("id", id);

			if (error) {
				throw new Error(error.message);
			}
		},
		async onSuccess() {
			await queryClient.invalidateQueries({ queryKey: ["products"] });
		},
	});
};
