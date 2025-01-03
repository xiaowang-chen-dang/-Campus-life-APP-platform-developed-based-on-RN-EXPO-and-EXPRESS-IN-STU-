import ContactCard  from "./contactCard";
import { StyleSheet, Text, View, SectionList,TouchableOpacity } from 'react-native';
import {contactData} from '../../data/contact/contactData'
import { Provider as PaperProvider,Searchbar,Chip,FAB} from 'react-native-paper';
import React, { useState, useEffect } from 'react';
import { FlatList } from "react-native";
import { AllStyle } from "../../style/style";
import AntDesign from '@expo/vector-icons/AntDesign';

export default function Same ({data}){

    const [allData,setAllData] = useState(data);
   
    const [mode,setMode] = useState(null)

    function change(id){

        //点击指定的栏目就会更改mode为id值，若发现当前点击的id值与当前的mode一样，就代表要回收栏目
        setMode(mode === id ? null : id); 
    }


    return(
        <View>

    <FlatList
        data={data}
        renderItem={({item})=>{
            //判断当前选中的id与mode一不一样，从而更改上下图标
            const isOpen = mode === item.id;
            return(
                <View>
                <TouchableOpacity style={{
                    height:50,
                    margin:5,
                    borderRadius:10,
                    backgroundColor:AllStyle.color.home,
                    flexDirection:"row",
                    alignItems: 'center',    
                }}
                onPress={()=>{change(item.id)}}
                >
                <Text
                style={{
                    fontSize:20,
                    flex:7
                }}>{item.category}</Text>
                 <AntDesign
                    name={isOpen ? "caretdown" : "caretup"} // Toggle the icon
                    size={24}
                    color={AllStyle.color.homeCard3}
                    style={{
                            flex: 1
                        }}
                                />
              </TouchableOpacity>

              {
                mode === item.id &&(
                <FlatList
                data = {data[mode-1].phoneAndNumber}
                renderItem={({item})=>{
                    return(
                        <ContactCard name = {item.name} number = {item.number}></ContactCard>
                    );
                }} 
            keyExtractor={(item, index) => index}// 使用name和index生成唯一键
            >

            </FlatList>
        )
      }
              </View>   
            );
        }}
    >

    </FlatList>

        </View>
    );
} 