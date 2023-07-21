import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { RFValue } from "react-native-responsive-fontsize";

const ButtonWithLoader = ({
    text, onPress, isDisabled
}) => {
    return (
        <View>
            <TouchableOpacity style={[styles.btn, {
              backgroundColor: isDisabled ? "grey" : "#5D9C59"
            }]}
             disabled={isDisabled ? true : false}
            
              onPress={onPress}>
                <Text style={styles.btnText}>{text}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ButtonWithLoader

const styles = StyleSheet.create({

    btn: {
        backgroundColor: "#5D9C59",
        width: "100%",
        padding: 11,
        alignSelf: "center",
        marginVertical: 5,
        borderRadius: 7
    },
    btnText: {
        textTransform: "uppercase",
        fontSize: RFValue(18),
        color: "white",
        textAlign: "center",
        letterSpacing: 2
    }

})