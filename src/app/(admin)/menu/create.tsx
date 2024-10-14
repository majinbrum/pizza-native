import Button from "@/src/components/Button";
import { defaultPizzaImage } from "@/src/components/ProductListItem";
import Colors from "@/src/constants/Colors";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, Image, Platform, Alert, Modal, Pressable } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useInsertProduct, useProduct, useUpdateProduct, useDeleteProduct } from "@/src/api/products";

const CreateProductScreen = () => {
	const [name, setName] = useState("");
	const [price, setPrice] = useState("");
	const [errors, setErrors] = useState("");
	const [image, setImage] = useState<string | null>(null);
	const [modalVisible, setModalVisible] = useState(false);

	const { id: idString } = useLocalSearchParams();
	const id = parseFloat(typeof idString === "string" ? idString : idString?.[0]); // if it's just a string, return it, otherwise if it's an array, return the first item

	// doppio !! significa se è defined (contrario di ! che significa che è undefined o che non è defined)
	const isUpdating = !!id;

	const { mutate: insertProduct } = useInsertProduct();
	const { mutate: updateProduct } = useUpdateProduct();
	const { data: updatingProduct } = useProduct(id);
	const { mutate: deleteProduct } = useDeleteProduct();

	const router = useRouter();

	useEffect(() => {
		if (updatingProduct) {
			setName(updatingProduct.name);
			setImage(updatingProduct.image);
			setPrice(updatingProduct.price.toString());
		}
	}, [updatingProduct]);

	const validateInput = () => {
		setErrors("");
		if (!name) {
			setErrors("Name is required");
			return false;
		}
		if (!price) {
			setErrors("Price is required");
			return false;
		}
		if (isNaN(parseFloat(price))) {
			setErrors("Price is not a number");
			return false;
		}
		return true;
	};

	const resetFields = () => {
		setName("");
		setPrice("");
		setImage(null);
	};

	const onSubmit = () => {
		if (isUpdating) {
			onUpdate();
		} else {
			onCreate();
		}
	};

	const onCreate = () => {
		if (!validateInput()) {
			return;
		}

		console.warn("Creating product", name, price);

		// Save in the database
		insertProduct(
			{ name, image, price: parseFloat(price) },
			{
				onSuccess: () => {
					resetFields();
					router.back();
				},
			}
		);
	};

	const onUpdate = () => {
		if (!validateInput()) {
			return;
		}

		console.warn("Updating product", name, price);

		// Save in the database
		updateProduct(
			{ id, name, image, price: parseFloat(price) },
			{
				onSuccess: () => {
					resetFields();
					router.back();
				},
			}
		);
	};

	const pickImage = async () => {
		// No permissions request is necessary for launching the image library
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});

		if (!result.canceled) {
			setImage(result.assets[0].uri);
		}
	};

	const onDelete = () => {
		console.warn("Deleting product", name, price);

		deleteProduct(id, {
			onSuccess: () => {
				resetFields();
				router.replace("/(admin)");
			},
		});
	};

	const confirmDelete = () => {
		if (Platform.OS === "ios") {
			Alert.alert(
				"Confirm",
				"Are you sure you want to delete this product?",
				[
					{
						text: "Cancel",
						style: "cancel",
					},
					{
						text: "Delete",
						style: "destructive",
						onPress: onDelete,
					},
				],
				{ cancelable: true } // Android specific to allow dismissing the alert by tapping outside
			);
		}
		if (Platform.OS === "android") {
			setModalVisible(false);
			onDelete();
		}
	};

	return (
		<View style={styles.container}>
			<Stack.Screen options={{ title: isUpdating ? "Update Product" : "Create Product " }} />

			<Image
				source={{ uri: image || defaultPizzaImage }}
				style={styles.image}
			/>
			<Text
				style={styles.textBtn}
				onPress={pickImage}>
				Select image
			</Text>

			<Text style={styles.label}>Name</Text>
			<TextInput
				value={name}
				onChangeText={setName}
				placeholder='Name'
				style={styles.input}
			/>

			<Text style={styles.label}>Price ($)</Text>
			<TextInput
				value={price}
				onChangeText={setPrice}
				placeholder='9.99'
				style={styles.input}
				keyboardType='numeric'
			/>

			<Text style={{ color: "red" }}>{errors}</Text>
			<Button
				text={isUpdating ? "Update" : "Create"}
				onPress={onSubmit}
			/>
			{isUpdating && Platform.OS === "ios" && (
				<Text
					style={styles.textBtn}
					onPress={confirmDelete}>
					Delete
				</Text>
			)}
			{isUpdating && Platform.OS === "android" && (
				<>
					<Modal
						animationType='none'
						transparent={true}
						visible={modalVisible}
						onRequestClose={() => {
							Alert.alert("Modal has been closed.");
							setModalVisible(!modalVisible);
						}}>
						<View style={styles.centeredView}>
							<View style={styles.modalView}>
								<Text style={styles.modalTitle}>Confirm</Text>
								<Text style={styles.modalText}>Are you sure you want to delete this product?</Text>

								<View style={styles.modalButtons}>
									<Text
										style={[styles.textBtn, styles.modalCancel]}
										onPress={() => setModalVisible(false)}>
										Cancel
									</Text>
									<Text
										style={[styles.textBtn, styles.modalConfirm]}
										onPress={confirmDelete}>
										Confirm
									</Text>
								</View>
							</View>
						</View>
					</Modal>
					<Text
						style={styles.textBtn}
						onPress={() => setModalVisible(true)}>
						Delete
					</Text>
				</>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		padding: 10,
	},
	label: {
		color: "gray",
		fontSize: 18,
	},
	input: {
		backgroundColor: "white",
		padding: 10,
		borderRadius: 5,
		marginTop: 5,
		marginBottom: 20,
	},
	image: {
		width: "50%",
		aspectRatio: 1,
		alignSelf: "center",
	},
	textBtn: {
		fontSize: 18,
		alignSelf: "center",
		fontWeight: "bold",
		color: Colors.light.tint,
		marginVertical: 10,
	},
	// modal
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 22,
	},
	modalView: {
		margin: 20,
		backgroundColor: "white",
		borderRadius: 20,
		padding: 35,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	modalTitle: {
		marginBottom: 15,
		textAlign: "center",
		fontWeight: "bold",
		fontSize: 18,
	},
	modalText: {
		marginBottom: 15,
		textAlign: "center",
		fontSize: 16,
	},
	modalButtons: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	modalCancel: {
		flex: 1,
		fontWeight: "regular",
		color: "gray",
		textAlign: "center",
		fontSize: 16,
	},
	modalConfirm: {
		flex: 1,
		fontWeight: "bold",
		color: "red",
		textAlign: "center",
		fontSize: 16,
	},
});

export default CreateProductScreen;
