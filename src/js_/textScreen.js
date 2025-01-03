// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, Dimensions } from 'react-native';
// import { Calendar } from 'react-native-calendars';
// import { format, startOfWeek, differenceInCalendarWeeks } from 'date-fns';

// const { width } = Dimensions.get('window');

// const CalendarScreen = () => {
//   const [currentDate, setCurrentDate] = useState(new Date());
//   const [currentWeek, setCurrentWeek] = useState(1); // 默认周数为 1

//   // 获取当前日期和学期周数
//   useEffect(() => {
//     const currentDate = new Date();
//     setCurrentDate(currentDate);
    
//     // 假设学期从某个固定日期开始，例如：2024年9月1日
//     const semesterStart = new Date(2024, 8, 1); // 2024年9月1日
//     const startOfSemester = startOfWeek(semesterStart, { weekStartsOn: 1 }); // 设置周一为一周的开始
//     const currentWeekNumber = differenceInCalendarWeeks(currentDate, startOfSemester) + 1; // 计算当前周数
//     setCurrentWeek(currentWeekNumber);
//   }, []);

//   return (
//     <View style={styles.container}>
//       {/* 当前日期和学期周数 */}
//       <View style={styles.dateInfo}>
//         <Text style={styles.dateText}>今天是: {format(currentDate, 'yyyy年MM月dd日')}</Text>
//         <Text style={styles.weekText}>当前是学期的第 {currentWeek} 周</Text>
//       </View>

//       {/* 日历组件 */}
//       <Calendar
//         current={format(currentDate, 'yyyy-MM-dd')}
//         markedDates={{
//           [format(currentDate, 'yyyy-MM-dd')]: {
//             selected: true,
//             selectedColor: 'blue',
//             selectedTextColor: 'white',
//           },
//         }}
//         monthFormat={'yyyy MM'}
//         onDayPress={(day) => {
//           setCurrentDate(new Date(day.dateString));
//         }}
//         style={styles.calendar}
//         theme={{
//           todayTextColor: 'blue',
//           selectedDayBackgroundColor: 'blue',
//           selectedDayTextColor: 'white',
//           arrowColor: 'blue',
//         }}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: 50,
//     paddingHorizontal: 20,
//     backgroundColor: '#fff',
//   },
//   dateInfo: {
//     marginBottom: 20,
//     alignItems: 'center',
//   },
//   dateText: {
//     fontSize: 18,
//     marginBottom: 10,
//   },
//   weekText: {
//     fontSize: 16,
//     color: 'gray',
//   },
//   calendar: {
//     width: width - 40,
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 10,
//     paddingBottom: 20,
//   },
// });

// export default CalendarScreen;




// import React, { useState } from 'react';
// import { View, Text, Image, StyleSheet, Animated } from 'react-native';
// import { PanGestureHandler, State } from 'react-native-gesture-handler';

// const images = [
//     require('../../images/Home/campus1.jpg'),
//     require('../../images/Home/campus2.jpg')
// ];

// export default function Body() {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const translateX = new Animated.Value(0); // 动画值，用来控制图片移动

//   // 手势处理函数
//   const onGestureEvent = Animated.event(
//     [{ nativeEvent: { translationX: translateX } }],
//     { useNativeDriver: true }  // 确保使用原生驱动
//   );

//   const onHandlerStateChange = (event) => {
//     if (event.nativeEvent.state === State.END) {
//       if (event.nativeEvent.translationX < -100 && currentIndex < images.length - 1) {
//         // 向左滑动，切换到下一张图片
//         setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, images.length - 1));
//       } else if (event.nativeEvent.translationX > 100 && currentIndex > 0) {
//         // 向右滑动，切换到上一张图片
//         setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
//       }

