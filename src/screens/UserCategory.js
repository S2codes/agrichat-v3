import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { RFValue } from "react-native-responsive-fontsize";
const Usercategory = ({ navigation }) => {
    // const navigation = useNavigation() 
    return (
        <View style={styles.container}>
            <Text style={styles.titleHeader}>Sign up as ...</Text>

            {/* <Text style={styles.titleDescrption}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates maxime </Text> */}

            <View style={styles.categoryList}>


                <TouchableOpacity style={styles.categoryItem} onPress={
                    () => { navigation.navigate("Signup", { userCategory: "farmer" }) }
                } >
                    <Image resizeMode='contain' style={styles.CategoryImg} source={require('../../assets/farmer.png')} />
                    <Text style={styles.CategoryTitle}>Farmer</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.categoryItem} onPress={
                    () => { navigation.navigate("Signup", { userCategory: "expert" }) }
                } >
                    <Image resizeMode='contain' style={styles.CategoryImg} source={require('../../assets/company.png')} />
                    <Text style={styles.CategoryTitle}>Expert</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.categoryItem} onPress={
                    () => { navigation.navigate("Signup", { userCategory: "manufacturer / dealer" }) }
                } >
                    <Image resizeMode='contain' style={styles.CategoryImg} source={require('../../assets/manf.png')} />
                    <Text style={styles.CategoryTitle}>Manufacturer / Dealer</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.categoryItem} onPress={
                    () => { navigation.navigate("Signup", { userCategory: "startup / entrepreneur" }) }
                } >
                    <Image resizeMode='contain' style={styles.CategoryImg} source={require('../../assets/startup.png')} />
                    <Text style={styles.CategoryTitle}>Start Up / Entrepreneur</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.categoryItem} onPress={
                    () => { navigation.navigate("Signup", { userCategory: "service provider" }) }
                } >
                    <Image resizeMode='contain' style={styles.CategoryImg} source={require('../../assets/businessman.png')} />
                    <Text style={styles.CategoryTitle}>Service Provider</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.categoryItem} onPress={
                    () => { navigation.navigate("Signup", { userCategory: "student" }) }
                } >
                    <Image resizeMode='contain' style={styles.CategoryImg} source={require('../../assets/student.png')} />
                    <Text style={styles.CategoryTitle}>Student</Text>
                </TouchableOpacity>


            </View>


        </View>
    )
}

export default Usercategory

const styles = StyleSheet.create({
    container: {
        padding: 11,
        backgroundColor: "#9efcfc",
        height: "100%",
        paddingTop: 30
    },
    titleHeader: {
        textAlign: 'center',
        fontSize: RFValue(22),
        marginBottom: 7,
        marginTop: 10,
        fontWeight: 800,

    },
    titleDescrption: {
        color: "#656565",
        width: "90%",
        fontSize: RFValue(13)
    },
    categoryList: {
        padding: 5,
        marginTop: 21,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap"
    },
    categoryItem: {
        borderRadius: 9,
        paddingVertical: 13,
        paddingHorizontal: 15,
        width: "48%",
        backgroundColor: "#fff",

        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
        marginBottom: 14

    },
    CategoryImg: {
        width: 60,
        height: undefined,
        aspectRatio: 1,
        marginBottom: 9
    },
    CategoryTitle: {
        fontSize: RFValue(17),
        fontWeight: 600,
    }



})