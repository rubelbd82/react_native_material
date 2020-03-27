import React from 'react';
import {AdMobBanner} from "expo-ads-admob";

export default function BannerAd(props) {
    return (
        <AdMobBanner
            bannerSize="fullBanner"
            adUnitID="ca-app-pub-0493155888656987/5630582002" // Test ID, Replace with your-admob-unit-id
            servePersonalizedAds // true or false
            onDidFailToReceiveAdWithError={this.bannerError} />
    );
}
