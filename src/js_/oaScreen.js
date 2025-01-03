import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { DefaultTheme, Provider as PaperProvider, Searchbar, Chip } from 'react-native-paper';
import { StatusBar } from "expo-status-bar";
import { AllStyle } from '../../style/style';
import Head from '../../components/oa/header';
import CardComponent from '../../components/oa/card'; // 引入 CardComponent
import { MaterialCommunityIcons } from '@expo/vector-icons';

const PAGE_SIZE = 10; // 每页显示的新闻条数

// 自定义react-native-paper的主题，修改默认字体颜色为黑色
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    text: 'black',  // 设置字体颜色为黑色
  },
};

const Oa = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('全部');
  const categories = ['全部', '活动', '比赛'];

  const [currentPage, setCurrentPage] = useState(0); // 初始 page 为 0
  const [currentType, setCurrentType] = useState(0); // 初始 type 为 0（全部）

  // 获取新闻数据
  const fetchNewsData = async (page, type) => {
    console.log(`Fetching data with page=${page}, type=${type}`); // 打印传递的参数

    try {
      const url = `http://172.20.10.13:8081/oa/showOas?page=${page}&type=${type}`;
      console.log(`Fetching data with URL: ${url}`); // 详细日志，查看请求的完整 URL

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorText = await response.text(); // 捕获并打印响应文本
        console.error(`HTTP error ${response.status}: ${errorText}`);
        return;
      }

      const data = await response.json();

      if (data && data.success && Array.isArray(data.data)) {
        setFilteredData(data.data); // 设置返回的数据
      } else {
        console.error('Returned data is not in expected format:', data); // 错误日志
      }
    } catch (error) {
      console.error('Error fetching data:', error); // 错误日志
    }
  };

  // 搜索功能（POST请求）
  const searchNewsData = async (keywords, page, type) => {
    console.log(`Searching data with keywords=${keywords}, page=${page}, type=${type}`); // 打印传递的参数

    try {
      const url = `http://172.20.10.13:8081/oa/selectOas`; // 后端提供的POST接口
      console.log(`Searching data with URL: ${url}`); // 详细日志，查看请求的完整 URL

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          keywords, // 搜索关键词
          page,     // 当前页
          type,     // 分类类型
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`HTTP error ${response.status}: ${errorText}`);
        return;
      }

      const data = await response.json();

      if (data && Array.isArray(data.data)) {
        setFilteredData(data.data); // 设置返回的数据
      } else {
        console.error('Returned data is not in expected format:', data);
      }
    } catch (error) {
      console.error('Error searching data:', error);
    }
  };

  useEffect(() => {
    fetchNewsData(currentPage, currentType); // 在组件加载时获取数据
  }, [currentPage, currentType]); // 当分页或分类变动时重新获取数据

  // 搜索框输入处理
  function onSearch(query) {
    setSearchQuery(query);
    if (query) {
      searchNewsData(query, currentPage, currentType); // 搜索时调用POST接口
    } else {
      fetchNewsData(currentPage, currentType); // 如果没有输入查询，加载所有数据
    }
  }

  // 分类筛选功能
  function onClick(item) {
    let type = 0; // 默认全部
    if (item === '活动') {
      type = 1;
    } else if (item === '比赛') {
      type = 2;
    }

    setSelectedCategory(item);
    setCurrentType(type); // 设置 type
    setCurrentPage(0); // 重置为第一页（page 为 0）
    // 点击分类时不触发搜索，直接加载新的数据
    fetchNewsData(0, type); // 重新加载第一页数据，不带搜索关键词
  }

  // 分页功能：获取当前页的数据
  const getCurrentPageData = () => {
    if (!Array.isArray(filteredData)) {
      return [];
    }
    const start = currentPage * PAGE_SIZE;
    const end = (currentPage + 1) * PAGE_SIZE;
    return filteredData.slice(start, end);
  };

  // 处理上一页
  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  // 处理下一页
  const handleNextPage = () => {
    const totalPages = Math.ceil(filteredData.length / PAGE_SIZE);
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <PaperProvider theme={theme}>
      <StatusBar />
      <ScrollView style={styles.container}>
        <View>
          <Head />

          {/* 搜索框 */}
          <Searchbar
            placeholder="请输入您想要查找的内容"
            clearIcon="close"
            onChangeText={onSearch}
            value={searchQuery}
            style={styles.searchbar}
          />

          {/* 筛选标签 */}
          <View style={styles.chipContainer}>
            {categories.map((item, index) => (
              <Chip
                key={index}
                onPress={() => onClick(item)}
                selected={item === selectedCategory}
                style={styles.chip}
                mode="outlined"
              >
                {item}
              </Chip>
            ))}
          </View>

          {/* 新闻列表 */}
          <View style={styles.cardContainer}>
            {getCurrentPageData().length > 0 ? (
              getCurrentPageData().map((item) => (
                <CardComponent
                  key={item.id}
                  title={item.title}
                  time={item.publish_date}
                  unit={item.author}
                  id={item.id} // 将 newsId 传递给 CardComponent
                  onPress={() => navigation.navigate('NewsDetail', { id: item.id })}
                />
              ))
            ) : (
              <Text style={styles.noDataText}>暂无相关公告</Text>
            )}
          </View>

          {/* 分页控制 */}
          <View style={styles.paginationContainer}>
            <Text onPress={handlePreviousPage} style={styles.paginationButton}>
              上一页
            </Text>
            <Text style={styles.pageNumber}>
              第 {currentPage + 1} 页
            </Text>
            <Text onPress={handleNextPage} style={styles.paginationButton}>
              下一页
            </Text>
          </View>
        </View>
      </ScrollView>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchbar: {
    margin: 10,
    backgroundColor: '#f0e6d0',
  },
  chipContainer: {
    flexDirection: 'row',
    marginLeft: 10,
    marginBottom: 10,
    marginTop: 5,
  },
  chip: {
    width: 67,
    marginRight: 10,
    backgroundColor: '#E7E1B9',
    height: 35,
    borderRadius: 15,
  },
  cardContainer: {
    marginTop: 10,
    paddingTop: 7,
    backgroundColor: 'white',
    paddingBottom: 20,
  },
  noDataText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: 'gray',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  paginationButton: {
    fontSize: 18,
    padding: 10,
    color: '#007BFF',
  },
  pageNumber: {
    fontSize: 16,
    padding: 10,
  },
});

export default Oa;
