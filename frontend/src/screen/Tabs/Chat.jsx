import React from "react"
import { View, TextInput, Text, Image, TouchableOpacity, StatusBar } from "react-native"
import { Ionicons, FontAwesome5 } from "@expo/vector-icons"
import useAxios from '../../hooks/useAxios'
import useAuth from '../../hooks/useAuth'
import useSocket from "../../hooks/useSocket"

export default function Chat({ navigation }) {
    const [search, setSearch] = React.useState({
        inputSearch: null,
        isSearch: false
    })
    const [chatList, setChatList] = React.useState([])
    const axios = useAxios()
    const socket = useSocket()

    const searchChange = (val) => {
        if (val.length != 0) {
            setSearch({
                inputSearch: val,
                isSearch: true
            });
        } else {
            setSearch({
                inputSearch: val,
                isSearch: false
            });
        }
    }

    const searchInfo = () => {

    }

    const filterChat = (chat) => {
        if (!search.inputSearch || !search.inputSearch.trim()) return chat
        return chat.filter(c => {
            return c.user.name.toLowerCase().includes(search.inputSearch.trim().toLowerCase())
        })
    }

    React.useEffect(() => {
        console.log("Fetch chat")
        axios.get("/chat")
            .then(res => {
                if (res.status === 200) {
                    setChatList(res.data.data)
                }
            }).catch(err => {
                console.log(JSON.stringify(err))
            })
    }, [])

    React.useEffect(() => {
        const newMsg = (c) => {
            console.log("new chat:::",c)
        }

        socket.on('message', newMsg)
        return () => {
            socket.off('message', newMsg)
        }
    }, [socket])

    return (
        <View className="bg-white flex-1">
            <StatusBar />
            <View className="flex-row items-center pt-10 pb-2 px-5 bg-white border border-gray-300 justify-center">
                <Text className="font-bold text-xl text-center">Đoạn chat</Text>
            </View>
            <View className="flex-1 items-center">
                <View className='bg-gray-200 rounded-full m-3 px-3 py-2 w-11/12 flex-row items-center'>
                    {search.isSearch ?
                        <Ionicons name='search' size={20} color="black" />
                        : <Ionicons name='search' size={20} color="gray" />
                    }
                    <TextInput
                        className="pl-2" placeholder='Nhập tên bác sĩ đã liên hệ'
                        onChangeText={(val) => searchChange(val)}
                        onEndEditing={() => searchInfo()}
                    />
                </View>
                <View>
                    {
                        search.inputSearch?.trim() && filterChat(chatList).length === 0 &&
                        <Text>Không có cuộc hội thoại nào của bác sĩ tên: "{search.inputSearch}"</Text>
                    }
                    {
                        chatList.length > 0 ?
                        filterChat(chatList).map((c, index) => {
                            return (
                                <TouchableOpacity
                                    key={`chat-list-item-${index}-${c.chatId}`}
                                    onPress={() => navigation.navigate("Chat Detail", {
                                        user: {
                                            id: c.user.userId,
                                            name: c.user.name,
                                            avatar: c.user.avatar
                                    } })}
                                >
                                    <ChatItem
                                        key={`chat-item-${index}-${c.chatId}`}
                                        chatItem={{
                                            chatId: c.chatId,
                                            user: c.user,
                                            lastMessage: c.messages[0]
                                        }}
                                    />
                                </TouchableOpacity>
                            )
                        })
                            :
                        <Text>Bạn chưa có cuộc hội thoại nào</Text>
                    }
                </View>
            </View>
        </View>
    )
}

const ChatItem = ({ chatItem }) => {

    const {auth} = useAuth()._j

    return (
        <View className="mx-4 my-2 flex-col ">
            <View className="flex-row items-center w-screen px-3">
                <Image
                    src={chatItem.user.avatar || "https://static.vecteezy.com/system/resources/previews/001/223/214/original/female-doctor-wearing-a-medical-mask-vector.jpg"}
                    className="w-16 h-16 rounded-full"
                />
                <View className="w-72">
                    <Text className="font-semibold text-base ml-3">{chatItem.user.name}</Text>
                    <Text className="text-gray-400 ml-3 text-sm" numberOfLines={1}>
                        {
                            auth && auth?.user?.id === chatItem.lastMessage.sender.userId ?
                                "You"
                                :
                                chatItem.lastMessage.sender.name
                        }
                        : {chatItem.lastMessage.content}
                    </Text>
                </View>
            </View>
        </View>
    )
}