import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native"
import React, { useEffect, useRef } from "react";
import { Ionicons, FontAwesome, Feather, AntDesign, MaterialCommunityIcons, Entypo } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";

export default function AccountDoctor({ navigation }) {
    const [user, setUser] = React.useState({})
    
    const axios = useAxios()
    const {auth, authDispatch} = useAuth()._j

    useEffect(() => {
        if (!auth?.user.id) {
            return
        }
        axios.get(`/user/profile/${auth?.user.id}`)
            .then(res => res.data.data)
            .then(info => {
                setUser(info)
            })
            .catch(err => {
                console.log(JSON.stringify(err))
            })
    }, [auth]);

    const logout = () => {
        AsyncStorage.removeItem("token")
            .then(() => {
                authDispatch({ type: 'LOGOUT' })
            }).catch(console.log)
    }

    return (
        <View className="flex-1 items-center bg-white">
            <View className="w-full h-60">
                <Image
                    src={"https://png.pngtree.com/thumb_back/fh260/background/20210115/pngtree-abstract-medical-wallpaper-template-design-banner-background-image_519861.jpg"}
                    className="object-cover w-full h-full overflow-hidden"
                />
            </View>
            <View className="-mt-2 p-4 bg-white rounded-t-xl w-full max-w-s shadow-sm">
                <Text className="pt-24 text-center mb-2 text-slate-900 text-2xl font-bold">{user.name}</Text>
                <View className="m-auto flex-row space-x-5">
                    <TouchableOpacity style={styles.bg} className="p-3 rounded-lg flex-row items-center justify-center w-40">
                        <Feather name="edit" size={24} color={"white"} />
                        <Text className="w-20 ml-3 font-bold text-white">Chỉnh sửa thông tin</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.bg} className="p-3 rounded-lg flex-row items-center justify-center w-40">
                        <Feather name="eye" size={24} color={"white"} />
                        <Text className="w-20 ml-3 font-bold text-white">Xem trang cá nhân</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View className="top-28 p-1.5 w-56 h-56 rounded-full absolute items-center justify-center bg-white">
                <Image
                    src={user.avatar}
                    className="w-full h-full object-cover rounded-full"
                />
            </View>

            <View className="border-t border-slate-300 w-screen items-center">
                <TouchableOpacity 
                    className="w-screen items-center"
                    onPress={() => {navigation.navigate("Danh sách bệnh viện")}}
                >
                    <Item title="Danh sách bệnh viện" />
                </TouchableOpacity>
                <TouchableOpacity 
                    className="w-screen items-center"
                    onPress={() => {navigation.navigate("Danh sách bác sĩ")}}
                >
                    <Item title="Danh sách bác sĩ" />
                </TouchableOpacity>
                <TouchableOpacity 
                    className="w-screen items-center"
                    onPress={() => {navigation.navigate("Đổi mật khẩu")}}
                >
                    <Item title="Đổi mật khẩu" />
                </TouchableOpacity>
                <TouchableOpacity className="w-screen items-center" onPress={logout}>
                    <Item title="Đăng xuất" />
                </TouchableOpacity>
            </View>
        </View>

    )
}

const Item = (props) => {
    return (
        <View className="flex-row w-11/12 p-4 border-b border-gray-300 items-center">
            <View className>
                {
                    props.title == "Danh sách bệnh viện"
                    && <FontAwesome name="hospital-o" size={24} color="green" />
                }
                {
                    props.title == "Danh sách bác sĩ"
                    && <FontAwesome name="user-md" size={24} color="orange" />
                }
                {
                    props.title == "Đổi mật khẩu"
                    && <MaterialCommunityIcons name="form-textbox-password" size={24} color="blue" />
                }
                {
                    props.title == "Đăng xuất"
                    && <Ionicons name="exit-outline" size={24} color="red" />
                }
            </View>
            <Text className="text-base ml-5">{props.title}</Text>
            <View className="right-3 absolute">
                <Entypo name="chevron-right" size={20} color="lightgray" />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    bg: {
        backgroundColor: "#24DCE2",
    },
    borderAvatar: {

    }
})