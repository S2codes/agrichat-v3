import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Communities from '../screens/Communities';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Feed from '../screens/Feed';

const Tab = createMaterialTopTabNavigator()

const TabStack = () => {

    return (
        <Tab.Navigator screenOptions={{
            tabBarActiveTintColor: '#000',
            tabBarLabelStyle: { color: "#fff" },
            tabBarStyle: { backgroundColor: '#5D9C59', paddingTop: 10 },
            tabBarIndicatorStyle: { backgroundColor: "#fff" },

        }}  initialRouteName='My Chats' >

            <Tab.Screen name="My Chats" component={Feed} />
            <Tab.Screen name="Chat Rooms" component={Communities} />
        </Tab.Navigator>
    )
}

export default TabStack

const styles = StyleSheet.create({})