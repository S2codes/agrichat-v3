import { StyleSheet, Text, View, Dimensions, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { WebView } from 'react-native-webview';

const ViewPdf = ({ navigation, route }) => {
    console.log(route);
    console.log(route.params.uri);
    const pdf_uri = route.params.uri;
    const screenWidth = Dimensions.get('screen').width;
    const screenHeight = Dimensions.get('screen').height;
    const [isLoading, setIsLoading] = useState(true);


    return (
        <View style={{ width: screenWidth, height: screenHeight }} >
            <View style={{ flex: 1 }} >
                <WebView
                    source={{ uri: `https://drive.google.com/viewerng/viewer?embedded=true&url=${pdf_uri}` }}
                    onLoadStart={() => setIsLoading(true)}
                    onLoadEnd={() => setIsLoading(false)}
                />

                {
                    isLoading && <View style={styles.activityIndicatorStyle} >
                        <ActivityIndicator color="#009688" size="large" />
                    </View> 
                }

            </View>
        </View>
    )
}

export default ViewPdf

const styles = StyleSheet.create({
    activityIndicatorStyle: {
        flex: 1,
        position: 'absolute',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 'auto',
        marginBottom: 'auto',
        left: 0,
        right: 0,
        top: "-25%",
        bottom: 0,
        justifyContent: 'center'
        
      },
})