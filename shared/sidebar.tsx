import React, {Props} from "react";
import {View, Text, StyleSheet, ScrollView, ImageBackground, Image} from "react-native";
import {DrawerNavigatorItems} from "react-navigation-drawer";
import {Ionicons} from '@expo/vector-icons';

/*This file is for future use only. */

let Sidebar = props => (
    <ScrollView>
        <ImageBackground
            source={require('../assets/sidebar_background.png')}
            style={{width: undefined, padding: 16, paddingTop: 48}}
        >
            <Image source={require('../assets/icon.png')} style={styles.profile} />
            <Text style={styles.name}>Sophie stweart</Text>

            <View style={{flexDirection: "row"}}>
                <Text style={styles.followers}>743 Followers</Text>
                <Ionicons name="md-people" size={16} color="rgba(255, 255, 255, 0.8)"/>
            </View>
        </ImageBackground>


        <View style={styles.container}>
            <DrawerNavigatorItems {...props} />
        </View>
    </ScrollView>
)


export default Sidebar;




const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    profile: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 3,
        borderColor: "#FFF"
    },
    name: {
        color: "#FFF",
        fontSize: 20,
        fontWeight: "800",
        marginVertical: 8
    },
    followers: {
        color: "rgba(255, 255, 0.8)",
        fontSize: 13,
        marginRight: 4
    }


});
