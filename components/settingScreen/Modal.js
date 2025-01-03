// import Choice from "./Choice";
import React, { useState, useEffect } from 'react';
import { View,Text,StyleSheet,ScrollView ,Dimensions,Modal,TouchableOpacity,Alert,Button,Image} from "react-native";
import { AllStyle } from '../../style/style';
import { Card,Paragraph,Title} from "react-native-paper"
import AntDesign from '@expo/vector-icons/AntDesign';
import * as ImagePicker from 'expo-image-picker';


export default function HeadImage({navigation}){
    //控制模态框的显示和消失
    const [modalVisible,setModalVisible] = useState(false)

    //用于存储头像的链接
    const [imageUri, setImageUri] = useState(null);  // 用于保存头像的 URI
    const startModalVisible = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };
    
    const Choice = ({title})=>{
        return(
            <View>
                <Card
                style={{
                    margin:5,
                    marginLeft:10,
                    marginRight:10,
                    height:80,
                    padding:10,
                    backgroundColor:AllStyle.color.myChoice,
                    
                }}>
                    <Card.Content
                    style={{
                        flexDirection:"row",
                        alignItems:"center",
            
                    }}>
    
                        <Title
                        style={{
                            flex:1,
                            fontSize:25,
                            height:40,
                      
                        }}>{title}</Title>
                        <TouchableOpacity
                        onPress={()=>{
                            setModalVisible(true)
                        }}>
                        <AntDesign name="rightcircleo" size={25} color="black" />
                        </TouchableOpacity>
                    </Card.Content>
                </Card>
            </View>
        );
    }
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

    // 用于存储图片并写入前端的后端逻辑
    const saveImage =()=>{
            console.log('还没实现')
    }
    return(
        <View>
        <Choice title={'修改头像'}
        onPress={()=>{
            setModalVisible(true)
        }}></Choice>

    <Modal
        visible={modalVisible}
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

<View style={styles.container}>
    
    {/* 显示当前头像 */}
    {imageUri ? (
      <Image source={{ uri: imageUri }} style={styles.avatar} />
    ) : (
    //   <View style={styles.avatarPlaceholder}>
    //     <Text style={styles.avatarText}>没有头像</Text>
    //   </View>
        <Image source={require('../../images/My/头像.jpg')} style={styles.avatar}></Image>
    )}

    {/* 选择头像按钮 */}
    <TouchableOpacity
    style={{
        backgroundColor:AllStyle.color.homeCard1,
        width:100,
        height:35,
        justifyContent:"center",
        alignItems:"center",
        borderRadius:10,
        marginBottom:5,
    }}
    onPress={pickImage}>
        <Text style={{fontSize:17,textAlign:"center"}}>选择头像</Text>
    </TouchableOpacity>

    {/* 保存头像按钮 */}
    <TouchableOpacity
    style={{
        backgroundColor:AllStyle.color.homeCard1,
        width:100,
        height:35,
        justifyContent:"center",
        alignItems:"center",
        borderRadius:10,
        
    }}
    onPress={saveImage}>
        <Text style={{fontSize:17,textAlign:"center"}}>保存头像</Text>
    </TouchableOpacity>

  </View>
            </View>
          </View>
        </Modal>
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
      marginBottom: 10,
    },
    avatarPlaceholder: {
      width: 150,
      height: 150,
      borderRadius: 75,  // 使占位图显示为圆形
      backgroundColor: AllStyle.color.oaCard,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 10,
    },
    avatarText: {
      color: AllStyle.color.tabText,
      fontSize: 16,
    },
  });
  