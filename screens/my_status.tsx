import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Alert, AsyncStorage, Switch, Text, TouchableOpacity, View} from 'react-native';
import {globalStyles} from "../styles/global_style";
import Container from "../shared/container";
import Card from "../shared/card";
import {Urls} from "../common/constants";
import {ScrollView} from "react-native-gesture-handler";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";
import {log, notifyMessage} from "../common/utils";

export default function MyStatus({ navigation }) {
    const [testPositive, setTestPositive] = useState(false);
    const [testNegative, setTestNegative] = useState(false);
    const [notTested, setNotTested] = useState(false);
    const [symptomCough, setSymptomCough] = useState(false);
    const [symptomFever, setSymptomFever] = useState(false);
    const [symptomChestPain, setSymptomChestPain] = useState(false);
    const [symptomSmell, setSymptomSmell] = useState(false);
    const [returnedFromAbroad, setReturnedFromAbroad] = useState(false);
    const [olderThan50, setOlderThan50] = useState(false);
    const [enableLocation, setEnableLocation] = useState(true);
    const [showActivityIndicator, setShowActivityIndicator] = useState(false);
    const [rowId, setRowId] = useState(0);
    let localDataPopulated = false;
    let latitude = 0.0;
    let longitude = 0.0;
    let newRowId = 0;

    const [state, setState] = useState({
        mapRegion: null,
        hasLocationPermissions: false,
        locationResult: null
    });

    useEffect(() => {
        if (!localDataPopulated) {
            populateLocalData()
            // AsyncStorage.clear();
            localDataPopulated = true;
        }

    }, [])

    let _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            setState({ mapRegion: state.mapRegion, hasLocationPermissions: state.hasLocationPermissions, locationResult: 'Permission to access location was denied' });
            notifyMessage('Fail', 'Permission to access location was denied', false);
            return;
        } else {
            setState({ mapRegion: state.mapRegion, hasLocationPermissions: true, locationResult: state.locationResult });
        }

        let location = await Location.getCurrentPositionAsync({});
        setState({ mapRegion: state.mapRegion, hasLocationPermissions: state.hasLocationPermissions, locationResult: JSON.stringify(location) });
        latitude = location.coords.latitude;
        longitude = location.coords.longitude;

        callApi();

        setState({
            mapRegion: { latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 },
            hasLocationPermissions: state.hasLocationPermissions,
            locationResult: JSON.stringify(location)
        });

    };

    const successHandler = (message: string, receivedId: number) => {
        setShowActivityIndicator(false);
        log("received id from server: " + receivedId);
        setRowId(receivedId)
        saveLocalData(receivedId);
        notifyMessage('Success', message, false);
    }

    const failHandler = (message) => {
        setShowActivityIndicator(false);
        notifyMessage('Fail', message, true);
    }


    const testPositiveSwitchController = (v) => {
        if (v === true) {
            setTestNegative(false);
            setNotTested(false);
        }
    }

    const testNegativeSwitchController = (v) => {
        if (v === true) {
            setNotTested(false);
        }
    }

    const callApi = () => {
        setShowActivityIndicator(true);

        if (!Number.isNaN(rowId)) {
            newRowId = rowId
        }

        fetch(Urls.corona_post, {
            method: 'POST',
            mode: 'cors',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Headers': 'mytoken',
                'Access-Control-Allow-Origin': '*',
            },

            body: JSON.stringify({
                testPositive: testPositive,
                testNegative: testNegative,
                notTested: notTested,
                symptomCough: symptomCough,
                symptomFever: symptomFever,
                symptomChestPain: symptomChestPain,
                symptomSmell: symptomSmell,
                returnedFromAbroad: returnedFromAbroad,
                olderThan50: olderThan50,
                latitude: latitude,
                longitude: longitude,
                rowId:newRowId
            }),
        })
            .then((data) => data.json())
            .then((dataJson) => {
                console.log("Response: ")
                console.log(dataJson);
                log('ID2: ', newRowId);

                if (dataJson.status == 200) {
                    successHandler(dataJson.message, dataJson.rowId);
                } else {
                    failHandler('Failed to save data')
                }

            })
            .catch(error =>  {
                failHandler(error)

            });
    }

    const saveLocalData = (receivedRowId) => {
        AsyncStorage.setItem('testPositive', JSON.stringify(testPositive));
        AsyncStorage.setItem('testNegative', JSON.stringify(testNegative));
        AsyncStorage.setItem('notTested', JSON.stringify(notTested));
        AsyncStorage.setItem('symptomCough', JSON.stringify(symptomCough));
        AsyncStorage.setItem('symptomFever', JSON.stringify(symptomFever));
        AsyncStorage.setItem('symptomChestPain', JSON.stringify(symptomChestPain));
        AsyncStorage.setItem('symptomSmell', JSON.stringify(symptomSmell));
        AsyncStorage.setItem('returnedFromAbroad', JSON.stringify(returnedFromAbroad));
        AsyncStorage.setItem('olderThan50', JSON.stringify(olderThan50));
        AsyncStorage.setItem('latitude', String(latitude));
        AsyncStorage.setItem('longitude', String(longitude));
        AsyncStorage.setItem('rowId', String(receivedRowId));
    }

    const populateLocalData = () => {
        AsyncStorage.getItem('testPositive').then(res => { if (res !== null) {setTestPositive(JSON.parse(res))}});
        AsyncStorage.getItem('testNegative').then(res => { if (res !== null) {setTestNegative(JSON.parse(res))}});
        AsyncStorage.getItem('notTested').then(res => { if (res !== null) {setNotTested(JSON.parse(res))}});
        AsyncStorage.getItem('symptomCough').then(res => { if (res !== null) {setSymptomCough(JSON.parse(res))}});
        AsyncStorage.getItem('symptomFever').then(res => { if (res !== null) {setSymptomFever(JSON.parse(res))}});
        AsyncStorage.getItem('symptomChestPain').then(res => { if (res !== null) {setSymptomChestPain(JSON.parse(res))}});
        AsyncStorage.getItem('symptomSmell').then(res => { if (res !== null) {setSymptomSmell(JSON.parse(res))}});
        AsyncStorage.getItem('returnedFromAbroad').then(res => { if (res !== null) {setReturnedFromAbroad(JSON.parse(res))}});
        AsyncStorage.getItem('olderThan50').then(res => { if (res !== null) {setOlderThan50(JSON.parse(res))}});
        AsyncStorage.getItem('latitude').then(res => { if (res !== null) { latitude = Number(res)}});
        AsyncStorage.getItem('longitude').then(res => { if (res !== null) { longitude = Number(res)}});

        AsyncStorage.getItem('rowId').then(res => { if (res !== null) {
            // Having trouble to set the value using useState()
            setRowId(Number(res));
            newRowId = Number(res);
            }}).then(() => {
                log("Check value of rowId again", rowId)
            });

    }

    const actionSubmit = () => {
        if (enableLocation) {
            _getLocationAsync().then(r => {});
        } else {
            callApi();
        }

    }

    return (
        <Container>
            <ScrollView>
            <Card>
                <Text style={globalStyles.headLine}>Corona Test</Text>

                <View style={[globalStyles.twoColContainer, globalStyles.divider]}>
                    <Text style={{flex: 1}}>I have tested and the result is positive</Text>
                    <Switch
                        onValueChange={ (v) => {setTestPositive(v); testPositiveSwitchController(v)}}
                        value={testPositive}
                    />
                </View>

                <View style={[globalStyles.twoColContainer, globalStyles.divider]} >
                    <Text style={{flex: 1}} >I have tested and the result is negative</Text>
                    <Switch disabled={testPositive}
                        onValueChange={ (v) => { setTestNegative(v); testNegativeSwitchController(v) }}
                        value={testNegative}
                    />
                </View>

                <View style={[globalStyles.twoColContainer, globalStyles.divider]}>
                    <Text style={{flex: 1}}>I did not test yet</Text>
                    <Switch
                        disabled={testPositive || testNegative}
                        onValueChange={ (v) => setNotTested(v)}
                        value={notTested}
                    />
                </View>
            </Card>
            <Card>
                <Text style={globalStyles.headLine}>Symptoms</Text>
                <View style={[globalStyles.twoColContainer, globalStyles.divider]}>
                    <Text style={{flex: 1}}>Cough</Text>
                    <Switch
                        onValueChange={ (v) => setSymptomCough(v)}
                        value={symptomCough}
                    />
                </View>

                <View style={[globalStyles.twoColContainer, globalStyles.divider]}>
                    <Text style={{flex: 1}}>Fever</Text>
                    <Switch
                        onValueChange={ (v) => setSymptomFever(v)}
                        value={symptomFever}
                    />
                </View>

                <View style={[globalStyles.twoColContainer, globalStyles.divider]}>
                    <Text style={{flex: 1}}>Chest pain</Text>
                    <Switch
                        onValueChange={ (v) => setSymptomChestPain(v)}
                        value={symptomChestPain}
                    />
                </View>

                <View style={[globalStyles.twoColContainer, globalStyles.divider]}>
                    <Text style={{flex: 1}}>Loss of smell</Text>
                    <Switch
                        onValueChange={ (v) => setSymptomSmell(v)}
                        value={symptomSmell}
                    />
                </View>
            </Card>

            <Card>
                <Text style={globalStyles.headLine}>Symptoms</Text>
                <View style={[globalStyles.twoColContainer, globalStyles.divider]}>
                    <Text style={{flex: 1}}>Recently I have returned from abroad</Text>
                    <Switch
                        onValueChange={ (v) => setReturnedFromAbroad(v)}
                        value={returnedFromAbroad}
                    />
                </View>

                <View style={[globalStyles.twoColContainer, globalStyles.divider]}>
                    <Text style={{flex: 1}}>I am older than 50 years</Text>
                    <Switch
                        onValueChange={ (v) => setOlderThan50(v)}
                        value={olderThan50}
                    />
                </View>


                <View style={[globalStyles.twoColContainer, globalStyles.divider]}>
                    <Text style={{flex: 1}}>Permit us to get your location </Text>
                    <Switch
                        onValueChange={ (v) => setEnableLocation(v)}
                        value={enableLocation}
                    />
                </View>

                <View>
                    <Text style={globalStyles.smallText}>We shall not share your exact location. You may disable this option, if you don't care for the society.</Text>
                </View>

                <View>
                    <TouchableOpacity style={globalStyles.buttonContainer} onPress={actionSubmit}  >
                        <Text style={globalStyles.buttonText}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </Card>

            </ScrollView>
            {showActivityIndicator &&
            <View style={globalStyles.loading}>
                <Text>Processing... </Text>
                <ActivityIndicator size="large" color="#0000ff" animating={true}/>
            </View>
            }

        </Container>
    );
}
