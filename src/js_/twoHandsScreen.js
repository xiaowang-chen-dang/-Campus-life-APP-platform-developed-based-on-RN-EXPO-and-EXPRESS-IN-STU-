import {View,StyleSheet,Image,Text,} from "react-native"
import { Provider as PaperProvider,Searchbar,Chip,FAB} from 'react-native-paper';
import React, { useState, useEffect } from 'react';
import { FlatList } from "react-native";

import Head from '../../components/twoHands/Head'
import TwoHandsCard from '../../components/twoHands/twoHandCard'
import {twoHandsGoods} from '../../data/twoHand/twoHandsGood'
import AddIcon from "../../components/twoHands/addIcon";

const TwoHands = ({navigation}) =>{

  const [filteredGoods, setFilteredGoods] = useState(twoHandsGoods);
  const [searchQuery,setSearchQuery] = useState(null)


  function onSearch(query){
    //更改searchQuery的值
    setSearchQuery(query)
    //根据搜索词过滤东西
    if(query){
    //只要当前遍历到的数据里的标题包含我输入的，就放入newData
       const newData = twoHandsGoods.filter((item)=>
            item.title.includes(query)
        )
        //更新filteredData数组里的内容为过滤数据
        setFilteredGoods(newData)
    }
    else{
        //框里什么都没有就维持原样
        setFilteredGoods(twoHandsGoods)
    }

}

 return(
  <View style={styles.container}>
      
    <Head navigation ={navigation}> </Head>
 
      {/* 搜索框 */}
      <Searchbar
        placeholder='请输入您想要查找的内容'
        //有数据的时候才显示x
        clearIcon="close" // 点击清除图标清空搜索框
        //每当搜索框里的文字发送改变，就调用onSearch函数
        onChangeText={onSearch}
        value={searchQuery}
        style={{
            margin:5,
            backgroundColor:"#f0e6d0"
        }}
        >
      </Searchbar>


    <AddIcon></AddIcon>
      <FlatList
        data = {filteredGoods}
        renderItem={({item})=>{
          return(
          <TwoHandsCard navigation ={navigation} title = {item.title} context={item.context} url={item.url} time ={item.time} actor={item.actor} headImage={item.headImage} contactContent={item.contactContent} value={item.value}/>
        );
        }}
        keyExtractor={(item) => item.id}  // 提供每个项的唯一键
        contentContainerStyle={{paddingBottom:100}}
      ></FlatList>
  </View>
 );

} 
const styles = StyleSheet.create({
  container: {
      flex: 1, // 确保容器占满整个屏幕
      position: 'relative', // 确保AddIcon的位置不会被遮挡
  },
});
export default TwoHands;