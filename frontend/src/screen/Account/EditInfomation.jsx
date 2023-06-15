import { View, Text, Image, TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { ScrollView, TextInput } from "react-native-gesture-handler"
import React, { useEffect } from "react"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"

export default function EditInfomation({ navigation, route }) {
    const { user } = route.params

    const getFullDate = (d) => {
        let date = new Date(d)
        if (date !== "Invalid Date" && !isNaN(date))
            return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
    }

    const [info, setinfo] = React.useState({ ...user, birthDay: getFullDate(user.birthDay) })

    const [checkInfo, setCheckInfo] = React.useState({
        address: true,
        birthDay: true,
        email: true,
        name: true,
        phone: true,
        department: true,
    })

    const changeBirthday = (val) => {
        setinfo({ ...info, birthDay: val })
    }

    const checkBirthday = () => {
        let arrayDate = info.birthDay.split("/")
        let date = new Date(parseInt(arrayDate[2]), parseInt(arrayDate[1] - 1), parseInt(arrayDate[0]))
        console.log(parseInt(arrayDate[2]), parseInt(arrayDate[1] - 1), parseInt(arrayDate[0]))
        console.log(date)
        if (date !== "Invalid Date" && !isNaN(date)) {
            setinfo({...info, birthDay: getFullDate(date)})
        } else {
            setCheckInfo({...checkInfo, birthDay: false})
        }
    }

    const submit = () => {
        let checkValid = true
        for (var prop in checkInfo) {
            if (prop != "department") {
                if (info[prop] == null || info[prop] == "") {
                    checkInfo[prop] = false
                    setCheckInfo({ ...checkInfo })
                    checkValid = false
                } else {
                    checkInfo[prop] = true
                    setCheckInfo({ ...checkInfo })
                }
            } else {
                if (info.role == "DOCTOR") {
                    if (info.doctor.department.name == null || info.doctor.department.name == "") {
                        setCheckInfo({ ...checkInfo, department: false })
                        checkValid = false
                    } else {
                        setCheckInfo({ ...checkInfo, department: true })
                    }
                }
            }
        }
        checkBirthday()
        if (checkValid) {
            // gửi api
        }
    }

    return (
        <KeyboardAwareScrollView
            className="h-screen bg-white"
            extraScrollHeight={100}
        >
            <ScrollView>
                <View className="w-full h-60 items-center justify-center">
                    <View className="items-center">
                        <View className="p-1.5 w-40 h-40 rounded-full items-center justify-center">
                            <Image
                                src={info.avatar || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYOgVxLPZQlTUfG5XDL-uaQqJ03S3XEMx4xg&usqp=CAU"}
                                className="w-full h-full object-cover rounded-full"
                            />
                            <View className="bg-[#1AD1FF] p-2 rounded-full absolute right-1 bottom-1">
                                <Ionicons name="camera-outline" size={24} color="white" />
                            </View>
                        </View>

                        <View className="pt-2">
                            <Text className="text-xl font-bold">{user.name}</Text>
                        </View>

                    </View>
                </View>
                <View>
                    <View className="mx-5 pt-3 border-b border-gray-400">
                        <Text className="font-medium text-gray-400">TÊN ĐĂNG NHẬP</Text>
                        <View className="mt-2 mb-5">
                            <TextInput
                                className="text-base"
                                value={info.name}
                                onChangeText={(val) => setinfo({ ...info, name: val })}
                            />
                        </View>
                        {!checkInfo.name && <Text>Vui lòng điền trường này</Text>}
                    </View>
                    <View className="mx-5 pt-3 border-b border-gray-400">
                        <Text className="font-medium text-gray-400">NGÀY SINH</Text>
                        <View className="mt-2 mb-5">
                            <TextInput
                                className="text-base"
                                value={info.birthDay}
                                onChangeText={(val) => changeBirthday(val)}
                            />
                        </View>
                        {!checkInfo.birthDay && <Text>Trường này chưa được điền hoặc điền chưa đúng định dạng dd/MM/yyyy</Text>}
                    </View>
                    <View className="mx-5 pt-3 border-b border-gray-400">
                        <Text className="font-medium text-gray-400">ĐỊA CHỈ</Text>
                        <View className="mt-2 mb-5">
                            <TextInput
                                className="text-base"
                                value={info.address}
                                onChangeText={(val) => setinfo({ ...info, address: val })}
                            />
                        </View>
                        {!checkInfo.address && <Text>Vui lòng điền trường này</Text>}
                    </View>
                    <View className="mx-5 pt-3 border-b border-gray-400">
                        <Text className="font-medium text-gray-400">EMAIL</Text>
                        <View className="mt-2 mb-5">
                            <TextInput
                                className="text-base"
                                value={info.email}
                                onChangeText={(val) => setinfo({ ...info, email: val })}
                            />
                        </View>
                        {!checkInfo.email && <Text>Vui lòng điền trường này</Text>}
                    </View>
                    <View className="mx-5 pt-3 border-b border-gray-400">
                        <Text className="font-medium text-gray-400">SỐ ĐIỆN THOẠI</Text>
                        <View className="mt-2 mb-5">
                            <TextInput
                                className="text-base"
                                value={info.phone}
                                onChangeText={(val) => setinfo({ ...info, phone: val })}
                            />
                        </View>
                        {!checkInfo.phone && <Text>Vui lòng điền trường này</Text>}
                    </View>
                    {
                        info.role == "DOCTOR" &&
                        <View className="mx-5 pt-3 border-b border-gray-400">
                            <Text className="font-medium text-gray-400">CHUYÊN KHOA</Text>
                            <View className="mt-2 mb-5">
                                <TextInput
                                    className="text-base"
                                    value={info.doctor.department.name}
                                    onChangeText={(val) => setinfo({ ...info, doctor: { ...info.doctor, department: { ...info.doctor.department, name: val } } })}
                                />
                            </View>
                            {!checkInfo.department && <Text>Vui lòng điền trường này</Text>}
                        </View>
                    }
                    <View className="flex-row mb-5">
                        <TouchableOpacity
                            className="bg-[#1AD1FF] p-3 ml-5 rounded-lg items-center mt-5"
                            onPress={() => submit()}
                        >
                            <Text className="text-base text-white font-semibold">Lưu thay đổi</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            className="bg-gray-300 p-3 ml-3 rounded-lg items-center mt-5"
                            onPress={() => navigation.navigate("Account")}
                        >
                            <Text className="text-base text-white font-semibold">Hủy</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </ScrollView>
        </KeyboardAwareScrollView>
    )
}