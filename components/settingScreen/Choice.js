import {View,StyleSheet,Image,Text,TouchableOpacity} from "react-native"
import { Card,Paragraph,Title} from "react-native-paper"
import React, { useState, useEffect } from 'react';
import { AllStyle } from "../../style/style";
import AntDesign from '@expo/vector-icons/AntDesign';


const Choice = ({title})=>{
    return(
        <View>
            <Card
            style={{
                margin:5,
                marginLeft:10,
                marginRight:10,
                height:80,
                padding:10,
                backgroundColor:AllStyle.color.homeCard6,
                
            }}>
                <Card.Content
                style={{
                    flexDirection:"row",
                    alignItems:"center",
        
                }}>

                    <Title
                    style={{
                        flex:1,
                        fontSize:25,
                        height:40,
                  
                    }}>{title}</Title>
                    <TouchableOpacity>
                    <AntDesign name="rightcircleo" size={25} color="black" />
                    </TouchableOpacity>
                </Card.Content>
            </Card>
        </View>
    );
}

export default Choice;