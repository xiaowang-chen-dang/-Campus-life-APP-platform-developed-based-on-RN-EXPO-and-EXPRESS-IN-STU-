//二手交易里的卡片组件

import React, { useState } from 'react';
import { View, Image, StyleSheet,Button ,TouchableOpacity,Text,ScrollView,Modal } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import AntDesign from '@expo/vector-icons/AntDesign';
import {AllStyle} from '../../style/style'
import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';
const TwoHandsCard = ({ navigation,url,title,context,time,actor,headImage,contactContent,value}) => {

  const [modalVisible,setModalVisible] = useState(false)

  const [flag,setFlag] = useState(false) 
  const startModalVisible = () => {
      setModalVisible(true);
  };

  const closeModal = () => {
      setModalVisible(false);
  };

  const pressLike =() =>{
        setFlag(!flag)
  }

  //处理联系显示的函数
  function displayContact(){
    if(contactContent !== '')
    
    return(
      
      <Text style={styles.text}>{contactContent}</Text>
  );
  else{
    return(
        <Text style={styles.text}>不好意思,作者没有填入联系方式。</Text>
    );
  }
  }

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content style={styles.cardContent}>
            <View style={{
                flexDirection:"row",
                flex:1,
                alignItems:"center",
            }}>
          <View
          style={{
            flexDirection:"row",
            alignItems:"center",
            marginBottom: 10, // 给头像和名字之间添加间距
          }}
          >
          <Image source={headImage}
          style={{
            width:50,
            height:50,
            borderRadius:50,
            marginRight: 10, // 头像与名字之间的间距
          }}
          resizeMode='cover'></Image>
      <View
      style={{
        flexDirection:"column",
      }}>
          <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
          }}>{actor}</Text>
          <Paragraph 
          style={{
            width:80,
            fontSize:12,
            padding:0,
            margin:0,
          }}
          >{time}</Paragraph>
      </View>
        </View>

        {/* 收藏图标 */}
        <TouchableOpacity
        onPress={pressLike}
        style={{
            position:"absolute",
            right:0,
        }}>
            {flag ? <FontAwesome name="heart" size={30} color={AllStyle.color.homeCard3} /> : <Feather name="heart" size={30} color={AllStyle.color.tabTextFocused} /> }
        </TouchableOpacity>


        </View>

          {/* 图片 */}
          <View style={styles.imageContainer}>
            {/* 多张图片在同一个View中横向滑动 */}
            <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false}>

              {url.map((item,index)=>{
                return(
                <Image
                    key={index} // 每个元素需要一个唯一的 key 属性
                    source={item}
                    style={styles.image}
                    resizeMode="cover"  // 保持图片比例，填充整个容器
                />
                );
              })}
            </ScrollView>
          </View>
          
          {/* 标题 */}
          <Title style={styles.title}>{title}</Title>
          <Text
          style={{
            fontSize:15,
            fontWeight:"bold",
            color:AllStyle.color.tabText
          }}>￥{value}</Text>
          {/* 段落文本 */}
          <Paragraph style={styles.paragraph}>{context}</Paragraph>
          <TouchableOpacity style={styles.button} 
          onPress={startModalVisible}
          >
          <Text style={styles.buttonText}>联系</Text>
          </TouchableOpacity>

          <Modal
                visible={modalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={closeModal}>
                <View style={styles.modalOverlay}>
                    <View style={styles.modal}>
                        <AntDesign
                            name="close"
                            size={24}
                            color="black"
                            style={{
                                position: 'absolute',
                                top: 10,
                                right: 10,
                                zIndex: 1,
                            }}
                            onPress={closeModal}
                        />

                        {displayContact()}
                  

                    </View>
                </View>
            </Modal>

        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  card: {
    elevation: 5, // 设置阴影效果
    borderRadius: 10, // 圆角
  },
  imageContainer: {
    width: '100%',  // 使图片容器宽度填满父容器
    height: 300, // 高度可以调整，根据需要设定
    overflow: 'hidden', // 防止图片超出容器边界
    marginBottom: 10,  // 图片与标题之间的间距
    borderRadius:15,
  },
  image: {
    width: 300,  // 图片宽度设置为300，可以根据需求调整
    height: '100%', // 图片高度填充容器
    marginRight: 10, // 图片间距
  },
  button: {
    backgroundColor: AllStyle.color.homeCard1, // 设置按钮背景颜色
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center', // 居中按钮文本
    marginTop: 10, // 为按钮和其他元素之间添加间距
  },
  buttonText: {
    color: 'black',  // 设置按钮文本颜色为黑色
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
},
modal: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 10,
    width: 200,
    height:200,
},
text:{
  padding:15,
}
});
export default TwoHandsCard;

