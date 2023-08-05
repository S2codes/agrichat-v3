import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { RFValue } from "react-native-responsive-fontsize";
const TextInputWithLabel = ({
    label,
    value,
    placeholder,
    isSecure,
    onChange,
    props,
    isNumeric
}) => {
    return (
        <View style={styles.mb2}>
            <Text style={styles.label}>{label}</Text>
            <TextInput value={value}
                style={styles.input}
                placeholder={placeholder}
                onChangeText={onChange}
                {...props}
                secureTextEntry={isSecure}
                keyboardType={isNumeric}
            />
           
        </View>
    )
}

export default TextInputWithLabel

const styles = StyleSheet.create({
    input: {
        borderWidth: 0.5,
        padding: 9,
        borderColor: "#8e8e8e",
        borderRadius: 7,
        backgroundColor: "#ade7923d"
    },

    label: {
        fontSize: RFValue(18),
        fontWeight: "bold"
    },
    mb2: {
        marginBottom: 10
      }


})
