import { ScrollView, StyleSheet, Text,View, Linking } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Zocial } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { RFValue } from "react-native-responsive-fontsize";

const ContactUs = () => {
    return (
        <View style={styles.container}>
            <ScrollView>
                <Text style={styles.textLabel}>Contact Us</Text>


                <View style={styles.iconBox}>

                    <TouchableOpacity style={styles.item} onPress={() =>{
                        Linking.openURL('tel:+919437130930')
                    }}>
                        <View style={styles.containerRound}>
                            <Feather name="phone-call" size={35} color="#fff" />
                        </View>
                        <Text style={styles.textCenter}>Call</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.item} onPress={() => {
                        Linking.openURL('sms:+919437130930')
                    }}>
                        <View style={styles.containerRound}>
                            <Feather name="message-circle" size={35} color="#fff" />
                        </View>
                        <Text style={styles.textCenter}>Message</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.item} onPress={() => {
                        Linking.openURL('mailto:agrichatapp@gmail.com')
                    }}>
                        <View style={styles.containerRound}>
                        <Zocial name="email" size={35} color="#fff" />
                        </View>
                        <Text style={styles.textCenter}>E-mail</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.item}  onPress={() =>{
                        Linking.openURL('https://chat.whatsapp.com/IAU77o4soshBLzrTZAOK4b')
                    }} >
                        <View style={styles.containerRound}>
                        <FontAwesome name="whatsapp" size={35} color="#fff" />
                        </View>
                        <Text style={styles.textCenter}>Join Whastapp Group</Text>
                    </TouchableOpacity>

                </View>

                <Text style={styles.textLabel}>Our other media links</Text>
                <View style={styles.iconBox}>

                    <TouchableOpacity style={styles.item} onPress={() => {
                        Linking.openURL('http://www.youtube.com/c/agrimach')
                    }} >
                        <View style={styles.containerRound}>
                        <AntDesign name="youtube" size={35} color="#fff" />
                        </View>
                        <Text style={styles.textCenter}>Youtube</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.item} onPress={() => {
                        Linking.openURL('https://www.facebook.com/AgriMachineIndia/')
                    }}>
                        <View style={styles.containerRound}>
                        <AntDesign name="facebook-square" size={35} color="#fff" />
                        </View>
                        <Text style={styles.textCenter}>Facebook</Text>
                    </TouchableOpacity>

                </View>

            </ScrollView>
        </View>
    )
}

export default ContactUs

const styles = StyleSheet.create({
    container: {
      width: "100%"
    },
    textLabel: {
        fontSize: RFValue(20),
        textAlign: "center",
        textDecorationLine: "underline",
        marginVertical: 20
    },
    iconBox: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 15,
        flexWrap: "wrap"
    },
    item: {
        marginBottom: 15,
        width: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 10
    },
    textCenter: {
        textAlign: "center",
        fontSize: RFValue(16),
        marginTop: 10
    },
    containerRound: {
        width: 70,
        height: 70,
        borderRadius: 250,
        display: 'flex',
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#5D9C59"

    }



})