import { useEffect } from "react";
import { supabase } from "@/src/lib/supabase";
import { useQueryClient } from "@tanstack/react-query";

export const useInsertOrderSubscription = () => {
	const queryClient = useQueryClient();
	useEffect(() => {
		// subscribe to inserts from API docs in the database table
		const ordersSubscription = supabase
			.channel("custom-insert-channel")
			.on("postgres_changes", { event: "INSERT", schema: "public", table: "orders" }, (payload) => {
				console.log("Change received!", payload);
				queryClient.invalidateQueries({ queryKey: ["orders"] });
			})
			.subscribe();

		return () => {
			// we need to unmount the subscription to make sure we don't leak memory
			ordersSubscription.unsubscribe();
		};
	}, []);
};

export const useUpdateOrderSubscription = (id: number) => {
	const queryClient = useQueryClient();
	useEffect(() => {
		// subscribe to events from API docs in the database table, we need to add the filter

		const orderSubscriptionUpdate = supabase
			.channel("custom-update-channel")
			.on("postgres_changes", { event: "UPDATE", schema: "public", table: "orders", filter: `id=eq.${id}` }, (payload) => {
				console.log("Change received!", payload);
				queryClient.invalidateQueries({ queryKey: ["orders", id] });
			})
			.subscribe();

		return () => {
			// we need to unmount the subscription to make sure we don't leak memory
			orderSubscriptionUpdate.unsubscribe();
		};
	}, []);
};
