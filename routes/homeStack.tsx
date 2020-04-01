import React from "react";
import {createStackNavigator} from 'react-navigation-stack';
import Details from '../screens/details';
import Header from "../shared/header";
import Home from '../screens/home';
import {globalStyles} from "../styles/global_style";
import WorldStatus from "../screens/world_status";
import MyStatus from "../screens/my_status";
import WorldMap from "../screens/world_map";


const screens = {
    WorldMap: {
        screen: WorldMap,
        navigationOptions: ({ navigation }) => {
            return {
                headerTitle: () => <Header title='Map' navigation={navigation}/>
            }
        },
    },
    Home: {
        screen: Home,
        navigationOptions: ({ navigation }) => {
            return {
                headerTitle: () => <Header title='Home' navigation={navigation}/>
            }
        },
    },
    MyStatus: {
        screen: MyStatus,
        navigationOptions: ({ navigation }) => {
            return {
                headerTitle: () => <Header title='My Status' navigation={navigation}/>
            }
        },
    },
    GlobalStatus: {
        screen: WorldStatus,
        navigationOptions: ({ navigation }) => {
            return {
                headerTitle: () => <Header title='Global Status' navigation={navigation}/>
            }
        },
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