//       // 动画恢复到初始位置
//       Animated.spring(translateX, {
//         toValue: 0,
//         useNativeDriver: true,
//       }).start();
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>滑动切换图片</Text>
//       <PanGestureHandler
//         onGestureEvent={onGestureEvent}
//         onHandlerStateChange={onHandlerStateChange}>
//         <Animated.View
//           style={[styles.imageContainer, { transform: [{ translateX }] }]}>
//           <Image source={images[currentIndex]} style={styles.image} />
//         </Animated.View>
//       </PanGestureHandler>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   header: {
//     fontSize: 24,
//     marginBottom: 20,
//   },
//   imageContainer: {
//     width: 300,
//     height: 300,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   image: {
//     width: 300,
//     height: 300,
//     resizeMode: 'contain',
//   },
// });



// import React, { useState } from 'react';
// import { View, Text, Button, StyleSheet } from 'react-native';
// import * as WebBrowser from 'expo-web-browser';

// export default function Web() {
//   const [showWebView, setShowWebView] = useState(false);

//   const handlePress = async () => {
//     // 使用 expo-web-browser 打开网页
//     await WebBrowser.openBrowserAsync('https://www.stu.edu.cn/');
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Expo 跳转到网页</Text>
//       <Button title="打开网页" onPress={handlePress} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#f0f0f0',
//   },
//   header: {
//     fontSize: 24,
//     marginBottom: 20,
//   },
// });

// import React, { useState } from 'react';
// import { View, Text, FlatList, StyleSheet, SectionList, TouchableOpacity } from 'react-native';

// export default function App() {
//   // 假设这是联系人数据
//   const contacts = [
//     { name: 'Alice Johnson', phone: '123-456-7890' },
//     { name: 'Bob Brown', phone: '234-567-8901' },
//     { name: 'Charlie White', phone: '345-678-9012' },
//     { name: 'David Black', phone: '456-789-0123' },
//     { name: 'Eve Green', phone: '567-890-1234' },
//     { name: 'Frank Blue', phone: '678-901-2345' },
//     { name: 'George Red', phone: '789-012-3456' },
//     { name: 'Hannah Yellow', phone: '890-123-4567' },
//     // 更多联系人...
//   ];

//   // 将联系人按字母分组
//   const getSections = () => {
//     const sections = [];
//     const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
//     alphabet.forEach((letter) => {
//       const filteredContacts = contacts.filter(contact => contact.name[0].toUpperCase() === letter);
//       if (filteredContacts.length > 0) {
//         sections.push({ title: letter, data: filteredContacts });
//       }
//     });
//     return sections;
//   };

//   const [sections, setSections] = useState(getSections());

//   // 处理卡片点击
//   const handleCardPress = (contact) => {
//     alert(`Clicked on ${contact.name}\nPhone: ${contact.phone}`);
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>通讯录</Text>

//       {/* SectionList 用于按字母分组展示联系人 */}
//       <SectionList
//         sections={sections}
//         keyExtractor={(item, index) => item.name + index}
//         renderSectionHeader={({ section }) => (
//           <Text style={styles.sectionHeader}>{section.title}</Text>
//         )}
//         renderItem={({ item }) => (
//           <TouchableOpacity style={styles.card} onPress={() => handleCardPress(item)}>
//             <Text style={styles.cardName}>{item.name}</Text>
//             <Text style={styles.cardPhone}>{item.phone}</Text>
//           </TouchableOpacity>
//         )}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f0f0f0',
//     paddingTop: 50,
//     paddingHorizontal: 20,
//   },
//   header: {
//     fontSize: 30,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   sectionHeader: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     backgroundColor: '#ddd',
//     padding: 10,
//     marginTop: 10,
//   },
//   card: {
//     backgroundColor: '#fff',
//     padding: 15,
//     marginBottom: 10,
//     borderRadius: 5,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 2,
//     elevation: 2,
//   },
//   cardName: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   cardPhone: {
//     fontSize: 16,
//     color: '#555',
//   },
// });



