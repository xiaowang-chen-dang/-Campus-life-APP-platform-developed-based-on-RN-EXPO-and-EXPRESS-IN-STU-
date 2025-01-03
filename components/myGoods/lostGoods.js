import React from 'react';
import { View, Image, StyleSheet,Button ,TouchableOpacity,Text,ScrollView } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import {AllStyle} from '../../style/style'

const Goods = ({ navigation,url,title,context,time}) => {
  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content >
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


          {/* 段落文本 */}
          <Paragraph 
          style={{
            width:80,
            fontSize:12,
            padding:0,
            margin:0,
          }}
          >{time}</Paragraph>
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
    backgroundColor: '#F5D791', // 设置按钮背景颜色
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
});
export default Goods;
