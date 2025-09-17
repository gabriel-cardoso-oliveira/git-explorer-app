import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import React, { useCallback } from "react";
import { TouchableOpacity } from "react-native";

import { useTheme, useThemeMode } from "@/designSystem/theme";
import DesignSystemScreen from "@/features/designSystemShowcase/screens/DesignSystemScreen";
import RepositoryDetailsScreen from "@/features/repositoryDetails/screens/RepositoryDetailsScreen";
import RepositoryIssuesScreen from "@/features/repositoryIssues/screens/RepositoryIssuesScreen";
import RepositorySearchScreen from "@/features/repositorySearch/screens/SearchScreen";

import { getScreenOptions } from "./config";
import { RootStackParamList } from "./types";

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  const theme = useTheme();
  const { themeMode } = useThemeMode();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const screenOptions = getScreenOptions(theme);

  const renderButtonBack = useCallback(
    () => (
      <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={30}>
        <AntDesign
          name="left"
          size={theme.sizes.md}
          color={theme.colors.text}
        />
      </TouchableOpacity>
    ),
    [navigation, theme.colors.text, theme.sizes.md],
  );

  const renderButtonMenu = useCallback(
    () => (
      <TouchableOpacity
        onPress={() => navigation.navigate("Showcase")}
        hitSlop={30}
      >
        <MaterialIcons
          name="menu"
          size={theme.sizes.xl}
          color={theme.colors.text}
        />
      </TouchableOpacity>
    ),
    [navigation, theme.colors.text, theme.sizes.xl],
  );

  return (
    <>
      <StatusBar
        animated={true}
        style={themeMode === "light" ? "dark" : "light"}
        translucent={false}
        backgroundColor="transparent"
      />
      <Stack.Navigator
        initialRouteName="RepositorySearch"
        screenOptions={screenOptions}
      >
        <Stack.Screen
          name="Showcase"
          component={DesignSystemScreen}
          options={{
            title: "Showcase do Design System",
            headerLeft: renderButtonBack,
          }}
        />
        <Stack.Screen
          name="RepositorySearch"
          component={RepositorySearchScreen}
          options={{
            title: "Busca de Repositórios",
            headerRight: renderButtonMenu,
          }}
        />
        <Stack.Screen
          name="RepositoryDetails"
          component={RepositoryDetailsScreen}
          options={{
            title: "Detalhes do Repositório",
            headerLeft: renderButtonBack,
          }}
        />
        <Stack.Screen
          name="RepositoryIssues"
          component={RepositoryIssuesScreen}
          options={{
            title: "Issues do Repositório",
            headerLeft: renderButtonBack,
          }}
        />
      </Stack.Navigator>
    </>
  );
};

export default AppNavigator;
