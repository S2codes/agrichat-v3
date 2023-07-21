import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Home from '../screens/Home'
import Communities from '../screens/Communities'
import { RFValue } from "react-native-responsive-fontsize";
const BottomTab = () => {

    const Tab = createMaterialBottomTabNavigator()

    return (
        <Tab.Navigator
            initialRouteName='home'
            activeColor="#fff"
            labelStyle={{ fontSize: RFValue(35) }}
            barStyle={{ backgroundColor: '#5D9C59', height: 65 }}
            shifting={true}

        >

            <Tab.Screen name='Home' component={Home} options={{
                tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="home" color={color} size={30} />
                )
            }} />

            <Tab.Screen name='Communities' component={Communities} options={{
                tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="message" color={color} size={30} />
                ),
            }} />

            <Tab.Screen name='Messages' component={Communities} options={{
                tabBarIcon: ({ color }) => (
                    < MaterialCommunityIcons name="account" color={color} size={30} />
                )
            }} />

        </Tab.Navigator>
    )
}



const styles = StyleSheet.create({})


export default BottomTab
