import React from 'react';
import {View} from 'react-native';
import {globalStyles} from "../styles/global_style";

export default function Card(props) {
    return (
        <View style={globalStyles.card}>
            <View style={globalStyles.cardContent}>
                { props.children }
            </View>
        </View>
    );
}
