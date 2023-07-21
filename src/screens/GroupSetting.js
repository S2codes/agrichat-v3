import { StyleSheet, Text, View, ActivityIndicator, Dimensions, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import { apiGet, apiPost, getItem } from '../Utils/Utils'
import { JOINEDGROUPS, SAVEDGROUPS, UPDATEGROUPS } from '../config/urls'
import { useState } from 'react'
import ButtonWithLoader from '../components/ButtonWithLoader'

import GroupItem from '../components/GroupItem'
import { showError, showSuccess } from '../Utils/HelpFunctions'
import CheckConnection from '../Utils/CheckConnection'
import { RFValue } from "react-native-responsive-fontsize";
const GroupSetting = ({navigation}) => {

    const windowHeight = Dimensions.get('window').height;

    const [isLoading, setIsLoading] = useState(true)
    const [selectedGroup, setSelectedGroup] = useState([])
    const [pinnedGroup, setPinnedGroup] = useState([])
    const [responseData, setResponseData] = useState([])
    const [userId, setUserId] = useState()
    const [page, setPage] = useState(1)
    const [isFetching, setIsFetching] = useState(false)

    const fetchData = async () => {
        try {
            const response = await apiGet(`${SAVEDGROUPS}&userid=${userId}&page=${page}`)
            if (response.response) {
                setResponseData([...responseData, ...response.data])
                setPage(page + 1);
                setIsLoading(false)
            } else {
                setIsFetching(false)
            }
        } catch (error) {
            showError("Internal Server Error")
        } finally {
            setIsFetching(false)
        }
    }


    useEffect(() => {
        const fetchPreData = async () => {
            try {
                setIsFetching(true)
                const userData = await getItem("authDetails")
                const USERID = userData.userid
                setUserId(USERID)
                const endpoint = `${JOINEDGROUPS}&user_id=${USERID}`;
                const JoinedGroups = await apiGet(endpoint)
                if (JoinedGroups.response) {
                    setSelectedGroup(JoinedGroups.selectedGroupsId)
                    setPinnedGroup(JoinedGroups.pinnedGroupsId)
                }
            } catch (error) {

            }
        }
        fetchPreData()
        fetchData()

    }, [])

    const onSelect = (id) => {
        if (selectedGroup.includes(id)) {
            setSelectedGroup(selectedGroup.filter(item => item !== id));
        } else {
            setSelectedGroup([...selectedGroup, id])
        }
    }


    const onPinned = (id) => {

        if (pinnedGroup.includes(id)) {
            setPinnedGroup(pinnedGroup.filter(item => item !== id));
        } else {
            setPinnedGroup([...pinnedGroup, id]);
        }
    }

    const getCommunityBg = (groupcatg) => {
        switch (groupcatg) {
            case "Agriculture":
                return "#00ff01"
                break;
            case "Fisheries":
                return "#6d9eeb"
                break;
            case "Horticulture":
                return "#93c37e"
                break;
            case "Implement/ Machines":
                return "#f1f2f6"
                break;
            case "Irrigation":
                return "#3c78d8"
                break;
            case "Veterinary":
                return "#00ffff"
                break;
            case "Soil Conservation":
                return "#e06665"
                break;
            case "Fertilizer":
                return "#efefef"
                break;
            case "Pesticides":
                return "#efefef"
                break;
            case "Plantation Crop":
                return "#f9ca9c"
                break;
            case "Decorative":
                return "#fbe5cd"
                break;
            case "New Technology":
                return "#f1c330"
                break;
            default:
                return "#fff"
                break;
        }

    }

    const onUpdate = async () => {
        console.log("on update");
        try {
            const userSelectedGroup = JSON.stringify(selectedGroup)
            const userPinnedGroup = JSON.stringify(pinnedGroup)

                const result = await apiPost(UPDATEGROUPS, { userid: userId, groupsid: userSelectedGroup, favoriteGroupsId: userPinnedGroup })
                console.log(result);
                if (result.response) {
                    console.log("here");
                    showSuccess("Your Groups are Updated");
                    navigation.goBack()
                } else {
                    showError("Something went wrong")
            }

        } catch (error) {
            console.log(error);
            showError("Internal Server Error")
        }

    }


    const [isConnected, setIsConnected] = useState(true);

    const handelScroll = (event) => {
        const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
        const isEndReached = layoutMeasurement.height + contentOffset.y + 50 >= contentSize.height;
        if (isEndReached && !isFetching) {
            fetchData();
        }
    }




    return (
        <View style={{ height: windowHeight }}>

            {
                isLoading ? (
                    <View style={[styles.ActivityIndicatorHolder, { height: windowHeight }]}>
                        <ActivityIndicator size="large" />
                    </View>
                ) : null
            }


            <CheckConnection isConnected={isConnected} setIsConnected={setIsConnected} />
            <View style={{ height: windowHeight - 140 }}>

                <ScrollView style={[styles.container, isConnected ? {} : { display: 'none' }]}
                    onScroll={handelScroll}
                    scrollEventThrottle={16}
                >

                    {
                        responseData && responseData.map((item) =>
                            <View key={item.groupCategory}>
                                <View style={[styles.categoryRibbon, { backgroundColor: getCommunityBg(item.groupCategory) }]}>
                                    <Text style={styles.ribbonText}>{item.groupCategory}</Text>
                                </View>

                                {
                                    item.groupData.map((group) =>

                                        <GroupItem
                                            key={group.groupId}
                                            groupid={group.groupId}
                                            groupname={group.groupName}
                                            isSelected={group.selected}
                                            isPinned={group.pinned}
                                            onSelect={() => onSelect(group.groupId)}
                                            onFavorite={() => onPinned(group.groupId)}
                                        />
                                    )

                                }


                            </View>

                        )

                    }

                    {
                        isFetching && (
                            <View>
                                <View style={{ paddingVertical: 20 }}>
                                    <ActivityIndicator size="large" />
                                </View>
                            </View>
                        )
                    }

                    {/* 
                <View style={styles.gap}></View> */}

                </ScrollView>


            </View>

            <View style={styles.BtnContainer}>
                <ButtonWithLoader text={"Update Group"} onPress={onUpdate} />
            </View>

        </View>
    )
}




const styles = StyleSheet.create({

    ActivityIndicatorHolder: {
        width: "100%",
        backgroundColor: "#fff",
        position: "absolute",
        zIndex: 10,
        display: 'flex',
        alignItems: "center",
        justifyContent: "center",
    },

    container: {
        backgroundColor: "#fff",
    },
    BtnContainer: {
        width: "98%",
        padding: 0,
        alignSelf: "center"
    },
    categoryRibbon: {
        paddingVertical: 4,
        paddingHorizontal: 8,
        marginTop: 8
    },
    ribbonText: {
        fontSize: RFValue(16),
        color: "#000"
    },
    gap: {
        height: 80
    },


})



export default GroupSetting
