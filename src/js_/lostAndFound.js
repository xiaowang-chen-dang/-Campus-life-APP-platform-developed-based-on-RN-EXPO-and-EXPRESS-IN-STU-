import React, { useEffect, useState } from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Head from '../../components/lostAndFound/head'; // 假设你有这个组件
import AddIcon from '../../components/lostAndFound/addIcon'; // 假设你有这个组件
import { AllStyle } from '../../style/style'; // 你可以自定义样式
import Goods from '../../components/lostAndFound/Goods';

const { width, height } = Dimensions.get('window'); // 获取屏幕宽高

const LostAndFound = ({ navigation }) => {
  const [filteredGoods, setFilteredGoods] = useState([]); // 存储商品数据
  const [loading, setLoading] = useState(true); // 控制加载状态
  const [page, setPage] = useState(0); // 当前页数
  const [hasMore, setHasMore] = useState(true); // 是否还有更多数据
  const [refreshing, setRefreshing] = useState(false); // 控制下拉刷新状态

  // 请求后端数据
  const fetchData = async (page) => {
    console.log('Fetching data for page:', page); // 打印 page 参数，确保传递正确
    setLoading(true); // 开始加载数据
    try {
      const response = await fetch('http://172.20.10.13:8081/home/getLostFounds', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ page: page }), // 仅传递 page 参数
      });

      const responseText = await response.text();
      console.log('Response Text:', responseText); // 打印响应文本，帮助调试

      const data = JSON.parse(responseText); // 使用 JSON.parse 手动解析
      if (data.success) {
        if (data.data.length === 0) {
          console.log('没有更多数据了');
          setHasMore(false); // 设置没有更多数据
          return;
        }

        if (page === 0) {
          setFilteredGoods(data.data); // 如果是第一页，直接替换数据
        } else {
          setFilteredGoods((prevGoods) => [...prevGoods, ...data.data]); // 如果是加载更多，追加数据
        }
      } else {
        console.error('数据加载失败:', data); // 输出失败的原因
      }
    } catch (error) {
      console.error('网络请求错误:', error);
    } finally {
      setLoading(false); // 请求结束，关闭加载状态
    }
  };

  // 下拉刷新功能
  const handleRefresh = async () => {
    setRefreshing(true);
    setPage(0); // 刷新时重置页数
    await fetchData(0); // 重新加载第一页数据
    setRefreshing(false);
  };

  const handleEndReached = () => {
    if (!loading && hasMore) {
      setPage((prevPage) => prevPage + 1); // 滚动到底部时，更新页数
    }
  };

  useEffect(() => {
    fetchData(page); // 初始化加载第一页数据
  }, [page]);

  // 渲染每一项
  const renderItem = ({ item }) => {
    const pictureUrl = item.picture ? `http://172.20.10.13:8081/${item.picture.replace("\\", "/")}?t=${new Date().getTime()}` : null;
    const avatarUrl = item.user_avatar ? `http://172.20.10.13:8081/${item.user_avatar.replace("\\", "/")}?t=${new Date().getTime()}` : null;

    console.log("Picture URL:", pictureUrl);  // 输出图片 URL
    console.log("Avatar URL:", avatarUrl);    // 输出头像 URL

    return (
      <Goods
        navigation={navigation}
        title={item.title}
        context={item.content}
        url={pictureUrl}
        time={new Date(item.created_at).toLocaleString()}
        actor={item.username}
        headImage={avatarUrl}
        contactContent={item.content}
      />
    );
  };

  // 加载状态展示
  if (loading && page === 0) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={AllStyle.color.homeCard7} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Head navigation={navigation} />
      <AddIcon />
      <FlatList
        data={filteredGoods}
        renderItem={renderItem}
        keyExtractor={(item) => `${item.object_id}-${item.created_at}`} // 使用 object_id 和 created_at 组合成唯一的 key
        contentContainerStyle={styles.flatListContent}
        refreshing={refreshing} // 控制下拉刷新状态
        onRefresh={handleRefresh} // 下拉刷新事件
        onEndReached={handleEndReached} // 当滚动到底部时调用
        onEndReachedThreshold={0.5} // 距离底部50%时触发
        ListFooterComponent={
          loading && hasMore ? (
            <ActivityIndicator size="large" color={AllStyle.color.homeCard7} style={styles.loader} />
          ) : null
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    position: 'relative',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatListContent: {
    paddingBottom: 100, // 留出空间给 AddIcon
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LostAndFound;
