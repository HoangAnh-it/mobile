import React from 'react'
import { View, Text, Image } from "react-native-animatable"
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons"
import { useNavigation } from '@react-navigation/native';

export default function DepartmentItem({ data }) {
    const navigation = useNavigation()

    return (
        <View
            style={{
                borderTopColor: 'black',
                borderTopWidth: 1
            }}
        >
            <TouchableOpacity onPress={() => {
                navigation.navigate("detail-department", {data})
            }} className="p-2 h-20 w-full flex-row items-center text-center rounded-lg">
                <View className="ml-2 bg-transparent h-16 w-16 rounded-full items-center justify-center">
                    <Image src={data.avatar} className='object-scale-down h-16 w-16 rounded-full' />
                </View>
                <View className="left-3 w-full flex-row justify-items-center items-center">
                    <Text className="w-2/3 text-left break-normal font-semibold justify-center">{data.name}</Text>
                    <View className="w-1/5 absolute ml-60 mt-4">
                        <Ionicons name="caret-forward" size={24} color="#1AD1FF" />
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
}