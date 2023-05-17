import React from "react";
import { View, Text, TouchableOpacity, Image, TextInput, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";

export default function NewPost({ navigation }) {
    const [content, setContent] = React.useState("");
    const axios = useAxios()

    const post = () => {
        if (!content || !content.trim()) {
            return
        }
        axios.post(`/post`, {
            content: content,
            topic: 'any',
        }).then(res => {
            if (res.status === 200) {
                console.log(res.data)
                setContent("")
                navigation.navigate("Cộng đồng ")
            }
        }).catch(err => {
            console.log(JSON.stringify(err))
        })
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
                        src={"https://cdn-icons-png.flaticon.com/512/4659/4659027.png"}
                        className="w-10 h-10 rounded-full"
                    />
                    <View className="justify-center">
                        <Text className="font-semibold text-lg ml-3">Chia sẻ thông tin của bạn</Text>
                    </View>
                </View>
                <View className="w-full">
                    {Platform.OS === "android" ?
                        <TextInput
                            className="text-base p-3"
                            style={{ textAlignVertical: "top" }}
                            numberOfLines={10}
                            maxLength={1000}
                            multiline={true}
                            value={content}
                            onChangeText={(val) => { setContent(val) }}
                            placeholder="Chia sẻ thông tin của bạn"
                        /> :
                        <TextInput
                            className="text-base p-3"
                            numberOfLines={10}
                            maxLength={1000}
                            multiline={true}
                            value={content}
                            onChangeText={(val) => { setContent(val) }}
                            placeholder="Chia sẻ thông tin của bạn"
                        />
                    }
                </View>
            </View>
        </View>
    )
}