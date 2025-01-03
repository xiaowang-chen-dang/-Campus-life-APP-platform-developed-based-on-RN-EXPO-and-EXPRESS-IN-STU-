import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 0,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginContainer: {
    width: '80%',
    padding: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    alignItems: 'center',
  },
  loginTitleContainer: {
    flexDirection: 'row',  // 水平排列文字和图片
    justifyContent: 'center',  // 水平居中
    alignItems: 'center',  // 垂直居中
    marginBottom: 30,  // 给标题留点间距
  },
  logo: {
    width: 30,  // 设置 logo 的宽度
    height: 30, // 设置 logo 的高度
    marginRight: 10, // 文字和图片之间的间距
  },
  loginTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    lineHeight: 30,  // 调整文字的行高使其与 logo 中心对齐
  },
  passwordContainer: {
    width: '100%',
    flexDirection: 'row', // 水平排列密码框和眼睛图标
    alignItems: 'center', // 垂直居中对齐
  },
  eyeIconContainer: {
    position: 'absolute',
    right: 10,
  },
  input: {
    width: '100%',
    height: 40,
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#E8b575',
    paddingLeft: 10,
    marginTop: 5,
  },
  loginButton: {
    width: '100%',
    padding: 10,
    backgroundColor: '#E8b575',
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,  // 增加顶部的间距
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  registerButton: {
    marginTop: 20,
  },
  forgotButton:{
    flexDirection: 'row',
    alignItems: 'center',  // 垂直居中
    position: 'absolute',  // 绝对定位
    right: 45,             // 距离右边20px
    bottom: 20,            // 距离底部30px
  },
  registerText: {
    color: '#ccc',
    fontSize: 16,
    opacity: 0.7,
  },
  forgotText:{
    color:'#E8b575',
    fontSize: 16,
    opacity: 1,
  },
  agreementContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',  // 使内容在水平方向居中
    position: 'absolute',      // 使容器固定在屏幕底部
    bottom: 30,                // 距离屏幕底部的距离
    width: '100%',             // 宽度为100%，以便居中
  },
  checkboxContainer: {
    marginRight: 5,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 3,
    backgroundColor: 'transparent',
  },
  checked: {
    backgroundColor: '#E8b575', // 勾选后的背景色
  },
  agreementText: {
    fontSize: 14,
    color: 'gray',
  },
  linkText: {
    color: '#E8b575',
    textDecorationLine: 'underline',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    maxHeight: '80%',
  },
  modalContent: {
    marginBottom: 20,
  },
  modalText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    textAlign: 'left',
    marginBottom: 20,
  },
  closeButton: {
    alignItems: 'center',
    backgroundColor: '#E8b575',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  inputContainer: {
    position: 'relative',
    marginBottom: 20, // Adjust margin as needed
  },
  emailMessage: {
    position: 'absolute',
    bottom: -20, // Position text at the bottom left of the TextInput
    left: 0,
    fontSize: 12,
    color: 'black',
  },
  });

  export default styles;