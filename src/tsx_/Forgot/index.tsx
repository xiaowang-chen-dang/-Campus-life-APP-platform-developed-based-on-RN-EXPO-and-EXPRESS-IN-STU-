import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, Image, ImageBackground } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // 引入眼睛图标
import { useNavigation } from '@react-navigation/native'; // 导入 useNavigation
import { StackNavigationProp } from '@react-navigation/stack';
import styles from './styles'; // 引入样式文件

// 定义 StackNavigator 的类型
type RootStackParamList = {
  Signin: undefined;
  Signup: undefined;
};

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const [emailMessage, setEmailMessage] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false); // 控制发送验证码的状态
  const [countdown, setCountdown] = useState(0); // 控制倒计时
  const [code, setCode] = useState(''); // 保存验证码输入框的值

  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'Signin'>>();

  // 验证邮箱格式
  const validateEmail = (email: string) => {
    const regex = /^[a-zA-Z0-9]+[a-zA-Z0-9._%+-]*@stu\.edu\.cn$/;
    return regex.test(email);
  };

  const handleEmailChange = (input: string) => {
    setEmail(input);
    if (validateEmail(input)) {
      setEmailMessage('');  // 清除错误信息
    } else {
      setEmailMessage('*请输入正确的学校邮箱');
    }
  };

  const handleResetPassword = async () => {
    if (Password !== confirmPassword) {
      setEmailMessage('*两次密码不一致');
      return;
    }

    try {
      // 模拟提交新密码到后端
      const response = await fetch('https://your-api-endpoint.com/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          Password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('密码修改成功:', data);
        // 修改密码成功后跳转到登录页面
        navigation.navigate('Signin');
      } else {
        console.error('密码修改失败:', data.message);
        alert(data.message || '修改密码失败');
      }
    } catch (error) {
      console.error('请求出错:', error);
      alert('网络错误，请稍后再试');
    }
  };

  const toggleNewPasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const toggleConfirmNewPasswordVisibility = () => {
    setShowConfirmNewPassword((prevState) => !prevState);
  };

  // 发送验证码函数
  const handleSendCode = () => {
    if (!validateEmail(email)) {
      setEmailMessage('*请输入正确的学校邮箱');
      return;
    }
    setIsCodeSent(true);
    let timeLeft = 60;
    setCountdown(timeLeft);
    const timer = setInterval(() => {
      timeLeft -= 1;
      setCountdown(timeLeft);
      if (timeLeft === 0) {
        clearInterval(timer);
        setIsCodeSent(false);
      }
    }, 1000);
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
              <Text style={styles.loginTitle}>忘记密码</Text>
            </View>

            {/* 邮箱输入框 */}
            <TextInput
              style={styles.input}
              placeholder="请输入学校邮箱"
              value={email}
              onChangeText={handleEmailChange}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <Text style={styles.errorText}>{emailMessage}</Text> 

            {/* 发送验证码组件 */}
            <View style={styles.sendCodeContainer}>
              <TextInput
                style={styles.inputWithButton}
                placeholder="请输入验证码"
                value={code} // 绑定验证码输入框的值
                onChangeText={setCode} // 更新验证码输入框内容
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

            {/* 新密码输入框 */}
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.input}
                placeholder="请输入新密码"
                secureTextEntry={!showPassword}
                value={Password}
                onChangeText={setPassword}
              />
              <TouchableOpacity onPress={toggleNewPasswordVisibility} style={styles.eyeIconContainer}>
                <MaterialIcons
                  name={showPassword ? 'visibility' : 'visibility-off'}
                  size={24}
                  color="gray"
                  style={{ opacity: 0.7 }}
                />
              </TouchableOpacity>
            </View>

            {/* 确认新密码输入框 */}
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.input}
                placeholder="请再次输入新密码"
                secureTextEntry={!showConfirmNewPassword}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
              <TouchableOpacity onPress={toggleConfirmNewPasswordVisibility} style={styles.eyeIconContainer}>
                <MaterialIcons
                  name={showConfirmNewPassword ? 'visibility' : 'visibility-off'}
                  size={24}
                  color="gray"
                  style={{ opacity: 0.7 }}
                />
              </TouchableOpacity>
            </View>

            {/* 显示密码一致性错误 */}
            {Password !== confirmPassword && confirmPassword !== '' && (
              <Text style={styles.errorText}>*两次密码不一致</Text>
            )}

            {/* 修改密码按钮 */}
            <TouchableOpacity style={styles.loginButton} onPress={handleResetPassword}>
              <Text style={styles.registerButtonText}>修改密码</Text>
            </TouchableOpacity>
          </View>

          {/* 立即登录 */}
          <TouchableOpacity style={styles.registerButton} onPress={() => navigation.navigate('Signin')}>
            <Text style={styles.registerText}>已有账号？登录</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}
