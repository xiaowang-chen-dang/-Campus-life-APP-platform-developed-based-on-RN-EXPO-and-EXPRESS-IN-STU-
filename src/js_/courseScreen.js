import { View, Text, FlatList, StyleSheet, SafeAreaView, ScrollView,Modal,TouchableOpacity } from 'react-native';
import Head from '../../components/course/head'
import CourseList from '../../components/course/courseList';
export default function CourseScreen({navigation,route}) {

  const { courseData } = route.params;  // 获取传递的 courseData 参数
  
  return(
    <View
    style={{
      flex:1,
    }}>
      <Head navigation={navigation}></Head>
      <CourseList courseData={courseData} />
    </View>
  );
}

