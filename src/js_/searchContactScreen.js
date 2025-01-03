import Body from '../../components/searchContact/Body'
import React from 'react';
import { StyleSheet, Text, View, SectionList } from 'react-native';
import Head from '../../components/searchContact/head';
export default function SearchContact({navigation}){
    return(
        <View style={{
            flex:1,
        }}>
            <Head navigation={navigation}></Head>
            <Body></Body>
        </View>
    );
}