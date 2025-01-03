import React, { useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet,Modal,TouchableOpacity,ScrollView,Alert} from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import { formatDistanceToNow } from 'date-fns';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function LostCards({ navigation,url,title,context,time,flag,value,onDelete}){

     //控制模态框的显示和关闭
     const [modalVisible, setModalVisible] = useState(false);

     const startModalVisible = () => {
         setModalVisible(true);
     };
 
     const closeModal = () => {
         setModalVisible(false);
     };

       // 删除操作
  const handleDelete = () => {
    Alert.alert(
      "确认删除",
      "确定要删除此物品吗？",
      [
        {
          text: "取消",
          onPress: () => console.log("取消删除"),
          style: "cancel"
        },
        {
          text: "确定",
          onPress: () => {
            // 调用父组件传递的删除函数
            onDelete();
          }
        }
      ]
    );
  }
 
  return(
    // 我的商品界面只显示图片,标题和时间,点击后显示模态框,显示详细页面
        <View>
          <TouchableOpacity
          onPress={startModalVisible}
          style={styles.productContainer}>
      <Image source={url[0]} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.productTitle}>{title}</Text>
        <Text style={styles.productDate}>
          {formatDistanceToNow(time)} ago
        </Text>

      </View>
      <TouchableOpacity onPress={handleDelete} style={{
        justifyContent:"center",
        right:10,
      }}>
               <AntDesign name="delete" size={24} color="black" />
        </TouchableOpacity>

      </TouchableOpacity>


        {/* 模态框里的东西就是把失物招领那里的东西搬过来 */}
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
              width:340,
              height:360,
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
          <Card style={styles.card}>
        <Card.Content style={styles.cardContent}>
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
            {flag && (<Text style={{
              font:15,
            }}>{value}</Text>)}
          {/* 段落文本 */}
          <Paragraph 
          style={{
            width:80,
            fontSize:12,
            padding:0,
            margin:0,
          }}
          >{formatDistanceToNow(time)} ago</Paragraph>
          <Paragraph>{context}</Paragraph>
 

        </Card.Content>
      </Card>

          </View>
            </View>
          </View>
        </Modal>
    </View>
  );

};

const styles = StyleSheet.create({

  productContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 10,
    elevation: 3,
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 10,
  },
  productInfo: {
    flex: 1,
    justifyContent: 'center',
    left:25,
  },
  productTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  productDate: {
    fontSize: 14,
    color: '#777',
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

  buttonText: {
    color: 'black',  // 设置按钮文本颜色为黑色
    fontSize: 16,
    fontWeight: 'bold',
  },
});



