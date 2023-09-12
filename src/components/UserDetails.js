import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { RFValue } from "react-native-responsive-fontsize";
import { AntDesign } from '@expo/vector-icons';


const UserDetails = ({ data }) => {
    return (
        <View>

            <View style={styles.labelBar} >
            <AntDesign name="user" size={24} color="#fff" />
                <Text style={styles.labelBarText} >My Details</Text>
            </View>
            <View style={styles.container} >
                <View style={styles.item}>
                    <Text style={styles.label}>Name</Text>
                    <Text style={styles.udata}>{data && data.name}</Text>
                </View>
                <View style={styles.item}>
                    <Text style={styles.label}>Mobile</Text>
                    <Text style={styles.udata}>{data && data.mobile}</Text>
                </View>
                <View style={styles.item}>
                    <Text style={styles.label}>Email</Text>
                    <Text style={styles.udata}>{data && data.email}</Text>
                </View>
                <View style={styles.item}>
                    <Text style={styles.label}>State</Text>
                    <Text style={styles.udata}>{data && data.state}</Text>
                </View>
                <View style={styles.item}>
                    <Text style={styles.label}>District</Text>
                    <Text style={styles.udata}>{data && data.district}</Text>
                </View>
                <View style={styles.item}>
                    <Text style={styles.label}>Block</Text>
                    <Text style={styles.udata}>{data && data.block}</Text>
                </View>
            </View>
        </View>
    )
}

export default UserDetails

const styles = StyleSheet.create({
    container: {
        padding: 13,
        paddingBottom: 5
    },
    item: {
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#76DBD1",
        padding: 5
    },
    label: {
        fontSize: RFValue(14),
        color: "#656565",
        marginBottom: 0
    },
    udata: {
        marginTop: 0,
        fontSize: RFValue(16),
        color: "#000",
    },
    labelBar: {
        backgroundColor: "#5D9C59",
        padding: 10,
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    },
    labelBarText: {
        fontSize: RFValue(17),
        color: "#fff",
        marginStart: 10
    }


})