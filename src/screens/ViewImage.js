import { StyleSheet, View, Dimensions, Image } from 'react-native'
import React, { useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import CheckConnection from '../Utils/CheckConnection';
import * as FileSystem from 'expo-file-system'
// import * as Permissions from 'expo-permissions'
import * as MediaLibrary from 'expo-media-library';



const ViewImage = ({ navigation, route }) => {
    const imageURL = route.params.imageURL

    const windowHeight = Dimensions.get('window').height;
    const [isConnected, setIsConnected] = useState(true);

    // const DownLoadImage = ({ imgUri }) => {
    const handelDownload = async (imgUri) => {

        try {
            const perm = await MediaLibrary.requestPermissionsAsync(true);
            console.log(perm);
            if (perm.status !== 'granted') {
                console.log("not granted");
                return;
            } else {
                console.log("granted");
                const downloadResumable = FileSystem.createDownloadResumable(
                    imgUri,
                    FileSystem.documentDirectory + '21agrichat.jpg'
                )
                const { uri } = await downloadResumable.downloadAsync();

                const assest = await MediaLibrary.createAssetAsync(uri)

                const album = await MediaLibrary.getAlbumAsync('Agrichat')
                console.log(album);
                if (album == null) {
                    await MediaLibrary.createAlbumAsync('Agrichat', assest, false)
                    console.log("folder not found");
                } else {
                    await MediaLibrary.addAssetsToAlbumAsync([assest], album, false)
                    console.log("folder not found");
                }

                alert("Image is downloded")
                console.log('Image downloaded successfully:', uri);

            }

        } catch (error) {
            console.log(error);
        }

    }
    


    return (
        <>
            <CheckConnection isConnected={isConnected} setIsConnected={setIsConnected} />

            <View style={[styles.container, isConnected ? {} : { display: 'none' }]}>
                <View style={styles.topBarSec}>
                    <TouchableOpacity onPress={() => {
                        navigation.goBack()
                    }}>
                        <AntDesign name="arrowleft" size={27} color="#fff" />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity onPress={() => {
                    // navigation.goBack()
                    handelDownload(imageURL)
                }}>
                    <Image source={{ uri: imageURL }} resizeMode='contain' style={[styles.imageFull, { height: windowHeight - 50 }]} />
                </TouchableOpacity>

            </View>
        </>
    )
}

export default ViewImage

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff"
    },
    topBarSec: {
        paddingTop: 25,
        paddingBottom: 10,
        paddingLeft: 20,
        backgroundColor: "#5D9C59",
        display: "flex",
        alignItems: "flex-start"

    },
    imageFull: {
        width: "100%",
    }
})