import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Paragraph, Title } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native'; // 导入 useNavigation 来获取 navigation 对象
import { AllStyle } from "../../style/style";

const CardComponent = ({ title, unit, time, id }) => {
  const navigation = useNavigation(); // 使用 useNavigation 获取 navigation 对象

  // 点击卡片跳转到 NewsDetail 页面，并传递 newsId
  const handlePress = () => {
    navigation.navigate('NewsDetail', { id }); // 传递 newsId 参数
  };

  return (
    <View>
      <TouchableOpacity onPress={handlePress}>
        <Card style={styles.card}>
          <Card.Content>
            <Title>{title}</Title>
            <Paragraph>{unit}</Paragraph>
            <Paragraph>{time}</Paragraph>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 5,
    marginTop: 5,
    backgroundColor: AllStyle.color.oaCard,
  },
});

export default CardComponent;
