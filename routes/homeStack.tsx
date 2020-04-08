import React from "react";
import {createStackNavigator} from 'react-navigation-stack';
import Details from '../screens/details';
import Header from "../shared/header";
import Home from '../screens/home';
import {globalStyles} from "../styles/global_style";
import WorldStatus from "../screens/world_status";
import MyStatus from "../screens/my_status";
import WorldMap from "../screens/world_map";
import CoronaList from "../screens/corona_list";
import {Colors} from "../common/colors";

const screens = {
    Home: {
        screen: Home,
        navigationOptions: ({ navigation }) => {
            return {
                headerTitle: () => <Header title='Home' navigation={navigation}/>
            }
        },
    },
    CoronaList: {
        screen: CoronaList,
        navigationOptions: ({ navigation }) => {
            return {
                headerTitle: () => <Header title='Corona list' navigation={navigation}/>
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

    WorldMap: {
        screen: WorldMap,
        navigationOptions: ({ navigation }) => {
            return {
                headerTitle: () => <Header title='Map' navigation={navigation}/>
            }
        },
    },

};

// home stack navigator screens
const HomeStack = createStackNavigator(screens, {
    defaultNavigationOptions: {
        headerTintColor: Colors.white,
        headerStyle: globalStyles.parentHeaderStyle,
    }
});

export default HomeStack;
