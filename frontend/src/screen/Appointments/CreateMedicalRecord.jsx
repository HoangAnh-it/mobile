import { TouchableOpacity, View, Text, KeyboardAvoidingView } from "react-native"
import { FontAwesome5 } from "@expo/vector-icons"
import { ScrollView, TextInput } from "react-native-gesture-handler";
import React from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import useAxios from "../../hooks/useAxios";

export default function CreateMedicalRecord({navigation}) {
    const [data, setData] = React.useState({
        name: null,
        gender: "Nam",
        birthDay: null,
        relationship: null,
        phone: null,
        address: null
    })

    const [checkData, setCheckData] = React.useState({
        name: true,
        birthDay: true,
        relationship: true,
        phone: true,
        address: true
    })

    const axios = useAxios()

    const checkbirthDay = (val) => {
        var d_reg = /^([0-9]{4})\/(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])$/;
        if (d_reg.test(val)) {
            console.log("Date follows mm/dd/yyyy format");
        }
        else {
            console.log("Invalid date format");
        }
    }

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
        checkbirthDay(data.birthDay)

        axios.post("/patient/medical_record", data)
            .then(res => res.data.data)
            .then((res) => {
                console.log(res)
                navigation.goBack(null)
            }).catch(err => {
                console.log(JSON.stringify(err))
            })
    }

    return (
        <KeyboardAwareScrollView className="h-screen bg-white p-3 space-y-2">
            <ScrollView>
                <View className="mt-2 mx-2">
                    <Text>Họ và tên</Text>
                    <TextInput
                        className="rounded-lg border border-gray-400 p-1 my-1 px-3"
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
                    <TextInput
                        className="rounded-lg border border-gray-400 p-1 my-1 px-3"
                        placeholder="yyyy-MM-dd"
                        onChangeText={(val) => setData({ ...data, birthDay: val })}
                    />
                    {!checkData.birthDay && <Text className="text-red-500">Vui lòng điền trường này</Text>}
                </View>
                <View className="mt-2 mx-2">
                    <Text>Mối quan hệ</Text>
                    <TextInput
                        className="rounded-lg border border-gray-400 p-1 my-1 px-3"
                        placeholder="Bố, Mẹ,..."
                        onChangeText={(val) => setData({ ...data, relationship: val })}
                    />
                    {!checkData.relationship && <Text className="text-red-500">Vui lòng điền trường này</Text>}
                </View>
                <View className="mt-2 mx-2">
                    <Text>Số điện thoại</Text>
                    <TextInput
                        className="rounded-lg border border-gray-400 p-1 my-1 px-3"
                        placeholder="0982xxxxxxx"
                        onChangeText={(val) => setData({ ...data, phone: val })}
                    />
                    {!checkData.phone && <Text className="text-red-500">Vui lòng điền trường này</Text>}
                </View>
                <View className="mt-2 mx-2">
                    <Text>Địa chỉ</Text>
                    <TextInput
                        className="rounded-lg border border-gray-400 p-1 my-1 px-3"
                        placeholder="Số 19 ngõ 8 đường X, ...."
                        onChangeText={(val) => setData({ ...data, address: val })}
                    />
                    {!checkData.address && <Text className="text-red-500">Vui lòng điền trường này</Text>}
                </View>
                <View className="items-center">
                    <TouchableOpacity
                        className="my-5 py-2 items-center w-3/5 rounded-lg"
                        style={{ backgroundColor: "#1AD1FF" }}
                        onPress={() => submit(data)}
                    >
                        <Text className="text-white font-bold">Tạo hồ sơ</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAwareScrollView>
    )
}