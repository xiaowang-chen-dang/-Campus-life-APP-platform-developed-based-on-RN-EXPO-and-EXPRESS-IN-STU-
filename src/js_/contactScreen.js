import React from 'react';
import { StyleSheet, Text, View, SectionList } from 'react-native';
import Head from '../../components/contact/head'
import ContactCard from '../../components/contact/contactCard'
import Body from '../../components/contact/Body'
const Contact = ({navigation}) => {
  
  return (
    //flex1能够使tab栏占据剩下的页面
    <View style={{
      flex:1,
    }}>
        <Head navigation={navigation}></Head>
        <Body/>

    </View>
  );
};

const styles = StyleSheet.create({
 
});

export default Contact;