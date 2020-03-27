import React from "react";
import {createStackNavigator} from 'react-navigation-stack';
import Details from '../screens/details';
import Header from "../shared/header";
import Home from '../screens/home';
import List from "../screens/list";
import {globalStyles} from "../styles/global";


const screens = {
    Home: {
        screen: Home,
        navigationOptions: ({ navigation }) => {
            return {
                headerTitle: () => <Header title='Home' navigation={navigation}/>
            }
        },
    },
    List: {
        screen: List,
        navigationOptions: ({ navigation }) => {
            return {
                headerTitle: () => <Header title='Price' navigation={navigation}/>
            }
        },
    },
    Details: {
        screen: Details,
    },


};

// home stack navigator screens
const HomeStack = createStackNavigator(screens, {
    defaultNavigationOptions: {
        headerTintColor: '#444',
        headerStyle: globalStyles.parentHeaderStyle,
    }
});

export default HomeStack;
