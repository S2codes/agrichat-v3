import { SafeAreaView, ScrollView, StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { apiGet, apiPost, getItem, setItem } from '../Utils/Utils'
import { ADDGROUPS, GETGROUPS } from '../config/urls'
import GroupItem from '../components/GroupItem'
import ButtonWithLoader from '../components/ButtonWithLoader'
import { showError, showSuccess } from '../Utils/HelpFunctions'
import { useDispatch } from 'react-redux'
import { loggedIN, updateGroup } from '../Redux/action/action'
import { AppBar, HStack } from '@react-native-material/core'
import CheckConnection from '../Utils/CheckConnection'
import { RFValue } from "react-native-responsive-fontsize";


const ChatGroups = ({ navigation }) => {

    const dispatch = useDispatch()
    const [isConnected, setIsConnected] = useState(true);
    const [user, setUser] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const [selectGroups, setSelectGroups] = useState([])
    const [favoriteGroup, setFavoriteGroup] = useState([])
    const [groups, setGroups] = useState([])
    const [page, setPage] = useState(1)
    const [isFetching, setIsFetching] = useState(false)


    // fetch userid 
    const fetchUserId = async () => {
        const groupId = await getItem("authDetails")
        setUser(groupId.userid)
    }
    // update group on select group 
    const updateSelectedGroups = (elem) => {
        if (selectGroups.includes(elem)) {
            setSelectGroups(selectGroups.filter(item => item !== elem));
        } else {
            setSelectGroups([...selectGroups, elem]);
        }
    }
    // update favorite group 
    const updateFavoriteGroups = (elem) => {
        if (favoriteGroup.includes(elem)) {
            setFavoriteGroup(favoriteGroup.filter(item => item !== elem));
        } else {
            setFavoriteGroup([...favoriteGroup, elem]);
        }
    }
    // ftech group 
    const fecthGroups = async () => {
        try {
            setIsFetching(true)
            const result = await apiGet(`${GETGROUPS}&page=${page}`)
            if (result.response) {
                const dataArray = result.data
                setGroups([...groups, ...dataArray])
                setPage(page+1)
            }else{
                setIsFetching(false)    
            }
        } catch (error) {
            showError("Internal Server Error")
        } finally {
            setIsFetching(false)
        }

    }

    useEffect(() => {
        fecthGroups()
        fetchUserId()
        setIsLoading(true)
    }, [])


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


    const handelScroll = (event) => {
        const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
        const isEndReached = layoutMeasurement.height + contentOffset.y >= contentSize.height;
        if (isEndReached && !isFetching) {
            fecthGroups()
        }
    }


    // on submit 
    const onSubmit = async () => {

        setIsLoading(false)

        const groupData = JSON.stringify(selectGroups)
        const favoriteGroupData = JSON.stringify(favoriteGroup)

        const response = await apiPost(ADDGROUPS, { userid: user, groupsid: groupData, favoriteGroupsId: favoriteGroupData })

        await setItem("isGroupselected", true)
        dispatch(updateGroup(true))
        dispatch(loggedIN(true))

        setIsLoading(true)
        showSuccess("Groups are slected")
        navigation.navigate('Index')

    }



    return (
        <>
            <CheckConnection isConnected={isConnected} setIsConnected={setIsConnected} />

            <SafeAreaView style={isConnected ? {} : { display: 'none' }}>

                <AppBar title="Select and Pin Group"
                    color='#5D9C59'
                    tintColor='#fff'
                    style={{ paddingTop: 5 }}
                    trailing={props => (
                        <HStack>
                            <Text style={styles.selectCount}>Selected ({selectGroups.length})</Text>
                        </HStack>
                    )}

                />

                {
                    isLoading ? (null) : (
                        <ActivityIndicator size="large" style={styles.ActivityIndicatorLoading} />
                    )
                }

                <View style={styles.container}>


                    <ScrollView style={styles.groupList}  onScroll={handelScroll}
                scrollEventThrottle={16} >
                        {
                            groups && groups.map((category) => (
                                <View key={category.groupCategory}>
                                    <View style={[styles.categoryRibbon, { backgroundColor: getCommunityBg(category.groupCategory) }]}>
                                        <Text style={styles.ribbonText}>{category.groupCategory}</Text>
                                    </View>
                                    {
                                        category.groupData.map((item) => (
                                            <GroupItem key={item.group_id}
                                                groupid={item.group_id}
                                                groupname={item.groupName}
                                                onSelect={() => {
                                                    updateSelectedGroups(item.group_id)
                                                }}
                                                onFavorite={() => {
                                                    updateFavoriteGroups(item.group_id)
                                                }}
                                            />
                                        ))
                                    }
                                </View>
                            ))
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

                    <View style={styles.gap}></View>
                    </ScrollView>

                </View>

                <ButtonWithLoader text='NEXT' isDisabled={selectGroups.length < 1 ? true : false} onPress={() => {
                    onSubmit()
                }} />


            </SafeAreaView >
        </>

    )
}


const styles = StyleSheet.create({

    ActivityIndicatorLoading: {
        // width: "100%",
        // height: "100%",
        // elevation: 5
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
    groupContainer: {
        borderBottomWidth: 1,
        borderBottomColor: "#76DBD1",
        padding: 6,
        backgroundColor: "#ECF4F3",
    },
    groupCategory: {
        paddingHorizontal: 13,
        fontSize: RFValue(11),
        color: "#8e8e8e"
    },
    groupItem: {

        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 7,
        borderRadius: 6,
        paddingHorizontal: 13

    },

    groupName: {
        fontSize: RFValue(16)
    },


    container: {
        paddingVertical: 0,
        backgroundColor: "#fff",
        height: "80%"
    },
    btnContainer: {
        borderColor: "blue",
        borderWidth: 2,
        position: "absolute",
        bottom: 0,
        left: 0,
        width: "100%",
        padding: 0,
        backgroundColor: "transparent",
    },

    headerTitle: {
        marginTop: 20,
        fontSize: RFValue(23)
    },
    para: {
        color: "#656565",
        width: "95%",
        marginBottom: 3
    },
    selectCount: {
        color: "#fff",
        textAlign: "right",
        fontSize: RFValue(16),
        paddingRight: 20,
    },
    groupList: {
        paddingBottom: 15,
        paddingVertical: 10

    },

    btn: {
        backgroundColor: "#5D9C59",
        paddingVertical: 10,
        width: "100%",
        alignSelf: "center"
    },
    btnText: {
        color: "#fff",
        textAlign: "center",
        fontSize: RFValue(17)
    },
    gap: {
        height: 80
    },


})

export default ChatGroups
