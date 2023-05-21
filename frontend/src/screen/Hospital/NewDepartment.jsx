import { View, Text } from "react-native-animatable";
import { TextInput } from "react-native-gesture-handler";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons"
import { StatusBar } from "expo-status-bar";
import useConfirmModal from "../../hooks/useConfirmModal";
import React from 'react'
import useAxios from "../../hooks/useAxios";
import useSocket from "../../hooks/useSocket";

export default function NewDepartment({ navigation }) {
    const [data, setData] = React.useState({
        name: '',
        avatar: ''
    })
    const { setTitle, setVisible, setIsAlert } = useConfirmModal()
    const axios = useAxios()
    const socket = useSocket()
    
    const create = () => {
        if(!data.name.trim()) return
        axios.post('/hospital/department', {
            name: data.name,
            avatar: data.avatar || 'https://www.pharmatutor.org/sites/default/files/styles/webp/public/2020-11/pharma-packaging.png.webp?itok=820zDobO'
        }).then(res => {
            if (res.status === 200) {
                socket.emit("create department", res.data.data)
                navigation.goBack(null)
            }
        }).catch(err => {
            console.log(JSON.stringify(err))
        })
    }

    const updateLoadAvatar = () => {
        setTitle("Chưa cập nhật chức năng này")
        setIsAlert(true)
        setVisible(true)
    }

    return (
        <View className="h-screen bg-white p-3 space-y-2">
            <View className="flex-row items-center justify-items-start pt-12 pb-2 px-5 bg-white">
                <TouchableOpacity
                    onPress={() => navigation.goBack(null)}
                >
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <Text className="font-bold text-2xl">Thêm khoa mới</Text>
            </View>

            <Text className="text-base">Tên khoa</Text>
            <TextInput
                className="rounded-lg border border-gray-400 p-1 my-1 px-3"
                placeholder="Nhập tên khoa mới"
                secureTextEntry={false}
                onChangeText={(val) => setData(prev => ({
                    ...prev,
                    name: val
                }))}
            />

            <View className="flex-row items-center">
                <Text className="text-base mr-3">Hình đại diện</Text>
                <View >
                    <TouchableOpacity className="m-auto mt-2 p-2 bg-teal-300 rounded-lg flex-row justify-between"
                        onPress={updateLoadAvatar}
                    >
                        <Text className="text-lg mr-2">Tải ảnh lên</Text>
                        <Ionicons name="cloud-upload-outline" size={24} />
                    </TouchableOpacity>
                </View>
            </View>
            
            <TouchableOpacity
                onPress={create}
            >
                <View className="m-auto mt-2 p-2 bg-teal-300 rounded-lg w-11/12 justify-items-center">
                    <Text className="text-lg text-center"
                    >Tạo</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}