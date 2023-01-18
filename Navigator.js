import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { HomeScreen } from "./Home";
import { CalendarScreen } from "./Calendar";
import { LibraryScreen } from "./Library";
import { MyPageScreen } from "./MyPage";

const Tab = createBottomTabNavigator();

export default function Navigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          tabBarActiveTintColor: "black",
          tabBarInactiveTintColor: "gray",
          headerShown: false,
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ color, size }) => (
              <Entypo name="home" color={color} size={16} />
            ),
          }}
        />
        <Tab.Screen
          name="Calendar"
          component={CalendarScreen}
          options={{
            tabBarLabel: "Calendar",
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5 name="calendar-alt" color={color} size={16} />
            ),
          }}
        />
        <Tab.Screen
          name="Library"
          component={LibraryScreen}
          options={{
            tabBarLabel: "Library",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="library-outline" color={color} size={16} />
            ),
          }}
        />
        <Tab.Screen
          name="MyPage"
          component={MyPageScreen}
          options={{
            tabBarLabel: "MyPage",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person-outline" color={color} size={16} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
