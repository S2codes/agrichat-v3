import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import CommunityCard from '../components/CommunityCard'
import { AntDesign } from '@expo/vector-icons';

import { apiGet, getItem, } from '../Utils/Utils'
import { JOINEDGROUPS, FETCHUSERDETAILS } from '../config/urls';
import { useIsFocused } from '@react-navigation/native';
import CheckConnection from '../Utils/CheckConnection';
import { RFValue } from "react-native-responsive-fontsize";
const Communities = ({ navigation }) => {

  const [groupData, setGroupData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [defaultGroup, setDefaultGroup] = useState()
  const isFocused = useIsFocused()

  useEffect(() => {

    const fetchData = async () => {
      const userData = await getItem("authDetails")
      const USERID = userData.userid

      const endpoint = `${JOINEDGROUPS}&user_id=${USERID}`;
      const Groups = await apiGet(endpoint)
      setGroupData(Groups)

      const defaultEndpoints = `${FETCHUSERDETAILS}&userid=${USERID}`
      const defaultGroups = await apiGet(defaultEndpoints)
      setDefaultGroup(defaultGroups.data)
      setIsLoading(true)
      
    }

    fetchData()

  }, [isFocused])
  const [isConnected, setIsConnected] = useState(true);

  return (
    <>
      <CheckConnection isConnected={isConnected} setIsConnected={setIsConnected} />

      <ScrollView style={ isConnected?{}: {display: 'none'} }>

        {
          isLoading ? (null) : (
            <ActivityIndicator size="large" style={styles.ActivityIndicatorLoading} />
          )
        }

        <View style={styles.defaultGroupContainer}>
          <View style={styles.defaultLabel}>
            <TouchableOpacity onPress={() => {
              navigation.navigate("Group Setting")
            }}>
              <AntDesign name="minuscircleo" size={24} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.labelText}>Favourite Groups </Text>
            <TouchableOpacity onPress={() => {
              navigation.navigate("Group Setting")
            }}>
              <AntDesign name="pluscircleo" size={24} color="#fff" />
            </TouchableOpacity>
          </View>

          <View style={styles.container}>

            {
              groupData && groupData.pinnedGroups && groupData.pinnedGroups.map((group) => (
                <CommunityCard key={group.id} data={group} />
              ))
            }

          </View>
        </View>


        {/* Default  group  */}

        <View style={styles.favouriteGroupContainer}>
          <View style={styles.favouriteLabel}>
            <Text style={styles.labelText}>Default Groups</Text>
          </View>

          <View style={styles.container}>
            {/* {fetchData()} */}


            <TouchableOpacity style={styles.groupItem} onPress={() => {

              navigation.navigate("Community", {
                Communityname: defaultGroup.type,
                Communitycategory: "My Group",
                GroupId: 1,
                type: defaultGroup.type
              })

            }}>
              <Text style={styles.groupCategory}>My Group</Text>
              <Text style={styles.groupName} >{defaultGroup && defaultGroup.type}</Text>
            </TouchableOpacity>


            <TouchableOpacity style={styles.groupItem} onPress={() => {
              navigation.navigate("Community", {
                Communityname: defaultGroup.state,
                Communitycategory: "My State",
                GroupId: defaultGroup.stateid,
                type: "state"
              })
            }}>
              <Text style={styles.groupCategory}>My State</Text>
              <Text style={styles.groupName} >{defaultGroup && defaultGroup.state}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.groupItem} onPress={() => {
              navigation.navigate("Community", {
                Communityname: defaultGroup.district,
                Communitycategory: "My Disrict",
                GroupId: defaultGroup.districtid,
                type: "district"
              })
            }}>
              <Text style={styles.groupCategory}>My District</Text>
              <Text style={styles.groupName} >{defaultGroup && defaultGroup.district}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.groupItem} onPress={() => {
              navigation.navigate("Community", {
                Communityname: defaultGroup.block,
                Communitycategory: "My Block",
                GroupId: defaultGroup.blockid,
                type: "block"
              })
            }}>
              <Text style={styles.groupCategory}>My Block</Text>
              <Text style={styles.groupName} >{defaultGroup && defaultGroup.block}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.groupItem} onPress={() => {
              navigation.navigate("Community", {
                Communityname: "Agrichat Help",
                GroupId: 0,
                type: "support"
              })
            }}>
              <Text style={styles.groupCategory}>Support</Text>
              <Text style={styles.groupName} >Agrichat Help</Text>
            </TouchableOpacity>


          </View>

        </View>




        <View style={styles.otherGroupContainer}>
          <View style={styles.otherLabel}>
            <TouchableOpacity onPress={() => {
              navigation.navigate("Group Setting")
            }}>
              <AntDesign name="minuscircleo" size={24} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.labelText}>Other Groups</Text>
            <TouchableOpacity onPress={() => {
              navigation.navigate("Group Setting")
            }}>
              <AntDesign name="pluscircleo" size={24} color="#fff" />
            </TouchableOpacity>
          </View>

          <View style={styles.container}>

            {groupData && groupData.selectedGroups && groupData.selectedGroups.map((group) => (
              <CommunityCard key={group.id} data={group} />
            ))}

          </View>
        </View>
      </ScrollView>
    </>
  )
}

export default Communities

const styles = StyleSheet.create({
  ActivityIndicatorLoading: {
    width: "100%",
    height: "100%",
    elevation: 5
  },
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
    width: "100%",
    paddingTop: 10
  },

  favouriteGroupContainer: {
    backgroundColor: "#f9626270",
    paddingBottom: 13,
    minHeight: 200
  },

  favouriteLabel: {
    borderWidth: 0.8,
    borderColor: "red",
    backgroundColor: "#f9626270",
    paddingVertical: 8,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  },

  defaultGroupContainer: {
    marginTop: 5,
    backgroundColor: "#cfe2ff",
    paddingBottom: 13,
    minHeight: 200
  },

  defaultLabel: {
    borderWidth: 0.8,
    borderColor: "#2978f3",
    backgroundColor: "#98bef6",
    paddingVertical: 8,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  },

  otherGroupContainer: {
    backgroundColor: "#5d9c5957",
    paddingBottom: 13,
    marginBottom: 10,
    minHeight: 200
  },

  otherLabel: {
    borderWidth: 0.8,
    borderColor: "#5D9C59",
    backgroundColor: "#5d9c5957",
    paddingVertical: 8,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  },

  labelText: {
    textAlign: "center",
    textTransform: "capitalize",
    fontSize: RFValue(17),
    color: "#000"
  },


  groupCategory: {
    textAlign: "center",
    fontSize: RFValue(12),
    color: "#8e8e8e"
  },


  groupItem: {
    backgroundColor: "#ECF4F3",
    width: "30%",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: 12,
    borderRadius: 6,
    padding: 6,

  },

  groupName: {
    fontSize:RFValue(14),
    textTransform: "capitalize",
    textAlign: "center",
  },



})