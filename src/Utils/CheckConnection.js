import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useEffect } from 'react'
import NetInfo from '@react-native-community/netinfo';
import { RFValue } from "react-native-responsive-fontsize";

const CheckConnection = ({ isConnected, setIsConnected }) => {

    useEffect(() => {

        const unsubscribe = NetInfo.addEventListener(state => {
     
            setIsConnected(state.isConnected);
        });

        return () => {
            unsubscribe()
        }

    }, [])



    return (
        <View >

            {
                isConnected ? (
                    null
                ) : (
                    <View style={styles.container}>

                        <Image source={require("../../assets/icons/no-signal.png")} resizeMode="contain" style={styles.icon} />
                        <Text style={styles.textCenter}>
                            No Internet! Please Check your Internet Connection
                        </Text>
                    </View>

                )
            }
        </View>
    )
}

export default CheckConnection

const styles = StyleSheet.create({

    container: {
        height: "100%",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    icon :{
        width: "15%",
        height: undefined,
        aspectRatio: 1
    },
    textCenter: {
        textAlign: "center",
        fontSize: RFValue(17),
        color: "red"
    }


})