import {
    View,
    Text,
    TouchableOpacity,
    Modal,
  } from "react-native";
  import React from "react";
import MyPicker from "./Picker";

export default function FilterMedicalRecord({ value, setValue, isShow, setIsShown, role }) {
    const [data, setData] = React.useState(value)
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={isShow}
            onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setIsShown(false);
            }}>
            <View className="w-screen h-screen items-center justify-center">
                <View className="w-screen h-screen bg-black opacity-25 absolute">
                </View>
                <View className="bg-white items-center w-2/3 p-4 shadow-sm rounded-lg">
                    <Text className="font-bold text-xl">Loại xét nghiệm:</Text>
                   
                    <MyPicker setData={setData} data={data} role={role} />
  
                    <View className="flex flex-row justify-center items-center rounded-sm">
                        <TouchableOpacity className="p-2.5 mx-2 bg-[#1AD1FF] border-[#1AD1FF] border rounded-md"
                            onPress={() => {
                                setValue(data)
                                setIsShown(false)
                            }}
                        >
                            <Text className="text-white text-base">Áp dụng</Text>
                        </TouchableOpacity>
  
                        <TouchableOpacity className="p-2.5 mx-2 border-[#1AD1FF] border bg-white rounded-md"
                            onPress={() => {
                                setIsShown(false)
                                setData(value)
                            }}
                        >
                            <Text className="text-[#1AD1FF] text-base">Bỏ qua</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}
  