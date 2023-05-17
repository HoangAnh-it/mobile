import { Text, View, Image } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { TouchableOpacity } from "react-native-gesture-handler"
import React, { useCallback, useEffect } from "react";
import { GiftedChat, InputToolbar, Bubble, Send } from "react-native-gifted-chat";

import useAxios from '../../hooks/useAxios'
import useAuth from "../../hooks/useAuth";
import useSocket from "../../hooks/useSocket";

const DEFAULT_AVATAR = "https://static.vecteezy.com/system/resources/previews/001/223/214/original/female-doctor-wearing-a-medical-mask-vector.jpg";

export default function ChatDetail({ navigation, route }) {
    const { user } = route.params;
    const [messages, setMessages] = React.useState([]);
    const [chat, setChat] = React.useState(route.params?.chat || {})
    
    const axios = useAxios()
    const socket = useSocket()
    const {auth} = useAuth()._j

    React.useEffect(() => {
        axios.get(`/chat/${user.id}`)
            .then(res => res.data.data)
            .then(res => {
                setChat(res.chatId || ' ')
                setMessages(res.messages.map(m => {
                    const item = {
                        _id: m.messageId,
                        user: {
                            _id: m.sender.userId,
                            name: m.sender.name,
                            avatar: m.sender.avatar || DEFAULT_AVATAR
                        },
                        createdAt: m.createdAt
                    }
                    switch (m.type) {
                        case 'TEXT':
                            item.text = m.content
                            break
                        case 'VIDEO':
                            item.video = m.content
                            break
                        case 'IMAGE':
                            item.image = m.content
                            break
                        default:
                            break;
                    }
                    return item
                }))
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    React.useEffect(() => {
        const receiveMessageListener = (msg) => {
            console.log("receive message => ", msg)
            setMessages(previousMessages => GiftedChat.append(previousMessages, msg))
        }

        socket.on("message", receiveMessageListener)

        return () => {
            socket.off("message", receiveMessageListener)
        }
    }, [socket])

    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
        console.log("send:::", messages)

        axios.post(`/chat/${user.id}/message`, {
            content: messages[0].text
        })
            .then(res => res.data.data)
            .then(res => {
                if (!chat.trim()) {
                    setChat(res.chatId)
                }
            })
            .catch(err => {
                console.log(err)
            })
    }, []);

    const SendIcon = (props) => {
        return (
            <Send {...props} className="items-center mr-3">
                <View className="items-center m-2" >
                    <Ionicons name="send" size={24} color={"#24DCE2"} />
                </View>
            </Send>
        )
    }

    const customInputToolbar = props => {
        return (
            <InputToolbar
                {...props}
                containerStyle={{
                    backgroundColor: '#DCDCDC',
                    borderTopWidth: 0,
                    borderRadius: 20,
                    marginHorizontal: 10,
                    marginVertical: 5
                }}
            />
        );
    };

    const customBubble = props => {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    left: {
                        backgroundColor: '#DCDCDC',
                    },
                }}
            />
        )
    }

    return (
        <>
            <View>
                <View className="pt-10 bg-white flex-row" />
                <View className="bg-white flex-row items-center border-b border-gray-200">
                    <TouchableOpacity
                        className="m-3"
                        onPress={() => navigation.goBack(null)}
                    >
                        <Ionicons name="arrow-back" size={24} color="#24CDE2" />
                    </TouchableOpacity>
                    <View className="my-3 flex-row items-center">
                        <Image
                            src={user.avatar || DEFAULT_AVATAR}
                            className="w-10 h-10 rounded-full mr-3"
                        />
                        <Text className="text-lg font-bold">{user.name}</Text>
                    </View>
                </View>
            </View>
            {
                messages.length === 0 &&
                <View className='items-center pt-5'>
                    <Text className="text-gray-500">Chưa có tin nhắn nào!</Text>
                </View>

            }
            <GiftedChat
                messages={messages}
                user={{
                    _id: auth?.user.id,
                }}
                onSend={messages => onSend(messages)}
                renderSend={props => SendIcon(props)}
                renderInputToolbar={props => customInputToolbar(props)}
                renderBubble={props => customBubble(props)}
                renderChatFooter={() => {
                    return (
                        <View className="h-5"></View>
                    )
                }}
            />
        </>
    )
}