import Head from '../../components/calendar/Head'
import Body from '../../components/calendar/Body'
import React, { useState, useEffect } from 'react';
import { View,Text,StyleSheet,ScrollView ,Dimensions} from "react-native";
import { StatusBar } from "expo-status-bar";
import {AllStyle} from "../../style/style"
const Calendar = ({navigation})=>{
    return(
        <View>
            {/* 顶部通知栏背景颜色一致 */}
             <StatusBar backgroundColor={AllStyle.color.homeCard4} />
            <Head navigation={navigation}></Head>
            <Body></Body>
        </View>
    );
}
export default Calendar;