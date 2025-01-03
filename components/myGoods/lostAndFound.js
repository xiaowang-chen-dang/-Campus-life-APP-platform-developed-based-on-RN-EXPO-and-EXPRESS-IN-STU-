import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SectionList,FlatList } from 'react-native';
import { lostGoods } from '../../data/myGoods/lostGoods';
import LostCard from './lostCard'
export default function LostAndFound({navigation}){

    const [lostData,setLostData] = useState(lostGoods)
    const handleDelete = (id)=>{
        // const newData = lostData.filter((item)=>{item.id !== id})
        // setLostData(newData)
        setLostData((prevItems) => prevItems.filter(item => item.id !== id));
    }
    return(
        <View
        style={{
          flex: 1,
        }}>

    <FlatList
      data={lostData}
      renderItem={({item})=>{
        return(  
        <LostCard navigation={navigation} url={item.url} title={item.title} time={item.time} context={item.context}
        onDelete = {()=>handleDelete(item.id)}></LostCard>);
      }}
      keyExtractor={(item) => item.id}
      style={{
          backgroundColor: '#f4f4f4',
       }}
     />
        </View>
    );
}