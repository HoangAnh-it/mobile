import { TouchableOpacity, View, Text, KeyboardAvoidingView } from "react-native"
import { FontAwesome5 } from "@expo/vector-icons"
import { ScrollView, TextInput } from "react-native-gesture-handler";
import React from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import useAxios from "../../hooks/useAxios";
import useConfirmModal from '../../hooks/useConfirmModal'
import DateTimePicker from '@react-native-community/datetimepicker';
import { convertStringToDate, extractDay } from "../../helpers/helpers";
import useSocket from '../../hooks/useSocket'

export default function UpdateMedicalRecord({navigation, route}) {
    const { prevProfile } = route.params;

    const [data, setData] = React.useState({...prevProfile})

    const [checkData, setCheckData] = React.useState({
        name: true,
        birthDay: true,
        relationship: true,
        phone: true,
        address: true
    })

    const axios = useAxios()
    const { setTitle, setIsAlert, setVisible } = useConfirmModal()
    const socket = useSocket();

    const onChange = (event, selectedDate) => {
        const newBirthDay = extractDay(new Date(selectedDate)).split("/").reverse().join("-")
        setData(prev => ({...prev, birthDay: newBirthDay}))
    }

    const submit = (data) => {
        if (data.name == null) {
            setCheckData({ ...data, name: false })
        } else {
            setCheckData({ ...data, name: true })
        }
        if (data.relationship == null) {
            setCheckData({ ...data, relationship: false })
        } else {
            setCheckData({ ...data, relationship: true })
        }
        if (data.phone == null) {
            setCheckData({ ...data, phone: false })
        } else {
            setCheckData({ ...data, phone: true })
        }
        if (data.address == null) {
            setCheckData({ ...data, address: false })
        } else {
            setCheckData({ ...data, address: true })
        }
        const { onlyShow, selected, ...updatedData } = data
        
        axios.patch(`/patient/medical_record/${prevProfile.id}`, updatedData)
            .then((res) => {
                if (res.status === 200) {
                    socket.emit("update medical record", updatedData)
                }
            }).then(() => {
                navigation.goBack(null)
            }).catch(err => {
                console.log(JSON.stringify(err))
                setTitle("Có lỗi. Vui lòng kiểm tra lại.")
                setIsAlert(true)
                setVisible(true)
            })
    }

    return (
        <KeyboardAwareScrollView className="h-screen bg-white p-3 space-y-2">
            <ScrollView>
                <View className="mt-2 mx-2">
                    <Text>Họ và tên</Text>
                    <TextInput
                        className="rounded-lg border border-gray-400 p-3 my-1 px-3"
                        placeholder="Nhập họ tên"
                        value={data.name}
                        onChangeText={(val) => setData({ ...data, name: val })}
                    />
                    {!checkData.name && <Text className="text-red-500">Vui lòng điền trường này</Text>}
                </View>
                <View className="mt-2 mx-2">
                    <Text>Giới tính</Text>
                    <View className="flex-row space-x-3">
                        {
                            data.gender == "Nam" ?
                                <FontAwesome5 name="dot-circle" size={24} color="#1AD1FF" />
                                :
                                <TouchableOpacity
                                    onPress={() => setData({ ...data, gender: "Nam" })}
                                >
                                    <FontAwesome5 name="circle" size={24} color="gray" />
                                </TouchableOpacity>
                        }
                        <Text>Nam</Text>
                        {
                            data.gender == "Nữ" ?
                                <FontAwesome5 name="dot-circle" size={24} color="#1AD1FF" /> :
                                <TouchableOpacity onPress={() => setData({ ...data, gender: "Nữ" })} >
                                    <FontAwesome5 name="circle" size={24} color="gray" />
                                </TouchableOpacity>
                        }
                        <Text>Nữ</Text>
                    </View>
                </View>
                <View className="mt-2 mx-2">
                    <Text>Ngày sinh</Text>
                    <View
                    className="flex-row mt-2">
                    <DateTimePicker
                        value={convertStringToDate(data.birthDay)}
                        onChange={onChange}
                    />
                </View>
                    {!checkData.birthDay && <Text className="text-red-500">Vui lòng điền trường này</Text>}
                </View>
                <View className="mt-2 mx-2">
                    <Text>Mối quan hệ</Text>
                    <TextInput
                        className="rounded-lg border border-gray-400 p-3 my-1 px-3"
                        placeholder="Bố, Mẹ,..."
                        value={data.relationship}
                        onChangeText={(val) => setData({ ...data, relationship: val })}
                    />
                    {!checkData.relationship && <Text className="text-red-500">Vui lòng điền trường này</Text>}
                </View>
                <View className="mt-2 mx-2">
                    <Text>Số điện thoại</Text>
                    <TextInput
                        className="rounded-lg border border-gray-400 p-3 my-1 px-3"
                        placeholder="0982xxxxxxx"
                        value={data.phone}
                        onChangeText={(val) => setData({ ...data, phone: val })}
                    />
                    {!checkData.phone && <Text className="text-red-500">Vui lòng điền trường này</Text>}
                </View>
                <View className="mt-2 mx-2">
                    <Text>Địa chỉ</Text>
                    <TextInput
                        className="rounded-lg border border-gray-400 p-3 my-1 px-3"
                        placeholder="Số 19 ngõ 8 đường X, ...."
                        value={data.address}
                        onChangeText={(val) => setData({ ...data, address: val })}
                    />
                    {!checkData.address && <Text className="text-red-500">Vui lòng điền trường này</Text>}
                </View>
                <View className="items-center">
                    <TouchableOpacity
                        className="my-5 py-3 items-center w-3/5 rounded-lg"
                        style={{ backgroundColor: "#1AD1FF" }}
                        onPress={() => submit(data)}
                    >
                        <Text className="text-white font-bold text-base">Cập nhật</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAwareScrollView>
    )
}