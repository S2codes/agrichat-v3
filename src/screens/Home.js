import { View, StyleSheet, TouchableOpacity, Text, } from 'react-native'
import React, { useEffect, useState } from 'react'
import Appbar from '../components/Ui/Appbar'
import { FontAwesome } from '@expo/vector-icons';
import CheckConnection from '../Utils/CheckConnection';
import { apiGet, getItem } from '../Utils/Utils';
import { showError } from '../Utils/HelpFunctions';
import { FETCHSLIDERIMG, FETCHUSERDETAILS } from '../config/urls';
import { RFValue } from "react-native-responsive-fontsize";
import ImgSlider from '../components/Ui/ImgSlider';
import { useIsFocused } from '@react-navigation/native';


const Home = ({ navigation }) => {

  const [isConnected, setIsConnected] = useState(true);

  const [banner1, setBanner1] = useState([])
  const [banner2, setBanner2] = useState([])
  const isFocused = useIsFocused()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getItem("authDetails")
        const USERID = userData.userid

        const endpoint = `${FETCHUSERDETAILS}&userid=${USERID}`;
        const data = await apiGet(endpoint)
        const userStateId = data.data.stateid

        const slider1EndPoint = `${FETCHSLIDERIMG}&bannerid=1&state=${userStateId}`
        const slider1 = await apiGet(slider1EndPoint)
        
        if (slider1.data.length > 0) {
          setBanner1(slider1)
        }

        const slider2EndPoint = `${FETCHSLIDERIMG}&bannerid=2&state=${userStateId}`
        const slider2 = await apiGet(slider2EndPoint)
          
          if (slider2.data.length > 0) {
            setBanner2(slider2)
          }
        // setAppUserId(USERID)
        // setIsLoading(true)

      } catch (error) {
        showError("Internal Server Error")
      }
    }

    fetchData()
  }, [isFocused])




  return (
    <>
      <CheckConnection isConnected={isConnected} setIsConnected={setIsConnected} />

      <View style={[styles.mainContainer, isConnected ? {} : { display: 'none' }]}>
        <Appbar />

        <View style={{ display: "flex", justifyContent: "center" }}>

          {
            banner1 && banner1.data && (
              <View style={styles.banner}>
                <ImgSlider data={banner1.data} />
              </View>
            )
          }

          {
            banner2 && banner2.data && (
              <View style={styles.banner}>
                <ImgSlider data={banner2.data} />
              </View>
            )
          }
        </View>


        <View style={styles.btnGroup}>

          <TouchableOpacity style={styles.btnItem} onPress={() => {
            navigation.navigate("Chats")
          }}>
            <FontAwesome name="users" size={30} color="#fff" />
            <Text style={styles.btnText}>Chats</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnItem} onPress={() => {
            navigation.navigate("MeesageTab")
          }}>
            <FontAwesome name="telegram" size={30} color="#fff" />
            <Text style={styles.btnText}>Messaging</Text>
          </TouchableOpacity>

        </View>


      </View >




    </>

  )
}

const styles = StyleSheet.create({
  bannerList: {
    width: "100%",
    marginVertical: 3,
  },

  banner: {
    height: 200,
    marginBottom: 30,
  },

  mainContainer: {
    height: "100%",
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
    borderColor: "#fff",
    borderWidth: 1,
    borderBottomWidth: 0,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

  },
  btnItem2: {
    backgroundColor: "grey",
    width: "50%",
    padding: 12,
  },
  btnText: {
    textAlign: "center",
    color: "#fff",
    fontSize: RFValue(17),
    marginLeft: 10
  }



})

export default Home