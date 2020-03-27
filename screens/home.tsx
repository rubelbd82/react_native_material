import React from 'react';
import {Button, Text} from 'react-native';
import {globalStyles} from "../styles/global";
import Card from "../shared/card";
import Container from "../shared/container";

export default function Home({ navigation }) {

    const pressHandler = () => {
        //navigation.navigate('ReviewDetails');
        navigation.push('List');
    }

    return (
        <Container>
            <Card>
                <Text style={globalStyles.titleText}>Home Screen</Text>
                <Button title='to list screen' onPress={pressHandler} />
            </Card>
        </Container>
    );
}
