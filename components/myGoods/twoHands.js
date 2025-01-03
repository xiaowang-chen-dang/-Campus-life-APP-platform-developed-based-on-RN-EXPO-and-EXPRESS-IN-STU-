import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SectionList,FlatList } from 'react-native';
import { twoHands } from '../../data/myGoods/twoHand';
import LostCard from './lostCard'
export default function TwoHands({navigation}){
  const [twoHandsData,setTwoHandsData] = useState(twoHands)

  const handleDelete = (id)=>{
      // const newData = lostData.filter((item)=>{item.id !== id})
      // setLostData(newData)
      setTwoHandsData((prevItems) => prevItems.filter(item => item.id !== id));
  }
    return(
        <View
        style={{
          flex: 1,
        }}>

    <FlatList
      data={twoHandsData}
      renderItem={({item})=>{
        return(  
          //将筛选id也就是删除某个商品的函数作为参数传递给组件，使得组件可以直接调用onDelete函数以此调用handleDelete函数，从而实现状态的变化
        <LostCard navigation={navigation} url={item.url} title={item.title} time={item.time} context={item.context} flag={true} value={item.value} onDelete = {()=>handleDelete(item.id)}></LostCard>);
      
      }}
      keyExtractor={(item) => item.id}
      style={{
          backgroundColor: '#f4f4f4',
       }}
     />
        </View>
    );
}