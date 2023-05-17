import { StyleSheet, Text, TouchableOpacity, View, Image, TextInput, ScrollView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { FontAwesome, Feather, MaterialCommunityIcons, AntDesign, Octicons } from '@expo/vector-icons'

import React from 'react';
import useAuth from '../../hooks/useAuth';

export default function Signup({ navigation }) {
  const [data, setData] = React.useState({
    username: '',
    email: '',
    birthDay: '',
    phone: '',
    address: '',
    password: '',
    rePassword: '',
    check_userChange: false,
    check_emailChange: false,
    check_birthDayChange: false,
    check_phoneChange: false,
    check_addressChange: false,
    check_pwChange: false,
    check_rePwChange: false,
  })
  
  const {auth, authDispatch} = useAuth()._j
    
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
      
      const dobChange = (val) => {
        if (val.length != 0) {
          setData({
            ... data,
            birthDay: val,
            check_birthDayChange: true
          });
        } else {
          setData({
            ... data,
            birthDay: val,
            check_birthDayChange: false
          });
        }
      }
      
      const addressChange = (val) => {
        if (val.length != 0) {
          setData({
            ... data,
            address: val,
            check_addressChange: true
          });
        } else {
          setData({
            ... data,
            address: val,
            check_addressChange: false
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
    
      const phoneChange = (val) => {
        if (val.length != 0) {
          setData({
            ... data,
            phoneChange: val,
            check_phoneChange: true
          });
        } else {
          setData({
            ... data,
            phoneChange: val,
            check_phoneChange: false
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
      // signup(username, password);
    }

    return (
        <KeyboardAwareScrollView>
        <ScrollView pagingEnabled={true}>
        <View style={styles.circle1} />
        <View style={styles.circle2} />
        
            <View style={styles.container} className="relative flex-2 items-center justify-center h-screen">
            <Text className="font-bold text-2xl text-center">Tạo tài khoản</Text>
            <View className="items-center">
                <View className='bg-gray-200 rounded-full mx-5 px-3 mt-3 py-2 w-80 flex-row items-center'>
                    {data.check_userChange ? 
                    <FontAwesome name='user-o' size={20} color="black" />
                    : <FontAwesome name='user-o' size={20} color="gray" />
                    }
                    
                    <TextInput 
                        className="pl-2" placeholder='Họ và tên' autoComplete='name'
                        onChangeText={(val) => userChange(val)}
                        />
                </View>  
                <View className='bg-gray-200 rounded-full mx-5 px-3 mt-3 py-2 w-80 flex-row items-center'>
                    {data.check_birthDayChange ? 
                    <MaterialCommunityIcons name='calendar-week' size={20} color="black" />
                    : <MaterialCommunityIcons name='calendar-week' size={20} color="gray" />
                    }
                    
                    <TextInput 
                        className="pl-2" placeholder='Ngày sinh (YYYY-MM-DD)' autoComplete='birthdate-full' keyboardType='numbers-and-punctuation'
                        onChangeText={(val) => dobChange(val)}
                        />
                </View> 
                <View className='bg-gray-200 rounded-full mx-5 px-3 mt-3 py-2 w-80 flex-row items-center'>
                    {data.check_phoneChange ? 
                    <AntDesign name='phone' size={20} color="black" />
                    : <AntDesign name='phone' size={20} color="gray" />
                    }
                    
                    <TextInput 
                        className="pl-2" placeholder='Số điện thoại' autoComplete='tel' keyboardType='numeric'
                        onChangeText={(val) => phoneChange(val)}
                        />
                </View>  
                <View className='bg-gray-200 rounded-full mx-5 px-3 mt-3 py-2 w-80 flex-row items-center'>
                    {data.check_emailChange ? 
                    <Feather name='mail' size={20} color="black" />
                    :<Feather name='mail' size={20} color="gray" />  
                    }
                    
                    <TextInput 
                        className="pl-2" placeholder='Email' autoComplete='email'
                        onChangeText={(val) => emailChange(val)}
                        />
                </View>  
                <View className='bg-gray-200 rounded-full mx-5 px-3 mt-3 py-2 w-80 flex-row items-center'>
                    {data.check_addressChange ? 
                    <Octicons name='home' size={20} color="black" />
                    : <Octicons name='home' size={20} color="gray" />
                    }
                    
                    <TextInput 
                        className="pl-2" placeholder='Địa chỉ'
                        onChangeText={(val) => addressChange(val)}
                        />
                </View>   
                <View className='bg-gray-200 rounded-full mx-5 px-3 mt-3 py-2 w-80 flex-row items-center'>
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
                <View className='bg-gray-200 rounded-full mx-5 px-3 mt-3 py-2 w-80 flex-row items-center'>
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
                <TouchableOpacity 
                  onPress={() => {handleSignup()}}
                  className="rounded-md items-center w-80 mt-10" style={styles.bgColor}
                >
                    <Text className="font-bold text-center mx-5 w-80 py-3 text-white">Đăng ký</Text>
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