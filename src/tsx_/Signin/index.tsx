import React, { useState } from 'react';
import { View, Text, Alert, TextInput, TouchableOpacity, SafeAreaView, ImageBackground, Image, Modal, ScrollView, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { styles } from "./styles";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';  // 导入 AsyncStorage

type RootStackParamList = {
  Signin: undefined;
  Signup: undefined;
  Forgot: undefined;
  home: undefined;
  BottomTabNavigator: undefined;
};

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [emailMessage, setEmailMessage] = useState('*需要您的学校邮箱');
  const [isSending, setIsSending] = useState(false);

  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'Signin'>>();

  const togglePasswordVisibility = () => {
    setShowPassword(prevState => !prevState);
  };

  const toggleAgreement = () => {
    setIsChecked(prevState => !prevState);
  };
  
  const handleRegister = () => {
    navigation.navigate('Signup');
  };

  const handleForgot = () => {
    navigation.navigate('Forgot');
  };

  const handleShowAgreement = (type: 'user' | 'privacy') => {
    const content = type === 'user'
    ? `
    欢迎使用[汕头大学生活平台]（以下简称“平台”）。在您使用本平台提供的服务之前，请您认真阅读并理解以下用户协议条款。通过访问和使用平台，您同意遵守本协议的所有条款和条件。

    1. 用户账户
    1.1 注册：为了使用平台的服务，您需要使用校园邮箱账号创建一个账户。您需提供准确、真实的个人信息，并负责确保这些信息的更新和准确性。
    1.2 账户安全：您负责保管好您的账户密码，避免任何未经授权的使用。如果您的账户信息泄露，您需立即通知平台。
    1.3 账户注销：您有权随时注销您的账户，但注销后您将无法再使用平台提供的部分或全部服务。

    2. 平台服务
    2.1 服务内容：平台为您提供多种校园生活相关的服务，包括但不限于信息发布、课程安排、社交互动等。
    2.2 使用限制：您同意在使用平台服务时遵守相关法律法规，不进行任何违法或违规行为，不发布任何违法或不当的信息。

    3. 知识产权
    3.1 平台内容：平台上的所有内容，包括文本、图像、视频、软件、音频等，均为平台或其授权方的财产，受版权法保护。未经授权，您不得复制、传播或修改这些内容。
    3.2 用户生成内容：用户在平台上发布的内容（如帖子、评论等）应遵守法律法规，并且不侵犯任何第三方的知识产权。

    4. 隐私保护
    平台尊重您的隐私权，并承诺采取合理的安全措施保护您的个人信息。请参考我们的隐私政策以了解如何收集、使用和保护您的个人信息。

    5. 免责声明
    5.1 平台不对用户发布的任何内容负责，并且不承担因使用平台服务而产生的任何直接或间接的损失。
    5.2 平台有权随时修改、暂停或终止某些服务，且不承担因此给您带来的任何损失。

    6. 用户行为
    6.1 禁止发布任何含有恶意、侮辱性、虚假信息或非法内容的资料。
    6.2 禁止侵犯其他用户的权益或通过平台从事任何非法活动。

    7. 协议变更
    平台保留修改、更新本协议的权利。修改后的协议一旦发布，立即生效。您继续使用平台服务即视为接受该等变更。

    8. 法律适用与争议解决
    8.1 本协议的解释、适用及争议解决均适用中华人民共和国的法律。
    8.2 如因本协议产生争议，双方应友好协商解决；如协商无果，可提交至平台所在地法院。
  `
  : `
    我们尊重并保护您的隐私权。在您使用本平台时，我们会收集、存储和使用您的个人信息。本隐私政策详细描述了我们如何处理您的信息。

    1. 我们收集的信息
    1.1 注册信息：当您注册平台账户时，我们会收集您的基本信息，如姓名、学号、联系方式等。
    1.2 使用信息：我们会记录您的使用行为，如浏览的页面、参与的活动、使用的功能等，以便我们改进服务。
    1.3 设备信息：为了提供更好的服务，我们会收集设备信息，包括设备型号、操作系统版本、IP地址等。

    2. 信息的使用
    2.1 服务提供：我们使用您的个人信息提供和改善平台服务，包括个性化推荐、通知推送等。
    2.2 运营分析：我们会分析平台的使用情况，以优化服务和用户体验。
    2.3 安全保护：我们使用您的信息保障账户安全，防止欺诈行为。

    3. 信息的共享与披露
    3.1 第三方合作：我们不会将您的个人信息出售给任何第三方，但在法律要求、应政府要求或为保护平台利益时，可能会与合作伙伴或第三方共享您的信息。
    3.2 匿名数据：我们可能会分享匿名或汇总的统计数据，例如使用趋势、偏好等，但这些数据无法单独识别您。

    4. 信息安全
    4.1 我们采取合理的技术和管理措施保护您的个人信息，防止数据丢失、滥用或未经授权的访问。
    4.2 尽管我们尽力保护您的个人信息安全，但无法保证绝对的安全性。您需妥善保管个人账户信息和密码。

    5. 您的权利
    5.1 访问和更新：您可以随时查看、更新或删除您的个人信息。若需要，请通过平台的设置页面进行操作。
    5.2 撤回同意：您可以随时撤回对我们处理您个人信息的同意，撤回同意不会影响您撤回之前的处理合法性。
    5.3 删除账户：如果您不再希望使用平台服务，您可以选择注销账户。注销后，您的个人信息将被删除，除非法律要求保留。

    6. 未成年人保护
    平台不针对未满18岁的未成年人提供服务。如果我们意识到未成年人未经父母或监护人同意提供个人信息，我们会尽快删除相关数据。

    7. 隐私政策的变更
    我们可能会不时更新本隐私政策，任何更改将在平台上发布。新政策一经发布，即刻生效。我们鼓励您定期查看隐私政策以了解最新信息。

    8. 联系我们
    如果您对隐私政策有任何疑问，或希望行使您的权利，欢迎联系我们：
    - 联系方式：[******]
    - 地址：[汕头大学东海岸校区]
    - 邮箱：[@******]
  `;
    setModalContent(content);
    setIsModalVisible(true);
  };

  const validateEmail = (email: string) => {
    const regex = /^[a-zA-Z0-9]+[a-zA-Z0-9._%+-]*@stu\.edu\.cn$/;
    return regex.test(email);
  };

  const handleLogin = async () => {
    if (!isChecked) {
      alert('请勾选“我已阅读并同意”方框才能登录');
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert("请输入有效的学校邮箱地址");
      return;
    }
    if (!password) {
      Alert.alert("请输入密码");
      return;
    }

    try {
      setIsSending(true);
      
      const response = await axios.post("http://172.20.10.13:8081/auth/login", {
        email,
        password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      console.log(response.data.token);
      if (response.data.success) {
        Alert.alert("登录成功");
        const token = response.data.token;
        await AsyncStorage.setItem('token', token);  // 将 token 存储到 AsyncStorage
        console.log("存储的 token:", token);
        navigation.navigate('BottomTabNavigator');  // 确保使用 `navigation.navigate` 进行页面跳转
      } else {
        const message = response.data.message || "用户名或密码错误";
        Alert.alert(message);
      }
    } catch (error: unknown) {
      console.error("请求错误：", error);

      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.error( error.response.data);
          Alert.alert(error.response.data.message);
        } else if (error.request) {
          console.error("没有收到响应：", error.request);
          Alert.alert("没有收到服务器的响应，可能是网络问题");
        } else {
          console.error("请求错误信息：", error.message);
          Alert.alert(error.message || "发生了一个未知错误");
        }
      } else {
        Alert.alert("发生了一个未知错误");
      }
    } finally {
      setIsSending(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={require('../assets/background2.jpg')}
        style={styles.background}
        imageStyle={{ opacity: 1 }}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          <View style={styles.loginContainer}>
            <View style={styles.loginTitleContainer}>
              <Image source={require('../assets/logo.png')} style={styles.logo} />
              <Text style={styles.loginTitle}>登录</Text>
            </View>

            <TextInput
              style={styles.input}
              placeholder="请输入账号"
              value={email}
              onChangeText={(text) => setEmail(text)}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <Text style={styles.emailMessage}>{emailMessage}</Text>

            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.input}
                placeholder="请输入密码"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIconContainer}>
                <MaterialIcons
                  name={showPassword ? "visibility" : "visibility-off"}
                  size={24}
                  color="gray"
                  style={{ opacity: 0.7 }}
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.buttonText}>登录</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.forgotButton} onPress={handleForgot}>
              <Text style={styles.forgotText}>忘记密码？</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.agreementContainer}>
            <TouchableOpacity onPress={toggleAgreement} style={styles.checkboxContainer}>
              <MaterialIcons
                name={isChecked ? 'check-box' : 'check-box-outline-blank'}
                size={24}
                color={isChecked ? '#E8b575' : 'gray'}
              />
            </TouchableOpacity>
            <Text style={styles.agreementText}>
              我已阅读并同意{" "}
              <Text style={styles.linkText} onPress={() => handleShowAgreement('user')}>用户协议</Text> 和
              <Text style={styles.linkText} onPress={() => handleShowAgreement('privacy')}>隐私政策</Text>
            </Text>
          </View>

          <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
            <Text style={styles.registerText}>立即注册</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <ScrollView style={styles.modalContent}>
              <Text style={styles.modalText}>{modalContent}</Text>
            </ScrollView>
            <TouchableOpacity onPress={() => setIsModalVisible(false)} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>关闭</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
