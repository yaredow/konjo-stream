import { authClient } from "@/lib/auth-client";
import { queryClient } from "@/utils/trpc";
import { useState } from "react";
import {
	ActivityIndicator,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { StyleSheet } from "react-native-unistyles";

export function SignUp() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleSignUp = async () => {
		setIsLoading(true);
		setError(null);

		await authClient.signUp.email(
			{
				name,
				email,
				password,
			},
			{
				onError: (error) => {
					setError(error.error?.message || "Failed to sign up");
					setIsLoading(false);
				},
				onSuccess: () => {
					setName("");
					setEmail("");
					setPassword("");
					queryClient.refetchQueries();
				},
				onFinished: () => {
					setIsLoading(false);
				},
			},
		);
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Create Account</Text>

			{error && (
				<View style={styles.errorContainer}>
					<Text style={styles.errorText}>{error}</Text>
				</View>
			)}

			<TextInput
				style={styles.input}
				placeholder="Name"
				value={name}
				onChangeText={setName}
			/>

			<TextInput
				style={styles.input}
				placeholder="Email"
				value={email}
				onChangeText={setEmail}
				keyboardType="email-address"
				autoCapitalize="none"
			/>

			<TextInput
				style={styles.inputLast}
				placeholder="Password"
				value={password}
				onChangeText={setPassword}
				secureTextEntry
			/>

			<TouchableOpacity
				onPress={handleSignUp}
				disabled={isLoading}
				style={styles.button}
			>
				{isLoading ? (
					<ActivityIndicator size="small" color="#fff" />
				) : (
					<Text style={styles.buttonText}>Sign Up</Text>
				)}
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create((theme) => ({
	container: {
		marginTop: 24,
		padding: 16,
		borderRadius: 8,
		borderWidth: 1,
		borderColor: theme.colors.border,
	},
	title: {
		fontSize: 18,
		fontWeight: "600",
		color: theme.colors.typography,
		marginBottom: 16,
	},
	errorContainer: {
		marginBottom: 16,
		padding: 12,
		borderRadius: 6,
	},
	errorText: {
		color: theme.colors.destructive,
		fontSize: 14,
	},
	input: {
		marginBottom: 12,
		padding: 16,
		borderRadius: 6,
		color: theme.colors.typography,
		borderWidth: 1,
		borderColor: theme.colors.border,
	},
	inputLast: {
		marginBottom: 16,
		padding: 16,
		borderRadius: 6,
		color: theme.colors.typography,
		borderWidth: 1,
		borderColor: theme.colors.border,
	},
	button: {
		backgroundColor: theme.colors.primary,
		padding: 16,
		borderRadius: 6,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
	buttonText: {
		fontWeight: "500",
	},
}));
