import { View, StyleSheet, ScrollView, SafeAreaView, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import QueryCard from '../components/QueryCard'
import { apiGet, apiPostWithFromData, getItem } from '../Utils/Utils';
import { DELETEQUESTION, GETQUESTIONBYUSERID } from '../config/urls';
import { showError, showSuccess } from '../Utils/HelpFunctions';
import { useIsFocused } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native';
import CheckConnection from '../Utils/CheckConnection';
import { RFValue } from "react-native-responsive-fontsize";

const Feed = ({ navigation }) => {


  const [allQuestion, setAllQuestion] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [appUserId, setAppUserId] = useState()

  const getQuestion = async (usereid) => {

    try {
      const res = await apiGet(`${GETQUESTIONBYUSERID}&userid=${usereid}`)
      setAllQuestion(res.data);
    } catch (error) {
      showError("Internal Server Error")
      
    }
  }

  const isFocused = useIsFocused()


  useEffect(() => {
    const fetchData = async () => {
      try {

        const userData = await getItem("authDetails")
        const USERID = userData.userid
        setAppUserId(USERID)
        await getQuestion(USERID)
        setIsLoading(true)
      } catch (error) {
        showError("Internal Server Error")
      }
    }
    fetchData()

  }, [isFocused])


  const deleteQusetion = async (id) => {

    const fromData = new FormData()
    fromData.append("questionid", id)

    try {
      await apiPostWithFromData(DELETEQUESTION, fromData);
      showSuccess("Question deleted")
    } catch (error) {
      showError("Internal Server Error")
    }
    getQuestion(appUserId)
  }


  const fetchQueries = () => {
    if (allQuestion) {
      console.log(allQuestion);
      return allQuestion.map(item => (
        <QueryCard key={item.id} community={true} communityName={item.groupname} showUserName={false} data={item}
          onDelete={(id) => deleteQusetion(id)} />
      ))
    } else {
      return <Text style={styles.msgLabel}>No Question Found</Text>
    }
  }

  const [isConnected, setIsConnected] = useState(true);


  return (
<>
    <CheckConnection isConnected={isConnected} setIsConnected={setIsConnected} />
    
    <SafeAreaView style={ isConnected?{flex: 1}: {display: 'none'}}>
      {
        isLoading ? (null) : (
          <ActivityIndicator size="large" style={styles.ActivityIndicatorLoading} />
        )
      }


      <ScrollView style={styles.conatiner}>

        <View >
          {fetchQueries()}
        </View>

      </ScrollView>

    </SafeAreaView>
    </>
  )

}

const styles = StyleSheet.create({

  ActivityIndicatorLoading: {
    width: "100%",
    height: "100%",
    elevation: 5
  },
  msgLabel: {
    textAlign: "center",
    marginTop: 30
  },
  conatiner: {
    backgroundColor: "#E4DCCF"
  },

  btnGroup: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    // zIndex: 2
  },
  btnItem: {
    backgroundColor: "#5D9C59",
    width: "50%",
    padding: 12,
    // borderColor: "#fff",
    // borderWidth: 1,
  },
  btnItem2: {
    backgroundColor: "grey",
    width: "50%",
    padding: 12,
  },
  btnText: {
    textAlign: "center",
    color: "#fff",
    fontSize: RFValue(17)
  }

})

export default Feed