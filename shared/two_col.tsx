import React from 'react';
import {Text, View} from 'react-native';
import {globalStyles} from "../styles/global_style";

export default function TwoCol(props) {
    return (
        <View style={[globalStyles.twoColContainer, globalStyles.divider]}>
            <Text style={{flex: 1}}>{props.col1}</Text>
            <Text style={{flex: 1}}>: {props.col2}</Text>
        </View>
    );
}
