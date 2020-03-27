import React, {useEffect, useState} from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {globalStyles} from "../styles/global";
import Card from "../shared/card";
import BannerAd from "../shared/bannerad";

export default function List({ navigation }) {

    const [response, setResponse] = useState({
        'loaded': false,
        'data' : []
    });

    const baseURL = 'http://webindream.com/android/sebangladesh/7/dse.php';
    // const baseURL = 'http://google.com';

    useEffect(() => {
        if (response.loaded) {
            console.log("Loaded...")
            return;
        } else {
            fetch(baseURL, { mode: 'cors'})
                .then((data) => data.json())
                .then((dataJson) => {
                        setResponse({'loaded'  : true, 'data' : dataJson});
                    }
                )
                .catch(error => console.log(error))
        }
    })

    const pressHandler = () => {
        //navigation.navigate('ReviewDetails');
        navigation.push('Details');
    }

    return (
        <View style={globalStyles.container}>
            <FlatList
                data={response.data}
                keyExtractor={(item) => item.n}
                numColumns={1}
                renderItem={({ item }) => (
                <TouchableOpacity onPress={() => navigation.navigate('ReviewDetails', item)}>
                    <Card >
                        <Text  style={globalStyles.list}>{ item.n }</Text>
                    </Card>
                </TouchableOpacity>
            )} />
            <BannerAd/>
        </View>
    );
}
