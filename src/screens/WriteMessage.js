import { StyleSheet, Text, TouchableOpacity, View, ActivityIndicator, Button } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native-paper'
import ButtonWithLoader from '../components/ButtonWithLoader'
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useEffect } from 'react';
import { apiGet, apiPostWithFromData, getItem } from '../Utils/Utils';
import { ADDMESSAGE, FETCHUSERDETAILS } from '../config/urls';
import { showError, showSuccess } from '../Utils/HelpFunctions';
import * as DocumentPicker from 'expo-document-picker'
import { Entypo } from '@expo/vector-icons';
import CheckConnection from '../Utils/CheckConnection';
import { RFValue } from "react-native-responsive-fontsize";

const WriteMessage = ({ navigation, route }) => {

    const [isLoading, setIsLoading] = useState(false)
    const [selectedGroups, setSelectedGroups] = useState([])
    const [user, setUser] = useState()
    const [fileUri, setFileUri] = useState()
    const [fileDetails, setFileDetails] = useState()


    const updateSelectedGroups = (elem) => {
        if (selectedGroups.includes(elem)) {
            setSelectedGroups(selectedGroups.filter(item => item !== elem));
        } else {
            setSelectedGroups([...selectedGroups, elem]);
        }
    }

    useEffect(() => {

        const fetchUserDetails = async () => {
            try {
                const userData = await getItem("authDetails")
                const USERID = userData.userid

                const endpoint = `${FETCHUSERDETAILS}&userid=${USERID}`;
                const data = await apiGet(endpoint)
                setUser(data.data)
                setIsLoading(true)
            } catch (error) {
                showError("Internal Server Error")
            }
        }
        fetchUserDetails()

    }, [])




    const [userQuestion, setUserQuestion] = useState("")


    const onSubmit = async () => {

        setIsLoading(false)

        if (selectedGroups.length < 1) {
            alert("Atleast selected one group")
            setIsLoading(true)
            return
        }

        if (userQuestion === "") {
            alert("Write Your Message")
            setIsLoading(true)
            return
        }

        const questionWithNewLine = userQuestion.replace(/\n/g, '\n')

        const fromData = new FormData()

        fromData.append("userid", user.id)
        fromData.append("usertype", user.type)
        fromData.append("sender", selectedGroups)
        fromData.append("msg", questionWithNewLine)
        fromData.append("language", "en")
        fromData.append("state", user.stateid)
        fromData.append("file", fileDetails)

        try {
            const res = await apiPostWithFromData(ADDMESSAGE, fromData)

            if (res.response) {
                setUser("")
                showSuccess("Your Question was successfully Submitted")
                setIsLoading(true)
                navigation.goBack()
            } else {

                showError("Internal Server Error")
            }

        } catch (error) {
            showError("Internal Server Error")
        }



    }


    const onSelectAttachment = async () => {

        let result = await DocumentPicker.getDocumentAsync({
            type: ["image/*", "application/pdf"]
            // type: ["image/*"]
        });


        try {

            if (result.type === "success") {
                setFileUri(result.uri)
                let fileName = result.name
                fileName = fileName.length > 30 ? fileName.slice(0, 30) + '...' : fileName
                setFileDetails({ name: fileName, type: result.mimeType, size: result.size, uri: result.uri, originalName: result.name })
            }

            if (result.type === "cancel") {
                console.log("file cancel ..");
            }


        } catch (error) {
            console.log("error: ++");
            console.log(result);
            console.log(error);
            return
        }

    }

    const [isConnected, setIsConnected] = useState(true);


    return (

        <>
            <CheckConnection isConnected={isConnected} setIsConnected={setIsConnected} />

            <View style={[styles.container, isConnected ? {} : { display: 'none' }]}>

                {
                    isLoading ? (null) : (
                        <ActivityIndicator size="large" style={styles.ActivityIndicatorLoading} />
                    )
                }


                <Text style={[styles.label, { textDecorationLine: "underline", textAlign: "center", }]} >
                    Select group(s) to send message
                </Text>

                <View style={styles.tabletLeaf}>

                    <TouchableOpacity
                        style={[styles.tablet, selectedGroups.includes("farmer") ? styles.selectedBg : { backgroundColor: "#fff" }]}
                        onPress={() => {
                            updateSelectedGroups("farmer")
                        }}>
                        <Text
                            style={[styles.tabletLabel, selectedGroups.includes("farmer") ? styles.selectedTabletText : { color: "#000" }]}>Famer</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.tablet, selectedGroups.includes("expert") ? styles.selectedBg : { backgroundColor: "#fff" }]}
                        onPress={() => {
                            updateSelectedGroups("expert")
                        }}>
                        <Text style={[styles.tabletLabel, selectedGroups.includes("expert") ? styles.selectedTabletText : { color: "#000" }]}>Expert</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.tablet, selectedGroups.includes("service provider") ? styles.selectedBg : { backgroundColor: "#fff" }]}
                        onPress={() => {
                            updateSelectedGroups("service provider")
                        }}>
                        <Text style={[styles.tabletLabel, selectedGroups.includes("service provider") ? styles.selectedTabletText : { color: "#000" }]}>Service Provider</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.tablet, selectedGroups.includes("startup / entrepreneur") ? styles.selectedBg : { backgroundColor: "#fff" }]}
                        onPress={() => {
                            updateSelectedGroups("startup / entrepreneur")
                        }}>
                        <Text style={[styles.tabletLabel, selectedGroups.includes("startup / entrepreneur") ? styles.selectedTabletText : { color: "#000" }]}>Start Up / Entrepreneur</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.tablet, selectedGroups.includes("manufacturer / dealer") ? styles.selectedBg : { backgroundColor: "#fff" }]}
                        onPress={() => {
                            updateSelectedGroups("manufacturer / dealer")
                        }}>
                        <Text style={[styles.tabletLabel, selectedGroups.includes("manufacturer/ dealer") ? styles.selectedTabletText : { color: "#000" }]}>Manufacturer/ Dealer</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.tablet, selectedGroups.includes("student") ? styles.selectedBg : { backgroundColor: "#fff" }]} onPress={() => {
                        updateSelectedGroups("student")
                    }}>
                        <Text style={[styles.tabletLabel, selectedGroups.includes("student") ? styles.selectedTabletText : { color: "#000" }]}>Student</Text>
                    </TouchableOpacity>


                </View>


                <View style={styles.inputContainer}>
                    <TextInput style={styles.input}
                        placeholder='Write Your Message ...'
                        multiline={true}
                        numberOfLines={5}
                        autoCorrect
                        value={userQuestion}
                        onChangeText={(msg) => {
                            setUserQuestion(msg)
                        }}
                    />

                    <View style={styles.actionGroup}>
                        <TouchableOpacity style={{ marginEnd: 20 }} onPress={() => {
                            onSelectAttachment()
                        }} >
                            <AntDesign name="paperclip" size={25} color="black" />
                        </TouchableOpacity>
                        <Button title='Send' onPress={() => onSubmit()} />
                    </View>

                </View>


                {
                    fileUri &&
                    <View>
                        <Text style={styles.label}>Attachment</Text>
                        <View style={styles.attacmentContainer}>
                            <View style={styles.attachmentItem}>
                                {
                                    fileDetails && fileDetails.type === 'application/pdf' ? (
                                        <AntDesign name="pdffile1" size={30} color="#FA0F00" />
                                    ) : (
                                        <Entypo name="image" size={32} color="#5D9C59" />
                                    )
                                }

                                <Text style={styles.fileName}>{fileDetails && fileDetails.name}</Text>
                            </View>
                            <TouchableOpacity onPress={() => {
                                setFileUri('')
                                setFileDetails()
                            }}>
                                <MaterialIcons name="cancel" size={32} color="black" />
                            </TouchableOpacity>
                        </View>
                    </View>
                }

            </View>

        </>

    )
}

