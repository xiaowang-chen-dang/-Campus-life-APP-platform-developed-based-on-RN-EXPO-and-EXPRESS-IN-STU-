import React from 'react';
import { View, Text, Image, StyleSheet} from 'react-native';
import Swiper from 'react-native-swiper';

//图片
const images = [
    require('../../images/Home/campus1.jpg'),
    require('../../images/Home/campus2.jpg'), 
    require('../../images/Home/campus3.jpg'),
    require('../../images/Home/campus4.jpg'),
    require('../../images/Home/campus5.jpg'),
    require('../../images/Home/campus6.jpg'),
    // 确保添加其他图片
  ];
  
  const Slideshow = () => {
    return (
   
        // 外层的 View 用于包裹整个轮播图
      <View style={styles.wrapper}>
        <Swiper
          autoplay={true}
          autoplayTimeout={3}
          //paginationStyle: 应用样式到指示器的容器 下面点点的样式
          paginationStyle={styles.pagination} // 设置指示器样式
  
        //renderPagination: 自定义分页指示器的渲染逻辑，到哪一页，哪一页的小白点就显示
          renderPagination={(index, total) => (
            <View style={styles.paginationContainer}>
              {
              Array.from({ length: total }).map((_, i) => (
                <View
                  key={i}
                  style={[
                    styles.paginationDot,
                    { opacity: index === i ? 1 : 0.5 }, // 当前页透明度
                  ]}
                />
              ))}
            </View>

          )}
        >
          {images.map((image, index) => (
            <View key={index} style={styles.container}>
              <Image source={image} style={styles.img} />
            </View>
          ))}
        </Swiper>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    wrapper: {
      height: 250, // 根据需要调整高度
      width:'95%',
      left:12,
      marginTop:20,
      marginBottom:10,
      overflow: 'hidden', // 确保子组件不超出边界
      borderRadius: 15, // 设置边角半径
    },
    container: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    img: {
      width: '100%',
      height: '100%', // 或者根据需要调整高度
    },
    paginationContainer: {
      position: 'absolute',
      bottom: 10, // 指示器距离底部的距离
      left: 0,
      right: 0,
      justifyContent: 'center',
      flexDirection: 'row',
    },
    paginationDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: 'white', // 指示器的颜色
      marginHorizontal: 4,
    },
  });
  
  export default Slideshow;