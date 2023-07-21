import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { RFValue } from "react-native-responsive-fontsize";
const CommunityCard = (props) => {

    const navigation = useNavigation()
    const item = props.data

    const getCommunityBg = (groupcatg) => {

        switch (groupcatg) {
            case "Agriculture":
                return "#00ff01"
                break;
            case "Fisheries":
                return "#6d9eeb"
                break;
            case "Horticulture":
                return "#93c37e"
                break;
            case "Implement/ Machines":
                return "#f1f2f6"
                break;
            case "Irrigation":
                return "#3c78d8"
                break;
            case "Veterinary":
                return "#00ffff"
                break;
            case "Soil Conservation":
                return "#e06665"
                break;
            case "Fertilizer":
                return "#efefef"
                break;
            case "Pesticides":
                return "#efefef"
                break;
            case "Plantation Crop":
                return "#f9ca9c"
                break;
            case "Decorative":
                return "#fbe5cd"
                break;
            case "New Technology":
                return "#f1c330"
                break;
            default: 
                return "#fff"
                break;
        }

    }


    return (
        <TouchableOpacity
            style={[styles.communityCardStyle,
            { backgroundColor: getCommunityBg(item.groupCategory) }
            ]} onPress={
                () => {
                    navigation.navigate("Community", {
                        Communityname: item.groupName,
                        GroupId: item.id,
                        type: "chat"
                    })
                }
            }>
            <View >
                <Text style={styles.title}>{item.groupCategory}</Text>
                <Text style={styles.GroupName}>{item.groupName}</Text>
            </View>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    Icon: {
        width: "50%",
        height: undefined,
        aspectRatio: 1
    },
    title: {
        paddingHorizontal: 13,
        fontSize: RFValue(11),
        color: "#000"
    },
    communityCardStyle: {
        width: "30%",
        borderRadius: 6,
        padding: 7,
        display: "flex",
        alignItems: "center",
        marginTop: 13,
    },
    GroupName: {
        fontSize: RFValue(15),
        textAlign: "center"
    }



})

export default CommunityCard