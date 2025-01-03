import React, { useState } from 'react';
import { View, Button, Modal, Text, StyleSheet } from 'react-native';


const ModalCard = ({modalVisable})=>{
    function justify(){
        // if(modalVisable === true){
            console.log(1);
        // }
    }

    return (
      {justify}
    );
}
 export default ModalCard;


 <Modal
 visible={modalVisable}
 onDismiss={() => setModalVisable(false)} 
 contentContainerStyle={{
     backgroundColor: 'white',
     padding: 20,
     margin: 20,
     borderRadius: 10,
 }}>

 </Modal>