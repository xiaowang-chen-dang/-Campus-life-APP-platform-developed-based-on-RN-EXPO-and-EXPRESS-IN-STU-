//需要创建两个tab栏，存放两个页面
import React from 'react';
import { Text, View,Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Ionicons } from '@expo/vector-icons';
import { AllStyle } from '../../style/style';
import East from './eastSearch'
import Sanpu from './sanpuSearch'

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


// import React from 'react';
// import { Text, View } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

// const Tab = createMaterialTopTabNavigator();

// function ScreenOne() {
//   return (
//     <View>
//       <Text>这是 Tab 1</Text>
//     </View>
//   );
// }

// function ScreenTwo() {
//   return (
//     <View>
//       <Text>这是 Tab 2</Text>
//     </View>
//   );
// }

// function ScreenThree() {
//   return (
//     <View>
//       <Text>这是 Tab 3</Text>
//     </View>
//   );
// }

// export default function Body() {
//   return (
//       <Tab.Navigator
//         initialRouteName="Tab1"
//         screenOptions={{
//           tabBarActiveTintColor: 'tomato',
//           tabBarInactiveTintColor: 'gray',
//           tabBarLabelStyle: { fontSize: 14, fontWeight: 'bold' },
//           tabBarIndicatorStyle: { backgroundColor: 'tomato' },
//         }}
        
//       >
//         <Tab.Screen name="Tab1" component={ScreenOne} />
//         <Tab.Screen name="Tab2" component={ScreenTwo} />
//         <Tab.Screen name="Tab3" component={ScreenThree} />
//       </Tab.Navigator>
 
//   );
// }
