import React from 'react'
import {
    ChatGroups,
    Community,
    ContactUs,
    GroupSetting,
    Home,
    Messages,
    Profile,
    Replies, UserDetails, ViewImage, WriteMessage, WriteQuery, WriteReply
} from '../index'
import TabStack from './TabStack'
import MessageTab from './MessageTab'
import ViewPdf from '../screens/ViewPdf'
import LanguageSetting from '../screens/LanguageSetting'

export default function (Stack) {


    return (
        <>
            <Stack.Screen name="Index" options={{ headerShown: false }} component={Home} />
            <Stack.Screen name="Chats" options={{ headerShown: false }} component={TabStack} />
            <Stack.Screen name="MeesageTab" options={{ headerShown: false }} component={MessageTab} />
            <Stack.Screen name="Community" component={Community} options={
                ({ route }) => ({ title: `${route.params.Communitycategory} / ${route.params.Communityname}` })
            } />
            <Stack.Screen name="Replies" component={Replies} />
            <Stack.Screen name="Messages" component={Messages} />
            <Stack.Screen name="Write Question" component={WriteQuery} />
            <Stack.Screen name="Chat Groups" component={ChatGroups} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="My Details" component={UserDetails} />
            <Stack.Screen name="Write Your Reply" component={WriteReply} />
            <Stack.Screen name="Write Message" component={WriteMessage} />
            <Stack.Screen name="Group Setting" component={GroupSetting} />
            <Stack.Screen name="View Image"  component={ViewImage} options={{ headerShown: false }} />
            <Stack.Screen name="Contact Us" component={ContactUs} />
            <Stack.Screen name="View Pdf" component={ViewPdf} />
            <Stack.Screen name="Language Setting" component={LanguageSetting} />
            
        </>

    )

}

