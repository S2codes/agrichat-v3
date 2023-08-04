import { Image, StyleSheet, Text, View, TouchableOpacity, Alert, Linking } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { RFValue } from "react-native-responsive-fontsize";
const MessageCard = ({ sendView = false, userView = true, deleteBtn = false, data, onDelete }) => {

    
    const navigation = useNavigation()

    return (
        <View style={styles.cardContainer}>
            {sendView ? (
                <View style={styles.sendContainer}>
                    <Text style={styles.label}>Send To : </Text>
                    <View style={styles.cardTop}>
                        {
                            data && data.sendto && data.sendto.farmer === '1' ? (
                                <Text style={styles.sendItem}>Farmer</Text>
                            ) : (null)
                        }
                        {
                            data && data.sendto && data.sendto.student === '1' ? (
                                <Text style={styles.sendItem}>Student</Text>
                            ) : (null)
                        }
                        {
                            data && data.sendto && data.sendto.serviceProvider === "1" ? (
                                <Text style={styles.sendItem}>Service Provider</Text>
                            ) : (null)
                        }
                        {
                            data && data.sendto && data.sendto.expert === '1' ? (
                                <Text style={styles.sendItem}>Expert</Text>
                            ) : (null)
                        }
                        {
                            data && data.sendto && data.sendto.manufacturer === '1' ? (
                                <Text style={styles.sendItem}>Manufaturer / Dealer</Text>
                            ) : (null)
                        }
                        {
                            data && data.sendto && data.sendto.startup === '1' ? (
                                <Text style={styles.sendItem}>Start Up / Enterpreneur</Text>
                            ) : (null)
                        }

                    </View>
                </View>
            ) : (null)}

            {
                userView ? (
                    <View style={styles.userDetails}>
                        <View style={styles.cardHedaing}>
                            <Text style={styles.userName}>{data.user}</Text>
                            <Text style={styles.userType}>{data.usertype}</Text>
                        </View>
                        <Text style={styles.tStamp}>{data.date}</Text>

                    </View>
                ) : (null)
            }

            <Text selectable={true} style={styles.messageText}>{data.message}</Text>


            {
                data && data.attachment && data.attachment.type === "jpg" ? (
                    <TouchableOpacity onPress={() => {
                        navigation.navigate("View Image", {
                            imageURL:  data.attachment.attachment
                        })
                    }}>
                    <Image source={{ uri: data.attachment.attachment }} resizeMode='contain' style={styles.attachmentImage} />
                    </TouchableOpacity>
                ) : (null)
            }

            {
                data && data.attachment && data.attachment.type === "pdf" ? (
                    <TouchableOpacity style={styles.viewDocument} onPress={() => {
                        Linking.openURL(data.attachment.attachment)
                    }}>
                        <AntDesign name="pdffile1" size={30} color="red" />
                        <Text style={styles.attachmentLabel}>View Doucment</Text>
                    </TouchableOpacity>
                ) : (null)
            }


            {
                deleteBtn ? (
                    <View style={styles.cardFooter}>

                        <TouchableOpacity style={styles.cardDeleteCta} onPress={() => {
                                 Alert.alert(
                                    'Confirmation',
                                    'Do you want to delete this question ?',
                                    [
                                        {
                                            text: 'Cancel',
                                            onPress: () => {},
                                            style: 'cancel'
                                        },
                                        {
                                            text: 'Yes',
                                            onPress: () => {
                                                onDelete(data.id)
                                            }
                                        },
                                        // {
                                        //     cancelable: true 
                                        // }
    
                                    ]
    
                                )

                        }}>
                            <Text style={styles.cardDeleteCtaText}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                ) : (null)
            }

        </View>
    )
}

export default MessageCard

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



    cardContainer: {
        paddingHorizontal: 10,
        paddingVertical: 15,
        backgroundColor: "#fff",
        borderRadius: 10,
        marginBottom: 15
    },
    sendContainer: {
        display: "flex",
        flexDirection: "column",
        marginBottom: 7,
        borderBottomColor: "#E9E8E8",
        borderBottomWidth: 2,
    },
    label: {
        fontSize: RFValue(15),
        paddingLeft: 10
    },
    cardTop: {
        padding: 2,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap"
    },
    sendItem: {
        borderColor: "#5D9C59",
        borderWidth: 0.6,
        paddingVertical: 3,
        paddingHorizontal: 15,
        color: "#fff",
        fontSize: RFValue(13),
        backgroundColor: "#89c585",
        alignSelf: "flex-start",
        textTransform: "capitalize",
        borderRadius: 35,
        margin: 4
    },

    userDetails: {
        paddingHorizontal: 5,
        paddingVertical: 2,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    cardHedaing: {
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
    messageText: {
        color: "#504A4B",
        lineHeight: 20,
        fontSize: RFValue(14),
        marginBottom: 8
    },
    attachmentImage: {
        width: 250,
        height: 250,
        marginTop: 7,
        alignSelf: "center"
    },
    cardFooter: {
        borderTopColor: "#E9E8E8",
        borderTopWidth: 2,
        paddingTop: 8,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    cardDeleteCta: {
        color: "#fff",
        borderRadius: 23,
        backgroundColor: "red",
        paddingVertical: 8,
        width: "100%",
    },
    cardDeleteCtaText: {
        color: "#fff",
        textAlign: "center"
    }


})