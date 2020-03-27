import React from 'react';
import {Text} from 'react-native';
import Container from "../shared/container";

export default function Details({navigation}) {
    return (
        <Container>
            <Text>Details Screen </Text>
            {/*<Text>Details Screen {navigation.getParam('title')} </Text>*/}
        </Container>
    );
}
