import {Platform, ToastAndroid} from "react-native";
import { Alert } from 'react-native';

export  default function csvToJson(csv)  {
    const lines = csv.split("\n");

    const result = [];

    const headers = lines[0].split(",").map((item) =>  item.trim());

    for (var i = 1; i < lines.length; i++) {

        const obj = {};
        const currentline = lines[i].split(",").map((item) =>  item.trim());

        for (let j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentline[j];
        }

    result.push(obj);
    }

    return result; //JavaScript object
    // return JSON.stringify(result); //JSON
};

export function notifyMessage(title, message, toast=true) {
    if (Platform.OS === 'android' && toast) {
        ToastAndroid.show(message, ToastAndroid.SHORT)
    } else {
        Alert.alert(
            title,
            message,
            [
                {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            { cancelable: true });
    }
}

export function tryAgain(title, message, action = () => {log('No action provided')}) {
        Alert.alert(
            title,
            message,
            [
                {text: 'Try again', onPress:action},
            ],
            { cancelable: true });
}



export function log(message, object:any = '') {
    console.log(message);
    console.log(object);
}


