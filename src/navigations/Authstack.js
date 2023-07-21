import React from "react";
import {Login, Signup, Usercategory, Main, ChatGroups} from '../index'


export default function (Stack) {
    return (
        <>
            <Stack.Screen name="Main" options={{ headerShown: false }} component={Main} />
            <Stack.Screen name="Usercategory" options={{ headerShown: false }} component={Usercategory} />
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Chatgroups" options={{headerShown: false} } component={ChatGroups} />
            
        </>
    )
}