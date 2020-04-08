import React, {useEffect, useState} from 'react';
import {Button, Dimensions, Text, StyleSheet, View} from 'react-native';
import {globalStyles} from "../styles/global_style";
import Container from "../shared/container";
import Card from "../shared/card";
import MapView, {Circle} from 'react-native-maps';



import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';


let RADIUS = 5000;

export default function WorldMap({ navigation }) {
    const [state, setState] = useState({
        mapRegion: null,
        hasLocationPermissions: false,
        locationResult: null
    });
    const [locationFetched, setLocationFetched] = useState(false);
    const [mapCreated, setMapCreated] = useState(false);

    let handleMapRegionChange = (mapRegion) => {
        console.log(mapRegion);

        if (locationFetched == false) {
            setState({ mapRegion: mapRegion, hasLocationPermissions: state.hasLocationPermissions, locationResult: state.locationResult });
            setLocationFetched(true)
        }
    }

    let _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            setState({ mapRegion: state.mapRegion, hasLocationPermissions: state.hasLocationPermissions, locationResult: 'Permission to access location was denied' });
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

        setMapCreated(true);

    };



    useEffect(() => {
        if (locationFetched == false && mapCreated == false) {
            _getLocationAsync();
        }

    });

    const pressHandler = () => {
        //navigation.navigate('ReviewDetails');
        navigation.push('List');
    }

    return (
        <View style={styles.container}>
            <Text style={styles.paragraph}>
                Pan, zoom, and tap on the map!
            </Text>

            {
                (typeof(state) == 'undefined' || typeof(state.locationResult) == 'undefined') ?
                    <Text>Finding your current location...</Text> :
                    state.hasLocationPermissions === false ?
                        <Text>Location permissions are not granted.</Text> :
                        state.mapRegion === null ?
                            <Text>Map region doesn't exist.</Text> :
                            <View><Text>Uncomment Map view</Text></View>
                            /*<MapView
                                style={{ alignSelf: 'stretch', height: 400 }}
                                region={state.mapRegion}
                                onRegionChange={handleMapRegionChange}
                            >
                                <MapView.Circle
                                    key = { (state.mapRegion.latitude + state.mapRegion.longitude).toString() }
                                    center = { {
                                        latitude: state.mapRegion.latitude, longitude: state.mapRegion.longitude
                                    } }
                                    radius = { RADIUS }
                                    strokeWidth = { 1 }
                                    strokeColor = { '#1a66ff' }
                                    fillColor = { 'rgba(230,238,255,0.5)' }

                                />


                                <MapView.Circle
                                    key = { (state.mapRegion.latitude + state.mapRegion.longitude).toString() }
                                    center = { {
                                        latitude: state.mapRegion.latitude, longitude: state.mapRegion.longitude
                                    } }
                                    radius = { 1000 }
                                    strokeWidth = { 1 }
                                    strokeColor = { '#0000ff' }
                                    fillColor = { 'rgba(230,238,255,0.5)' }

                                />

                            </MapView>*/


            }

            <Text>
                Location: {state.locationResult}
            </Text>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    mapStyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#34495e',
    },
});
