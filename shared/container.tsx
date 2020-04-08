import React from 'react';
import {ImageBackground, View} from 'react-native';
import {globalStyles} from "../styles/global_style";
import BannerAd from "./bannerad";

export default function Container(props) {
    return (
        <View style={globalStyles.container}>
            <ImageBackground source={require('../assets/splash.png')} style={globalStyles.screenBackgroundImage}>
                { props.children }
            </ImageBackground>
            <BannerAd/>
        </View>
    );
}
