import React from "react";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BottomNavigation } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { CommonActions } from "@react-navigation/native";
import Register from "../screens/Register";
import Home from "../screens/Home";
import Edit from "../screens/Edit";

const Tab = createBottomTabNavigator();

export default function TabRoutes() {
  const [routes, setRoutes] = React.useState([
    {
      name: "Home",
      component: Home,
      options: {
        tabBarLabel: "Início",
        tabBarIcon: ({ color, size }) => {
          return <Icon name="home" size={size} color={color} />;
        },
      },
    },
    {
      name: "Register",
      component: Register,
      
      options: {
        tabBarLabel: "Registrar",
        tabBarIcon: ({ color, size }) => {
          return <Icon name="account-arrow-up" size={size} color={color} />;
        },
      },
    },
    {
      name: "Edit",
      component: Edit,
      
      options: {
        tabBarLabel: "Editar",
        tabBarIcon: ({ color, size }) => {
          return <Icon name="pencil" size={size} color={color} />;
        },
      },
    },
  ]);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={({ navigation, state, descriptors, insets }) => (
        <BottomNavigation.Bar
          navigationState={state}
          safeAreaInsets={insets}
          onTabPress={({ route, preventDefault }) => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (event.defaultPrevented) {
              preventDefault();
            } else {
              navigation.dispatch({
                ...CommonActions.navigate(route.name, route.params),
                target: state.key,
              });
            }
          }}
          renderIcon={({ route, focused, color }) => {
            const { options } = descriptors[route.key];
            if (options.tabBarIcon) {
              return options.tabBarIcon({ focused, color, size: 24 });
            }

            return null;
          }}
          getLabelText={({ route }) => {
            const { options } = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.title;

            return label;
          }}
        />
      )}
    >
      {routes.map((route) => (
        <Tab.Screen key={route.name} {...route} />
      ))}
    </Tab.Navigator>
  );
}
