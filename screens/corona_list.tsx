import React, {useEffect, useState} from 'react';
import {
    ActivityIndicator,
    Button,
    FlatList,
    Text,
    TouchableOpacity,
    View,
    StyleSheet,
    Image,
    AsyncStorage
} from 'react-native';
import {globalStyles} from "../styles/global_style";
import Card from "../shared/card";
import Container from "../shared/container";
import {Urls} from "../common/constants";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";
import {log, notifyMessage, tryAgain} from "../common/utils";
import {Ionicons} from "@expo/vector-icons";
import {Colors} from "../common/colors";

export default function CoronaList({ navigation }) {

    const [state, setState] = useState({
        mapRegion: null,
        hasLocationPermissions: false,
        locationResult: null
    });
    const [dataFetched, setLocationFetched] = useState(false);
    const [showActivityIndicator, setShowActivityIndicator] = useState(false);
    const [rowId, setRowId] = useState(0);
    let newRowId = 0;
    let latitude = 0.0;
    let longitude = 0.0;

    const [response, setResponse] = useState({
        'loaded': false,
        'data' : []
    });

    let tryCount = 0;

    const successHandler = (message: string, data: any) => {
        setShowActivityIndicator(false);
        setResponse({'loaded'  : true, 'data' : data});
    }

    const failHandler = (message) => {
        setShowActivityIndicator(false);
        notifyMessage('Fail', message, true);
        // Go back
        navigation.goBack()
    }

    let _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            setState({ mapRegion: state.mapRegion, hasLocationPermissions: state.hasLocationPermissions, locationResult: 'Permission to access location was denied' });
            // try again
            tryAgain('Fail', 'Permission to access location was denied', () => {_getLocationAsync()});
            return;
        } else {
            setState({ mapRegion: state.mapRegion, hasLocationPermissions: true, locationResult: state.locationResult });
        }

        let location = await Location.getCurrentPositionAsync({});
        setState({ mapRegion: state.mapRegion, hasLocationPermissions: state.hasLocationPermissions, locationResult: JSON.stringify(location) });

        // Center the map on the location we just fetched.
        setState({
            mapRegion: { latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 },
            hasLocationPermissions: state.hasLocationPermissions,
            locationResult: JSON.stringify(location)
        });

        log('LATITUDE', location.coords.latitude)

        latitude = location.coords.latitude;
        longitude = location.coords.longitude;

        callApi();

    };

    useEffect(() => {
        if (dataFetched == false) {
            log('use effect started')
            AsyncStorage.getItem('rowId').then(res => { if (res !== null) {
                setRowId(Number(res));
                newRowId = Number(res);
            }}).then(() => { log('rowId id: ', rowId); });
            _getLocationAsync();
            setLocationFetched(true);
        }
    });

    const callApi = () => {
        setShowActivityIndicator(true);
        if (!Number.isNaN(rowId)) {
            if (rowId != 0) {
                newRowId = rowId;
            }

        }

        let postBody = JSON.stringify({
            latitude: latitude,
            longitude: longitude,
            distance: 30,
            conditionReal: navigation.getParam('conditionReal'),
            rowId: newRowId
        });

        log('postbody', postBody)
        fetch(Urls.corona_get_list, {
            method: 'POST',
            mode: 'cors',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Headers': 'mytoken',
                'Access-Control-Allow-Origin': '*',
            },
            body: postBody,
        })
            .then((data) => data.json())
            .then((dataJson) => {
                // console.log("Response: ")
                console.log(dataJson);

                if (dataJson.status == 200) {
                    if (dataJson.data.length > 0) {
                        successHandler(dataJson.message, dataJson.data);
                    } else {
                        tryCount = tryCount + 1;
                        if (tryCount < 3) {
                            callApi();
                        } else {
                            if (navigation.getParam('conditionReal')) {
                                failHandler('No corona patient found near you. Visit again')
                            } else {
                                failHandler('No person with corona symptom found near you. Visit again')
                            }
                        }
                    }
                } else {
                    failHandler('Failed to get data from server. ')
                }
            })
            .catch(error =>  {
                failHandler(error)

            });
    }

    let message;

    if ((navigation.getParam('conditionReal'))) {
        message = <Card><Text>Following patients have tested and the result is Positive. </Text></Card>
    } else {
        message = <Card><Text>Following people have symptoms but they did not test yet. </Text></Card>
    }

    return (
        <Container>
            {message}
            <FlatList
                data={response.data}
                keyExtractor={(item) => item[0].longValue.toString()}
                numColumns={2}
                renderItem={({ item }) => (
                <TouchableOpacity onPress={() => navigation.navigate('ReviewDetails', item)}>
                    <Card>
                        <View style={{ flex:1, margin:5, padding: 5, justifyContent: 'center',
                            alignItems: 'center',  }} >
                            <Ionicons name="md-contact" size={80} color={Colors.facebook} style={{}} />
                        </View>
                        <Text>{(Math.round(item[1].doubleValue * 100) / 100).toFixed(2)  } Kilometer away </Text>
                    </Card>
                </TouchableOpacity>
            )} />

            {showActivityIndicator &&
            <View style={globalStyles.loading}>
                <ActivityIndicator size="large" color="#0000ff" animating={showActivityIndicator}/>
            </View>
            }
        </Container>

    );
}
