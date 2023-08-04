import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import QueryCard from '.././components/QueryCard'
import { Entypo } from '@expo/vector-icons';
import { apiGet, apiPostWithFromData, getItem } from '../Utils/Utils';
import { DELETEQUESTION, FETCHUSERDETAILS, GETQUESTION } from '../config/urls';
import { useIsFocused } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native';
import { showError, showSuccess } from '../Utils/HelpFunctions';
import CheckConnection from '../Utils/CheckConnection';
import { RFValue } from "react-native-responsive-fontsize";

const Community = ({ navigation, route }) => {

  const GROUPID = route.params.GroupId
  const GROUPTYPE = route.params.type

  const isFoused = useIsFocused()

  const [allQuestion, setAllQuestion] = useState()
  const [isLoading, setIsLoading] = useState(false)

  const [user, setUser] = useState()

  // fetch question 
  const getQuestion = async (stateid) => {
    const res = await apiGet(`${GETQUESTION}&groupid=${GROUPID}&grouptype=${GROUPTYPE}&stateid=${stateid}`)
    if (res.response) {
      setAllQuestion(res.data);
      setIsLoading(true);
    } else {
      setIsLoading(true)
    }
  }

  // fetch user details 
  const getUserDetails = async () => {
    const userData = await getItem("authDetails")
    const USERID = userData.userid

    const endpoint = `${FETCHUSERDETAILS}&userid=${USERID}`;
    const data = await apiGet(endpoint)

    setUser(data.data)
    const userStateid = data.data.stateid

    await getQuestion(userStateid)

  }


  useEffect(() => {
    const fetchData = async () => {
      await getUserDetails()
    }
    fetchData()
  }, [isFoused])


  const deleteQusetion = async (id) => {
    const appUserStateid = user.stateid;
    const fromData = new FormData()
    fromData.append("questionid", id)
    try {
      await apiPostWithFromData(DELETEQUESTION, fromData);
      showSuccess("Question deleted")
      getQuestion(appUserStateid)
    } catch (error) {
      showError("Intenal Server Error")
      
    }

  }


  const fetchQueries = () => {
    
    if (allQuestion) {
      return allQuestion.map(item => (
        <QueryCard key={item.id} community={false}  data={item} onDelete={(id) => deleteQusetion(id)} />
      ))
    } else {
      return <Text style={styles.msgLabel}>No Question Found</Text>
    }
  }

  const [isConnected, setIsConnected] = useState(true);

  return (
    <View>
      
      <CheckConnection isConnected={isConnected} setIsConnected={setIsConnected} />
      <ScrollView style={[styles.quariesContainer, isConnected?{}: {display: 'none'} ]}>

        {
          isLoading ? (null) : (
            <ActivityIndicator size="large" style={styles.ActivityIndicatorLoading} />
          )
        }

        {fetchQueries()}

      </ScrollView>
      {/* <InputSection/> */}

      <TouchableOpacity style={styles.floatIcon} onPress={() => {
        navigation.navigate("Write Question", {
          groupId: GROUPID,
          type: GROUPTYPE
        })
      }}>
        <Entypo name="new-message" size={27} color="#fff" />
      </TouchableOpacity>

    </View>
  )
}

const styles = StyleSheet.create({
  ActivityIndicatorLoading: {
    width: "100%",
    height: "100%",
    elevation: 5
  },

  quariesContainer: {
    paddingBottom: 40,
    minHeight: "100%"
  },

  msgLabel: {
    marginTop: 40,
    textAlign: "center",
    fontSize: RFValue(18)
  },

  floatIcon: {
    padding: 15,
    position: "absolute",
    bottom: 35,
    right: 20,
    backgroundColor: "#5D9C59",
    borderRadius: 30,
    elevation: 5
  }


})

export default Community
