import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { PaperProvider, DefaultTheme, ActivityIndicator } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import Head from '../../components/oa/header'; // 添加Head组件的导入

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    text: 'black',
  },
};

const NewsDetail = ({ route, navigation }) => {
  const { id } = route.params; // 获取传递的 newsId 参数
  const [newsDetail, setNewsDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  // 获取新闻详情（使用POST请求）
  const fetchNewsDetail = async (id) => {
    try {
      console.log(`Fetching news detail for newsId: ${id}`);
      const url = 'http://172.20.10.13:8081/oa/getOa'; // 后端POST接口路径
      console.log(`Fetching news detail from: ${url}`);

      const response = await fetch(url, {
        method: 'POST', // 使用POST请求
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }), // 传递 newsId 到后端
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Error: ${errorText}`);
        return;
      }

      const data = await response.json();
      console.log('Received data:', data); // 打印接收到的数据

      if (data && data.success && data.data) {
        setNewsDetail(data.data); // 将返回的新闻详情数据存入状态
      } else {
        console.error('News detail not found or in incorrect format:', data);
      }
    } catch (error) {
      console.error('Error fetching news detail:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchNewsDetail(id); // 通过新闻 ID 获取新闻详情
    }
  }, [id]); // 当 newsId 改变时重新获取新闻详情

  if (loading) {
    return (
      <PaperProvider theme={theme}>
        <StatusBar />
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" />
        </View>
      </PaperProvider>
    );
  }

  // 确保 newsDetail 和 data 存在
  if (!newsDetail || !newsDetail.results || !newsDetail.results.length) {
    return (
      <PaperProvider theme={theme}>
        <StatusBar />
        <View style={styles.container}>
          <Text>无法获取新闻详情</Text>
        </View>
      </PaperProvider>
    );
  }

  const newsItem = newsDetail.results[0]; // 获取新闻详情的第一个对象

  const handleAttachmentClick = (filePath) => {
    console.log(`Attachment clicked, Path: ${filePath}`); // 打印点击的文件路径
  
    try {
      // 将路径中的反斜杠 \ 转换为正斜杠 /
      const normalizedPath = filePath.replace(/\\/g, '/');
  
      // 构建完整的文件下载 URL，指向静态资源路径
      const baseUrl = 'http://172.20.10.13:8081'; // 你的服务器地址
      const fileUrl = `${baseUrl}/${normalizedPath}`;  // 使用 /uploads 路径进行文件下载
  
      console.log(`File URL: ${fileUrl}`); // 打印完整的下载链接
  
      // 使用 Linking 打开文件链接进行下载
      Linking.openURL(fileUrl);
    } catch (error) {
      console.error('下载文件时出错:', error);
    }
  };
  
  
  return (
    <PaperProvider theme={theme}>
      <StatusBar />
      <ScrollView style={styles.container}>
        <Head /> {/* 添加Head组件 */}

        {/* 增加顶部间距，确保大卡片和顶部状态栏有一定距离 */}
        <View style={styles.cardContainerWrapper}>
          <View style={styles.cardContainer}>
            {/* 新闻标题、日期、作者 */}
            <Text style={styles.title}>{newsItem.title}</Text>
            <Text style={styles.date}>{newsItem.publish_date}</Text>
            <Text style={styles.author}>作者: {newsItem.author}</Text>

            {/* 新闻内容 */}
            <Text style={styles.body}>{newsItem.content}</Text>
            <Text style={styles.author}>附件：</Text>
            {/* 显示附件 */}
            {newsDetail.fresults && newsDetail.fresults.length > 0 && (
              <View style={styles.attachmentContainer}>
                {newsDetail.fresults.map((attachment, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.attachmentButton}
                    onPress={() => handleAttachmentClick(attachment.path)} // 直接传递path进行下载
                  >
                    <Text style={styles.attachmentText}>{attachment.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        </View>

        {/* 返回按钮 */}
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>返回</Text>
        </TouchableOpacity>
      </ScrollView>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // padding: 10,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContainerWrapper: {
    marginTop: 10, // 增加与顶部状态栏的距离
  },
  cardContainer: {
    padding: 15,
    backgroundColor: '#f9f1db', // 卡片颜色
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  date: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 5,
  },
  author: {
    fontSize: 16,
    marginBottom: 15,
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
    color: 'black',
    marginBottom: 20,
  },
  attachmentContainer: {
    marginTop: 5,
  },
  attachmentButton: {
    padding: 10,
    backgroundColor: '#E7E1B9',
    borderRadius: 5,
    marginBottom: 10,
  },
  attachmentText: {
    fontSize: 16,
    color: '#007BFF',
  },
  backButton: {
    padding: 16,
    backgroundColor: '#E7E1B9',
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  backText: {
    fontSize: 16,
    color: '#fff',
  },
});

export default NewsDetail;
