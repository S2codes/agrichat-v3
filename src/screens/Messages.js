import { Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Entypo } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { apiGet, apiPostWithFromData, getItem } from '../Utils/Utils';
import { DELETEMSG, GETMESSAGEBYUSERID } from '../config/urls';
import MessageCard from '../components/MessageCard';
import { ActivityIndicator } from 'react-native';
import { showError, showSuccess } from '../Utils/HelpFunctions';
import CheckConnection from '../Utils/CheckConnection';
import { RFValue } from "react-native-responsive-fontsize";

const Messages = ({ navigation }) => {
    // const [userDetails, setUserDetails] = useState()

    const [isLoading, setIsLoading] = useState(false)
    const [messageData, setMessageData] = useState()

    const isFocused = useIsFocused()

    const fetchData = async () => {

        const userData = await getItem("authDetails")
        const USERID = userData.userid

        // const endpoint = `${FETCHUSERDETAILS}&userid=${USERID}`;
        // const data = await apiGet(endpoint)
        // setUserDetails(data)

        const messageEndPoint = `${GETMESSAGEBYUSERID}&userid=${USERID}`
        const resData = await apiGet(messageEndPoint)
        setMessageData(resData.messages)

        setIsLoading(true)
    }


    useEffect(() => {
        fetchData()
    }, [isFocused])


    const deleteMessage = async (id) => {

        const fromData = new FormData()
        fromData.append("messageid", id)

        try {
            await apiPostWithFromData(DELETEMSG, fromData);
            showSuccess("Question deleted")
        } catch (error) {
            showError("Internal Server Error")
        }

        fetchData()

    }




    const fetchQueries = () => {

        if (messageData) {
            return messageData.map(item => (
                <MessageCard key={item.id} sendView={true} deleteBtn={true} data={item}
                    onDelete={(id) => deleteMessage(id)}

                />
            ))
        } else {
            return <Text style={styles.msgLabel}>No Message Found</Text>
        }

    }

    const [isConnected, setIsConnected] = useState(true);


    return (

        <>
        
        <CheckConnection isConnected={isConnected} setIsConnected={setIsConnected} />

        <SafeAreaView style={isConnected?{flex: 1}:{display: 'none'}}>

            {
                isLoading ? (null) : (
                    <ActivityIndicator size="large" style={styles.ActivityIndicatorLoading} />
                )
            }


            <ScrollView style={styles.conatiner}>
                {fetchQueries()}
            </ScrollView>

            <TouchableOpacity style={styles.floatIcon} onPress={() => {
                navigation.navigate("Write Message")
            }}>
                <Entypo name="new-message" size={27} color="#fff" />
            </TouchableOpacity>


        </SafeAreaView>
        </>
    )

}

export default Messages

const styles = StyleSheet.create({

    ActivityIndicatorLoading: {
        width: "100%",
        height: "100%",
        elevation: 5
    },
    conatiner: {
        backgroundColor: "#E4DCCF",
        paddingHorizontal: 5,
        paddingTop: 10,
        paddingBottom: 30
    },

    floatIcon: {
        padding: 15,
        position: "absolute",
        bottom: 35,
        right: 20,
        backgroundColor: "#5D9C59",
        borderRadius: 30,
        elevation: 5
    },
    msgLabel: {
        marginTop: 40,
        textAlign: "center",
        fontSize: RFValue(18)
    },


})