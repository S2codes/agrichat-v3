import { StyleSheet, Text, View, ScrollView, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import { useIsFocused } from '@react-navigation/native'
import { useEffect } from 'react'
import { FETCHUSERDETAILS, INBOXMESSAGES } from '../config/urls'
import { apiGet, getItem } from '../Utils/Utils'
import MessageCard from '../components/MessageCard'
import { ActivityIndicator } from 'react-native'
import CheckConnection from '../Utils/CheckConnection'
import { RFValue } from "react-native-responsive-fontsize";

const Inbox = () => {

  const [messageData, setMessageData] = useState()
  const [isLoading, setIsLoading] = useState(false)

  const isFocused = useIsFocused()


  useEffect(() => {
    const fetchData = async () => {

      const userData = await getItem("authDetails")
      const USERID = userData.userid

      const endpoint = `${FETCHUSERDETAILS}&userid=${USERID}`;
      const data = await apiGet(endpoint)
      // setUserDetails(data.data)

      const userType = data.data.type
      const userState = data.data.stateid
      const userId = data.data.id


      const messageEndPoint = `${INBOXMESSAGES}&type=${userType}&stateid=${userState}&userid=${userId}`
      const resData = await apiGet(messageEndPoint)

      setMessageData(resData.messages)

      setIsLoading(true)

    }

    fetchData()

  }, [isFocused])


  const fetchQueries = () => {
    if (messageData) {
      return messageData.map(item => (
        <MessageCard key={item.id} data={item} />
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
      </SafeAreaView>
    </>

  )
}

export default Inbox

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

  msgLabel: {
    marginTop: 40,
    textAlign: "center",
    fontSize: RFValue(18)
  },


})