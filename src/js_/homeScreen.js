import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import { StatusBar } from "expo-status-bar";
import Head from "../../components/home/header";
import Slideshow from "../../components/home/slideshow";
import { AllStyle } from "../../style/style";
import Card from "../../components/home/card";
import CardBottom from '../../components/home/cardBottom';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

// 获取屏幕宽度和高度
const { width, height } = Dimensions.get('window');

// 自定义react-native-paper的主题，修改默认字体颜色为黑色
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    text: 'black',  // 设置字体颜色为黑色
  },
};

const HomeScreen = ({ navigation }) => {

  const [content, setContent] = useState({
    course: { title: '课程表', id: "1", width: wp('45%'), height: hp('25%') },
    find: { title: '失物招领', id: '2', width: wp('45%'), height: hp('12%') },
    shop: { title: '二手交易', id: '3', width: wp('45%'), height: hp('12%') },
  });

  const [smallContent, setSmallContent] = useState([
    { title: '校历', id: '4', screen: 'calendar' },
    { title: '官网', id: '5', screen: 'web' },
    { title: '通讯录', id: '6', screen: 'contact' },
    {title:'贴吧',id:'7',screen:'discussion'},
  ]);

  const [goods, setGoods] = useState([
    { title: '学校徽章', id: '1', paragraph: '￥10', src: require('../../images/Home/徽章.jpg') },
    { title: '校园明信片', id: '2', paragraph: '￥20', src: require('../../images/Home/明信片.jpg') },
    { title: '纪念T恤', id: '3', paragraph: '￥30', src: require('../../images/Home/T恤.jpg') },
    { title: '定制笔记本', id: '4', paragraph: '￥5', src: require('../../images/Home/笔记本.jpg') },
    { title: '校园定制水杯', id: '5', paragraph: '￥15', src: require('../../images/Home/水杯.png') },
    { title: '校园定制U盘', id: '6', paragraph: '￥40', src: require('../../images/Home/U盘.jpg') },
    { title: '校园定制手提袋', id: '7', paragraph: '￥10', src: require('../../images/Home/手提袋.png') },
    { title: '校园定制冰箱贴', id: '8', paragraph: '￥20', src: require('../../images/Home/冰箱贴.jpg') },
  ]);

  return (
    <PaperProvider theme={theme}> {/* 使用自定义主题 */}
      <StatusBar />
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <View style={{ backgroundColor: AllStyle.color.home }}>
          {/* 头部 */}
          <Head />
          {/* 轮播图 */}
          <Slideshow />
          
          <View style={{ padding: 15, flexDirection: "row", backgroundColor: "white" }}>
            <Card id={content.course.id} width={content.course.width} height={content.course.height} color={AllStyle.color.homeCard1} text={content.course.title} navigation={navigation} screen='courseLogin' />
            <View style={{ flexDirection: "column" }}>
              <Card id={content.find.id} width={content.find.width} height={content.find.height} color={AllStyle.color.homeCard2} text={content.find.title} navigation={navigation} screen='lostAndFound' />
              <Card id={content.shop.id} width={content.shop.width} height={content.shop.height} color={AllStyle.color.homeCard3} text={content.shop.title} navigation={navigation} screen='twoHands'/>
            </View>
          </View>

          <View style={{ flexDirection: "row", justifyContent: "space-evenly", backgroundColor: "white" }}>
            {smallContent.map((item, index) => {
              let color = AllStyle.color[`homeCard${item.id}`];
              return (
                <Card key={index} width={wp('23%')} height={hp('11%')} color={color} text={item.title} cardStyle={styles.cardStyle} flag={1} id={item.id} navigation={navigation} screen={item.screen} />
              );
            })}
          </View>

          <View style={{ marginTop: 10, backgroundColor: "white" }}>
            <View style={{
              backgroundColor: '#ebebeb',
              width: 140,
              height: 40,
              marginTop: 15,
              marginLeft: 15,
              marginBottom: 5,
              borderRadius: 5,
            }}>
              <Text style={{ fontSize: 25, textAlign: "center", fontWeight: "bold" }}>文创小卖部</Text>
            </View>
            {/* 渲染最下面的文创产品 */}
            <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-around" }}>
              {goods.map((item, index) => {
                return (<CardBottom key={index} title={item.title} paragraph={item.paragraph} src={item.src} />);
              })}
            </View>
          </View>
        </View>
      </ScrollView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  cardStyle: {
    borderRadius: 50,
    elevation: 0,
    marginBottom: 20,
    margin: -2,
  }
});

export default HomeScreen;
