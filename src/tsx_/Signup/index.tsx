import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, Image, ImageBackground } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // 引入眼睛图标
import { useNavigation } from '@react-navigation/native'; // 导入 useNavigation
import { StackNavigationProp } from '@react-navigation/stack';
import axios, { AxiosError } from 'axios'; // 导入 axios 和 AxiosError 类型
import styles from './styles'; // 引入样式文件

type RootStackParamList = {
  Signin: undefined;
  Signup: undefined;
};

export default function SignupScreen() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [emailMessage, setEmailMessage] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');  // 错误信息状态
  const [isCodeSent, setIsCodeSent] = useState(false); // 控制发送验证码的状态
  const [countdown, setCountdown] = useState(0); // 控制倒计时
  const [code, setCode] = useState(''); // 保存验证码输入框的值

  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'Signup'>>();

  // 验证邮箱格式
  const validateEmail = (email: string) => {
    const regex = /^[a-zA-Z0-9]+[a-zA-Z0-9._%+-]*@stu\.edu\.cn$/;
    return regex.test(email);
  };

  // 注册逻辑
  const handleSignup = async () => {
    setEmailMessage('');
    setPasswordMessage('');

    if (!validateEmail(email)) {
      setEmailMessage('*请输入正确的学校邮箱');
      return;
    }
    if (password !== confirmPassword) {
      setPasswordMessage('*两次密码不一致');
      return;
    }

    try {
      // 发起注册请求
      console.log('Sending signup data:', { email, password, code }); // 打印请求数据

      const response = await axios.post('http://172.20.10.13:8081/auth/register', {
        email,
        password,
        code: Number(code), // 将验证码转为数字类型
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      console.log('Signup response:', response); // 打印响应

      if (response.data.success) {
        console.log('注册成功:', response.data);
        // 可以跳转到登录界面
        navigation.navigate('Signin');
      } else {
        setPasswordMessage('*注册失败，请重试');
      }
    } catch (error: unknown) {
      // 在这里将 error 显式转换为 AxiosError 类型
      if (axios.isAxiosError(error)) {
        console.log('Error during signup:', error.response?.data || error.message); // 打印错误信息
        setPasswordMessage('*请求失败，请检查网络连接');
      } else {
        console.log('Unexpected error:', error);
        setPasswordMessage('*未知错误');
      }
    }
  };

  // 显示/隐藏密码
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  // 显示/隐藏确认密码
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prevState) => !prevState);
  };

  // 跳转到登录页面
  const handleGoToLogin = () => {
    navigation.navigate('Signin'); // 假设登录界面的路由名称是 'Signin'
  };

  // 发送验证码函数
  const handleSendCode = async () => {
    if (!validateEmail(email)) {
      setEmailMessage('*请输入正确的学校邮箱');
      return;
    }

    try {
      setIsCodeSent(true);
      let timeLeft = 60;
      setCountdown(timeLeft);
      const timer = setInterval(() => {
        timeLeft -= 1;
        setCountdown(timeLeft);
        if (timeLeft === 0) {
          clearInterval(timer);
          setIsCodeSent(false);  // 重置验证码状态
        }
      }, 1000);

      // 向后端发送请求以发送验证码
      const response = await axios.post('http://172.29.170.112:8081/auth/getVerificationCode', {
        email,
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.data.success) {
        console.log('验证码已发送');
      } else {
        setEmailMessage('*验证码发送失败');
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error('Error during sending verification code:', error.response?.data || error.message);
        setEmailMessage('*请求失败，请检查网络连接');
      } else {
        console.error('Unexpected error:', error);
        setEmailMessage('*未知错误');
      }
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={require('../assets/background2.jpg')} // 替换为你的背景图片URL
        style={styles.background}
        imageStyle={{ opacity: 1 }}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          <View style={styles.loginContainer}>
            <View style={styles.loginTitleContainer}>
              <Image source={require('../assets/logo.png')} style={styles.logo} />
              <Text style={styles.loginTitle}>注册</Text>
            </View>

            {/* 账号输入框 */}
            <TextInput
              style={styles.input}
              placeholder="请输入学校邮箱"
              value={email}
              onChangeText={(text) => setEmail(text)}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <Text style={styles.errorText}>{emailMessage}</Text>

            {/* 发送验证码组件 */}
            <View style={styles.sendCodeContainer}>
              <TextInput
                style={styles.inputWithButton}
                placeholder="请输入验证码"
                value={code}  // 绑定验证码输入框的值
                onChangeText={setCode} // 更新验证码输入框内容
                keyboardType="numeric" // 设置键盘为数字类型
              />
              <TouchableOpacity
                style={styles.button}
                onPress={handleSendCode}
                disabled={isCodeSent} // 禁用按钮在倒计时期间
              >
                <Text style={styles.buttonText}>
                  {isCodeSent ? `${countdown}s` : '发送验证码'}
                </Text>
              </TouchableOpacity>
            </View>

            {/* 密码输入框 */}
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
                  name={showPassword ? 'visibility' : 'visibility-off'}
                  size={24}
                  color="gray"
                  style={{ opacity: 0.7 }}
                />
              </TouchableOpacity>
            </View>

            {/* 确认密码输入框 */}
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.input}
                placeholder="请再次输入密码"
                secureTextEntry={!showConfirmPassword}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
              <TouchableOpacity onPress={toggleConfirmPasswordVisibility} style={styles.eyeIconContainer}>
                <MaterialIcons
                  name={showConfirmPassword ? 'visibility' : 'visibility-off'}
                  size={24}
                  color="gray"
                  style={{ opacity: 0.7 }}
                />
              </TouchableOpacity>
            </View>

            <Text style={styles.errorText}>{passwordMessage}</Text> {/* 密码错误提示 */}

            {/* 注册按钮 */}
            <TouchableOpacity style={styles.loginButton} onPress={handleSignup}>
              <Text style={styles.registerButtonText}>注册</Text>
            </TouchableOpacity>
          </View>

          {/* 立即登录 */}
          <TouchableOpacity style={styles.registerButton} onPress={handleGoToLogin}>
            <Text style={styles.registerText}>已经有账号？登录</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}
