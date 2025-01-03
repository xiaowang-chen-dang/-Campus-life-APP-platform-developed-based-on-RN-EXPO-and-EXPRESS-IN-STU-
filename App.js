//import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { AllStyle } from './style/style';

import HomeScreen from'./src/js_/homeScreen';
import MyScreen from './src/js_/myScreen';
import OaScreen from './src/js_/oaScreen';
import LostAndFound from './src/js_/lostAndFound'
import TextScreen from './src/js_/textScreen'
import Calendar from './src/js_/calendarScreen'
import Web from './src/js_/webScreen'
import Contact from './src/js_/contactScreen'
import SearchContact from './src/js_/searchContactScreen';
import Course from './src/js_/courseScreen'
import CouseLogin from './src/js_/courseLogin'
import Setting from './src/js_/settingScreen'
import MyGoods from './src/js_/myGoods'
import SigninScreen from './src/tsx_/Signin';
import SignupScreen from './src/tsx_/Signup';
import ForgotScreen from './src/tsx_/Forgot';
import NewsDetailScreen from './src/js_/NewsDetail';
//import HomeScreen from './app/Home';
import TwoHands from './src/js_/twoHandsScreen'
import Discussion from './src/js_/discussionScreen';
import Like from './src/js_/likeScreen';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
  return(
  <Tab.Navigator
  screenOptions={({ route }) => ({
    //选中和未选中的图标颜色与样式
    tabBarIcon: ({ focused, color }) => {
      let iconName;
      if (route.name === 'Home') {
        iconName = focused ? 'home' : 'home-outline';
      } else if (route.name === 'oa') {
        iconName = focused ? 'business' : 'business-outline'; // Oa 图标
      } else if (route.name === 'my') {
        iconName = focused ? 'person' : 'person-outline'; // My 图标
      }
      color = focused ? AllStyle.color.tabIconFocused:AllStyle.color.tabIcon;
      return <Ionicons name={iconName} size={30} color={color}  />;
    },
    //调整图标与导航栏的顶部
    tabBarStyle: {
      height: 70,  // 设置底部导航栏的高度
      paddingTop: 10, // 调整底部导航栏的间距，避免图标紧贴底部
      backgroundColor:AllStyle.color.tab,
    },
    //覆盖Tab.Screen组件生成的名字 提供点击前点击后的颜色
    tabBarLabel: ({ focused }) => {
      // 根据焦点状态设置文字颜色
      return (
        <Text 
        style={{ 
          color: focused ? AllStyle.color.tabTextFocused : AllStyle.color.tabText , 
          fontSize: 16, 
          fontWeight:"regular"
          }}>
          {route.name}
        </Text>
      );

    },
    headerShown:false,

  })}
 
>
  <Tab.Screen name="Home" component={HomeScreen} />
  <Tab.Screen name="oa" component={OaScreen} />
  <Tab.Screen name="my" component={MyScreen} />
  {/* <Tab.Screen name="text" component={TextScreen} /> */}
</Tab.Navigator>

);

}

export default function App() {

  return (

    <NavigationContainer>
{/* 堆栈导航，可以使得页面之间跳转 */}
    <Stack.Navigator initialRouteName="Signin">
    <Stack.Screen
          name="Signin"
          component={SigninScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="BottomTabNavigator"
          component={BottomTabNavigator}
          options={{ headerShown: false }} 
        />
        <Stack.Screen
          name="home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        {/* <Stack.Screen name="home" component={HomeScreen}  options={{ headerShown: false }} /> */}
        <Stack.Screen name="lostAndFound" component={LostAndFound}  options={{ headerShown: false }} />
        <Stack.Screen name="calendar" component={Calendar}  options={{ headerShown: false }} />
        <Stack.Screen name="web" component={Web}  options={{ headerShown: false }} />
        <Stack.Screen name="contact" component={Contact}  options={{ headerShown: false }} />
        <Stack.Screen name="searchContact" component={SearchContact}  options={{ headerShown: false }} />
        <Stack.Screen name="course" component={Course}  options={{ headerShown: false }} />
        <Stack.Screen name="courseLogin" component={CouseLogin}  options={{ headerShown: false }} />
        <Stack.Screen name="setting" component={Setting}  options={{ headerShown: false }} />
        <Stack.Screen name="myGoods" component={MyGoods}  options={{ headerShown: false }} />
        {/* <Stack.Screen name="Signin" component={SigninScreen} options={{ headerShown: false }}/> */}
        <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Forgot" component={ForgotScreen} options={{ headerShown: false }}/>
        {/* <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/> */}
        <Stack.Screen name="NewsDetail" component={NewsDetailScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="like" component={Like}  options={{ headerShown: false }} />
        <Stack.Screen name="twoHands" component={TwoHands}  options={{ headerShown: false }} />
        <Stack.Screen name="discussion" component={Discussion}  options={{ headerShown: false }} />

      </Stack.Navigator>


    </NavigationContainer>

  );
}

const styles = StyleSheet.create({



});
