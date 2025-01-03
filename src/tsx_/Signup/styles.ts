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
    padding: 30,
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
    height: 45,  // 统一高度
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#E8b575',
    paddingLeft: 10,
    marginTop: 5,
  },
  sendCodeContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    width: '100%',
    alignItems: 'center',  // 确保输入框和按钮垂直居中对齐
  },
  inputWithButton: {
    flex: 1,  // 输入框占据最大空间
    height: 45,  // 保持输入框高度与按钮一致
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#E8b575',
    paddingLeft: 10,
  },
  button: {
    height: 45,  // 按钮与输入框一致高度
    backgroundColor: '#E8b575',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,  // 给按钮与输入框之间留点间距
    width: '24%',  // 设置按钮宽度
    //opacity: 0.8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 12,
  },
  registerButtonText:{
    color:'#fff',
    fontSize: 16,
  },
  loginButton: {
    width: '100%',
    padding: 10,
    backgroundColor: '#E8b575',
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 5,  // 增加顶部的间距
  },
  registerButton: {
    marginTop: 20,
  },
  registerText: {
    color: '#ccc',
    fontSize: 16,
    opacity: 0.7,
  },
  errorText: {
    color: 'red',
    fontSize: 10,
    marginTop: -4,
  },
  emailMessage: {
    position: 'absolute',
    bottom: -10, 
    left: 0,
    fontSize: 12,
    color: 'black',
  },
});
export default styles;
