import React, {useState} from 'react';
import {Button, CheckBox, Switch, Text, View} from 'react-native';
import {globalStyles} from "../styles/global_style";
// import Card from "../shared/card";
import Container from "../shared/container";
import Card from "../shared/card";
import TwoCol from "../shared/two_col";

export default function MyStatus({ navigation }) {

    const [test, setTest] = useState(false);

    const pressHandler = () => {
        //navigation.navigate('ReviewDetails');
        navigation.push('List');
    }

    return (
        <Container>


            <Card>
                <Text style={globalStyles.headLine}>Corona Test</Text>

                <View style={[globalStyles.twoColContainer, globalStyles.divider]}>
                    <Text style={{flex: 1}}>I have tested and the result is positive</Text>
                    <Switch
                        onValueChange={ (v) => {
                            setTest(v);
                            console.log("on  value change")
                        }}
                        value={test}
                    />
                </View>

                <View style={[globalStyles.twoColContainer, globalStyles.divider]}>
                    <Text style={{flex: 1}}>I have tested and the result is negative</Text>
                    <Switch
                        onValueChange={ (v) => {
                            setTest(v);
                            console.log("on  value change")
                        }}
                        value={test}
                    />
                </View>

                <View style={[globalStyles.twoColContainer, globalStyles.divider]}>
                    <Text style={{flex: 1}}>I did not test yet</Text>
                    <Switch
                        onValueChange={ (v) => {
                            setTest(v);
                            console.log("on  value change")
                        }}
                        value={test}
                    />
                </View>
            </Card>
            <Card>
                <Text style={globalStyles.headLine}>Symptoms</Text>
                <View style={[globalStyles.twoColContainer, globalStyles.divider]}>
                    <Text style={{flex: 1}}>Cough</Text>
                    <Switch
                        onValueChange={ (v) => {
                            setTest(v);
                            console.log("on  value change")
                        }}
                        value={test}
                    />
                </View>

                <View style={[globalStyles.twoColContainer, globalStyles.divider]}>
                    <Text style={{flex: 1}}>Fever</Text>
                    <Switch
                        onValueChange={ (v) => {
                            setTest(v);
                            console.log("on  value change")
                        }}
                        value={test}
                    />
                </View>

                <View style={[globalStyles.twoColContainer, globalStyles.divider]}>
                    <Text style={{flex: 1}}>Chest pain</Text>
                    <Switch
                        onValueChange={ (v) => {
                            setTest(v);
                            console.log("on  value change")
                        }}
                        value={test}
                    />
                </View>
            </Card>

            <Card>
                <Text style={globalStyles.headLine}>Others</Text>
                <View style={[globalStyles.twoColContainer, globalStyles.divider]}>
                    <Text style={{flex: 1}}>Recently I have returned from abroad</Text>
                    <Switch
                        onValueChange={ (v) => {
                            setTest(v);
                            console.log("on  value change")
                        }}
                        value={test}
                    />
                </View>

                <View style={[globalStyles.twoColContainer, globalStyles.divider]}>
                    <Text style={{flex: 1}}>I am older than 50 years</Text>
                    <Switch
                        onValueChange={ (v) => {
                            setTest(v);
                            console.log("on  value change")
                        }}
                        value={test}
                    />
                </View>
            </Card>
        </Container>
    );
}
