import React, { useState } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text, ScrollView, Modal } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import AntDesign from '@expo/vector-icons/AntDesign';

const Goods = ({ 
  title, 
  context, 
  time, 
  actor, 
  headImage, 
  picture, 
  picture2, 
  picture3, 
  contactContent 
}) => {

  const [modalVisible, setModalVisible] = useState(false);

  const startModalVisible = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  // 处理联系显示的函数
  function displayContact() {
    if (contactContent !== '') {
      return (
        <Text style={styles.text}>{contactContent}</Text>
      );
    } else {
      return (
        <Text style={styles.text}>不好意思,作者没有填入联系方式。</Text>
      );
    }
  }

  // 将三张图片合并为一个数组
  const images = [picture, picture2, picture3].filter(img => img); // 只保留非 null 和 undefined 的图片

  // 图片路径处理
  const getImageUri = (path) => `http://172.20.10.13:8081/${path.replace(/\\/g, "/")}`; // 格式化路径

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content style={styles.cardContent}>
          <View style={styles.header}>
            {/* 只在用户上传了头像时才显示头像 */}
            {headImage && (
              <Image
                source={{ uri: getImageUri(headImage) }} // 后端设置了默认头像的路径
                style={styles.avatar}
                resizeMode='cover'
              />
            )}
            <View style={styles.headerText}>
              <Text style={styles.username}>{actor}</Text>
              <Paragraph style={styles.time}>{time}</Paragraph>
            </View>
          </View>

          {/* 图片 */}
          <View style={styles.imageContainer}>
            <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false}>
              {images.map((item, index) => {
                if (item) {
                  return (
                    <Image
                      key={`image-${index}-${item}`} // 使用 index 和 item 来生成唯一的 key
                      source={{ uri: getImageUri(item) }} // 格式化图片 URL
                      style={styles.image}
                      resizeMode="cover"  // 保持图片比例，填充整个容器
                    />
                  );
                }
                return null;
              })}
            </ScrollView>
          </View>

          {/* 标题 */}
          <Title style={styles.title}>{title}</Title>

          {/* 段落文本 */}
          <Paragraph style={styles.paragraph}>{context}</Paragraph>

          {/* 联系按钮 */}
          <TouchableOpacity style={styles.button} onPress={startModalVisible}>
            <Text style={styles.buttonText}>联系</Text>
          </TouchableOpacity>

          {/* 联系方式的模态框 */}
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
                  style={styles.closeIcon}
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
  cardContent: {
    padding: 15,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10, // 给头像和名字之间添加间距
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginRight: 10, // 头像与名字之间的间距
  },
  headerText: {
    flexDirection: "column",
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  time: {
    fontSize: 12,
    padding: 0,
    margin: 0,
  },
  imageContainer: {
    width: '100%',
    height: 300,
    overflow: 'hidden', // 防止图片超出容器边界
    marginBottom: 10,  // 图片与标题之间的间距
    borderRadius: 15,
  },
  image: {
    width: 300,  // 图片宽度设置为300，可以根据需求调整
    height: '100%', // 图片高度填充容器
    marginRight: 10, // 图片间距
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 14,
    marginBottom: 10,
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
    height: 200,
  },
  text: {
    padding: 15,
  },
  closeIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
});

export default Goods;
