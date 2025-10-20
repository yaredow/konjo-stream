import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { useUnistyles } from "react-native-unistyles";

import { HeaderButton } from "../../components/header-button";

const DrawerLayout = () => {
	const { theme } = useUnistyles();

	return (
		<Drawer
			screenOptions={{
				headerStyle: {
					backgroundColor: theme.colors.background,
				},
				headerTitleStyle: {
					color: theme.colors.foreground,
				},
				headerTintColor: theme.colors.foreground,
				drawerStyle: {
					backgroundColor: theme.colors.background,
				},
				drawerLabelStyle: {
					color: theme.colors.foreground,
				},
				drawerInactiveTintColor: theme.colors.mutedForeground,
			}}
		>
			<Drawer.Screen
				name="index"
				options={{
					headerTitle: "Home",
					drawerLabel: "Home",
					drawerIcon: ({ size, color }) => (
						<Ionicons name="home-outline" size={size} color={color} />
					),
				}}
			/>
			<Drawer.Screen
				name="(tabs)"
				options={{
					headerTitle: "Tabs",
					drawerLabel: "Tabs",
					drawerIcon: ({ size, color }) => (
						<MaterialIcons name="border-bottom" size={size} color={color} />
					),
					headerRight: () => (
						<Link href="/modal" asChild>
							<HeaderButton />
						</Link>
					),
				}}
			/>
		</Drawer>
	);
};

export default DrawerLayout;
