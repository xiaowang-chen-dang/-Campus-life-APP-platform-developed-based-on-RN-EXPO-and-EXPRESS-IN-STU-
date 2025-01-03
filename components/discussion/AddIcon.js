import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, Image, ScrollView, StyleSheet, Alert } from 'react-native';
import { AllStyle } from '../../style/style';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';


const AddIcon = () => {
    // 控制模态框的显示和关闭
    const [modalVisible, setModalVisible] = useState(false);
    // 存储选中的多张图片
    const [images, setImages] = useState([]);
    // 存储上传的内容
    const [textContent, setTextContent] = useState('');
    // 存储新写入的标题
    const [title, setTitle] = useState('');
    // 存储帖子数组
    const [posts, setPosts] = useState([]);

    // 选择照片并将新照片添加到数组中
    const pickImage = async () => {
        if (images.length > 2) {
            Alert.alert('最多只能上传3张照片');
            return;
        }
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images, // 修正类型
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.cancelled) {
            // 将新选择的图片添加到 images 数组中
            setImages((prevImages) => [...prevImages, result.assets[0].uri]);
        }
    };

    // 删除指定索引的图片
    const deleteImage = (index) => {
        setImages((prevImages) => prevImages.filter((_, i) => i !== index)); // 通过过滤掉该索引的图片来删除
    };

    const startModalVisible = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    // 提交帖子
    const handlePostSubmit = async () => {
        if (title.trim() === '' || textContent.trim() === '') {
            Alert.alert('标题和内容不能为空');
            return;
        }

        const formData = new FormData();
        formData.append('title', title.trim());
        formData.append('content', textContent.trim());

        // 将图片转换为 FormData 格式
        images.forEach((imageUri, index) => {
            const uri = imageUri;
            const name = `image${index + 1}.jpg`; // 给每张图片命名
            const type = 'image/jpg';
            const file = {
                uri,
                name,
                type,
            };
            formData.append('images', file); // 将图片添加到 formData
        });

        

        try {
                    // 从 AsyncStorage 获取 token
        const token = await AsyncStorage.getItem('token'); // 确保你已经正确存储了 token

        if (!token) {
            Alert.alert('未找到登录信息，请重新登录');
            return;
        }


            const response = await fetch('http://172.20.10.13:8081/post/send', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'multipart/form-data', // 使用 multipart/form-data
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            });

            const data = await response.json();
            console.log(data);
            if (data.success) {
                Alert.alert('帖子上传成功');
                setPosts((prevPosts) => [
                    { id: Math.random().toString(), title, context: textContent, images },
                    ...prevPosts,
                ]);
                setTitle('');
                setTextContent('');
                setImages([]);
                closeModal();
            } else {
                Alert.alert('帖子上传失败');
            }
        } catch (error) {
            console.error('上传失败:', error);
            Alert.alert('上传失败，请稍后重试');
        }
    };

    return (
        <View style={styles.container}>
            {/* 点击按钮显示模态框 */}
            <TouchableOpacity style={styles.button} onPress={startModalVisible}>
                <Ionicons name="add" size={50} color="black" />
            </TouchableOpacity>

            {/* 使用 React Native 内建的 Modal 组件 */}
            <Modal visible={modalVisible} animationType="slide" transparent={true} onRequestClose={closeModal}>
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
                        <Text style={styles.modalTitle}>上传内容</Text>

                        <TextInput
                            style={styles.input}
                            placeholder="输入标题"
                            value={title}
                            onChangeText={setTitle}
                        />

                        {/* 内容输入框 */}
                        <TextInput
                            placeholder="请输入您想输入的内容..."
                            onChangeText={setTextContent}
                            value={textContent}
                            multiline
                            style={styles.textContent}
                        />

                        {/* 显示上传的多张照片 */}
                        {images.length > 0 && (
                            <ScrollView horizontal style={styles.imageContainer}>
                                {images.map((imageUri, index) => (
                                    <View key={index} style={styles.imageWrapper}>
                                        <Image source={{ uri: imageUri }} style={styles.imagePreview} />
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

                        {/* 选择图片按钮 */}
                        <TouchableOpacity style={styles.ModalButton} onPress={pickImage}>
                            <Text style={{ fontSize: 17, textAlign: 'center' }}>上传图片</Text>
                        </TouchableOpacity>

                        {/* 确认上传按钮 */}
                        <TouchableOpacity style={styles.upload} onPress={handlePostSubmit}>
                            <Text style={{ fontSize: 17 }}>确认上传</Text>
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
        textAlign: 'center',
    },
    ModalButton: {
        backgroundColor: AllStyle.color.homeCard7,
        height: 40,
        width: 170,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginBottom: 10,
        left: 50,
    },
    upload: {
        backgroundColor: AllStyle.color.homeCard7,
        height: 40,
        width: 170,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginBottom: 10,
        left: 50,
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
        marginBottom: 10,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 8,
        borderRadius: 5,
    },
    textContent: {
        height: 100,
        borderWidth: 1,
        borderColor: 'gray',
        padding: 15,
        marginBottom: 10,
        textAlignVertical: 'top',
        borderRadius: 10,
    },
});

export default AddIcon;
