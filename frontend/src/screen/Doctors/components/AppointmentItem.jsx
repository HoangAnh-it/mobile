import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { dictionary } from "../../../helpers/helpers";
import { StatusStyles, BackgroundColor } from "../../../component/Utils/Color";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function AppointmentItem({ data }) {
    const navigation = useNavigation()
    
    return (
        <TouchableOpacity onPress={() => { navigation.navigate("Tạo kết quả khám", { data }) }}>
            <View className="my-1 bg-white rounded-md shadow-sm ">
                <View className="flex-row items-center">
                    <View className="p-4 my-1 flex-1">
                        <Text className="font-semibold text-lg mb-3">
                            Bệnh nhân: <Text className="text-xl">{data.name}</Text>
                        </Text>
                        <View className="flex-row py-1 border-b border-gray-200">
                            <Text>Loại</Text>
                            <Text className="right-0 bottom-1 absolute">{dictionary[data.type]}</Text>
                        </View>
                        <View className="flex-row py-1 border-b border-gray-200">
                            <Text>Số điện thoại</Text>
                            <Text className="right-0 bottom-1 absolute">{data.phone}</Text>
                        </View>
                        <View className="flex-row py-1 border-b border-gray-200">
                            <Text>Giới tính</Text>
                            <Text className="right-0 bottom-1 absolute">{data.sex}</Text>
                        </View>
                        <View className="flex-row py-1 border-b border-gray-200">
                            <Text>Ngày sinh</Text>
                            <Text className="right-0 bottom-1 absolute">{data.dateOfBirth}</Text>
                        </View>
                        {data.type === "Gói xét nghiệm tại nhà" && (
                            <View className="flex-row py-1 border-b border-gray-200">
                                <Text>Địa chỉ</Text>
                                <Text className="right-0 top-1 absolute w-2/3 text-right">
                                    {data.address}
                                </Text>
                            </View>
                        )}
                        <View className="flex-row py-1">
                            <Text>Thời gian khám</Text>
                            <Text className="right-0 bottom-1 absolute">{data.date}</Text>
                        </View>
                        <View
                            className="p-2 rounded-md right-4 top-4 absolute items-center"
                            style={StatusStyles.status[data.status]}
                        >
                            <Text className="font-bold text-gray-700 w-fit text-right text-decoration-line: underline">
                                {dictionary[data.status]}
                            </Text>
                        </View>
                    </View>

                    <View>
                        <Ionicons name="chevron-forward-outline" size={24} color={BackgroundColor.primary} />
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};
