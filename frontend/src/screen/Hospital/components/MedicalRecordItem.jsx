import { View, Text, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import useConfirmModal from '../../../hooks/useConfirmModal'
import useAxios from '../../../hooks/useAxios'
import useSocket from '../../../hooks/useSocket'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { dictionary } from '../../../helpers/helpers'

export default function MedicalRecordItem({ data, className, style }) {
    const { setAction, setTitle, setVisible } = useConfirmModal()
    const axios = useAxios()
    const socket = useSocket()
    const navigation = useNavigation()

    const assignDoctor = React.useMemo(() => () => {
        navigation.navigate("medical-record-assign-doctor", {
            appointment: data
        })  
    }, [data])

    const reject = () => {
        setTitle(`Bạn có chắc muốn hủy lịch của ${data.fullname}?`)
        setAction(() => {
            axios.put(`/hospital/appointment/${data.id}?status=REJECTED`)
                .then(res => {
                    if (res.status === 200) {
                            socket.emit("status appointment", {id: res.data.id, status: res.data.status})
                        }
                }).catch(err => {
                console.log(JSON.stringify(err))
            })
        })
        setVisible(true)
    }

    return (
        <View
            className={"mx-4 my-2 p-5 rounded-md bg-white shadow-sm" + className || ""}
            style={{
                ...style,
                ...styles.status[data.status],
            }}
        >
            <View className="w-full">
                <View className="flex-row py-1 border-b border-gray-200">
                    <Text>Họ tên</Text>
                    <Text className="right-0 bottom-1 absolute">{data.fullname}</Text>
                </View>
                <View className="flex-row py-1 border-b border-gray-200">
                    <Text>Giới tính</Text>
                    <Text className="right-0 bottom-1 absolute">{data.sex}</Text>
                </View>
                <View className="flex-row py-1 border-b border-gray-200">
                    <Text>Ngày sinh</Text>
                    <Text className="right-0 bottom-1 absolute">{data.dateOfBirth}</Text>
                </View>
                <View className="flex-row py-1 border-b border-gray-200">
                    <Text>Mối quan hệ</Text>
                    <Text className="right-0 bottom-1 absolute">{data.relationship}</Text>
                </View>
                <View className="flex-row py-1 border-b border-gray-200">
                    <Text>Số điện thoại</Text>
                    <Text className="right-0 bottom-1 absolute">{data.numberphone}</Text>
                </View>
                <View className="flex-row py-1 border-b border-gray-200">
                    <Text>Chuyên khoa</Text>
                    <Text className="right-0 bottom-1 absolute">{data.department?.name}</Text>
                </View>
                <View className="flex-row py-1 border-b border-gray-200">
                    <Text>Ngày khám</Text>
                    <Text className="right-0 bottom-1 absolute">{data.date}</Text>
                </View>
                <View className="flex-row py-1 border-b border-gray-200">
                    <Text>Giờ khám</Text>
                    <Text className="right-0 bottom-1 absolute">{data.hour}</Text>
                </View>
                <View className="flex-row py-1 border-b border-gray-200">
                    <Text>Loại</Text>
                    <Text className="right-0 bottom-1 absolute">{dictionary[data.type]}</Text>
                </View>
                {
                    data.package?.id &&
                <View className="flex-row py-1 border-b border-gray-200">
                    <Text>Gói khám</Text>
                    <Text className="right-0 bottom-1 absolute">{data.package?.name}</Text>
                </View>
                }
                {
                    data.status === "ACCEPTED" && data.doctor &&
                    <View className="flex-row py-1 border-b border-gray-200">
                    <Text>Bác sĩ</Text>
                    <Text className="right-0 bottom-1 absolute">{data.doctor}</Text>
                </View>
                }
                <View className="flex-row py-1 mt-4 flex flex-row justify-items-start items-center">
                    {
                        ["PENDING"].includes(data.status) &&
                            <TouchableOpacity
                                onPress={assignDoctor}
                            >
                                <Text className="mx-1 p-2 bg-teal-300 rounded-lg">Đặt lịch</Text>
                            </TouchableOpacity>
                    }
                    {
                        ["PENDING"].includes(data.status) &&
                            <TouchableOpacity
                                onPress={reject}
                            >
                                <Text className="mx-1 p-2 bg-stone-300 rounded-lg">
                                    Không nhận
                                </Text>
                            </TouchableOpacity>
                    }
                    {
                        ["ACCEPTED"].includes(data.status) &&
                            <TouchableOpacity
                                onPress={reject}
                            >
                                <Text className="mx-1 p-2 bg-stone-300 rounded-lg">
                                    Hủy lịch
                                </Text>
                            </TouchableOpacity>
                    }
                    <Text className="mx-1 p-2 text-left ml-auto underline">
                        {dictionary[data.status]}
                    </Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    status: {
        
        PENDING: {
            borderColor: 'yellow',
            borderWidth: 2,
        },
            
        ACCEPTED: {
            borderColor: '#3333ff',
            borderWidth: 2,
        },

        DONE: {
            borderColor: '#33ff33',
            borderWidth: 2,
        },
    
        CANCELED: {
            borderColor: '#ff9933',
            borderWidth: 2,
        },

        REJECTED: {
            borderColor: '#ff3333',
            borderWidth: 2,
        },

    }
})