import { Text,View,StyleSheet,Image } from 'react-native';
import Head from '../../components/webS/Head'
import CardComponent from '../../components/webS/Card'
import { AllStyle } from "../../style/style";

const Web = ({navigation})=>{
  return(
    <View>
      <Head navigation={navigation}></Head>
      <CardComponent navigation={navigation} title={'学校官网'} color={AllStyle.color.homeCard1} src={'https://www.stu.edu.cn/'}></CardComponent>

      <CardComponent navigation={navigation} title={'郁金香导航'} color={AllStyle.color.homeCard3} src={'https://d.stulip.org/'}></CardComponent>

      <CardComponent navigation={navigation} title={'上网认证'} color={AllStyle.color.homeCard4} src={'https://a.stu.edu.cn/ac_portal/20170602150308/mobile.html?template=20170602150308&tabs=pwd&vlanid=0&_ID_=0&switch_url=&url='}></CardComponent>

      
    </View>
  );
}


export default Web