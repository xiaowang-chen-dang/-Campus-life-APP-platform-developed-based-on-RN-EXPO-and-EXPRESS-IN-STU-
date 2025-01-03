import React, { useState, useEffect } from 'react';
import { View,Text,StyleSheet,ScrollView } from "react-native";
import {DefaultTheme, Provider as PaperProvider,Chip} from 'react-native-paper';
import { StatusBar } from "expo-status-bar";
import { AllStyle } from '../../style/style';
import Head from '../../components/my/header'
import { client } from '../../data/my/my';
import Information from '../../components/my/information';
import Choice from '../../components/my/choice';

// 自定义react-native-paper的主题，修改默认字体颜色为黑色
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    text: 'black',  // 设置字体颜色为黑色
  },
};

const MyScreen = ({navigation}) =>{
  const category = [
    {id:1,title:'我的商品',screen:'myGoods'},
    {id:2,title:'我的收藏',screen:'like'},
    // {id:3,title:'消息列表',screen:'myGoods'},
   ]
  console.log(client[0].id,client[0].name,client[0].src)
    return (
      <PaperProvider theme={theme}>
        <StatusBar/>
        <View>
      <Head></Head>
      <Information src={client[0].src} id={client[0].id} name={client[0].name} navigation={navigation}></Information>

      {
        category.map((category,index)=>{
          return(  <Choice key={category.id} title={category.title} navigation={navigation} screen={category.screen}/>);  
        })
      }
      </View>
      </PaperProvider>
    );
  };

export default MyScreen;