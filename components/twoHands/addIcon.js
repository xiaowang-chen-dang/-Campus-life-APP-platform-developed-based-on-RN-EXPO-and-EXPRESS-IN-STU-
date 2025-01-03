import { View, Modal, StyleSheet, TouchableOpacity, Text, ScrollView, Image, Alert } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useState } from 'react';
import { AllStyle } from '../../style/style';
import { Switch, TextInput } from 'react-native-gesture-handler';
import AntDesign from '@expo/vector-icons/AntDesign';
import * as ImagePicker from 'expo-image-picker';

const AddIcon = () => {
    // 控制模态框的显示和关闭
    const [modalVisible, setModalVisible] = useState(false);
    //存储新写入的标题 
    const [title, setTitle] = useState('');
    //存储新写入的描述
    const [description, setDescription] = useState('');
    // 存储选中的多张图片
    const [images, setImages] = useState([]);
    //存储写入的金额
    const [value,setValue] = useState('')
    //存储写入的联系方式内容
    const [contactContent,setContactContent] = useState('')
    // 选择照片并将新照片添加到数组中
    const pickImage = async () => {
        if(images.length > 2){
            alert('最多只能上传3张照片');
            return;
        }


        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.Images, // 修正类型
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.cancelled) {
            // 将新选择的图片添加到 images 数组中
            setImages(prevImages => [...prevImages, result.assets[0].uri]);
        }
    };

    // 删除指定索引的图片
    const deleteImage = (index) => {
        setImages(prevImages => prevImages.filter((_, i) => i !== index)); // 通过过滤掉该索引的图片来删除
    };

    const startModalVisible = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    return (
        <View style={styles.container}>
            {/* 点击按钮显示模态框 */}
            <TouchableOpacity style={styles.button} onPress={startModalVisible}>
                <Ionicons name="add" size={50} color="black" />
            </TouchableOpacity>

            {/* 使用 React Native 内建的 Modal 组件 */}
            <Modal
                visible={modalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={closeModal}>
                <View style={styles.modalOverlay}>
                    <View style={styles.modal}>
                        <AntDesign
                            name="close"
                            size={24}
                            color="black"
                            style={{
                                position: 'absolute',
                                top: 10,
                                right: 10,
                                zIndex: 1,
                            }}
                            onPress={closeModal}
                        />
                        <Text style={styles.modalTitle}>上传信息</Text>
                        {/* 输入标题 */}
                        <TextInput
                            style={styles.input}
                            placeholder="输入标题"
                            value={title}
                            onChangeText={setTitle}
                        />

                        {/* 输入描述 */}
                        <TextInput
                            style={styles.input}
                            placeholder="输入描述"
                            value={description}
                            onChangeText={setDescription}
                        />

                         {/* 输入金额 */}
                        <TextInput
                            style={styles.input}
                            placeholder="输入金额(只需输入数字)"
                            value={value}
                            onChangeText={setValue}
                        />
                        {/* 输入联系方式 */}
                        <TextInput
                            style={styles.input}
                            placeholder="输入联系方式"
                            value={contactContent}
                            onChangeText={setContactContent}
                        />

  {/* 显示上传的多张照片 */}
  {images.length > 0 && (
                            <ScrollView horizontal style={styles.imageContainer}>
                                {images.map((imageUri, index) => (
                                    <View key={index} style={styles.imageWrapper}>
                                        <Image
                                            source={{ uri: imageUri }}
                                            style={styles.imagePreview}
                                        />
                                        <AntDesign
                                            name="close"
                                            size={24}
                                            color="black"
                                            style={{
                                                position: 'absolute',
                                                right: 10,
                                                top: 10,
                                                zIndex: 1,
                                            }}
                                            onPress={() => deleteImage(index)} // 点击删除图片
                                        />
                                    </View>
                                ))}
                            </ScrollView>
                        )}

                        {/* 选择图片 */}
                        <TouchableOpacity
                            style={styles.ModalButton}
                            onPress={pickImage}>
                            <Text style={{ fontSize: 17, textAlign: 'center' }}>
                                上传图片
                            </Text>
                        </TouchableOpacity>
                        
                        {/* 确认上传按钮 */}
                      <TouchableOpacity
                      style={styles.upload}
                      onPress={()=>{
                        console.log("还没有实现上传方式哦")
                      }}>
                        <Text style={{
                            fontSize:17,
                        }}>确认上传</Text>
                      </TouchableOpacity>

                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 60,
        right: 20,
        zIndex: 999,
    },
    button: {
        backgroundColor: AllStyle.color.homeCard7,
        width: 70,
        height: 70,
        borderRadius: 50,
        elevation: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modal: {
        backgroundColor: 'white',
        padding: 20,
        margin: 20,
        borderRadius: 10,
        width: 300,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    ModalButton: {
        backgroundColor: AllStyle.color.homeCard7,
        height: 40,
        width: 170,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginBottom: 10,
        left:50,
    },
    upload:{
        backgroundColor: AllStyle.color.homeCard7,
        height: 40,
        width: 170,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginBottom: 10,
        left:50,
    },
    imageContainer: {
        marginVertical: 10,
    },
    imageWrapper: {
        position: 'relative',
    },
    imagePreview: {
        width: 100,
        height: 100,
        marginRight: 10,
        borderRadius: 10,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 8,
        borderRadius: 5,
    },
});

export default AddIcon;
