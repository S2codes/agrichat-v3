import { StyleSheet } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Messages from '../screens/Messages';
import Inbox from '../screens/Inbox';

const Tab = createMaterialTopTabNavigator()

const MessageTab = () => {
    return (
        <Tab.Navigator screenOptions={{
            tabBarActiveTintColor: '#000',
            tabBarLabelStyle: { color: "#fff" },
            tabBarStyle: { backgroundColor: '#5D9C59', paddingTop: 10 },
            tabBarIndicatorStyle: { backgroundColor: "#fff" },
            
        }} initialRouteName='Sent Messages' >
            <Tab.Screen name="Sent Messages" component={Messages} />
            <Tab.Screen name="Inbox" component={Inbox} />
        </Tab.Navigator>
    )
}

export default MessageTab

const styles = StyleSheet.create({})
