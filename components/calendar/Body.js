import { Text,View,Image,StyleSheet,ScrollView ,Dimensions } from 'react-native';

const Body = ()=>{
    return(
        <View
        // style={{
        //     justifyContent:"center",
        //     alignContent:"center",
        // }}
        >

            <ScrollView
            style={{
                //滚动屏幕限制的长度
                height:670,
            }}
            >
            {/* 横向滚动 */}
            <ScrollView
            horizontal={true}  // 启用横向滚动
         
            // pagingEnabled={true}  // 启用分页效果，每次滑动停留在完整的图片
            showsHorizontalScrollIndicator={false}  // 隐藏横向滚动条
            >
                   <Image  source={require('../../images/Calendar/校历.png')}
                //    style={{
                //     height:700,
                //     width:300,
                //    }}
                 >

                    </Image>
            </ScrollView>
        </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({

}) 
export default Body;



