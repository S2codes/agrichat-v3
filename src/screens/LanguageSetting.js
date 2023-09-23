import { StyleSheet, Text, View, ActivityIndicator, TouchableOpacity } from 'react-native'
import React from 'react'
import CheckConnection from '../Utils/CheckConnection';
import { useState } from 'react';
import { useEffect } from 'react';
import { apiGet } from "../Utils/Utils";
import { FETCHLANGUAGES } from '../config/urls';
import { ScrollView } from 'react-native';

const LanguageSetting = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [isConnected, setIsConnected] = useState(true);
    const [languageData, setLanguageData] = useState([])
    const [selectedLang, setSelectedLang] = useState('English');

    useEffect(() => {
        const fetchLanguages = async () => {
            try {
                const response = await apiGet(FETCHLANGUAGES);
                console.log(response.data);
                setLanguageData(response.data);
                setIsLoading(true);
            } catch (error) {
                console.log(error);
            }
        }

        fetchLanguages();

    }, [])

    const onlanguagechange = async () =>{
        alert("Language is Changed")
    }



    return (
        <>
            <ScrollView>
                <CheckConnection isConnected={isConnected} setIsConnected={setIsConnected} />
                <View style={[styles.Maincontainer, isConnected ? {} : { display: 'none' }]}>
                    {
                        isLoading ? (null) : (
                            <ActivityIndicator size="large" style={styles.ActivityIndicatorLoading} />
                        )
                    }

                    <View style={styles.container}>

                        <TouchableOpacity style={[styles.langaageItem, selectedLang === 'English' && styles.selectedItem]}
                            onPress={() => {
                                setSelectedLang('English')
                                onlanguagechange()
                            }}
                        >
                            <Text style={[styles.lanuageText, selectedLang === 'English' && styles.selectedLanuageText]} >English</Text>
                        </TouchableOpacity>

                        {

                            languageData && languageData.map((item, index) => (
                                <TouchableOpacity key={`${index}_${item}`}
                                    style={[styles.langaageItem, selectedLang === item && styles.selectedItem]}
                                    onPress={() => {
                                        setSelectedLang(item)
                                        onlanguagechange()
                                    }}
                                >
                                    <Text style={[styles.lanuageText, selectedLang === item && styles.selectedLanuageText]} >{item}</Text>
                                </TouchableOpacity>
                            ))

                        }

                    </View>


                </View>
            </ScrollView>
        </>
    )
}

export default LanguageSetting

const styles = StyleSheet.create({

    ActivityIndicatorLoading: {
        width: "100%",
        height: "100%",
        elevation: 5
    },
    container: {
        padding: 5,
        paddingTop: 15,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        flexWrap: "wrap",
        paddingBottom: 12,
        borderColor: "red",
        borderWidth: 1
    },
    Maincontainer: {
        height: "100%",
    },
    langaageItem: {
        borderColor: "#5D9C59",
        backgroundColor: "#d1e7dd",
        borderWidth: 1,
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 10,
        height: 70,
        margin: 5,
        width: "45%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 15
    },
    lanuageText: {
        textAlign: "center",
        fontSize: 19
    },
    selectedItem: {
        backgroundColor: "#5D9C59"
    },
    selectedLanuageText: {
        color: "#fff"
    },



})