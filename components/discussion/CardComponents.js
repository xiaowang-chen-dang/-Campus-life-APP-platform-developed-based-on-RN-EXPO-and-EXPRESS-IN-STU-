import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, FlatList, Image, StyleSheet, ScrollView } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';
import { AllStyle } from '../../style/style';
import AsyncStorage from '@react-native-async-storage/async-storage';  // 导入 AsyncStorage

export default function CardComponent({ title, context, images, postId }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [content, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [token, setToken] = useState(null);  // 新增 token 状态

  // 加载评论数据
  useEffect(() => {
    if (postId) {
      fetchComments(postId);
    }
    // 获取 token
    const fetchToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');  // 从 AsyncStorage 获取 token
        console.log('获取的 token:', storedToken);  // 打印获取到的 token
        if (storedToken) {
          setToken(storedToken);  // 设置 token
        }
      } catch (error) {
        console.error('获取 token 失败:', error);
      }
    };

    fetchToken();
  }, [postId]);

  // 请求评论数据
  const fetchComments = async (postId) => {
    try {
      const response = await fetch('http://172.20.10.13:8081/post/getComments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ postId }),
      });

      const data = await response.json();

      if (data.success) {
        setComments(data.data);
      } else {
        console.error('评论加载失败');
      }
    } catch (error) {
      console.error('评论请求失败:', error);
    }
  };

  const handleComments = async () => {
    console.log('提交的评论:', content);  // 打印评论内容
    if (content.trim() !== '' && token) {  // 确保 token 存在且评论不为空
      const newComment = {
        id: Math.random().toString(),
        description: content.trim(),
        time: new Date().toLocaleString(),  // 默认本地时间
      };
  
      // 获取当前时间并加 8 小时
      const currentTime = new Date();
      currentTime.setHours(currentTime.getHours() + 8);  // 增加 8 小时
  
      // 格式化为 MySQL 支持的时间格式
      const formattedTime = currentTime.toISOString().slice(0, 19).replace('T', ' ');  // 变成 YYYY-MM-DD HH:mm:ss
  
      // 提交评论到服务器
      try {
        const response = await fetch('http://172.20.10.13:8081/post/comment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            postId: postId,
            content: content.trim(),
            createdAt: formattedTime,  // 使用 MySQL 支持的时间格式
          }),
        });
        const data = await response.json();
        console.log(data);
        if (data.success) {
          setComments((prevComments) => [newComment, ...prevComments]);
          setComment('');
        }
      } catch (error) {
        console.error('评论提交失败:', error);
      }
    } else {
      console.error('没有 token 或评论为空');
    }
  };
  
  

  const startModalVisible = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content style={styles.cardContent}>
          {/* 图片部分 */}
          <View style={styles.imageContainer}>
            <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false}>
              {images.map((item, index) => (
                <Image
                  key={index}
                  source={{ uri: item }} // 使用 uri 来加载图片
                  style={styles.image}
                  resizeMode="cover"
                />
              ))}
            </ScrollView>
          </View>

          {/* 标题 */}
          <Title style={styles.title}>{title}</Title>

          {/* 内容 */}
          <Paragraph style={styles.description}>{context}</Paragraph>
          <Text style={styles.time}>{new Date().toLocaleDateString()}</Text>
        </Card.Content>

        {/* 评论按钮 */}
        <TouchableOpacity onPress={startModalVisible}>
          <View style={styles.iconContainer}>
            <FontAwesome name="commenting" size={30} color={AllStyle.color.tabIconFocused} />
          </View>
        </TouchableOpacity>

        {/* 评论模态框 */}
        <Modal visible={modalVisible} animationType="slide" transparent={true} onRequestClose={closeModal}>
          <View style={styles.modalOverlay}>
            <View style={styles.modal}>
              <AntDesign
                name="close"
                size={24}
                color="black"
                style={styles.closeIcon}
                onPress={closeModal}
              />
              <TextInput
                placeholder="请输入您想输入的评论"
                multiline
                value={content}
                onChangeText={setComment}
                style={styles.textInput}
              />
              <TouchableOpacity
                style={styles.button}
                onPress={handleComments}
                disabled={!token || content.trim() === ''}  // 禁用提交按钮，直到 token 和评论有效
              >
                <Text style={styles.submit}>提交</Text>
              </TouchableOpacity>

              {/* 评论区 */}
              <FlatList
                data={comments}
                renderItem={({ item }) => (
                  <View style={styles.commentContainer}>
                    <Text style={styles.description}>{item.content}</Text>
                    <Text style={styles.time}>{new Date(item.created_at).toLocaleString()}</Text>
                  </View>
                )}
                keyExtractor={(item, index) => index.toString()} // 使用索引作为 key
              />
            </View>
          </View>
        </Modal>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  card: {
    marginBottom: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  cardContent: {
    paddingBottom: 40,
  },
  imageContainer: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    overflow: 'hidden',
    borderRadius: 8,
  },
  image: {
    width: 300,
    height: '100%',
    marginRight: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    marginVertical: 8,
    color: 'gray',
  },
  time: {
    fontSize: 12,
    color: 'gray',
  },
  iconContainer: {
    position: 'absolute',
    bottom: 10,
    right: 20,
  },
  closeIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modal: {
    backgroundColor: AllStyle.color.homeCard6,
    padding: 20,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    width: '100%',
    height: '80%',
  },
  textInput: {
    height: 100,
    borderWidth: 2,
    borderColor: 'gray',
    textAlignVertical: 'top',
    marginTop: 20,
    borderRadius: 10,
  },
  button: {
    width: 80,
    backgroundColor: AllStyle.color.homeCard1,
    height: 40,
    borderRadius: 5,
    justifyContent: 'center',
    marginTop: 10,
    alignSelf: 'center',
  },
  submit: {
    fontSize: 17,
    textAlign: 'center',
  },
  commentContainer: {
    borderWidth: 0.8,
    borderColor: 'gray',
    borderRadius: 10,
    marginTop: 10,
    padding: 12,
  },
});
