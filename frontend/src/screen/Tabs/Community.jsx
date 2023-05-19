import React from 'react'
import { View, Text, TouchableOpacity, Image, TextInput, ScrollView } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import Post from "../../component/Post/Post"
import { StatusBar } from "expo-status-bar";
import useAxios from '../../hooks/useAxios'
import useSocket from '../../hooks/useSocket';

const DEFAULT_AVATAR = "https://static.vecteezy.com/system/resources/previews/001/223/214/original/female-doctor-wearing-a-medical-mask-vector.jpg";

export default function Community({ navigation }) {
    const [posts, setPosts] = React.useState([])
    const axios = useAxios()
    const socket = useSocket()

    React.useEffect(() => {
        axios.get("/post")
            .then(res => res.data.data)
            .then(res => {
                setPosts(res.posts)
                console.log(posts)
            })
            .catch(err => {
                console.log(JSON.stringify(err))
            })
    }, [])

    React.useEffect(() => {
        const newPostListener = (post) => {
            setPosts(prev => [post, ...prev])
        }

        const newComment = (id) => {
            setPosts(prev => {
                return prev
            })
        }

        socket.on('new post', newPostListener)
        socket.on('new comment', newComment)
        return () => {
            socket.off('new post', newPostListener)
            socket.off('new comment', newComment)
        }
    }, [socket])

    return (
        <>
            <StatusBar />
            <View className="flex-row items-center pt-12 pb-2 px-5 bg-white border border-gray-300">
                <View>
                    <Text className="font-bold text-2xl">Cộng đồng</Text>
                </View>
                <View className="space-x-2 flex-row mx-3 right-3 bottom-2 absolute">
                    <TouchableOpacity className="bg-slate-100 rounded-full p-2"
                        onPress={() => navigation.navigate("Tìm kiếm bài viết")}
                    >
                        <Ionicons name="search" size={24} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        className="bg-slate-100 rounded-full p-2"
                        onPress={() => {
                            navigation.navigate("Thông báo");
                        }}
                    >
                        <Ionicons name="notifications" size={24} />
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView className="flex-1">
                <TouchableOpacity
                    className="flex-row items-center bg-white py-5 w-screen"
                    onPress={() => navigation.navigate("New Post")}
                >
                    <Image
                        src="https://cdn-icons-png.flaticon.com/512/4659/4659027.png"
                        className="w-10 h-10 rounded-full ml-3 bg-[#ccf5ff]"
                    />
                    <Text className="text-base ml-3 text-gray-500">Chia sẻ thông tin của bạn</Text>
                    <View className="right-3 absolute ">
                        <Ionicons name="images" size={28} color={"#00ccff"} />
                    </View>
                </TouchableOpacity>

                <View>
                    {
                        posts.length === 0 &&
                        <Text className="text-center mt-4">Chưa có bài viết nào được đăng</Text>
                    }
                    {
                        posts.map((post, index) => {
                            return (
                                <TouchableOpacity
                                    key={`post-${post.post_id}-${index}`}
                                    onPress={() => { navigation.navigate("Post Detail", { post: post }) }}
                                >
                                    <Post
                                        key={post.post_id}
                                        user_id={post.auth.name}
                                        createdAt={post.createdAt}
                                        avatar={post.auth.avatar || DEFAULT_AVATAR}
                                        content={post.content}
                                        numberOfComments={post.numberOfComments}
                                        authId={post.authId}
                                    />
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>
            </ScrollView>
        </>
    )
}