import React, { useEffect, useState } from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Head from '../../components/discussion/Head'; // 假设你有这个组件
import AddIcon from '../../components/discussion/AddIcon'; // 假设你有这个组件
import { AllStyle } from '../../style/style'; // 你可以自定义样式
import CardComponent from '../../components/discussion/CardComponents'; // 引入CardComponent

const { width, height } = Dimensions.get('window'); // 获取屏幕宽高

const Discussion = ({ navigation }) => {
    const [posts, setPosts] = useState([]); // 存储帖子数据
    const [loading, setLoading] = useState(true); // 控制加载状态
    const [page, setPage] = useState(0); // 当前页数
    const [hasMore, setHasMore] = useState(true); // 是否还有更多数据

    useEffect(() => {
        // 初始化加载第一页数据
        fetchPosts(page);
    }, [page]);

    // 请求后端数据
    const fetchPosts = async (page) => {
        console.log('Fetching posts for page:', page); // 打印 page 参数，确保传递正确
        setLoading(true); // 开始加载数据
        try {
            const response = await fetch('http://172.20.10.13:8081/home/getPosts', {
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
                    setPosts(data.data); // 如果是第一页，直接替换数据
                } else {
                    setPosts((prevPosts) => [...prevPosts, ...data.data]); // 如果是加载更多，追加数据
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

    const handleEndReached = () => {
        if (!loading && hasMore) {
            setPage((prevPage) => prevPage + 1); // 滚动到底部时，更新页数
        }
    };

    const formatImageUrls = (post) => {
        const imageUrls = [];
        if (post.picture) {
            imageUrls.push(`http://172.20.10.13:8081/${post.picture.replace("\\", "/")}`);
        }
        if (post.picture2) {
            imageUrls.push(`http://172.20.10.13:8081/${post.picture2.replace("\\", "/")}`);
        }
        if (post.picture3) {
            imageUrls.push(`http://172.20.10.13:8081/${post.picture3.replace("\\", "/")}`);
        }
        return imageUrls;
    };

    if (loading && page === 0) {
        return <ActivityIndicator size="large" color={AllStyle.color.homeCard7} style={styles.loader} />;
    }

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <Head navigation={navigation} /> {/* 头部组件 */}
            <AddIcon /> {/* 添加按钮组件 */}
            <FlatList
                data={posts}
                renderItem={({ item }) => {
                    const images = formatImageUrls(item); // 格式化图片数据
                    return (
                        <CardComponent
                            title={item.title}
                            context={item.content}
                            images={images} // 传递图片数组
                            postId={item.post_id} // 传递 post_id
                        />
                    );
                }}
                keyExtractor={(item, index) => index.toString()} // 使用数组索引作为唯一标识
                onEndReached={handleEndReached} // 当滚动到底部时调用
                onEndReachedThreshold={0.5} // 距离底部50%时触发
                ListFooterComponent={
                    loading && hasMore ? (
                        <ActivityIndicator size="large" color={AllStyle.color.homeCard7} style={styles.loader} />
                    ) : null
                }
                style={styles.flatList} // 为FlatList添加样式
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        position: 'relative', // 确保AddIcon的位置不会被遮挡
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    flatList: {
        width: '100%', // 确保FlatList占满父容器宽度
        marginBottom: 50, // 给FlatList留出底部空间，防止被其他元素遮挡
    },
});

export default Discussion;
