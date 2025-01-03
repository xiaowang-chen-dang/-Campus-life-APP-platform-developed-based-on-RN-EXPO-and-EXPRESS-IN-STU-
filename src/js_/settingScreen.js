
import React, { useState, useEffect } from 'react';
import { View,Text,StyleSheet,ScrollView ,Dimensions} from "react-native";
import { StatusBar } from 'expo-status-bar';
import Choice from '../../components/settingScreen/Choice'
import Head from '../../components/settingScreen/Head'
import HeadImage from '../../components/settingScreen/Modal'
import Name from '../../components/settingScreen/name'


export default function SettingScreen({navigation}){
    return(
        <View>
             <StatusBar style="auto" />
            <Head navigation={navigation}></Head>
            <HeadImage></HeadImage>
            <Name></Name>
        </View>
    );
}