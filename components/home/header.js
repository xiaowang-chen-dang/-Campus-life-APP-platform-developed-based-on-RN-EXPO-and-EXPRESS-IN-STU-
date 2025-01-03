import { Text,View,StyleSheet,Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const head = ()=>{
    const navigation = useNavigation();
    return(

//头部渐变色
 <LinearGradient
    colors={['#E8B575','#E8B575']}
    start={{x:0,y:0}}
    end={{x:1,y:1}}
    style={styles.header}
    >
    <View
        style={styles.content}
    >
        <Text    
        style={styles.text}>STU CAMPUS</Text>
</View>

        <Image
            source={require('../../images/Home/StuLogo.png')}
            style={styles.image}
            />
    
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