// import ContactCard  from "./contactCard";
// import { StyleSheet, Text, View, SectionList,TouchableOpacity } from 'react-native';
// import {eastCampus} from '../../data/contact/eastCampus'
// import { Provider as PaperProvider,Searchbar,Chip,FAB} from 'react-native-paper';
// import React, { useState, useEffect } from 'react';
// import { FlatList } from "react-native";
// import { AllStyle } from "../../style/style";
// import AntDesign from '@expo/vector-icons/AntDesign';
// export default function East (){

//     const [queryInfo,setQueryInfo] = useState('')
//     const [eastData,setEastData] = useState(eastCampus);
//     //将所有的phoneAndNumber变成一个数组放入filterEast
//     const [filterEast, setFilterEast] = useState(eastData.flatMap(item => item.phoneAndNumber));


//     const [mode,setMode] = useState(null)

//     function onSearch(query) {
//         setQueryInfo(query);
//         if (query) {
//             const newData = eastData.flatMap(item => item.phoneAndNumber).filter(item => item.name.includes(query));
//             setFilterEast(newData);
//         } else {
//             setFilterEast(eastData.flatMap(item => item.phoneAndNumber));
//         }
//     }

//     function change(id){
        
//         //点击指定的栏目就会更改mode为id值，若发现当前点击的id值与当前的mode一样，就代表要回收栏目
//         setMode(mode === id ? null : id); 
//     }


//     return(
//         <View>
//      {/* 搜索框 */}
//      <Searchbar
//         placeholder='请输入您想要查找的内容'
//         //有数据的时候才显示x
//         clearIcon="close" // 点击清除图标清空搜索框
//         //每当搜索框里的文字发送改变，就调用onSearch函数
//         onChangeText={onSearch}
//         value={queryInfo}
//         style={{
//             margin:5,
//             backgroundColor:"#f0e6d0"
//         }}
//         >
//       </Searchbar>


//     <FlatList
//         data={eastData}
//         renderItem={({item})=>{
//             return(
//                 <View>
//                 <TouchableOpacity style={{
//                     height:50,
//                     margin:5,
//                     borderRadius:10,
//                     backgroundColor:AllStyle.color.home,
//                     flexDirection:"row",
//                     alignItems: 'center',    
//                 }}
//                 onPress={()=>{change(item.id)}}
//                 >
//                 <Text
//                 style={{
//                     fontSize:20,
//                     flex:7
//                 }}>{item.category}</Text>
//                 <AntDesign name="caretdown" size={24} color={AllStyle.color.homeCard3} style={{
//                      flex:1
//                 }} />
//               </TouchableOpacity>

//               {
//                 mode === item.id &&(
//                 <FlatList
//                 data = {eastData[mode-1].phoneAndNumber}
//                 renderItem={({item})=>{
//                     return(
//                         <ContactCard name = {item.name} number = {item.number}></ContactCard>
//                     );
//                 }} 
//             keyExtractor={(item, index) => index}// 使用name和index生成唯一键
//             >

//             </FlatList>
//         )
//       }
//               </View>   
//             );
//         }}
//     >

//     </FlatList>


//      <FlatList
//         data = {filterEast}
//         renderItem={({item})=>{
//             return(
//             <ContactCard name = {item.name} number = {item.number}></ContactCard>
//           );
//           }}
//           keyExtractor={(item, index) => item.name + index}// 使用name和index生成唯一键
        
//             ></FlatList>

//         </View>
//     );
// } 


// import React, { useState } from 'react';
// import { View, Button, Image, Text, Platform } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';

// export default function textScreen() {
//   //image存储选中的照片
//   const [image, setImage] = useState(null);

//   // 请求相册权限
//   const requestMediaLibraryPermission = async () => {
//     //ImagePicker.requestMediaLibraryPermissionsAsync() 用来请求访问相册的权限
//     const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
//     if (status !== 'granted') {
//     //权限被拒绝，就提示no
//       alert('Permission to access media library is required!');
//       return false;
//     }
//     return true;
//   };

