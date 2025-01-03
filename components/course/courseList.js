import React, { useState ,useEffect} from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, ScrollView,Modal,TouchableOpacity } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
// import { courseData } from '../../data/course/course';
import { AllStyle } from '../../style/style';
import AntDesign from '@expo/vector-icons/AntDesign';
// 星期几的列
const daysOfWeek = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'];
const dayIndex = ['1', '2', '3', '4', '5', '6', '7']; // 星期的索引

export default function CourseList({courseData}) {
  const [courses, setCourses] = useState(courseData);
  const [modeVisble,setModeVisble] = useState(false);
  const [chooseCourse,setChooseCourse] = useState('');
  const [week,setWeek] = useState('')
  const getCourseTime = (str) => {

    const matches = str.match(/\((\d{2})/);  // 使用正则匹配 (01 这样的格式
    if (matches) {
      return matches[1]
    }
  };

  const startModalVisible = (course) => {
    setModeVisble(true);
};

const closeModal = () => {
  setModeVisble(false);
};

const change = (day)=>{
  switch (day){
    case '1':
      setWeek('星期一')
      break
    case '2':
      setWeek('星期二')
      break
    case '3':
      setWeek('星期三')
      break
    case '4':
      setWeek('星期四')
      break
    case '5':
      setWeek('星期五')
      break
    case '6':
      setWeek('星期六')
      break
    case '7':
      setWeek('星期日')
      break
  }
}
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      {/* 表格主体 */}
      <ScrollView horizontal contentContainerStyle={styles.scrollView}>
        {/* 表格头部 */}
        <View style={styles.tableHeader}>
          <Text style={[styles.headerCell]}>时间</Text>
          {daysOfWeek.map((day, index) => (
            <Text key={index} style={styles.headerCell}>
              {day}
            </Text>
          ))}
        </View>
        {/* 表格内容 */}
        <FlatList
          data={['第一大节\n(01-02小节)','第二大节\n(03-04-05小节)	','第三大节\n(06-07小节)','第四大节\n(08-09-10小节)','第五大节\n(11-12-13小节)	']}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.tableRow}>
              <Text style={styles.cell}>{item}</Text>
              {dayIndex.map((dayWeek, i) => {
                // 找到当前课程
                const course = courses.find(
                  (course) =>
                    course.time.includes(getCourseTime(item))&& // 比较开始时间
                    course.day === dayWeek
                ); // 精确匹配detailsTime和day
                return (
                  <Card key={i} style={[styles.cell, styles.card]}>
                    {course ? (
                      <View style={styles.cardContent}>
                        <TouchableOpacity
                        onPress={()=>{
                          startModalVisible(course);
                          setChooseCourse(course);
                          change(dayWeek);
                        }
                          }>
                        <Title style={styles.courseTitle}>{course.name}</Title>
                        <Paragraph>{course.location}</Paragraph>
                        </TouchableOpacity>
                      </View>
                    ) : (
                      <Text style={styles.emptyCell}>无课</Text>
                    )}
                  </Card>
                );
              })}
            </View>
          )}
        />

        <Modal
        visible={modeVisble}
        animationType="slide"
        transparent={true}
        onRequestClose={closeModal}>

          <View
          style={{
            backgroundColor:"rgba(0,0,0,0.5)",
            justifyContent:"center",
            alignItems:"center",
            flex:1,
          }}>
            <View
            style={{
              backgroundColor:"white",
              width:250,
              height:250,
              borderRadius:15,
            }}>
              <AntDesign name="close" size={24} color="black" 
              style={{
                position: 'absolute',  // 设置为绝对定位
                top: 10,               // 距离顶部一定距离
                right: 10,             // 距离右边一定距离
                zIndex: 1,             // 确保它在上层显示
              }}
              onPress={closeModal}/>

          <View style={styles.textContainer}>
              <Text style={styles.textCell}>课程名:{chooseCourse.name}</Text>
              <Text style={styles.textCell}>老师:{chooseCourse.teacher}</Text>
              <Text style={styles.textCell}>上课周次:{chooseCourse.week}</Text>
              <Text style={styles.textCell}>具体时间:{chooseCourse.detailsTime}</Text>
              <Text style={styles.textCell}>上课地点{chooseCourse.location}</Text>
              <Text style={styles.textCell}>时间:{week}</Text>
          </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 8,
      paddingHorizontal: 10,
      backgroundColor: '#f4f4f4',
      borderRadius:15,
      marginTop:5,
    },
    header: {
      fontSize: 30,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
      color: '#333',
    },
    tableHeader: {
      flexDirection: 'row',
      backgroundColor: AllStyle.color.oaCard,
      borderTopWidth: 2,
      borderBottomWidth: 2,
      borderTopColor:'#604223',
      borderBlockColor:'#604223',
      paddingVertical: 10,
      marginBottom: 10,
    },
    headerCell: {
      flex: 1,
      textAlign: 'center',
      fontWeight: 'bold',
      color: AllStyle.color.tabText,
      fontSize: 16,
      paddingVertical: 5,
    },
    tableRow: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderColor: '#ddd',
      paddingVertical: 10,
      backgroundColor: '#ffffff',
    },
    cell: {
      // flex: 1,
      width:130,
      padding:10,
      textAlign: 'center',
      alignSelf:'center',
      paddingVertical: 10,
      borderRightWidth: 1, // 添加竖线
      borderColor: '#ddd', // 竖线的颜色
    },
    scrollView: {
      flexDirection: 'column',
    },
    card: {
      marginHorizontal: 5,
      marginVertical: 2,
      width: 150, // 固定宽度
      height: 150, // 固定高度
      justifyContent: 'space-evenly',
      alignItems: 'center',
      backgroundColor:AllStyle.color.oaCard
    },
    cardContent: {
      padding: 3,
      paddingBottom: 10,
      alignItems: 'center', // 内容居中
    },
    courseTitle: {
      fontSize: 14,
      fontWeight: 'bold',
      color: AllStyle.color.tabText,
    },
    emptyCell: {
      fontSize: 14,
      color: '#999',
      textAlign: 'center',
      padding: 10,
    },
    textContainer:{
      marginTop:10,
      padding:15,
      justifyContent:"center",
      alignContent:"center",
    },
    textCell:{
      paddingBottom:15,
      fontSize:15,
    }
  });
  