import {View,StyleSheet,Image,Text,Dimensions} from "react-native"
import { Card,Paragraph,Title} from "react-native-paper"
import React, { useState, useEffect } from 'react';
import { AllStyle } from "../../style/style";
//传入expo的api WebBrowser,用于app内部的网页跳转
import * as WebBrowser from 'expo-web-browser';

const CardComponent = ({navigation,src,title,color})=>{
    //页面跳转的函数
    async function jump(){
        await WebBrowser.openBrowserAsync(src)
    };
    return(
        <View>
            <Card
            style={{
                height:150,
                margin:15,
                backgroundColor:color,
                flexDirection:"column",
                justifyContent:"center",
            }}
            onPress={()=>jump()}>
                <Title
                style={{
                    textAlign:"center",
                    fontSize:24,
                    fontFamily:'thinkAndRound',
                }}>{title}</Title>
            </Card>
        </View>
    );
}


export default CardComponent;