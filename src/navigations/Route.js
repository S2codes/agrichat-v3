
import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Authstack from './Authstack';
import Mainstack from './Mainstack';
import { useDispatch, useSelector } from 'react-redux'
import { getItem } from '../Utils/Utils';
import { RFValue } from "react-native-responsive-fontsize";
import { loggedIN } from '../Redux/action/action';

export default function Route() {

    const Stack = createNativeStackNavigator()
    const dispatch = useDispatch()
    let isLogged = useSelector((state) => state.isLoggedreducer)

    useEffect(() => {

        const fetchAsyncData = async () => {
            const userData = await getItem("authDetails")
            if (!userData || userData === null) {

                isLogged = false;
            } else {
                dispatch(loggedIN(true))

            }
        }
        fetchAsyncData()

    }, [])


    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={
                {
                    headerTintColor: '#fff',
                    headerStyle: {
                        backgroundColor: '#5D9C59',
                    },
                    headerTitleStyle: {
                        fontSize: RFValue(17),
                    },
                    headerTitleAlign: "left"

                }
            }>
                {isLogged ? Mainstack(Stack) : Authstack(Stack)}

            </Stack.Navigator>
        </NavigationContainer>
    )
}


