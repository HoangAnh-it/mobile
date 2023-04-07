import { StyleSheet, Text, TouchableOpacity, View, Image, TextInput, ScrollView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { FontAwesome, Feather, MaterialCommunityIcons } from '@expo/vector-icons'

import { AuthContext } from '../../component/context';
import React from 'react';

export default function Signup({navigation}) {
    const [data, setData] = React.useState({
        username: '',
        email: '',
        password: '',
        rePassword: '',
        check_userChange: false,
        check_emailChange: false,
        check_pwChange: false,
        check_rePwChange: false,
      })
    
      const { signup } = React.useContext(AuthContext);
    
      const userChange = (val) => {
        if (val.length != 0) {
          setData({
            ... data,
            username: val,
            check_userChange: true
          });
        } else {
          setData({
            ... data,
            username: val,
            check_userChange: false
          });
        }
      }

      const emailChange = (val) => {
        if (val.length != 0) {
          setData({
            ... data,
            email: val,
            check_emailChange: true
          });
        } else {
          setData({
            ... data,
            email: val,
            check_emailChange: false
          });
        }
      }
    
      const pwChange = (val) => {
        if (val.length != 0) {
          setData({
            ... data,
            password: val,
            check_pwChange: true
          });
        } else {
          setData({
            ... data,
            password: val,
            check_pwChange: false
          });
        }
      }

      const rePwChange = (val) => {
        if (val.length != 0) {
          setData({
            ... data,
            rePassword: val,
            check_rePwChange: true
          });
        } else {
          setData({
            ... data,
            rePassword: val,
            check_rePwChange: false
          });
        }
      }

    const handleSignup = () => {
      signup(username, password);
    }

    return (
        <KeyboardAwareScrollView>
        <ScrollView pagingEnabled={true}>
        <View style={styles.circle1} />
        <View style={styles.circle2} />
        
            <View style={styles.container} className="relative flex-2 items-center justify-center h-screen">
            <Text className="font-bold text-2xl text-center">Tạo tài khoản</Text>
            <View className="space-y-2 m-5">
                <View className='bg-gray-200 rounded-full mx-5 px-3 py-1 w-80 flex-row items-center'>
                    {data.check_userChange ? 
                    <FontAwesome name='user-o' size={20} color="black" />
                    : <FontAwesome name='user-o' size={20} color="gray" />
                    }
                    
                    <TextInput 
                        className="pl-2" placeholder='Tên đăng nhập'
                        onChangeText={(val) => userChange(val)}
                        />
                </View>  
                <View className='bg-gray-200 rounded-full mx-5 px-3 py-1 w-80 flex-row items-center'>
                    {data.check_emailChange ? 
                    <Feather name='mail' size={20} color="black" />
                    :<Feather name='mail' size={20} color="gray" />  
                    }
                    
                    <TextInput 
                        className="pl-2" placeholder='Email'
                        onChangeText={(val) => emailChange(val)}
                        />
                </View>   
                <View className='bg-gray-200 rounded-full mx-5 px-3 py-1 w-80 flex-row items-center'>
                    {data.check_pwChange ?
                    <Feather name='lock' size={20} color="black" />
                    : <Feather name='lock' size={20} color="gray" />
                    }
                    
                    <TextInput
                        secureTextEntry={true}
                        className="pl-2" placeholder='Mật khẩu'
                        onChangeText={(val) => pwChange(val)}
                        />
                </View> 
                <View className='bg-gray-200 rounded-full mx-5 px-3 py-1 w-80 flex-row items-center'>
                    {data.check_rePwChange ?
                    <Feather name='check-square' size={20} color="black" />
                    : <Feather name='check-square' size={20} color="gray" />
                    }
                    <TextInput
                        secureTextEntry={true}
                        className="pl-2" placeholder='Nhập lại mật khẩu'
                        onChangeText={(val) => rePwChange(val)}
                        />
                </View>
                <TouchableOpacity onPress={() => {handleSignup()}}>
                    <Text style={styles.bgColor} className="font-bold text-center mx-5 mt-10 w-80 py-3 rounded-md text-white">Đăng ký</Text>
                </TouchableOpacity>
                <View className="flex-row justify-center my-10">
                <Text>Đã có tài khoản? </Text>
                <TouchableOpacity
                    onPress={() => navigation.navigate("LoginScreen")}
                >
                    <Text style={styles.textColor} className="font-bold">Đăng nhập</Text>
                </TouchableOpacity>
                </View>
            </View>        
            </View>
        </ScrollView>
        </KeyboardAwareScrollView>  
    );
}

const styles = StyleSheet.create({
  circle1: {
    position: "absolute",
    width: 250,
    height: 250,
    borderRadius: 250/2,
    left: 8,
    top: -114,
    backgroundColor: 'rgba(36, 220, 226, 0.3)'
  },
  circle2: {
    position: "absolute",
    width: 250,
    height: 250,
    borderRadius: 250/2,
    left: -117,
    top: -42,
    backgroundColor: 'rgba(36, 220, 226, 0.3)'
  },
  container: {
    top: 100 
  }, 
  textColor: {
    color: "#24DCE2"
  },
  bgColor: {
    backgroundColor: "#24DCE2"
  }
});