//   // 请求相机权限
//   const requestCameraPermission = async () => {
//     //ImagePicker.requestCameraPermissionsAsync() 用来请求访问相机的权限
//     const { status } = await ImagePicker.requestCameraPermissionsAsync();
//     if (status !== 'granted') {
//       alert('Permission to access camera is required!');
//       return false;
//     }
//     return true;
//   };

//   // 从相册选择图片
//   const pickImage = async () => {
//     //调用 ImagePicker.launchImageLibraryAsync() 打开相册，让用户选择图片
//     const hasPermission = await requestMediaLibraryPermission();
//     if (!hasPermission) return;

//     let result = await ImagePicker.launchImageLibraryAsync({
//        //mediaTypes: ImagePicker.MediaTypeOptions.Images 限制用户只能选择图片
//       mediaTypes: ImagePicker.Images, // 只选择图片
//       allowsEditing: true, // 允许编辑图片
//       aspect: [4, 3], // 图片裁剪比例
//       quality: 1, // 图片质量
//     });
// //选中后将图片的URI存储在image中
//     if (!result.canceled) {
//       setImage(result.assets[0].uri); // 设置选中的图片
//     }
//   };

//   // 使用相机拍照
//   const takePhoto = async () => {
//     //调用 ImagePicker.launchCameraAsync() 打开相机让用户拍照。
//     const hasPermission = await requestCameraPermission();
//     if (!hasPermission) return;

//     let result = await ImagePicker.launchCameraAsync({
//       allowsEditing: true, // 允许编辑
//       aspect: [4, 3], // 裁剪比例
//       quality: 1, // 设置图片质量
//     });

//     //拍照的图片存储在result.assets[0].uri中
//     if (!result.canceled) {
//       setImage(result.assets[0].uri); // 设置拍照后的图片
//     }
//   };

//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
//       <Button title="Pick an image from gallery" onPress={pickImage} />
//       <Button title="Take a photo" onPress={takePhoto} style={{ marginTop: 10 }} />

//       {/* 渲染这个图片 */}
//       {image && (
//         <Image
//           source={{ uri: image }}
//           style={{ width: 300, height: 300, marginTop: 20, borderRadius: 10 }}
//         />
//       )}
//     </View>
//   );
// }


import React, { useState } from 'react';
import { View, Text, Button, Image, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function EditAvatarScreen() {
  //用于存储头像的链接
  const [imageUri, setImageUri] = useState(null);  // 用于保存头像的 URI

  // 请求权限并选择图片
  const pickImage = async () => {
    // 请求访问设备媒体库的权限。如果用户没有授权，则弹出警告提示，提示用户需要授权才能选择头像。
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('权限不足', '您需要授权访问媒体库才能选择头像');
      return;
    }

    // 打开图片选择器
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.Images,  // 只允许选择图片
      allowsEditing: true,
      aspect: [1, 1],  // 设定为正方形头像
      quality: 1,  // 图片质量
    });

    // 如果选择了图片，更新头像,保存当前图片的url
    if (!result.canceled) {
      setImageUri(result.assets[0].uri);  // 更新头像
    }
  };

  return (
    <View style={styles.container}>
    
      {/* 显示当前头像 */}
      {imageUri ? (
        <Image source={{ uri: imageUri }} style={styles.avatar} />
      ) : (
        <View style={styles.avatarPlaceholder}>
          <Text style={styles.avatarText}>没有头像</Text>
        </View>
      )}

      {/* 选择头像按钮 */}
      <Button title="选择头像" onPress={pickImage} />

      {/* 如果需要保存头像，可以添加保存按钮 */}
      {/* <Button title="保存头像" onPress={saveAvatar} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75, // 使头像显示为圆形
    marginBottom: 20,
  },
  avatarPlaceholder: {
    width: 150,
    height: 150,
    borderRadius: 75,  // 使占位图显示为圆形
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarText: {
    color: '#fff',
    fontSize: 16,
  },
});
