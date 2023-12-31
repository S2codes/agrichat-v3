import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
// import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useState } from 'react';
import { useEffect } from 'react';
import { apiGet, getItem, removeItem } from '../Utils/Utils';
import { FETCHUSERDETAILS } from '../config/urls';
import { useDispatch } from 'react-redux';
import { loggedIN } from '../Redux/action/action';
import { showError } from '../Utils/HelpFunctions';
import CheckConnection from '../Utils/CheckConnection';

import { RFValue } from "react-native-responsive-fontsize";
import UserDetails from '../components/UserDetails';
const Profile = ({ navigation }) => {

  const [userDetails, setUserDetails] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getItem("authDetails")
        const USERID = userData.userid
        const endpoint = `${FETCHUSERDETAILS}&userid=${USERID}`;
        const data = await apiGet(endpoint)
        setUserDetails(data.data)
        setIsLoading(true)

      } catch (error) {
        showError("Something Went Wrong")

      }
    }
    fetchData()

  }, [])


  const logout = async () => {
    try {
      await removeItem("authDetails")
      dispatch(loggedIN(false))
    } catch (error) {
      showError("Internal Server Error")
    }
  }

  const [isConnected, setIsConnected] = useState(true);

  return (
    <>
      <CheckConnection isConnected={isConnected} setIsConnected={setIsConnected} />
      <View style={[styles.Maincontainer, isConnected ? {} : { display: 'none' }]}>

        {
          isLoading ? (null) : (
            <ActivityIndicator size="large" style={styles.ActivityIndicatorLoading} />
          )
        }

        <View style={styles.container}>
          <View style={styles.profileContainer}>
            <Image source={require("../../assets/profile.jpg")}
              resizeMode='contain' style={styles.profileImg} />
          </View>

          <View style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center"
          }}>
            <Text style={styles.userName}>{userDetails && userDetails.name ? userDetails.name : ""}</Text>
            <Text style={styles.userType}>{userDetails && userDetails.type ? userDetails.type : ""}</Text>
          </View>

        </View>

        <UserDetails data={userDetails} />

        <View style={styles.itemList}>

          {/* <TouchableOpacity style={styles.item} onPress={() => {
            navigation.navigate("My Details", {
              userDetails: userDetails
            })
          }}>
            <FontAwesome name="user" style={styles.itemIcon} size={24} color="#fff" />
            <Text style={styles.Label}>My Details</Text>
          </TouchableOpacity> */}


          <TouchableOpacity style={styles.item} onPress={() => {
            logout()
          }}>
            <AntDesign name="logout" size={24} color="#fff" />
            <Text style={styles.Label}>LogOut</Text>
          </TouchableOpacity>

          {/* <TouchableOpacity style={styles.item} onPress={() => {
            alert("Working in Progress")
          }}>
            <AntDesign name="questioncircle" size={24} color="#fff" />
            <Text style={styles.Label}>Help & Support</Text>
          </TouchableOpacity> */}


        </View>

      </View>
    </>
  )
}

export default Profile

const styles = StyleSheet.create({

  ActivityIndicatorLoading: {
    width: "100%",
    height: "100%",
    elevation: 5
  },
  container: {
    padding: 5,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingBottom: 12
  },
  Maincontainer: {
    height: "100%",
  },

  profileContainer: {
    borderRadius: 70,
    alignSelf: "center",
    marginTop: 15,
    padding: 3,
    backgroundColor: "#5D9C59",
    width: "25%"

  },
  profileImg: {
    width: "100%",
    height: undefined,
    aspectRatio: 1,
    borderRadius: 70
  },
  userName: {
    textAlign: "center",
    marginTop: 10,
    fontSize: RFValue(18)
  },
  userType: {
    textAlign: "center",
    marginTop: 1,
    fontSize: RFValue(14),
    color: "#fff",
    backgroundColor: "#9d4edd",
    alignSelf: "center",
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 15,
    textTransform: "capitalize",

  },

  itemList: {
    width: "100%"
  },
  item: {
    padding: 12,
    paddingHorizontal: 20,
    backgroundColor: "#5D9C59",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    alignSelf:"center"
  },

  Label: {
    fontSize: RFValue(18),
    marginStart: 15,
    color: "#fff"
  }


})