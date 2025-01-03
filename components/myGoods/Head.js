import { Text,View,StyleSheet,Image,TouchableOpacity ,Modal} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { AllStyle } from "../../style/style";
import Feather from '@expo/vector-icons/Feather';
import React, { useState, useEffect } from 'react';

const head = ({navigation})=>{

    const [modalVisable,setModalVisable] = useState(false)

    return(

//头部渐变色
 <LinearGradient
    colors={[AllStyle.color.oaCard,AllStyle.color.oaCard]}
    start={{x:0,y:0}}
    end={{x:1,y:1}}
    style={styles.header}
    >
    <View
        style={styles.content}
    >
        <AntDesign name="arrowleft" size={28} color="black"  style ={styles.icon}
        onPress={()=>{
            navigation.goBack();
        }}/>

        <Text    
        style={styles.text}>我的商品</Text>
            
</View>
<TouchableOpacity
        onPress={()=>setModalVisable(true)}>
        <Image
            source={require('../../images/Home/StuLogo.png')}
            style={styles.image}
            />
</TouchableOpacity>

</LinearGradient> 

    );
}
const styles = StyleSheet.create({
    header:{
        padding: 20,
        paddingTop: 50,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        elevation:10,
        flexDirection:"row",
        justifyContent:"space-around",

    },
    content:{
        flex:1,
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center",
    },
    icon:{
        flex:1,
    
    },
    text:{
        fontSize:35,
        color:'#643D25',
        fontWeight:"bold",
       
    },
    image:{
        width:50,
        height:50,
        margin:0,
        marginLeft:45,
    }

})
export default head;


