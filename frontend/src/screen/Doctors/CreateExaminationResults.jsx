import { View, Text, TouchableOpacity, Animated } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import React from "react";
import useAxios from "../../hooks/useAxios";
import useConfirmModal from "../../hooks/useConfirmModal";
import { Ionicons, MaterialCommunityIcons, SimpleLineIcons, AntDesign, Octicons } from "@expo/vector-icons"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function CreateExaminationResults({ navigation }) {

    const axios = useAxios()
    const { setIsAlert, setTitle, setVisible } = useConfirmModal()
    const [result, setResult] = React.useState({
        disease: null,
        numberOfDoses: null,
        doesDetail: null,
        dietFood: null,
        note: null
    })

    const submit = () => {
        
    }

    return (
        <View className="bg-white h-screen">
            <View>
                <View className="pt-10 flex-row" />
                <View className="flex-row items-center border-b border-gray-200">
                    <TouchableOpacity
                        className="m-3"
                        onPress={() => navigation.goBack(null)}
                    >
                        <Ionicons name="arrow-back" size={24} color="#1AD1FF" />
                    </TouchableOpacity>
                    <View>
                        <Text className="font-bold text-xl">Nhập kết quả khám bệnh</Text>
                    </View>
                </View>
            </View>

            <KeyboardAwareScrollView
                extraHeight={150}
            >
                <View className="p-3 space-y-2">
                    <Text className="text-base">Chuẩn đoán bệnh</Text>
                    <View className='rounded-lg px-3 py-2.5 w-fit flex-row items-center border border-gray-400'>
                        <MaterialCommunityIcons name="emoticon-sick-outline" size={24} color="gray" />
                        <TextInput
                            className="p-1.5 pl-3 w-11/12" placeholder='VD: đau dạ dày, trào ngược dạ dày,...'
                            onChangeText={(val) => setResult({...result, disease: val})}
                        />
                    </View>
                </View>

                <View className="p-3 space-y-2">
                    <Text className="text-base">Đơn thuốc</Text>
                    <View className='rounded-lg w-fit flex-row items-center border border-gray-400'>
                        <View className="bg-[#1AD1FF] w-fit h-12 rounded-l-lg justify-center items-center p-3 flex-row">
                            <AntDesign name="pushpino" size={20} color="white" />
                            <Text className="ml-3 text-base text-white font-semibold">Số liều</Text>
                        </View>
                        <TextInput
                            className="ml-5 py-3.5 w-1/3" placeholder='VD: 5'
                            onChangeText={(val) => setResult({...result, numberOfDoses: val})}
                        />
                        <View className="bg-[#1AD1FF] absolute right-0 h-12 rounded-r-lg justify-center items-center p-3 flex-row">
                            <Text className="text-base text-white font-semibold">liều</Text>
                        </View>
                    </View>
                </View>

                <View className="p-3 space-y-2">
                    <Text className="text-base">Lượng thuốc 1 liều</Text>
                    <View className='rounded-lg px-3 py-2.5 w-fit flex-row items-center border border-gray-400'>
                        <Octicons name="list-ordered" size={20} color="gray" />
                        <TextInput
                            className="p-1.5 pl-3 w-11/12" 
                            placeholder='VD: 1 viên A, 2 viên B,...'
                            multiline={true}
                            onChangeText={(val) => {setResult({...result, doesDetail: val})}}
                        />
                    </View>
                </View>

                <View className="p-3 space-y-2">
                    <Text className="text-base">Đồ cần kiêng</Text>
                    <View className='rounded-lg px-3 py-2.5 w-fit flex-row items-center border border-gray-400'>
                        <Ionicons name="warning-outline" size={20} color="gray" />
                        <TextInput
                            className="p-1.5 pl-3 w-11/12" placeholder='VD: đồ chua,...'
                            onChangeText={(val) => setResult({...result, dietFood: val})}
                        />
                    </View>
                </View>

                <View className="p-3 space-y-2">
                    <Text className="text-base">Ghi chú</Text>
                    <View className='rounded-lg px-3 py-2.5 w-fit flex-row items-center border border-gray-400'>
                        <SimpleLineIcons name="note" size={20} color="gray" />
                        <TextInput
                            className="p-1.5 pl-3 w-11/12" placeholder='Hãy nhập ghi chú'
                            multiline={true}
                            onChangeText={(val) => {setResult({...result, note: val})}}
                        />
                    </View>
                </View>

                <View className="w-full justify-center items-center">
                    <TouchableOpacity 
                        className="bg-[#1AD1FF] w-2/5 justify-center items-center rounded-lg my-3 py-3"
                        onPress={() => submit()}   
                    >
                        <Text className="text-white font-bold text-base">Xác nhận</Text>
                    </TouchableOpacity>
                </View>

            </KeyboardAwareScrollView>

        </View>

    )
}