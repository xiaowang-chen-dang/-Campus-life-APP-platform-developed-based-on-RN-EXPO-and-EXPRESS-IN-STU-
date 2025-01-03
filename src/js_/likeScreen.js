import React, { useState, useEffect } from 'react';
import { View,Text,StyleSheet,ScrollView ,Dimensions,FlatList} from "react-native";
import { Provider as PaperProvider,Searchbar,Chip,FAB} from 'react-native-paper';
import Head from '../../components/like/Head'
import { likeData } from '../../data/like/likeData';
import LikeCard from '../../components/like/likeCard'
export default function LikeScreen({navigation}){

    const [filteredGoods, setFilteredGoods] = useState(likeData);
    const [searchQuery,setSearchQuery] = useState(null)

    //搜索框查询函数
    function onSearch(query){
        //更改searchQuery的值
        setSearchQuery(query)
        //根据搜索词过滤东西
        if(query){
        //只要当前遍历到的数据里的标题包含我输入的，就放入newData
           const newData = filteredGoods.filter((item)=>
                item.title.includes(query)
            )
            //更新filteredData数组里的内容为过滤数据
            setFilteredGoods(newData)
        }
        else{
            //框里什么都没有就维持原样
            setFilteredGoods(likeData)
        }
    
    }

    const handleDelete = (id)=>{
        // const newData = lostData.filter((item)=>{item.id !== id})
        // setLostData(newData)
        setFilteredGoods((prevItems) => prevItems.filter(item => item.id !== id));
    }

    return(
        <View style={{
            flex:1,
        }}>
            <Head navigation={navigation}></Head>

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


      <FlatList
      data={filteredGoods}
      renderItem={({item})=>{
        return(  
        <LikeCard navigation={navigation} url={item.url} title={item.title} time={item.time} context={item.context} flag={true} value={item.value} onDelete = {()=>handleDelete(item.id)}></LikeCard>);
      
      }}
      keyExtractor={(item) => item.id}
      style={{
          backgroundColor: '#f4f4f4',
       }}
     />
        </View>
    );
}