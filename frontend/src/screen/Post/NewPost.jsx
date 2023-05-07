import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React from "react";

export default function NewPost({ navigation }) {
    const [content, setContent] = React.useState(null);

    const post = () => {
        // ghep api
        setContent(null)
        navigation.navigate("Cộng đồng ")
    }

    return (
        <View>
            <View className="pt-10 flex-row" />
            <View className="flex-row items-center justify-center border-b border-gray-200">
                <TouchableOpacity
                    className="m-3 absolute left-0"
                    onPress={() => navigation.goBack(null)}
                >
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <View className="my-3 flex-row items-center">
                    <Text className="font-semibold text-lg ml-3">Tạo bài viết</Text>
                </View>
                {
                    content ?
                        <TouchableOpacity
                            className="m-3 absolute right-0 rounded-md py-1 px-2"
                            style={{ backgroundColor: "#24CDE2" }}
                            onPress={() => post()}
                        >
                            <Text className="text-base text-white">Đăng</Text>
                        </TouchableOpacity> :
                        <View className="m-3 absolute right-0 rounded-md py-1 px-2 bg-gray-300">
                            <Text className="text-base text-white">Đăng</Text>
                        </View>
                }

            </View>
            <View>
                <View className="flex-row m-3">
                    <Image
                        src={"https://cdn-icons-png.flaticon.com/512/3607/3607444.png"}
                        className="w-10 h-10 rounded-full"
                    />
                    <View className="justify-center">
                        <Text className="font-semibold text-lg ml-3">Vũ Hoàng Anh</Text>
                    </View>
                </View>
                <View className="w-full">
                    <TextInput
                        className="text-base p-3"
                        numberOfLines={10}
                        maxLength={1000}
                        multiline={true}
                        value={content}
                        onChangeText={(val) => { setContent(val) }}
                        placeholder="Chia sẻ thông tin của bạn"
                    />
                </View>
            </View>
        </View>
    )
}