import {View,StyleSheet,Image,Text} from "react-native"
import { Card,Title} from "react-native-paper"
import { useFonts } from 'expo-font';
import { AppLoading } from 'expo';
import React, { useState, useEffect } from 'react';
//width,height设置组件的宽高  color设置card的背景颜色 text设置card里面的文字  textStyle：额外设置下面四个小框的字体大小  cardStyle：额外设置下面四个小框的外观
const CardComponent = ({width,height,color,text,cardStyle,flag,id,navigation,screen})=>{
   
    const [src,setSrc] = useState(null)
    const [page,setPage] = useState(null)
    // 使用useFonts函数加载自定义字体
    // const [fontLoads] = useFonts({
    //     'thinkAndRound':require('../../assets/方正粗圆.ttf'),
 
    // })
    // //字体还没加载出来，就显示加载组件
    // if(!fontLoads){
    //     return<AppLoading/>
    // }

    //根据id值确认传入的图片
    useEffect(()=>{

        if(id === '4'){
            setSrc(require('../../images/Home/日历.png'))
        }
        else if(id === '5'){
            setSrc(require('../../images/Home/网站.png'))
        }
        else if(id === '6'){
            setSrc(require('../../images/Home/联系.png'))
        }
        else if(id === '7'){
            setSrc(require('../../images/Home/活动.png'))
        }
    },[id])

        //根据确认跳转页面
        // useEffect(()=>{
        //     if(id == 1){
        //         setPage('lostAndFound');
        //     }
        //     else if(id == 2){
        //         setPage('lostAndFound');
        //     }
        //     else if(id == 3){
        //         setPage('lostAndFound');
        //     }
        //     else if(id == 4){
        //         setPage('lostAndFound');
        //     }
        //     else if(id == 5){
        //         setPage('lostAndFound');
        //     }
        //     else if(id == 6){
        //         setPage('lostAndFound');
        //     }
        //     else if(id == 7){
        //         setPage('lostAndFound');
        //     }
        // },[])

//逻辑函数  当flag=1的时候就渲染圆形区域 当flag=0的时候就渲染方形区域
    function renderContent(){
        if(flag){      
    return(
  
    <Card.Content
    style={{
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center"
    }}>
    
    <Image 
    source={src}
    style={{
        width:40,
        height:40,
        resizeMode:"contain",
    }}
    tintColor={'#643D25'}
    />

    <Text
        style={{
            fontSize:16,
            fontWeight:"bold"
        }}
    >{text}</Text>

     </Card.Content>
   
    
            );
    }
    else{
        return(
            <Card.Content
        
            >
            <Title style={{
                fontFamily:'thinkAndRound',
                fontSize:22,
            }}>{text}</Title>
            {/* <Paragraph>hello</Paragraph> */}
          </Card.Content>
        );
    }
    }
    return(
        <View>
        <Card style={[{
             width:width,
             height:height,
             backgroundColor:color,
             margin:5,
             elevation:20,
             justifyContent:"center",
             alignItems:"center",    
            
        },cardStyle]}
        
        onPress = {()=>{
            // navigation.navigate({page});
            console.log(1);
             navigation.navigate(screen);
        }}
        >

            {renderContent()}
        
        </Card>
        </View>
    );
}

const styles = StyleSheet.create({

})
export default CardComponent;

