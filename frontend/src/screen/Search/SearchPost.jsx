import { View, Text, TouchableOpacity, ScrollView, TextInput, StyleSheet, Image } from "react-native";
import React, { useState } from "react";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Post from "../../component/Post/Post";

import useAxios from '../../hooks/useAxios'

export default function SearchPost({ navigation, route }) {
    const [search, setSearch] = React.useState(route.params?.search || {})
    const [clickSearch, setClickSearch] = React.useState(false)

    const axios = useAxios()

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
        setClickSearch(true)
    }

    const posts = [
        {
            postId: "8c5fdcd4-1a5b-4029-bcd1-087bcd5cccdd",
            topic: "eye",
            content: "Em chào mọi người, mọi người cho em hỏi bệnh nhân tiểu đường cần kiêng những gì ạ? ",
            media: "https://exploratory.io/note/kanaugust/Rename-Multiple-Columns-2613369153527243/note_content/libs/exploratory/images/p1.png",
            authId: "2764319f-7d99-43e7-a4d5-850380b1fd77",
            createdAt: "2023-04-15T03:51:38.000Z",
            updatedAt: "2023-04-15T03:51:38.000Z",
            numberOfComments: 3,
            auth: {
                userId: "2764319f-7d99-43e7-a4d5-850380b1fd77",
                firstName: "Vu Hoang",
                lastName: "Anh",
                avatar: null
            }
        },
    ];

    const postList = [];
    posts.forEach((post) => {
        postList.push(
            <TouchableOpacity onPress={() => { navigation.navigate("Post Detail", { post: post }) }}>
                <Post
                    key={post.post_id}
                    user_id={post.auth.firstName + " " + post.auth.lastName}
                    createdAt={post.createdAt}
                    avatar={post.auth.avatar || "https://cdn-icons-png.flaticon.com/512/3607/3607444.png"}
                    content={post.content}
                    numberOfComments={post.numberOfComments}
                />
            </TouchableOpacity>
        )
    })

    return (
        <>
            <View className="flex-row pt-10 pb-2 px-5 space-x-2 bg-white">
                <View className='bg-gray-200 rounded-full px-3 py-2 w-11/12 flex-row items-center'>
                    {search.isSearch ?
                        <Ionicons name='search' size={20} color="black" />
                        : <Ionicons name='search' size={20} color="gray" />
                    }

                    <TextInput
                        className="pl-2" placeholder='Nhập nội dung muốn tìm kiếm'
                        defaultValue={search.inputSearch}
                        onChangeText={(val) => searchChange(val)}
                        onEndEditing={() => searchInfo()}
                    />
                </View>
                <TouchableOpacity
                    className="w-1/12 justify-center items-center">
                    {/* onPress={() => {navigation.navigate("Thông báo")}}> */}
                    <Ionicons name="notifications-outline" size={28} />
                </TouchableOpacity>
            </View>
            <KeyboardAwareScrollView>
                <ScrollView className="flex-1">
                    {clickSearch &&
                        <View>
                            {postList}
                        </View>}
                </ScrollView>
            </KeyboardAwareScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    starUnselected: {
        color: "#aaa",
    },
    starSelected: {
        color: "#ffb300",
    },
    textColor: {
        color: "#1AD1FF",
        fontWeight: "bold"
    },
    bgColor: {
        backgroundColor: "#1AD1FF",
        borderColor: "#1AD1FF"
    },
    focus: {
        borderColor: "#1AD1FF",
        color: "#1AD1FF",
    },
    none: {
        fontWeight: "normal"
    },
});