
import {View,StyleSheet,Image,Text,Dimensions} from "react-native"
import { Card,Paragraph,Title} from "react-native-paper"
import { MaterialCommunityIcons } from '@expo/vector-icons';
const ContactCard = ({name,number,navigation})=>{
    return(
        <View>
            <Card
            style={{
                marginBottom:10,
            }}>
                <Card.Content>
                    <Title>{name}</Title>
                    <Paragraph>{number}</Paragraph>
                    {/* <Paragraph>{number}</Paragraph> */}
                            {/* <Title>hi</Title>
                    <Paragraph>hi</Paragraph>

                    <View
                    style={{
                        flexDirection:"row",
                        width:30,
                        // backgroundColor:"pink",
                        alignContent:"center",
                    }}>
                    <MaterialCommunityIcons name="tag" size={14} color="#757575" />
                    <Paragraph>hi</Paragraph>
                    </View> */}

                </Card.Content>
            </Card>
        </View>
    );
}

export default ContactCard;