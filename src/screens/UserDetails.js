import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { RFValue } from "react-native-responsive-fontsize";
const UserDetails = ({navigation, route}) => {

    const userData = route.params.userDetails

    return (
        <View style={styles.container}>

            <View style={styles.item}>
                <Text style={styles.label}>Name</Text>
                <Text style={styles.udata}>{userData.name}</Text>
            </View>
            <View style={styles.item}>
                <Text style={styles.label}>Mobile</Text>
                <Text style={styles.udata}>{userData.mobile}</Text>
            </View>
            <View style={styles.item}>
                <Text style={styles.label}>Email</Text>
                <Text style={styles.udata}>{userData.email}</Text>
            </View>
            <View style={styles.item}>
                <Text style={styles.label}>State</Text>
                <Text style={styles.udata}>{userData.state}</Text>
            </View>
            <View style={styles.item}>
                <Text style={styles.label}>District</Text>
                <Text style={styles.udata}>{userData.district}</Text>
            </View>
            <View style={styles.item}>
                <Text style={styles.label}>Block</Text>
                <Text style={styles.udata}>{userData.block}</Text>
            </View>
           
        </View>
    )
}

export default UserDetails

const styles = StyleSheet.create({
    container: {
        padding: 13,
        // backgroundColor: "#ECF4F3"
    },
    item: {
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#76DBD1",
        padding: 5
    },
    label: {
        fontSize: RFValue(14),
        color: "#656565",
        marginBottom:0
    },
    udata: {
        marginTop: 0,
        fontSize: RFValue(18),
        color: "#000",
    },


})