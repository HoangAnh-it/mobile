import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native"
import React, { useEffect, useRef } from "react";
import { Ionicons, FontAwesome, Feather, AntDesign, MaterialCommunityIcons, Entypo } from "@expo/vector-icons";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import useSocket from "../../hooks/useSocket";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView } from "react-native-gesture-handler";

export default function Account({ navigation }) {
    const [user, setUser] = React.useState({})
    const axios = useAxios()
    const { auth, authDispatch } = useAuth()._j
    const socket = useSocket()

    useEffect(() => {
        if (!auth?.user.id) {
            return
        }
        axios.get(`/user/profile/${auth?.user.id}`)
            .then(res => {
                if (res.status === 200) {
                    setUser(res.data.data)
                }
            })
            .catch(err => {
                console.log(err.response.data.message)
            })
    }, [auth]);

    useEffect(() => {
        socket.on("update info user", data => {
            setUser(data)
        })
    }, [socket])

    const logout = async () => {
        AsyncStorage.removeItem("token")
            .then(() => {
                authDispatch({ type: 'LOGOUT' })
            }).catch(console.log)
    }

    return (
        <ScrollView>
            <View className="flex-1 items-center bg-white">
                <View className="w-full h-60">
                    <Image
                        src={"https://projectmgtcoach.com/wp-content/uploads/2015/03/light-blue-backgrounds-for-websites.jpg"}
                        className="object-cover w-full h-full overflow-hidden"
                    />
                </View>
                <View className="-mt-2 p-4 bg-white rounded-t-xl w-full max-w-s shadow-sm">
                    <Text className="pt-24 text-center mb-2 text-slate-900 text-2xl font-bold">{user.name}</Text>
                    <View className="m-auto space-x-5">
                        <TouchableOpacity
                            style={styles.bg}
                            className="p-3 rounded-lg flex-row items-center justify-center w-fit"
                            onPress={() => navigation.navigate("Chỉnh sửa thông tin", { user: user })}
                        >
                            <Feather name="edit" size={24} color={"white"} />
                            <Text className="w-fit ml-3 font-bold text-white">Chỉnh sửa thông tin</Text>
                        </TouchableOpacity>
                        {/* <TouchableOpacity style={styles.bg} className="p-3 rounded-lg flex-row items-center justify-center w-40">
                        <Feather name="eye" size={24} color={"white"} />
                        <Text className="w-20 ml-3 font-bold text-white">Xem trang cá nhân</Text>
                    </TouchableOpacity> */}
                    </View>
                    <View className="mt-5 pt-2 px-4 border-t border-gray-300">
                        <View className="flex-row items-center border-b border-gray-300 py-2">
                            <Ionicons name="mail" size={24} color="#aaa" />
                            <Text className="ml-5 text-base">{user.email}</Text>
                        </View>
                        <View className="flex-row items-center pl-1 border-b border-gray-300 py-2">
                            <FontAwesome name="phone" size={24} color="#aaa" />
                            <Text className="ml-5 text-base">{user.phone}</Text>
                        </View>
                        <View className="flex-row items-center pt-2">
                            <Ionicons name="ios-location-sharp" size={24} color="#aaa" />
                            <Text className="ml-5 text-base">{user.address}</Text>
                        </View>
                    </View>
                </View>
                <View className="top-28 p-1.5 w-56 h-56 rounded-full absolute items-center justify-center bg-white border-2 border-gray-50">
                    <Image
                        src={user.avatar || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYOgVxLPZQlTUfG5XDL-uaQqJ03S3XEMx4xg&usqp=CAU"}
                        className="w-full h-full object-cover rounded-full"
                    />
                </View>

                <View className="border-t border-slate-300 w-screen items-center">
                    {
                        auth?.user.role === 'PATIENT' &&
                        <>
                            <TouchableOpacity
                                className="w-screen items-center"
                                onPress={() => navigation.navigate("Hồ sơ", { onlyShow: true })}
                            >
                                <Item title="Hồ sơ khám bệnh" />
                            </TouchableOpacity>
                            <TouchableOpacity className="w-screen items-center"
                                onPress={() => { navigation.navigate("Xem lịch khám") }}
                            >
                                <Item title="Lịch khám của tôi" />
                            </TouchableOpacity>
                        </>
                    }

                    {
                        auth?.user.role === 'DOCTOR' &&
                        <>
                            <TouchableOpacity
                                className="w-screen items-center"
                                onPress={() => { navigation.navigate("Danh sách bệnh viện") }}
                            >
                                <Item title="Danh sách bệnh viện" />
                            </TouchableOpacity>
                            <TouchableOpacity
                                className="w-screen items-center"
                                onPress={() => { navigation.navigate("Danh sách bác sĩ") }}
                            >
                                <Item title="Danh sách bác sĩ" />
                            </TouchableOpacity>
                        </>
                    }

                    {
                        auth?.user.role === 'HOSPITAL' &&
                        <>
                            <TouchableOpacity className="w-screen items-center"
                                onPress={() => { navigation.navigate("department-management") }}
                            >
                                <Item title="Quản lý khoa" />
                            </TouchableOpacity>
                        </>
                    }

                    <TouchableOpacity
                        className="w-screen items-center"
                        onPress={() => { navigation.push("Đổi mật khẩu") }}
                    >
                        <Item title="Đổi mật khẩu" />
                    </TouchableOpacity>
                    <TouchableOpacity className="w-screen items-center" onPress={logout}>
                        <Item title="Đăng xuất" />
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
}

const Item = (props) => {
    const { auth } = useAuth()._j

    return (
        <View className="flex-row w-11/12 p-4 border-b border-gray-300 items-center">
            {
                auth?.user.role === 'PATIENT' &&
                <View className>
                    {
                        props.title == "Hồ sơ khám bệnh"
                        && <AntDesign name="profile" size={24} color="orange" />
                    }
                    {
                        props.title == "Lịch khám của tôi"
                        && <FontAwesome name="calendar-plus-o" size={24} color="green" />
                    }
                </View>
            }

            {
                auth?.user.role === 'DOCTOR' &&
                <View className>
                    {
                        props.title == "Danh sách bệnh viện"
                        && <AntDesign name="profile" size={24} color="orange" />
                    }
                    {
                        props.title == "Danh sách bác sĩ"
                        && <FontAwesome name="calendar-plus-o" size={24} color="green" />
                    }
                </View>
            }

            {
                auth?.user.role === 'HOSPITAL' &&
                <View className>
                    {
                        props.title == "Quản lý khoa"
                        && <FontAwesome name="calendar-plus-o" size={24} color="green" />
                    }

                </View>
            }
            {
                props.title == "Đổi mật khẩu"
                && <MaterialCommunityIcons name="form-textbox-password" size={24} color="blue" />
            }
            {
                props.title == "Đăng xuất"
                && <Ionicons name="exit-outline" size={24} color="red" />
            }
            <Text className="text-base ml-5">{props.title}</Text>
            <View className="right-3 absolute">
                <Entypo name="chevron-right" size={20} color="lightgray" />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    bg: {
        backgroundColor: "#1AD1FF",
    },
    borderAvatar: {

    }
})