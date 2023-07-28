import { StyleSheet, View, Image, TouchableOpacity, Linking } from 'react-native'
import React from 'react'
import Swiper from 'react-native-swiper'
const ImgSlider = ({ data }) => {

    return (
        <View style={styles.container}>
            <Swiper autoplay={true} showsPagination={true} loop={true} showsButtons dotColor='#5D9C59' autoplayTimeout={4.5} >
                {
                     data && data.map((item) => (
                         <TouchableOpacity style={styles.slide} key={item.id} onPress={() => {
                             Linking.openURL(item.link)
                         }}>
                             <Image style={styles.image} source={{ uri: item.img }} />
                         </TouchableOpacity>
                     ))
                }
            </Swiper>
        </View>
    )
}

export default ImgSlider

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        marginTop: 10
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '95%',
        height: '100%',
        resizeMode: 'contain',
        borderRadius: 10
    },
})