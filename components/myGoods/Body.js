//需要创建两个tab栏 一个放二手商品 一个放失物招领

import React from 'react';
import { Text, View,Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Ionicons } from '@expo/vector-icons';
import { AllStyle } from '../../style/style';
import LostAndFound from './lostAndFound'
import TwoHands from './twoHands'
//创建顶部tab栏
const Tab = createMaterialTopTabNavigator();

export default function TabTop(){
    return(
     
            <Tab.Navigator
            initialRouteName="失物招领"
        screenOptions={{
            //被选中文字样式
          tabBarActiveTintColor: AllStyle.color.tabIconFocused,
          tabBarInactiveTintColor: 'gray',
          //tab文字样式
          tabBarLabelStyle: { fontSize: 14, fontWeight: 'bold' },
          //下划线样式
          tabBarIndicatorStyle: { backgroundColor:AllStyle.color.tabTextFocused  },

          tabBarStyle: {
            backgroundColor:AllStyle.color.contactTab,
            borderRadius:8,
            marginTop:10,
          },
        }}
            >

        <Tab.Screen name="失物招领" component={LostAndFound} />
        <Tab.Screen name="二手商品" component={TwoHands} />
       
            </Tab.Navigator>
      

    );
}

