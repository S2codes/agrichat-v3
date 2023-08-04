import { StyleSheet, Text, TouchableOpacity, View, ActivityIndicator, Button } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native-paper'
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useEffect } from 'react';
import { apiGet, apiPostWithFromData, getItem } from '../Utils/Utils';
import { ADDQUESTION, FETCHUSERDETAILS } from '../config/urls';
import { showError, showSuccess } from '../Utils/HelpFunctions';
import * as DocumentPicker from 'expo-document-picker'
import { Entypo } from '@expo/vector-icons';
import { RFValue } from "react-native-responsive-fontsize";
const WriteQuery = ({ navigation, route }) => {


    const groupId = route.params.groupId
    const groupType = route.params.type

    const [user, setUser] = useState()
    const [fileUri, setFileUri] = useState()
    const [fileDetails, setFileDetails] = useState()
    const [isLoading, setIsLoading] = useState(false)

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

        if (userQuestion === "") {
            showError("Write Your Question")
            setIsLoading(true)
            return
        }

        const questionWithNewLine = userQuestion.replace(/\n/g, '\n')

        const fromData = new FormData()

        fromData.append("userid", user.id)
        fromData.append("groupid", groupId)
        fromData.append("messagetype", groupType)
        fromData.append("question", questionWithNewLine)
        fromData.append("attacthment", "document")
        fromData.append("language", "en")
        fromData.append("state", user.stateid)
        fromData.append("file", fileDetails)

        try {
            const res = await apiPostWithFromData(ADDQUESTION, fromData)

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
            showError("Internal Server Error")
            return
        }

    }

    return (

        <View style={styles.container}>


            {
                isLoading ? (null) : (
                    <ActivityIndicator size="large" style={styles.ActivityIndicatorLoading} />
                )
            }

            <View style={styles.inputContainer}>

                <TextInput style={styles.input}
                    placeholder='Write Your Question ...'
                    multiline={true}
                    numberOfLines={6}
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
                fileUri && <View>

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

    )
}

export default WriteQuery

const styles = StyleSheet.create({
    container: {
        padding: 10
    },
    ActivityIndicatorLoading: {
        width: "100%",
        height: "100%",
        elevation: 5
    },
    label: {
        fontSize: RFValue(16),
        marginBottom: 8
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
        marginBottom: 30,
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