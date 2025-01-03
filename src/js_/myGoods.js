import React from 'react';
import { StyleSheet, Text, View, SectionList } from 'react-native';
import Head from '../../components/myGoods/Head'
import { StatusBar } from 'expo-status-bar';
import Body from '../../components/myGoods/Body';
export default function MyGoods({navigation}){
    return(
        <View style={{
            flex:1,
          }}>
            <StatusBar style='auto'></StatusBar>
            <Head navigation = {navigation}></Head>
            <Body></Body>
        </View>
    );
}