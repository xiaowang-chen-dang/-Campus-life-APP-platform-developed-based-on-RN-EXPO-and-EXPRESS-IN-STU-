import {View,StyleSheet,Image,Text,TouchableOpacity} from "react-native"
import { Card,Paragraph,Title} from "react-native-paper"
import React, { useState, useEffect } from 'react';
import { AllStyle } from "../../style/style";
import AntDesign from '@expo/vector-icons/AntDesign';

const information = ({src,name,id,navigation})=>{

    return(
        <View>
            <Card
            style={{
                margin:10,
            }}>
                <Card.Content
                style={{
                    flexDirection:"row",
                    justifyContent:"space-start",
                    alignItems:"center"
                }}>
                    {/* 头像 */}
                    <View
                    style={{
                        width:100,
                        height:100,
                        borderRadius:50,
                        overflow:'hidden',    
                        marginRight:20,
                    }}>
                         <Image source={src} style={styles.image}/>
                    </View>
                {/* 昵称和学号 */}
                <View
                style={{
                    flexDirection:'column',
                    justifyContent:"center",
                    alignItems:'flex-start',
                    flex:5,                    
                }}>
                   <Title
                   style={{
                     fontWeight:"bold",
                     fontSize:23,
                   }}>{name}</Title>
                    <Paragraph
                    style={{
                        marginLeft:20,
                        marginTop:5,
                        fontSize:15,
                    }}>{id}</Paragraph>
                </View>
               
                {/* 设置图标 */}
                <TouchableOpacity
                   style={{
                    flex:1.2,
                }}
                onPress={()=>{
                    navigation.navigate('setting')
                }}>
                <AntDesign name="setting" size={35} color="black"/>
                </TouchableOpacity>
                </Card.Content>
            </Card>
        </View>
    );
}

const styles = StyleSheet.create({
    image:{
        width:'100%',
        height:'100%',
        resizeMode:'cover',
        
    }
})
export default information;