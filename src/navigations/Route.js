
import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Authstack from './Authstack';
import Mainstack from './Mainstack';
import { useSelector } from 'react-redux'
import { getItem } from '../Utils/Utils';
import { RFValue } from "react-native-responsive-fontsize";

export default function Route() {

    const Stack = createNativeStackNavigator()

    const isLogged = useSelector((state) => state.isLoggedreducer)

    const [userToken, setUserToken] = useState(false)

    useEffect(() => {

        const fetchAsyncData = async () => {
            const userData = await getItem("authDetails")

            if (!userData || userData === null) {
                setUserToken(false)
            } else {
                setUserToken(true)
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

                {isLogged || userToken ? Mainstack(Stack) : Authstack(Stack)}

            </Stack.Navigator>
        </NavigationContainer>
    )
}


