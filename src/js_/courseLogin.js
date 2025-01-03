import { View, Text, FlatList, StyleSheet, SafeAreaView, ScrollView,Modal,TouchableOpacity,TextInput,Button } from 'react-native';
import React, { useState } from 'react';
import { AllStyle } from '../../style/style';
import AntDesign from '@expo/vector-icons/AntDesign';
import axios from 'axios';

export default function CourseLogin ({navigation}){
    //存储用户的账号和密码
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);  // 添加一个加载状态
      // 登录处理函数
      const handleLogin = async () => {
        setLoading(true);  // 开始加载
        try {
          // 替换为你的 Python 服务器地址
          const response = await axios.post('http://172.20.10.7:5000/login', {
            username: username,
            password: password,
          });
          
          console.log("Server response:", response);
          // 如果登录成功，处理响应
          if (response.data.course_data) {
             //将返回的课程数据做微创参数传递给course
              navigation.navigate('course', { courseData: response.data.course_data });
          } else {

              console.log('no')
          }
        } catch (error) {
          console.error(error);
        }
        finally {
          setLoading(false);  // 请求结束，停止加载
        }
      };
    return (

        <View style={{
            flex:1,
            justifyContent:"center",
            backgroundColor:"#efefef"
        }}> 

       
        <View style={styles.container}>
            
            <View  style={{
                flexDirection:"row",
            }}>
        <AntDesign name="arrowleft" size={28} color="black"  style ={{flex:1}}
        onPress={()=>{
            navigation.goBack();
        }}/>
          <Text style={styles.header}>登   录</Text>
        </View>
          {/* 用户名输入框 */}
          <TextInput
            style={styles.input}
            placeholder="请输入学生账号"
            value={username}
            onChangeText={(text) => setUsername(text)} // 更新用户名的状态
          />
    
          {/* 密码输入框 */}
          <TextInput
            style={styles.input}
            placeholder="请输入密码"
            secureTextEntry={true} // 密码字段隐藏输入
            value={password}
            onChangeText={(text) => setPassword(text)} // 更新密码的状态
          />
    
          {/* 登录按钮 */}
          <TouchableOpacity
          style={{
            backgroundColor:AllStyle.color.homeCard1,
            width:100,
            height:40,
            justifyContent:"center",
            alignContent:"center",
            borderRadius:13,
          }}
          onPress={handleLogin}>

            {loading ? <Text style={{
              textAlign:"center"
            }}>Loading...</Text>:
            <Text style={{
                textAlign:"center",
                fontSize:16,
            }}>登  录</Text>
          }
          </TouchableOpacity>
          </View>

          </View>
      );
    }
  
    const styles = StyleSheet.create({
      container: {
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: AllStyle.color.oaCard,
        margin:10,
      },
      header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        flex:1.5
      },
      input: {
        width: '100%',
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        paddingLeft: 10,
        marginBottom: 10,
      },
      registerText: {
        marginTop: 20,
        color: '#555',
      },
      link: {
        color: '#007bff',
        textDecorationLine: 'underline',
      },
    });
