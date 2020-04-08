import React from 'react';
import {Alert, Button, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {globalStyles} from "../styles/global_style";
// import Card from "../shared/card";
import Container from "../shared/container";
import Card from "../shared/card";
import {notifyMessage} from "../common/utils";

export default function Home({ navigation }) {

    const actionGlobalStatus = () => {
        //navigation.navigate('ReviewDetails');
        navigation.push('GlobalStatus');
    }

    const actionMyStatus = () => {
        //navigation.navigate('ReviewDetails');
        navigation.push('MyStatus');
    }

    const actionCoronaNearMe = () => {
        //navigation.navigate('ReviewDetails');
        navigation.push('CoronaList', {'conditionReal' : true});
    }

    const actionPossibleCoronaNearMe = () => {
        //navigation.navigate('ReviewDetails');
        navigation.push('CoronaList', {'conditionReal' : false});
    }


    return (
        <Container>
            <TouchableOpacity style={globalStyles.buttonContainer} onPress={actionMyStatus} >
                <Text style={globalStyles.buttonText}>My Status</Text>
            </TouchableOpacity>
            <TouchableOpacity style={globalStyles.buttonContainer} onPress={actionCoronaNearMe} >
                <Text style={globalStyles.buttonText}>Corona Near Me</Text>
            </TouchableOpacity>
            <TouchableOpacity style={globalStyles.buttonContainer} onPress={actionPossibleCoronaNearMe} >
                <Text style={globalStyles.buttonText}>Possible patient with symptoms</Text>
            </TouchableOpacity>
            <TouchableOpacity style={globalStyles.buttonContainer} onPress={actionGlobalStatus} >
                <Text style={globalStyles.buttonText}>Global Status</Text>
            </TouchableOpacity>
        </Container>
    );
}



export const styles = StyleSheet.create({

});
