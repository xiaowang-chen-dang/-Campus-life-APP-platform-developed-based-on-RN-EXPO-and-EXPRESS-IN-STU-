//需要创建两个tab栏，存放两个页面
import React from 'react';
import { Text, View,Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Ionicons } from '@expo/vector-icons';
import { AllStyle } from '../../style/style';
import East from './east'
import Sanpu from './sanpu'

//创建顶部tab栏
const Tab = createMaterialTopTabNavigator();

export default function TabTop(){
    return(
     
            <Tab.Navigator
            initialRouteName="东海岸校区"
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
            marginTop:5,
          },
        }}
            >

        <Tab.Screen name="东海岸校区" component={East} />
        <Tab.Screen name="桑浦山校区" component={Sanpu} />
       
            </Tab.Navigator>
      

    );
}

