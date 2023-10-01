import { StyleSheet, Text, TouchableOpacity, View, Alert, Linking } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Image } from 'react-native';
import { getItem } from '../Utils/Utils';
import { AntDesign, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import { RFValue } from "react-native-responsive-fontsize";
import * as FileSystem from 'expo-file-system';
import { shareAsync } from 'expo-sharing'
import * as MediaLibrary from 'expo-media-library';
import * as Sharing from 'expo-sharing';



const QueryCard = ({ community, communityName = "", communityCategory = "", showUserName = true, data, onDelete }) => {

    const defaultGroupCategory =  data.defaultgroupCategory
    const attachment = JSON.parse(data.attachment)
    let isAttachmentPresent = false;
    if (attachment.type !== "none") {
        isAttachmentPresent = true
    }


    const [user, setUser] = useState()

    useEffect(() => {

        const fetchUserDetails = async () => {
            try {
                const userData = await getItem("authDetails")
                const USERID = userData.userid
                setUser(USERID)
            } catch (error) {
                showError("Internal Server Error")
            }
        }
        fetchUserDetails()

    }, [])


    // save file in storage

    const getfileName = (uri) => {
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().replace(/[-:.T]/g, '').substr(0, 14);
        const urlParts = uri.split('.');
        const fileType = urlParts[urlParts.length - 1];
        const filename = formattedDate + '.' + fileType;
        return filename
    }


    // const handerDownload = async (uri) => {
    //     const filename = getfileName(uri);
    //     const result = await FileSystem.downloadAsync(
    //         uri,
    //         FileSystem.documentDirectory + filename,
    //     )

    //     const mimetype = result.headers['content-type']

    //     const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
    //     if (permissions.granted) {
    //         const base64 = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 })
    //         await FileSystem.StorageAccessFramework.createFileAsync(permissions.directoryUri, filename, mimetype)
    //             .then(async (uri) => {
    //                 await FileSystem.writeAsStringAsync(uri, base64, { encoding: FileSystem.EncodingType.Base64 })
    //                 alert("File Downloaded")
    //             }).catch((e) => {
    //                 console.log("e : ");
    //                 console.log(e);
    //             })
    //     } else {
    //         shareAsync(uri)
    //     }

    // }



    // share file     
    // share     
    const handerShare = async (uri) => {
        const filename = getfileName(uri);
        const result = await FileSystem.downloadAsync(
            uri,
            FileSystem.documentDirectory + filename
        )
        shareAsync(result.uri)
    }

    // save file in storage 
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
                return "#5D9C59"
                break;
        }

    }

    const navigation = useNavigation();

    return (
        <View style={styles.cardBody}>

            {
                community ? (
                    <View
                        style={
                            [
                            styles.CommunitiySec,
                            { backgroundColor: getCommunityBg(defaultGroupCategory) }
                        ]
                        }>
                        <Text style={styles.CommunitiyPara}>{communityCategory} / {communityName}</Text>

                    </View>
                ) : (
                    ""
                )
            }

            <View style={styles.cardTop}>

                {
                    showUserName ? (
                        <View style={styles.cardHedaing}>
                            <Text style={styles.userName}>{data.user}</Text>
                            <Text style={styles.userType}>{data.usertype}</Text>
                        </View>

                    ) : null
                }

                <Text style={styles.tStamp}>{data.date}</Text>

            </View>

            <View style={styles.cardContent}>
                <Text style={styles.para} selectable={true}  >{data.question}</Text>
                {
                    isAttachmentPresent && attachment.type === "jpg" ? (
                        <View>
                            <TouchableOpacity onPress={() => {
                                navigation.navigate("View Image", {
                                    imageURL: attachment.attachment
                                })
                            }}>
                                <Image source={{ uri: attachment.attachment }} resizeMode='contain' style={styles.attachmentImage} />
                            </TouchableOpacity>

                            <View style={styles.actionHandeler} >
                                <View style={styles.actionItem} ></View>
                                {/* <TouchableOpacity style={styles.actionItem} onPress={() => {
                                    handelImgDownload(attachment.attachment)
                                }}>
                                    <MaterialCommunityIcons name="download" size={30} color="#5D9C59" />
                                    <Text style={styles.actionText} >Download img</Text>
                                </TouchableOpacity> */}

                                <TouchableOpacity style={styles.actionItem} onPress={() => {
                                    handerShare(attachment.attachment)
                                }}>
                                    <FontAwesome name="share" size={30} color="#5D9C59" />
                                    <Text style={styles.actionText}>Share</Text>
                                </TouchableOpacity>
                            </View>


                        </View>
                    ) : (null)
                }
                {
                    isAttachmentPresent && attachment.type === "pdf" ? (
                        <View>
                            <View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }} >
                                <TouchableOpacity style={styles.viewDocument} onPress={() => {
                                    // Linking.openURL(attachment.attachment)
                                    navigation.navigate('View Pdf', { uri: attachment.attachment })
                                }}>
                                    <AntDesign name="pdffile1" size={30} color="red" />
                                    <Text style={styles.attachmentLabel}>View Doucment</Text>
                                </TouchableOpacity>

                            </View>

                            <View style={styles.actionHandeler} >

                                <TouchableOpacity style={styles.actionItem} onPress={() => {
                                    // handerDownload(attachment.attachment)
                                    // handerDownload(attachment.attachment_downloadlink)
                                    Linking.openURL(attachment.attachment)
                                }}>
                                    <MaterialCommunityIcons name="download" size={30} color="#5D9C59" />
                                    <Text style={styles.actionText} >Download pdf</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.actionItem} onPress={() => {
                                    handerShare(attachment.attachment)
                                }}>
                                    <FontAwesome name="share" size={30} color="#5D9C59" />
                                    <Text style={styles.actionText}>Share</Text>
                                </TouchableOpacity>
                            </View>

                        </View>

                    ) : (null)
                }
            </View>

            <View style={styles.cardFooter}>

                {
                    data.reply < 5 ? (
                        <Text style={styles.cardCta}>Replies {data.reply}/5</Text>
                    ) : (null)
                }

                {
                    data.reply === 5 ? (
                        <Text style={styles.cardCtaFull}>Replies {data.reply}/5</Text>
                    ) : (null)
                }

                {
                    data.userid == user ? (
                        <TouchableOpacity onPress={() => {
                            Alert.alert(
                                'Confirmation',
                                'Do you want to delete this question ?',
                                [
                                    {
                                        text: 'Cancel',
                                        onPress: () => { },
                                        style: 'cancel'
                                    },
                                    {
                                        text: 'Yes',
                                        onPress: () => {
                                            onDelete(data.id)
                                        }
                                    },

                                ]

                            )

                        }}>
                            <Text style={styles.cardDeleteCta}>Delete</Text>
                        </TouchableOpacity>
                    ) : (null)
                }

                <TouchableOpacity onPress={() => {
                    navigation.navigate("Replies", {
                        queryId: data.id,
                        type: data.type
                    })
                }}>
                    <Text style={styles.cardCta}>View Details</Text>
                </TouchableOpacity>

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

    cardBody: {
        width: "100%",
        paddingBottom: 9,
        paddingHorizontal: 0,
        backgroundColor: "#fff",
        borderRadius: 7,
        marginTop: 10,
        marginBottom: 2,
        elevation: 5
    },
    CommunitiySec: {
        color: "#fff",
        width: "100%",
        borderTopLeftRadius: 7,
        borderTopRightRadius: 7,
        display: "flex",
        flexDirection: "row",
        alignItems: "baseline",
        justifyContent: "space-between",
        paddingVertical: 3
    },
    CommunitiyPara: {
        color: "#fff",
        marginLeft: 7,
        fontSize: RFValue(18),
        textTransform: "capitalize",

    },
    JoinBtn: {
        color: "#000",
        backgroundColor: "#fff",
        borderRadius: 2,
        paddingHorizontal: 10,
        marginRight: 7,
        fontSize: RFValue(14)
    },
    cardTop: {
        paddingTop: 7,
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
    cardContent: {
        paddingHorizontal: 7,
        paddingVertical: 4,

    },
    attachmentImage: {
        width: "100%",
        minHeight: 100,
        flex: 1,
        aspectRatio: 1,
        marginTop: 7,
        alignSelf: "center",
    },


    para: {
        color: "#504A4B",
        lineHeight: 20,
        fontSize: RFValue(14)
    },
    cardFooter: {
        borderTopColor: "#E9E8E8",
        borderTopWidth: 1,
        paddingTop: 8,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 7

    },
    cardCta: {
        color: "#fff",
        borderRadius: 23,
        backgroundColor: "#5D9C59",
        paddingHorizontal: 13,
        paddingVertical: 5

    },
    cardCtaFull: {
        color: "#fff",
        borderRadius: 23,
        backgroundColor: "red",
        paddingHorizontal: 13,
        paddingVertical: 5
    },
    cardDeleteCta: {
        color: "#fff",
        borderRadius: 23,
        backgroundColor: "red",
        paddingHorizontal: 13,
        paddingVertical: 5
    },
    actionHandeler: {
        marginTop: 10,
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    actionItem: {
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        paddingHorizontal: 3
    },
    actionText: {
        color: "#504A4B",
        fontSize: 13,
        marginStart: 5
    }




})

export default QueryCard
