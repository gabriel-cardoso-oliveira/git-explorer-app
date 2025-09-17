import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import React from "react";

import { useTheme, useThemeMode } from "@/designSystem/theme";
import DesignSystemScreen from "@/features/designSystemShowcase/screens/DesignSystemScreen";
import RepositoryDetailsScreen from "@/features/repositoryDetails/screens/RepositoryDetailsScreen";
import RepositorySearchScreen from "@/features/repositorySearch/screens/SearchScreen";

import { getScreenOptions } from "./config";
import { RootStackParamList } from "./types";

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  const theme = useTheme();
  const { themeMode } = useThemeMode();
  const screenOptions = getScreenOptions(theme);

  return (
    <NavigationContainer>
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
          }}
        />
        <Stack.Screen
          name="RepositorySearch"
          component={RepositorySearchScreen}
          options={{
            title: "Busca de Repositórios",
          }}
        />
        <Stack.Screen
          name="RepositoryDetails"
          component={RepositoryDetailsScreen}
          options={{
            title: "Detalhes do Repositório",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
