import {  StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native-paper'
import ButtonWithLoader from '../components/ButtonWithLoader'
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useEffect } from 'react';
import { apiPostWithFromData, getItem } from '../Utils/Utils';
import { ADDREPLY } from '../config/urls';
import { showError, showSuccess } from '../Utils/HelpFunctions';
import * as DocumentPicker from 'expo-document-picker'
import { Entypo } from '@expo/vector-icons';
import CheckConnection from '../Utils/CheckConnection'
import { RFValue } from "react-native-responsive-fontsize";

const WriteQuery = ({ navigation, route }) => {

    const questionId = route.params.questionId
    const questionType = route.params.type

    const [user, setUser] = useState()
    const [fileUri, setFileUri] = useState()
    const [fileDetails, setFileDetails] = useState()

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



    const [userQuestion, setUserQuestion] = useState("")


    const onSubmit = async () => {

        let questionWithNewLine = userQuestion.replace(/\n/g, '\n')
        const fromData = new FormData()

        fromData.append("userid", user)
        fromData.append("questionid", questionId)
        fromData.append("replytype", questionType)
        fromData.append("reply", questionWithNewLine)
        // fromData.append("attacthment", "document")
        fromData.append("language", "en")
        fromData.append("state", "7")
        fromData.append("file", fileDetails)

        try {

            const res = await apiPostWithFromData(ADDREPLY, fromData)

            if (res.response) {
                setUser("")
                showSuccess("Your reply was successfully Submitted")
                navigation.goBack()
            } else {
                showError("Internal Server Error")
            }

        } catch (error) {
            showError("Internal Server Error")
        }

    }


    const onSelectAttachment = async () => {

        try {

            let result = await DocumentPicker.getDocumentAsync({
                type: ["image/*", "application/pdf"]
                // type: ["image/*"]
            });

            if (result.type == "success") {
                setFileUri(result.uri)
                let fileName = result.name
                fileName = fileName.length > 30 ? fileName.slice(0, 30) + '...' : fileName
                setFileDetails({ name: fileName, type: result.mimeType, size: result.size, uri: result.uri, originalName: result.name })
            } else {
                console.log("error in pick file");
                return
            }

        } catch (error) {
            console.log("error: --");
            console.log(error);
        }

    }

    const [isConnected, setIsConnected] = useState(true);

    return (
        <>
        
        
            <CheckConnection isConnected={isConnected} setIsConnected={setIsConnected} />

            <View style={[styles.container, isConnected?{}:{display: 'none'}]}>
                <TextInput style={styles.input}
                    placeholder='Write Your Reply ...'
                    multiline={true}
                    numberOfLines={4}
                    autoCorrect
                    value={userQuestion}
                    onChangeText={(msg) => {
                        setUserQuestion(msg)
                    }}
                />

                <Text style={styles.label}>Upload Attachment</Text>



                {
                    fileUri && <View style={styles.attacmentContainer}>
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


                }


                {
                    fileDetails ? (null) : (
                        <TouchableOpacity style={styles.attachmentBtn} onPress={() => {
                            onSelectAttachment()
                        }}>
                            <AntDesign name="upload" size={24} color="#fff" />
                            <Text style={styles.attachmentBtnText}>Select Attachment</Text>
                        </TouchableOpacity>
                    )
                }


                <ButtonWithLoader text={"Submit"} onPress={() => onSubmit()} />
            </View>

        </>

    )
}

export default WriteQuery

const styles = StyleSheet.create({
    container: {
        padding: 10
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
        marginBottom: 10

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
    // fileStyle: {
    //     width: "40%",
    //     height: undefined,
    //     aspectRatio: 1
    // }

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
    }



})