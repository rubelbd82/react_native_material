import React, {useEffect, useState} from 'react';
import {Button, Text, View} from 'react-native';
import {globalStyles} from "../styles/global_style";
// import Card from "../shared/card";
import Container from "../shared/container";
import Card from "../shared/card";
import TwoCol from "../shared/two_col";
import {Urls} from "../common/constants";
import csvToJson from "../common/utils";

export default function WorldStatus({ navigation }) {

    const [response, setResponse] = useState({
        'loaded': false,
        'data' : {global_total_case: '', global_active: '', global_recover: '', global_death: ''}
    });

    useEffect(() => {
        if (response.loaded) {
            return;
        } else {
            fetch(Urls.google_sheet, { mode: 'cors'})
                .then((data) => data.text())
                .then((dataText) => csvToJson(dataText)
                )
                .then((processedJson) => {
                    console.log(processedJson);
                    setResponse({loaded: true, data: processedJson[0]});
                })
                .catch(error => console.log(error));

            console.log(JSON.stringify(response) );
        }
    })

    return (
        <Container>
            <Card>
                <Text style={globalStyles.headLine}>Globally</Text>
                <TwoCol col1={'Total Cases'} col2={response.data.global_total_case.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}/>
                <TwoCol col1={'Total Active'} col2={response.data.global_active.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}/>
                <TwoCol col1={'Total Recovered'} col2={response.data.global_recover.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}/>
                {
                    console.log(response.data)
                }
                <TwoCol col1={'Total Death'} col2={response.data.global_death.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}/>
            </Card>
        </Container>
    );
}
