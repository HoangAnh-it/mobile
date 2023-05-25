import React from "react";
import { Text, View, TouchableOpacity, Image, KeyboardAvoidingView, ScrollView, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Post from "../../component/Post/Post";
import useAxios from "../../hooks/useAxios";

const DEFAULT_AVATAR = "https://cdn-icons-png.flaticon.com/512/3607/3607444.png";

const Comment = (props) => {
    console.log(props.comment)
    const dateToString = React.useMemo(() => (d) => {
        return d.getHours() + ":" + d.getMinutes() + " " + d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();
    }, [])

    return (
        <View className=" flex-row m-3">
            <Image
                src={props.comment.auth.avatar || DEFAULT_AVATAR}
                className="aspect-square rounded-full"
                style={{ width: "12%" }}
            />
            <View
                className="bg-gray-100 ml-3 rounded-lg w-11/12 px-3 py-1"
                style={{ width: "85%" }}
            >
                <Text className="font-bold">
                    {props.comment.auth.name} {" "}
                    <Text className="font-light">{ dateToString(new Date(props.comment.createdAt))}</Text>
                </Text>
                <Text>{props.comment.content}</Text>
            </View>

        </View>
    )
}

export default function PostDetail({ navigation, route }) {
    const [post, setPost] = React.useState(route.params.post || {})
    const [comments, setComments] = React.useState([])
    const [comment, setComment] = React.useState("");

    const axios = useAxios()

    const writeComment = (val) => {
        setComment(val)
    }

    const sendCommnet = () => {
        axios.post(`/post/${post.postId}/comments`, {
            content: comment
        })
            .then(res => {
                if (res.status === 200) {
                    setComment("")
                    setComments(prev => [
                        ...prev,
                        res.data.data
                    ])
                    setPost(prev => ({
                        ...prev,
                        numberOfComments: prev.numberOfComments + 1
                    }))
                }
            })
            .catch(err => {
                console.log(JSON.stringify(err))
            })
    }

    React.useEffect(() => {
        console.log('fetch cmt')
        axios.get(`/post/${post.postId}/comments`)
            .then(res => res.data.data)
            .then(cmt => {
                setComments(cmt)
            })  
            .catch(err => {
                console.log(JSON.stringify(err))
            })
    }, [post.postId])

    return (
        <KeyboardAvoidingView
            className="bg-white"
            style={{ height: "100%" }}
        >
            <View className="pt-10 flex-row" />
            <View className="flex-row items-center justify-center border-b border-gray-200">
                <TouchableOpacity
                    className="m-3 absolute left-0"
                    onPress={() => navigation.goBack(null)}
                >
                    <Ionicons name="arrow-back" size={24} color="#1AD1FF" />
                </TouchableOpacity>
                <View className="my-3 flex-row items-center">
                    <Text className="font-semibold text-lg ml-3">{post.auth.name}</Text>
                </View>
            </View>
            <ScrollView className="h-4/5">
                <Post
                    key={post.postId}
                    auth={{
                        name: post.auth.name,
                        id: post.authId,
                    }}
                    createdAt={post.createdAt}
                    avatar={post.auth.avatar || DEFAULT_AVATAR}
                    content={post.content}
                    numberOfComments={post.numberOfComments}
                />

                <View className="mb-20">
                    <View className="border-t border-gray-300 mx-3" />
                    {
                        comments.map((cmt, index) => {
                            return <Comment
                                    key={cmt.commentId}
                                    comment={cmt} 
                                />
                        })
                    }
                </View>
            </ScrollView>
            <KeyboardAvoidingView className="w-screen absolute bottom-0" behavior="padding">
                <View className="flex-row bg-white items-center justify-center px-5">
                    <TextInput
                        className="bg-gray-100 w-11/12 my-2 rounded-full py-3 px-5"
                        placeholder="Viết bình luận ..."
                        id="comment"
                        value={comment}
                        onChangeText={(val) => writeComment(val)}
                    />
                    {
                        comment ?
                            <TouchableOpacity
                                className="w-1/12 ml-3"
                                onPress={() => sendCommnet()}
                            >
                                <Ionicons name="send" color={"#1AD1FF"} size={24} />
                            </TouchableOpacity> :
                            <View className="w-1/12 ml-3">
                                <Ionicons name="send" color={"gray"} size={24} />
                            </View>
                    }
                </View>
            </KeyboardAvoidingView>
        </KeyboardAvoidingView>
    )
}