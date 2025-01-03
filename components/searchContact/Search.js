import ContactCard  from "../contact/contactCard";
import { StyleSheet, Text, View, SectionList,TouchableOpacity } from 'react-native';
import {eastCampus} from '../../data/contact/eastCampus'
import { Provider as PaperProvider,Searchbar,Chip,FAB} from 'react-native-paper';
import React, { useState, useEffect } from 'react';
import { FlatList } from "react-native";
import { AllStyle } from "../../style/style";
import AntDesign from '@expo/vector-icons/AntDesign';

//接受data数组，data是本部和东海岸的数据
export default function SearchContact ({data}){
    const [queryInfo,setQueryInfo] = useState('')
    const [campusData,setCampusData] = useState(data);
    //将所有的phoneAndNumber变成一个数组放入filterEast
    const [filterCampus, setFilterCampus] = useState('');

    //筛选符合搜索框的数据并放入filterCampus
    function onSearch(query) {
        setQueryInfo(query);
        if (query) {
            //不区分大小写
            const newData = data.flatMap(item => item.phoneAndNumber).filter(item => item.name.toLowerCase().includes(query));
            setFilterCampus(newData);
        } else {
            setFilterCampus('');
        }
    }

    return(
        <View>
     {/* 搜索框 */}
     <Searchbar
        placeholder='请输入您想要查找的内容'
        //有数据的时候才显示x
        clearIcon="close" // 点击清除图标清空搜索框
        //每当搜索框里的文字发送改变，就调用onSearch函数
        onChangeText={onSearch}
        value={queryInfo}
        style={{
            margin:5,
            backgroundColor:"#f0e6d0"
        }}
        >
      </Searchbar>


{/* 渲染搜索框里的内容 */}
     <FlatList
        data = {filterCampus}
        renderItem={({item})=>{
            return(
            <ContactCard name = {item.name} number = {item.number}></ContactCard>
          );
          }}
          keyExtractor={(item, index) => item.name + index}// 使用name和index生成唯一键
        
            ></FlatList>

        </View>
    );
} 