import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import * as openAnything from "react-native-openanything"
import { useNavigation } from '@react-navigation/native';
import { RFValue } from "react-native-responsive-fontsize";

const ReplyCard = (prpos) => {
    
    const navigation = useNavigation()
    const replyData = prpos.data


    return (
        <View style={styles.replyCard}>
            <View style={styles.cardHedaing}>
                <View style={styles.userDetails}>
                    <Text style={styles.userName}>{replyData.user}</Text>
                    <Text style={styles.userType}>{replyData.usertype}</Text>
                </View>
                <Text style={styles.tStamp}>{replyData.date}</Text>
            </View>
            <View style={styles.replyContainer}>
                <Text style={styles.para}>
                    {replyData.reply}
                </Text>

                {
                    replyData && replyData.attachment.type !== "none" && replyData.attachment.type === "jpg" ? (
                        <TouchableOpacity onPress={() => {
                            navigation.navigate("View Image", {
                                imageURL: replyData.attachment.attachment
                            })
                        }}>

                            <Image resizeMode={"contain"} style={styles.attacthImage} source={{ uri: replyData.attachment.attachment }} />
                        </TouchableOpacity>

                    ) : (null)
                }

                {
                    replyData && replyData.attachment.type !== "none" && replyData.attachment.type === "pdf" ? (
                        <TouchableOpacity style={styles.viewDocument} onPress={() => {
                            openAnything.Pdf(replyData.attachment.attachment)
                        }}>
                            <AntDesign name="pdffile1" size={30} color="red" />
                            <Text style={styles.attachmentLabel}>View Doucment</Text>
                        </TouchableOpacity>
                    ) : (null)
                } 

            </View>
        </View>
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


    replyCard: {
        padding: 9,
        marginBottom: 10,
        backgroundColor: "#fff",
        borderBottomColor: "#5D9C59",
        borderBottomWidth: 1
    },
    cardHedaing: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 7
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
    tStamp: {
        marginLeft: 5,
        fontSize: RFValue(11),
        color: "#656565"
    },
    replyContainer: {
        borderLeftColor: "#AA77FF",
        borderLeftWidth: 2.4,
        paddingLeft: 7,
        marginTop: 4
    },
    para: {
        color: "#504A4B",
        lineHeight: 17,
        fontSize: RFValue(14)
    },
    attacthImage: {
        width: 250,
        height: 250,
        marginTop: 7,
        alignSelf: "center",
    },


})

export default ReplyCard
