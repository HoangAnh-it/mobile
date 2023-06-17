import { TouchableOpacity, View, Text, KeyboardAvoidingView } from "react-native"
import { FontAwesome5 } from "@expo/vector-icons"
import { ScrollView, TextInput } from "react-native-gesture-handler";
import React from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import useAxios from "../../hooks/useAxios";
import DateTimePicker from '@react-native-community/datetimepicker';
import useConfirmModal from "../../hooks/useConfirmModal";

export default function CreateMedicalRecord({ navigation }) {
    const [data, setData] = React.useState({
        name: null,
        gender: "Nam",
        birthDay: null,
        relationship: null,
        phone: null,
        address: null
    })

    const [dayOfBirth, setDayOfBirth] = React.useState(new Date())

    const [checkData, setCheckData] = React.useState({
        name: true,
        birthDay: true,
        relationship: true,
        phone: true,
        address: true
    })

    const axios = useAxios()
    const { setIsAlert, setTitle, setVisible} = useConfirmModal()

    const submit = (data) => {
        if (data.name == null) {
            setCheckData({ ...data, name: false })
        } else {
            setCheckData({ ...data, name: true })
        }
        if (data.birthDay == null) {
            setCheckData({ ...data, birthDay: false })
        } else {
            setCheckData({ ...data, birthDay: true })
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
        console.log(data)
        // return
        axios.post("/patient/medical_record", data)
            .then(res => {
                if (res.status === 200) {
                    setTitle("Tạo hồ sơ thành công")
                    setIsAlert(true)
                    setVisible(true)
                }
                return res.data.data
            }).then((res) => {
                console.log(res)
            }).catch(err => {
                setTitle(err.response.data.message)
                setIsAlert(true)
                setVisible(true)
                console.log(JSON.stringify(err))
            })
    }

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || dayOfBirth
        setDayOfBirth(currentDate);
        let date = dayOfBirth.getFullYear() + "-"
        if (dayOfBirth.getMonth() < 9) 
            date += "0"
        date += (dayOfBirth.getMonth() + 1) + "-"
        if (dayOfBirth.getDate() < 10) 
            date += "0"
        date += dayOfBirth.getDate();
        setData({ ...data, birthDay: date }); 
    }

    return (
        <KeyboardAwareScrollView className="h-screen bg-white p-3 space-y-2">
            <ScrollView>
                <View className="mt-2 mx-2">
                    <Text>Họ và tên</Text>
                    <TextInput
                        className="rounded-lg border border-gray-400 p-3 my-1 px-3"
                        placeholder="Nhập họ tên"
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
                </View>
                <View
                    className="flex-row mt-2">
                    <DateTimePicker
                        value={dayOfBirth}
                        onChange={onChange}
                    />
                </View>
                <View className="mt-2 mx-2">
                    <Text>Mối quan hệ</Text>
                    <TextInput
                        className="rounded-lg border border-gray-400 p-3 my-1 px-3"
                        placeholder="Bố, Mẹ,..."
                        onChangeText={(val) => setData({ ...data, relationship: val })}
                    />
                    {!checkData.relationship && <Text className="text-red-500">Vui lòng điền trường này</Text>}
                </View>
                <View className="mt-2 mx-2">
                    <Text>Số điện thoại</Text>
                    <TextInput
                        className="rounded-lg border border-gray-400 p-3 my-1 px-3"
                        placeholder="0982xxxxxxx"
                        onChangeText={(val) => setData({ ...data, phone: val })}
                    />
                    {!checkData.phone && <Text className="text-red-500">Vui lòng điền trường này</Text>}
                </View>
                <View className="mt-2 mx-2">
                    <Text>Địa chỉ</Text>
                    <TextInput
                        className="rounded-lg border border-gray-400 p-3 my-1 px-3"
                        placeholder="Số 19 ngõ 8 đường X, ...."
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
                        <Text className="text-white font-bold text-base">Tạo hồ sơ</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAwareScrollView>
    )
}