import React from 'react';
import {Button, Text, View} from 'react-native';
import {globalStyles} from "../styles/global_style";
// import Card from "../shared/card";
import Container from "../shared/container";
import Card from "../shared/card";
import TwoCol from "../shared/two_col";

export default function WorldStatus({ navigation }) {

    const pressHandler = () => {
        //navigation.navigate('ReviewDetails');
        navigation.push('List');
    }

    return (
        <Container>
            <Card>
                <Text style={globalStyles.headLine}>Globally</Text>
                <TwoCol col1={'Total Cases'} col2={'450000000'}/>
                <TwoCol col1={'Death'} col2={'500000'}/>
            </Card>
        </Container>
    );
}
