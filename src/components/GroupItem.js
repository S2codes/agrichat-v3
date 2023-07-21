import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import Checkbox from 'expo-checkbox'
import { RFValue } from "react-native-responsive-fontsize";
import { AntDesign } from '@expo/vector-icons';


const GroupItem = ({ groupid, groupname, onSelect, onFavorite, isSelected = 0, isPinned = 0 }) => {

    const [isChecked, setIsChecked] = useState(false)

    const [isFavorite, setIsFavorite] = useState(false)

    useEffect(() => {
        const status = () => {
            if (isSelected === "1") {
                setIsChecked(true)
            }
            if (isPinned === "1") {
                setIsFavorite(true)
            }
        }

        status()
    }, [])



    return (

        <View style={styles.groupContainer}>
            <Text style={styles.groupName}>{groupname} </Text>
            <View style={styles.groupItem}>
                <Checkbox value={isChecked} onValueChange={() => {
                    setIsChecked(!isChecked)
                    onSelect()
                }} />

                <TouchableOpacity
                    onPress={() => {
                        
                        setIsFavorite(!isFavorite)
                        onFavorite()
                    }}

                    disabled={isChecked ? (false) : (true)}

                >

                    {
                        isChecked ? ( 
                            
                            isFavorite ? (
                                <AntDesign name="star" size={25} color="#FFD93D" />
                            ) : (
                                <AntDesign name="staro" size={25} color="black" />
                            )
                            
                        ) : (
                            <AntDesign name="staro" size={25} color="#cfc9c9" />
                        )
                    }


                </TouchableOpacity>

            </View>

        </View>

    )
}



export default GroupItem

const styles = StyleSheet.create({
    groupContainer: {
        borderBottomWidth: 1,
        borderBottomColor: "#76DBD1",
        padding: 6,
        backgroundColor: "#ECF4F3",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 10
    },
    groupCategory: {
        paddingHorizontal: 13,
        fontSize: RFValue(11),
        color: "#8e8e8e"
    },
    groupItem: {
        width: "30%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 7,
        borderRadius: 6,
        paddingHorizontal: 13

    },

    groupName: {
        fontSize: RFValue(15)
    },

})