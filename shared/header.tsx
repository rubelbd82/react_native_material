import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';
import {globalStyles} from "../styles/global_style";
import {Colors} from "../utils/colors";

export default function Header({ title, navigation }) {

    const openMenu = () => {
        navigation.openDrawer();
    }

    return (
        <View style={globalStyles.header}>

{/*            <MaterialIcons name='menu' size={28} onPress={openMenu} style={globalStyles.drawerIcon} />*/}
            <View>
                <Text style={[globalStyles.headerText, styles.headerText]}>{title}</Text>
            </View>
        </View>
    );
}

export const styles = StyleSheet.create({

    headerText: {
        marginLeft: 30,
    },

});
