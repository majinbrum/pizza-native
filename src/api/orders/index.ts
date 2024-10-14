import { supabase } from "@/src/lib/supabase";
import { useAuth } from "@/src/providers/AuthProvider";
import { InsertTables, UpdateTables } from "@/src/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// we need to regenerate the types from the database

export const useAdminOrdersList = ({ archived = false }) => {
	const statuses = archived ? ["Delivered"] : ["New", "Cooking", "Delivering"];

	return useQuery({
		queryKey: ["orders", { archived }],
		queryFn: async () => {
			const { data, error } = await supabase.from("orders").select("*").in("status", statuses).order("created_at", { ascending: false });

			if (error) {
				throw new Error(error.message);
			}
			return data;
		},
	});
};

export const useMyOrdersList = () => {
	const { session } = useAuth();
	const id = session?.user.id;

	return useQuery({
		// we add the userId parameter to differentiate the query key from the useAdminOrdersList
		queryKey: ["orders", { userId: id }],
		queryFn: async () => {
			if (!id) return null;
			const { data, error } = await supabase.from("orders").select("*").eq("user_id", id).order("created_at", { ascending: false });

			if (error) {
				throw new Error(error.message);
			}
			return data;
		},
	});
};

export const useOrderDetails = (id: number) => {
	return useQuery({
		queryKey: ["orders", id],
		queryFn: async () => {
			// nested query with supabase: quantity and size are coming from order_items, but the name and the image is coming from products (since they are related with the product id)
			const { data, error } = await supabase.from("orders").select("*, order_items(*, products(*))").eq("id", id).single();

			if (error) {
				throw new Error(error.message);
			}
			return data;
		},
	});
};

export const useInsertOrder = () => {
	const queryClient = useQueryClient();

	const { session } = useAuth();
	const userId = session?.user.id;

	return useMutation({
		async mutationFn(data: InsertTables<"orders">) {
			const { error, data: newOrder } = await supabase
				.from("orders")
				.insert({ user_id: userId, ...data })
				.select()
				.single();

			if (error) {
				throw new Error(error.message);
			}
			return newOrder;
		},
		async onSuccess() {
			await queryClient.invalidateQueries({ queryKey: ["orders"] });
		},
	});
};

export const useUpdateOrder = () => {
	const queryClient = useQueryClient();

	return useMutation({
		async mutationFn({ id, updatedFields }: { id: number; updatedFields: UpdateTables<"orders"> }) {
			const { error, data: updatedOrder } = await supabase.from("orders").update(updatedFields).eq("id", id).select().single();

			if (error) {
				throw new Error(error.message);
			}
			return updatedOrder;
		},
		async onSuccess(_, { id }) {
			await queryClient.invalidateQueries({ queryKey: ["orders"] });
			await queryClient.invalidateQueries({ queryKey: ["orders", id] });
		},
	});
};
