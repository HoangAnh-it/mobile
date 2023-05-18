import { View, Text } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { Feather, AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'

import useAxios from "../../hooks/useAxios";
import useSocket from "../../hooks/useSocket";
import useConfirmModal from "../../hooks/useConfirmModal";
import { setActive } from "@material-tailwind/react/components/Tabs/TabsContext";

export default function Profile(props) {
    const onlyShow = props.onlyShow

    const axios = useAxios()
    const socket = useSocket()
    const navigation = useNavigation()
    const {setTitle, setVisible, setAction} = useConfirmModal()

    const deleteProfile = (id) => {
        axios.delete(`/patient/medical_record/${id}`)
            .then(res => {
                if (res.status === 200) {
                        socket.emit("delete medical record", id)
                }   
            })
            .catch(err => {
                console.log(JSON.stringify(err))
            })
    }

    return (
        <View className="mx-4 my-2 p-5 rounded-md bg-white shadow-sm">
            <View className="flex-row">
                {
                    props.selected ? <AntDesign name="checkcircle" size={20} color="green" />
                        : <Feather name="circle" size={20} color="black" />
                }
                <Text className="ml-4 font-bold text-base">{props.fullname}</Text>
            </View>
            <View className="my-3">
                <View className="flex-row py-1 border-b border-gray-200">
                    <Text>Giới tính</Text>
                    <Text className="right-0 bottom-1 absolute">{props.sex}</Text>
                </View>
                <View className="flex-row py-1 border-b border-gray-200">
                    <Text>Ngày sinh</Text>
                    <Text className="right-0 bottom-1 absolute">{props.dateOfBirth}</Text>
                </View>
                <View className="flex-row py-1 border-b border-gray-200">
                    <Text>Mối quan hệ</Text>
                    <Text className="right-0 bottom-1 absolute">{props.relationship}</Text>
                </View>
                <View className="flex-row py-1 border-b border-gray-200">
                    <Text>Số điện thoại</Text>
                    <Text className="right-0 bottom-1 absolute">{props.numberphone}</Text>
                </View>
                <View className="flex-row py-1">
                    <Text>Địa chỉ</Text>
                    <Text className="right-0 top-1 absolute w-2/3 text-right">{props.address}</Text>
                </View>
                {
                    onlyShow &&
                    <View className="flex-row py-1">
                        <TouchableOpacity
                            className="p-2 py-1"
                            style={{
                                backgroundColor: "#24DCE2",
                                borderRadius: '10px'
                            }}
                            onPress={() => { console.log("Update", props.id) }}
                        >
                            <Text className="text-white font-bold text-center">Cập nhật</Text>
                        </TouchableOpacity>
                        <Text className="text-white">---</Text>
                        <TouchableOpacity
                            className="p-2 py-1 -ml-3"
                            style={{
                                color: "#24DCE2",
                                borderColor: "#24DCE2",
                                backgroundColor: "#ccc",
                                borderRadius: '10px'
                            }}
                            onPress={() => {
                                setTitle("Bạn chắc chắn muốn xóa?")
                                setVisible(true)
                                setAction(() => () => {
                                    console.log("DELETE medical record: ", props.id)
                                    deleteProfile(props.id)
                                })
                            }}
                        >
                            <Text className="text-white font-bold text-center">Xóa</Text>
                        </TouchableOpacity>
                    </View>
                }
            </View>
        </View>
    )
}