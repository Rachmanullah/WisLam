import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import colors from '../theme/colors';
import { AddStories, AllStories, AllTrips, ConfirmScreen, DetailMyTrips, DetailTrip, EditDataBooking, FavoriteScreen, FormBooking, HomeScreen, LoginScreen, MyProfile, MyTrips, ProfileScreen, RegisterScreen, SearchScreen, Settings, SplashScreen, StoriesScreen, ThemeScreen } from '../screens';
import { AddSquare, Heart, Home2, ProfileCircle, SearchNormal } from 'iconsax-react-native';
import ThemeContext from '../context/GlobalStateProvider';
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MainApp() {
    const theme = useContext(ThemeContext)
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarHideOnKeyboard: true,
                tabBarActiveTintColor: colors.sekunder,
                tabBarInactiveTintColor: theme.textColor,
                tabBarStyle: {
                    paddingBottom: 10,
                    paddingTop: 10,
                    height: 60,
                },
                tabBarLabelStyle: {
                    marginTop: 5,
                    fontSize: 10,
                    fontFamily: 'TitilliumWeb-Bold',
                },
            }}>
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ focused, color }) => (
                        <Home2
                            color={color}
                            variant={focused ? 'Bold' : 'Linear'}
                            size={24}
                        />
                    ),
                    headerShown: false,
                }}
            />
            <Tab.Screen
                name="Favorite"
                component={FavoriteScreen}
                options={{
                    tabBarLabel: 'Favorite',
                    tabBarIcon: ({ focused, color }) => (
                        <Heart
                            color={color}
                            variant={focused ? 'Bold' : 'Linear'}
                            size={24}
                        />
                    ),
                    headerShown: false,
                }}
            />
            <Tab.Screen
                name="Stories"
                component={AddStories}
                options={{
                    tabBarLabel: 'Stories',
                    tabBarIcon: ({ focused, color }) => (
                        <AddSquare
                            color={color}
                            variant={focused ? 'Bold' : 'Linear'}
                            size={24}
                        />
                    ),
                    headerShown: false,
                }}
            />
            <Tab.Screen
                name="Search"
                component={SearchScreen}
                options={{
                    tabBarLabel: 'Search',
                    tabBarIcon: ({ focused, color }) => (
                        <SearchNormal
                            color={color}
                            variant={focused ? 'Bold' : 'Linear'}
                            size={24}
                        />
                    ),
                    headerShown: false,
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ focused, color }) => (
                        <ProfileCircle
                            color={color}
                            variant={focused ? 'Bold' : 'Linear'}
                            size={24}
                        />
                    ),
                    headerShown: false,
                }}
            />
        </Tab.Navigator>
    );
}

const Router = () => {
    return (
        <Stack.Navigator initialRouteName='SplashScreen'>
            <Stack.Screen
                name="SplashScreen"
                component={SplashScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="LoginScreen"
                component={LoginScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="RegisterScreen"
                component={RegisterScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="MainApp"
                component={MainApp}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="DetailTrip"
                component={DetailTrip}
                options={{
                    headerShown: false,
                    animationEnabled: true,
                    animationTypeForReplace: 'pop',
                    gestureEnabled: true,
                    gestureDirection: 'horizontal',
                    ...TransitionPresets.SlideFromRightIOS,
                }}
            />
            <Stack.Screen
                name="MyProfile"
                component={MyProfile}
                options={{
                    headerShown: false,
                    animationEnabled: true,
                    animationTypeForReplace: 'pop',
                    gestureEnabled: true,
                    gestureDirection: 'horizontal',
                    ...TransitionPresets.ModalSlideFromBottomIOS,
                }}
            />
            <Stack.Screen
                name="Settings"
                component={Settings}
                options={{
                    headerShown: false,
                    animationEnabled: true,
                    animationTypeForReplace: 'pop',
                    gestureEnabled: true,
                    gestureDirection: 'horizontal',
                    ...TransitionPresets.ModalSlideFromBottomIOS,
                }}
            />
            <Stack.Screen
                name="ThemeScreen"
                component={ThemeScreen}
                options={{
                    headerShown: false,
                    animationEnabled: true,
                    animationTypeForReplace: 'pop',
                    gestureEnabled: true,
                    gestureDirection: 'horizontal',
                    ...TransitionPresets.SlideFromRightIOS,
                }}
            />
            <Stack.Screen
                name="FormBooking"
                component={FormBooking}
                options={{
                    headerShown: false,
                    animationEnabled: true,
                    animationTypeForReplace: 'pop',
                    gestureEnabled: true,
                    gestureDirection: 'horizontal',
                    ...TransitionPresets.ModalSlideFromBottomIOS,
                }}
            />
            <Stack.Screen
                name="MyTrips"
                component={MyTrips}
                options={{
                    headerShown: false,
                    animationEnabled: true,
                    animationTypeForReplace: 'pop',
                    gestureEnabled: true,
                    gestureDirection: 'horizontal',
                    ...TransitionPresets.ModalSlideFromBottomIOS,
                }}
            />
            <Stack.Screen
                name="DetailMyTrips"
                component={DetailMyTrips}
                options={{
                    headerShown: false,
                    animationEnabled: true,
                    animationTypeForReplace: 'pop',
                    gestureEnabled: true,
                    gestureDirection: 'horizontal',
                    ...TransitionPresets.SlideFromRightIOS,
                }}
            />
            <Stack.Screen
                name="EditDataBooking"
                component={EditDataBooking}
                options={{
                    headerShown: false,
                    animationEnabled: true,
                    animationTypeForReplace: 'pop',
                    gestureEnabled: true,
                    gestureDirection: 'horizontal',
                    ...TransitionPresets.SlideFromRightIOS,
                }}
            />
            <Stack.Screen
                name="ConfirmScreen"
                component={ConfirmScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="StoriesScreen"
                component={StoriesScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="AllTrips"
                component={AllTrips}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="AllStories"
                component={AllStories}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    )
}

export default Router

const styles = StyleSheet.create({})