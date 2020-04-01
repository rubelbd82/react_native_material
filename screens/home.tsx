import React from 'react';
import {Button, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {globalStyles} from "../styles/global_style";
// import Card from "../shared/card";
import Container from "../shared/container";
import Card from "../shared/card";

export default function Home({ navigation }) {

    const actionGlobalStatus = () => {
        //navigation.navigate('ReviewDetails');
        navigation.push('GlobalStatus');
    }

    const actionMyStatus = () => {
        //navigation.navigate('ReviewDetails');
        navigation.push('MyStatus');
    }

    const actionWorldMap = () => {
        //navigation.navigate('ReviewDetails');
        navigation.push('WorldMap');
    }

    return (
        <Container>
            <TouchableOpacity style={globalStyles.buttonContainer} onPress={actionGlobalStatus} >
                <Text style={globalStyles.buttonText}>Global Status</Text>
            </TouchableOpacity>
            <TouchableOpacity style={globalStyles.buttonContainer} onPress={actionMyStatus} >
                <Text style={globalStyles.buttonText}>My Status</Text>
            </TouchableOpacity>
            <TouchableOpacity style={globalStyles.buttonContainer} onPress={actionWorldMap} >
                <Text style={globalStyles.buttonText}>Map</Text>
            </TouchableOpacity>

        </Container>
    );
}



export const styles = StyleSheet.create({

});
