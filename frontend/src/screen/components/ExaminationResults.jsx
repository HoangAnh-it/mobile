import { View, Text, TouchableOpacity, Animated } from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import React from "react";
import useAxios from "../../hooks/useAxios";
import useConfirmModal from "../../hooks/useConfirmModal";
import { Ionicons, MaterialCommunityIcons, SimpleLineIcons } from "@expo/vector-icons"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import useSocket from "../../hooks/useSocket";
import useAuth from "../../hooks/useAuth";

export default function ExaminationResults({ navigation, route }) {
    const data = route.params.data
    
    const { setIsAlert, setTitle, setVisible } = useConfirmModal()
    const [result, setResult] = React.useState({
        disease: data?.result?.disease || "",
        medicines:  [... JSON.parse(data?.result?.medicines
            || '[{"name": "", "num": 0}]')
            .map(item => ({ ...item, tempId: Date.now().toString() }))],
        note: data?.result?.note || ""
    })

    const [isFreeze, setIsFreeze] = React.useState(!!data?.result?.medicalResultId)
    const axios = useAxios()
    const socket = useSocket()
    const {auth}  = useAuth()._j

    const submit = () => {
        if (!result.disease.trim()) {
            setIsAlert(true)
            setTitle("Chưa có chuẩn đoán bệnh.")
            setVisible(true)
            return;
        };
        result.note = result.note.trim()
        result.medicines = result.medicines
            .filter(m => !!m.name.trim() && m.num > 0)
            .map(m => ({ name: m.name, num: m.num }));
        
        axios.post(`/doctor/appointment/${data.id}/result`, result)
            .then(res => {
                if (res.status === 200) {
                    socket.emit('medical result', res.data.data)
                    navigation.goBack(null)
                }
            }).catch(err => {
                console.log(JSON.stringify(err))
                setIsAlert(true)
                setTitle("Không thể tạo kết quả")
                setVisible(true)
        })
    }

    const softDeleteOneMedicine = (id) => {
        setResult(prev => ({
            ...prev,
            medicines: prev.medicines.filter(m => m.tempId !== id)
        }))
    }

    const changeNameMedicine = (id, name) => {
        setResult(prev => {
            const index = prev.medicines.findIndex(a => a.tempId === id)
            if (index >= 0) {
                prev.medicines[index].name = name
            }
            return {...prev}
        })
    }

    const changeNumMedicine = (id, num) => {
        setResult(prev => {
            const index = prev.medicines.findIndex(a => a.tempId === id)
            if (index >= 0) {
                prev.medicines[index].num = num
            }
            return {...prev}
        })
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
                        <Text className="font-bold text-xl">
                            {auth.user.role === 'DOCTOR' && `Bệnh nhân: ${data.name}`}
                            {auth.user.role === 'PATIENT' && `Kết quả`}
                        </Text>
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
                            onChangeText={(val) => setResult(prev => ({ ...prev, disease: val }))}
                            value={result.disease}
                            editable={!isFreeze}
                        />
                    </View>
                </View>

                <View className="p-3 space-y-2">
                    <Text className="text-base">Đơn thuốc</Text>
                    {
                        result.medicines.map((medicine, index) => {
                            return (
                                <View
                                    key={`result-item-medicine-${medicine.tempId}-${index}`}
                                    className='rounded-lg px-3 py-2.5 w-fit flex-row items-center border border-gray-400'>
                                    <Ionicons name="medkit-outline" size={20} color="gray" />
                                    <TextInput
                                        className="p-1.5 pl-3"
                                        placeholder='Tên thuốc'
                                        multiline={true}
                                        value={medicine.name}
                                        onChangeText={(val) => changeNameMedicine(medicine.tempId, val)}
                                        editable={!isFreeze}
                                    />
                                    <TextInput
                                        className="h-full px-2 mr-3 font-bold text-black bg-slate-300"
                                        onChangeText={(val) => changeNumMedicine(medicine.tempId, val)}
                                        value={medicine.num.toString()}
                                        placeholder="0"
                                        keyboardType="numeric"
                                        editable={!isFreeze}
                                    />
                                    {
                                        !isFreeze && result.medicines.length > 1 &&
                                        <Ionicons name="trash-outline" size={20} color="gray" onPress={() => softDeleteOneMedicine(medicine.tempId)} />
                                    }

                                </View>
                            )
                        })
                    }
                    {
                        !isFreeze &&
                        <View className="w-full justify-center items-center">
                            <TouchableOpacity
                                className="bg-[#ccc] justify-center items-center rounded-lg p-2"
                                onPress={() => setResult(prev => ({
                                    ...prev,
                                    medicines: [
                                        ...prev.medicines,
                                        {
                                            tempId: Date.now().toString(),
                                            name: '',
                                            num: 0
                                        }
                                    ]
                                }))}
                            >
                                <Text className="text-black text-base">Thêm</Text>
                            </TouchableOpacity>
                        </View>
                    }

                </View>

                <View className="p-3 space-y-2">
                    <Text className="text-base">Ghi chú</Text>
                    <View className='rounded-lg px-3 py-2.5 w-fit flex-row items-center border border-gray-400'>
                        <SimpleLineIcons name="note" size={20} color="gray" />
                        <TextInput
                            className="p-1.5 pl-3 w-11/12" placeholder='Hãy nhập ghi chú'
                            multiline={true}
                            value={result.note}
                            onChangeText={(val) => { setResult(prev => ({ ...prev, note: val })) }}
                            editable={!isFreeze}
                        />
                    </View>
                </View>

                {
                    !isFreeze &&
                    <View className="w-full justify-center items-center">
                        <TouchableOpacity
                            className="bg-[#1AD1FF] w-2/5 justify-center items-center rounded-lg my-3 py-3"
                            onPress={() => submit()}
                        >
                            <Text className="text-white font-bold text-base">Xác nhận</Text>
                        </TouchableOpacity>
                    </View>
                }

            </KeyboardAwareScrollView>
        </View>
    );
}