export default WriteMessage

const styles = StyleSheet.create({

    ActivityIndicatorLoading: {
        width: "100%",
        height: "100%",
        elevation: 5,
    },
    container: {
        padding: 10
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
    },
    input: {
        borderWidth: 0.5,
        padding: 1,
        borderColor: "#8e8e8e",
        borderRadius: 7,
        backgroundColor: "#fff",
        paddingVertical: 0,
        backgroundColor: "#c7fff2"
    },

    attachmentBtn: {

        paddingVertical: 10,
        marginBottom: 50,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#5D9C59",

    },
    attachmentBtnText: {
        color: "#fff",
        marginLeft: 10
    },


    attacmentContainer: {
        backgroundColor: "#ccf7d1",
        padding: 5,
        borderColor: "#5D9C59",
        borderWidth: 1,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    attachmentItem: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        width: "90%"
    },
    fileName: {
        fontSize: RFValue(14),
        marginLeft: 10
    },
    tabletLeaf: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-evenly"
    },
    tablet: {
        borderColor: "#8e8e8e",
        borderWidth: 0.5,
        paddingHorizontal: 15,
        paddingVertical: 7,
        borderRadius: 20,
        alignSelf: "flex-start",
        marginBottom: 13,
        marginHorizontal: 5

    },
    selectedBg: {
        backgroundColor: "green"
    },
    selectedTabletText: {
        color: "#fff"
    },
    inputContainer: {
        position: "relative",
        marginBottom: 20
    },
    actionGroup: {
        padding: 10,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
        position: "absolute",
        bottom: 0,
        right: 0
    },


})