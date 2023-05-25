import React from 'react'
import { View, Text } from "react-native-animatable"
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons"
import useAxios from '../../hooks/useAxios';
import useAuth from '../../hooks/useAuth';
import DepartmentItem from './components/DepartmentItem';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import useSocket from '../../hooks/useSocket';

export default function DepartmentManagement({ navigation }) {
    const [departments, setDepartments] = React.useState([])
    const axios = useAxios()
    const { auth } = useAuth()._j
    const socket = useSocket()

    React.useEffect(() => {
        axios.get(`/hospital/${auth.user.id}/department`)
            .then(res => {
                if (res.status === 200) {
                    setDepartments(res.data.data.map(d => ({
                        id: d.departmentId,
                        name: d.name,
                        avatar: d.avatar
                    })))
                }
            }).catch(err => {
                console.log(JSON.stringify(err))
            })
    }, [])

    React.useEffect(() =>{
        const createDepartmentListener = (data) => {
            console.log("createDepartmentListener", data)
            setDepartments(prev => ([
                {
                    id: data.departmentId,
                    name: data.name,
                    avatar: data.avatar
                },
                ...prev
            ]))
        }

        socket.on('create department', createDepartmentListener)
        
        return () => {
            socket.off('create department', createDepartmentListener)
        }
    }, [])

    return (
        <View>
            <View className="flex-row items-center pt-12 pb-2 px-5 bg-white border border-gray-300">
                <View className="flex-row items-center">
                    <TouchableOpacity
                        onPress={() => navigation.goBack(null)}
                    >
                        <Ionicons name="arrow-back" size={24} color="#1AD1FF" />
                    </TouchableOpacity>
                    <Text className="ml-1 font-bold text-2xl">Quản lý khoa</Text>
                </View>
                <View className="ml-auto space-x-2 ">
                    <TouchableOpacity onPress={() => {
                        navigation.navigate("create-department")
                    }}>
                        <View className="flex-row px-2 py-1 rounded-lg justify-items-center items-center bg-[#1AD1FF]">
                            <Text className="mr-1 text-white text-base">Thêm khoa</Text>
                            <Ionicons name="add-circle-outline" size={24} color="white"/>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

            <View className="flex-column justify-items-content items-center">
                <KeyboardAwareScrollView>
                    <ScrollView
                        horizontal={false}
                    >

                        {
                            departments.length === 0 &&
                            <Text className="mt-2">Chưa có khoa nào</Text>
                        }
                        {
                            departments.map((department, index) => {
                                return <DepartmentItem
                                    key={`department-item-${index}-${department.departmentId}`}
                                    data={department}
                                />
                            })
                        }
                
                    </ScrollView>
                </KeyboardAwareScrollView>
            </View>
        </View>
    )
}
