import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Linking } from 'react-native'
import ReplyCard from '../components/ReplyCard';
import React, { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { apiGet, getItem } from '../Utils/Utils';
import { GETQUESTIONBYID } from '../config/urls';
import { Entypo } from '@expo/vector-icons';
import { ActivityIndicator } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import CheckConnection from '../Utils/CheckConnection';
import { showError } from '../Utils/HelpFunctions';
import { RFValue } from "react-native-responsive-fontsize";


const Replies = ({ navigation, route }) => {

    const queryId = route.params.queryId
    const questionType = route.params.type


    // const [imageResize, setImageResize] = useState("contain")
    const [isLoading, setIsLoading] = useState(false)
    const [appUserId, setAppUserId] = useState()

    const isFoused = useIsFocused()
    const [questionDetails, setQuestionDetails] = useState()

    useEffect(() => {
        const fetchQuestionById = async () => {
            try {

                const userData = await getItem("authDetails")
                setAppUserId(userData.userid)

                const res = await apiGet(`${GETQUESTIONBYID}&querry=${queryId}`)


                if (res.response) {
                    setQuestionDetails(res)
                    setIsLoading(true);
                }

            } catch (error) {
                showError("Internal Server Error")
            }
        }

        fetchQuestionById()

    }, [isFoused])



    const fetchReply = () => {

        if (questionDetails && questionDetails.replies.length > 0) {

            return questionDetails && questionDetails.replies && questionDetails.replies.map(item => (
                <ReplyCard key={item.id} data={item} />
            ))
        } else {
            return <Text style={styles.msgLable}>No Reply Found</Text>
        }
    }


    const [isConnected, setIsConnected] = useState(true);

    return (
        <>
          <CheckConnection isConnected={isConnected} setIsConnected={setIsConnected} />
            <View style={ isConnected?{}:{display: 'none'}}>
                <ScrollView style={styles.container}>

                    {
                        isLoading ? (null) : (
                            <ActivityIndicator size="large" style={styles.ActivityIndicatorLoading} />
                        )
                    }

                    {/* question  */}
                    {
                        questionDetails && questionDetails.question ? (

                            <View style={styles.cardBody}>
                                {/* <View
                                style={[
                                    styles.CommunitiySec,
                                    { backgroundColor: communityBg }
                                ]
                                }>
                                <Text style={styles.CommunitiyPara}>community</Text>
                            </View> */}

                                <View style={styles.cardHedaing}>
                                    <View style={styles.userDetails}>
                                        <Text style={styles.userName}>{questionDetails.question.user}</Text>
                                        <Text style={styles.userType}>{questionDetails.question.usertype}</Text>
                                    </View>
                                    <Text style={styles.tStamp}>{questionDetails.question.date}</Text>
                                </View>
                                <View style={styles.cardContent}>
                                    <Text style={styles.para}>{questionDetails.question.question} </Text>

                                    {
                                        questionDetails && questionDetails.question && questionDetails.question.attachment.type === 'pdf' ? (

                                            <TouchableOpacity style={styles.viewDocument} onPress={() => {
                                                Linking.openURL(questionDetails.question.attachment.attachment)
                                            }}>
                                                <AntDesign name="pdffile1" size={30} color="red" />
                                                <Text style={styles.attachmentLabel}>View Doucment</Text>
                                            </TouchableOpacity>

                                        ) : (null)
                                    }

                                </View>
                            </View>
                        ) : (
                            <Text>No Question Found</Text>
                        )
                    }




                    <View style={styles.replyList}>
                        {/* <ScrollView style={styles.repliesContainer}> */}
                        <View style={styles.repliesSec}>
                            <Text style={styles.repliyTitle}>All Replies</Text>
                        </View>

                        {fetchReply()}
                        {/* </ScrollView> */}
                    </View>

                </ScrollView>

                {
                    // appUserId questionDetails.question.userid

                    questionDetails && questionDetails.question.userid !== appUserId ? (

                        questionDetails && questionDetails.replies.length >= 5 ?
                            (null) : (
                                <TouchableOpacity style={styles.floatIcon} onPress={() => {
                                    navigation.navigate("Write Your Reply", {
                                        questionId: queryId,
                                        type: questionType
                                    })
                                }}>
                                    <Entypo name="new-message" size={27} color="#fff" />
                                </TouchableOpacity>
                            )


                    ) : (null)

                }




            </View>
        </>
    )
}



const styles = StyleSheet.create({

    viewDocument: {
        borderColor: "red",
        borderWidth: 1,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "flex-start",
        padding: 8,
        paddingHorizontal: 17,
        borderRadius: 10,
        backgroundColor: "#FAD2D0",
        marginTop: 5

    },
    attachmentLabel: {
        marginStart: 7,
        color: "#000"
    },

    ActivityIndicatorLoading: {
        width: "100%",
        height: "100%",
        elevation: 5,
    },
    container: {
        minHeight: "100%",
    },

    msgLable: {
        marginTop: 20,
        textAlign: "center",
        fontSize: RFValue(20)
    },

    inputContainer: {
        height: 49,
        marginTop: 7,

    },

    cardBody: {
        width: "100%",
        paddingBottom: 9,
        paddingHorizontal: 0,
        backgroundColor: "#fff",
        borderRadius: 7,
        marginTop: 11,
        marginBottom: 8
    },
    CommunitiySec: {
        color: "#fff",
        width: "100%",
        borderTopLeftRadius: 7,
        borderTopRightRadius: 7

    },
    CommunitiyPara: {
        color: "#fff",
        marginLeft: 7,
        fontSize: RFValue(18),
        textTransform: "capitalize",

    },
    cardHedaing: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 3,
        paddingHorizontal: 5
    },
    userDetails: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    userName: {
        fontSize: RFValue(17),
        fontWeight: 600,
        color: "#22333b"
    },
    userType: {
        color: "#fff",
        backgroundColor: "#9d4edd",
        borderRadius: 7,
        color: "#fff",
        paddingHorizontal: 7,
        paddingTop: 0,
        paddingBottom: 2,
        marginLeft: 5,
        fontSize: RFValue(10)
    },
    attachtFile: {
        width: "100%",
        height: 250,
        marginTop: 5
    },
    tStamp: {
        marginLeft: 5,
        fontSize: RFValue(11),
        color: "#656565"
    },
    cardContent: {
        paddingHorizontal: 7,
        paddingVertical: 4
    },
    para: {
        color: "#504A4B",
        lineHeight: 20,
        fontSize: RFValue(14)
    },
    // replyList: {
    //     height: 330
    // },

    repliesContainer: {
        paddingBottom: 23
    },
    repliesSec: {
        paddingHorizontal: 7,
        paddingVertical: 4,
        backgroundColor: "#285430"
    },
    repliyTitle: {
        fontSize: 18,
        fontWeight: 600,
        color: "white"
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


export default Replies
