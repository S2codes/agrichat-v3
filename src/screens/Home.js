import { View, StyleSheet, TouchableOpacity, Text, FlatList, Image, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import Appbar from '../components/Ui/Appbar'
import { FontAwesome } from '@expo/vector-icons';
import CheckConnection from '../Utils/CheckConnection';
import { apiGet, getItem } from '../Utils/Utils';
import { showError } from '../Utils/HelpFunctions';
import { FETCHSLIDERIMG, FETCHUSERDETAILS } from '../config/urls';
import * as openAnything from "react-native-openanything"
import { RFValue } from "react-native-responsive-fontsize";

const banner = [

  {
    "id": "1",
    "img": require("../../assets/banner/b1.png")
  },
  {
    "id": "2",
    "img": require("../../assets/banner/b2.png")
  },
  {
    "id": "3",
    "img": require("../../assets/banner/b3.png")
  },
  {
    "id": "4",
    "img": require("../../assets/banner/b4.png")
  },

]


const Home = ({ navigation }) => {

  const { height, width } = Dimensions.get("window")

  const [isConnected, setIsConnected] = useState(true);

  const [banner1, setBanner1] = useState([])
  const [banner2, setBanner2] = useState([])


  useEffect(() => {
    const fetchData = async () => {
      try {

        const userData = await getItem("authDetails")
        const USERID = userData.userid

        const endpoint = `${FETCHUSERDETAILS}&userid=${USERID}`;
        const data = await apiGet(endpoint)

        const userStateId = data.data.stateid
        // console.log(userStateId);

        const slider1EndPoint = `${FETCHSLIDERIMG}&bannerid=1&state=${userStateId}`
        const slider1 = await apiGet(slider1EndPoint)
        
        setBanner1(slider1.data)
        const slider2EndPoint = `${FETCHSLIDERIMG}&bannerid=2&state=${userStateId}`
        const slider2 = await apiGet(slider2EndPoint)
        setBanner2(slider2.data)
        console.log(slider2.data);

        // setAppUserId(USERID)
        // await getQuestion(USERID)
        // setIsLoading(true)

      } catch (error) {
        showError("Internal Server Error")
      }
    }

    fetchData()
  }, [])




  return (
    <>
      <CheckConnection isConnected={isConnected} setIsConnected={setIsConnected} />

      <View style={[styles.mainContainer, isConnected ? {} : { display: 'none' }]}>
        <Appbar />

        <View style={{ display: "flex", justifyContent: "center" }}>

          {
            banner1 && (
              < View style={{ height: height / 3, marginBottom: 30 }}>
                <FlatList horizontal
                  data={banner1}
                  pagingEnabled
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={(key) => {
                    return key.id
                  }}
                  renderItem={(elem) => {
                    return <TouchableOpacity onPress={() => {
                      openAnything.Web(elem.item.link)
                    }}>
                      <Image resizeMode='cover' source={{ uri: elem.item.img }} style={{ width: width, height: "100%" }} />
                    </TouchableOpacity>
                  }}
                  style={styles.bannerList}
                >
                </FlatList>

              </View>

            )
          }

          {
            banner2 && (

              < View style={{ height: height / 3 }}>
                
                <FlatList horizontal
                  data={banner2}
                  pagingEnabled
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={(key) => {
                    return key.id
                  }}
                  renderItem={(elem) => {
                    return <TouchableOpacity onPress={() => {
                      openAnything.Web(elem.item.link)
                    }}>
                      <Image resizeMode='contain' source={{ uri: elem.item.img }} style={{ width: width, height: "100%" }} />
                    </TouchableOpacity>
                  }}

                  style={styles.bannerList}

                >
                </FlatList>

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
    // height: "100%"
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