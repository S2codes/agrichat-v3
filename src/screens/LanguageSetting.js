import { StyleSheet, Text, View, ActivityIndicator, TouchableOpacity } from 'react-native'
import React from 'react'
import CheckConnection from '../Utils/CheckConnection';
import { useState } from 'react';
import { useEffect } from 'react';
import { apiGet, getItem, setItem } from "../Utils/Utils";
import { FETCHLANGUAGES } from '../config/urls';
import { ScrollView } from 'react-native';
import { showSuccess } from '../Utils/HelpFunctions';

const LanguageSetting = ({ navigation }) => {

    const [isLoading, setIsLoading] = useState(true);
    const [isConnected, setIsConnected] = useState(true);
    // const [languageData, setLanguageData] = useState([])
    const [selectedLang, setSelectedLang] = useState('');

    const languageData = [
        { "name": "English", "nativeLanguage": "English" },
        { "name": "Hindi", "nativeLanguage": "हिन्दी" },
        { "name": "Assamese", "nativeLanguage": "অসমীয়া" },
        { "name": "Bengali", "nativeLanguage": "বাংলা" },
        { "name": "Gujarati", "nativeLanguage": "ગુજરાતી" },
        { "name": "Kannada", "nativeLanguage": "ಕನ್ನಡ" },
        { "name": "Khasi", "nativeLanguage": "Ka Ktien" },
        { "name": "Konkani", "nativeLanguage": "कोंकणी" },
        { "name": "Konyak", "nativeLanguage": "Konyak Naga" },
        { "name": "Lushai", "nativeLanguage": "Mizo ṭawng" },
        { "name": "Malayalam", "nativeLanguage": "മലയാളം" },
        { "name": "Manipuri", "nativeLanguage": "মণিপুরী" },
        { "name": "Marathi", "nativeLanguage": "मराठी" },
        { "name": "Nepali", "nativeLanguage": "नेपाली" },
        { "name": "Nissi", "nativeLanguage": "Nisi" },
        { "name": "Odia", "nativeLanguage": "ଓଡ଼ିଆ" },
        { "name": "Punjabi", "nativeLanguage": "ਪੰਜਾਬੀ" },
        { "name": "Shimla", "nativeLanguage": "Shimil" },
        { "name": "Tamil", "nativeLanguage": "தமிழ்" },
        { "name": "Telugu", "nativeLanguage": "తెలుగు" }
    ]



    useEffect(() => {
        const fetchLanguages = async () => {
            try {
                const response = await getItem('language')
                if (response != null) {   
                    const storeLanguage = response.language;
                    setSelectedLang(storeLanguage);
                }
                setIsLoading(true);
            } catch (error) {
                console.log(error);
            }
        }

        fetchLanguages();

    }, [])

    const onlanguagechange = async (languageItem) => {
        await setItem("language", { language: languageItem })
        showSuccess("Language is Changed");
        navigation.navigate("Index");
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

                        {
                            languageData && languageData.map((item, index) => (
                                <TouchableOpacity key={`${index}_`}
                                    style={[
                                        styles.langaageItem,
                                        selectedLang === item.name ? styles.selectedItem : null
                                    ]}
                                    onPress={() => {
                                        setSelectedLang(item.name)
                                        onlanguagechange(item.name)
                                    }}
                                >
                                    <Text style={[
                                        styles.lanuageText,
                                        selectedLang === item.name ? styles.selectedLanuageText : null
                                    ]} >{item.nativeLanguage} </Text>
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
        paddingBottom: 12
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