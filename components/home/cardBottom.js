import {View,StyleSheet,Image,Text} from "react-native"
import { Card,Title,Paragraph} from "react-native-paper"
import React, { useState, useEffect } from 'react';
import { AllStyle } from "../../style/style";
const CardBottom = ({title,paragraph,src})=>{

    let url = src;
    return(
        <Card
        style={{
            width:"47%",
            marginTop:8,
            borderRadius:15,
            backgroundColor:AllStyle.color.bottomCard,
            overflow: 'hidden', // 确保图片和圆角不会超出Card
        }}>
            <Card.Content
             style={{
                flex: 1, // 确保Card.Content占据整个Card的高度
                padding: 0, // 移除默认的padding
            }}>
                <Image
                    source={url}
                    style={{
                        width:'100%',
                        height:250,
                        resizeMode: "cover", // 确保图片按比例填充，裁剪图片的多余部分
                        borderRadius:15,
                    }}></Image>
                <Title style={{ marginTop: 10 }}>{title}</Title>
                <Paragraph>{paragraph}</Paragraph>
                </Card.Content>
        </Card>
    );
}


export default CardBottom;