import { View, Image, Text, TouchableOpacity } from "react-native"
import { Ionicons, Entypo } from "@expo/vector-icons";
import { useState } from "react";
import useAuth from '../../hooks/useAuth';
import useConfirmModal from "../../hooks/useConfirmModal";

export default function (props) {
    console.log(props)
    const {auth} = useAuth()._j;
    const [openPostOptions, setOpenPostOptions] = useState(false);
    const {setTitle, setIsAlert, setVisible} = useConfirmModal()

    const dateToString = (d) => {
        return d.getHours() + ":" + d.getMinutes() + " " + d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();
    }

    const editPost = () => {
        setTitle("Chưa cập nhật chức năng này")
        setIsAlert(true)
        setVisible(true)
    }

    const deletePost = () => {
        setTitle("Chưa cập nhật chức năng này")
        setIsAlert(true)
        setVisible(true)
    }

    return (
        <View className="bg-white mt-3">
            <View className="flex-row items-center w-screen px-3 mt-3">
                <Image
                    src={props.avatar}
                    className="w-10 h-10 rounded-full"
                />
                <View>
                    <Text className="font-semibold text-lg ml-3">{props.auth.name}</Text>
                    <Text className="text-gray-400 ml-3 text-sm">{dateToString(new Date(props.createdAt))}</Text>
                </View>
                {props.auth.id === auth?.user.id &&
                    <TouchableOpacity onPress={() => { setOpenPostOptions(!openPostOptions); }} className="p-3 right-0 absolute">
                        <Entypo className="absolute float-right" name="dots-three-vertical" size={20} color="gray" />
                    </TouchableOpacity>
                }
            </View>
            <View className="my-3 px-3">
                <Text>{props.content}</Text>
            </View>
            {
                openPostOptions &&
                <View className="right-9 top-7 absolute rounded-md shadow-sm bg-white border border-gray-100 z-20">
                        <TouchableOpacity className="py-2.5 px-4 border-b border-gray-300"
                            onPress={editPost}
                        >
                            <Text className="text-gray-800">Chỉnh sửa</Text>
                    </TouchableOpacity>
                        <TouchableOpacity className="px-4 py-2.5"
                            onPress={deletePost}
                        >
                            <Text className="text-gray-800">Xóa bài đăng</Text>
                    </TouchableOpacity>
                </View>
            }
            {/* <View className="w-100">
                <Image 
                    src="https://vinmec-prod.s3.amazonaws.com/images/20190926_103801_467718_dai-thao-duong.max-1800x1800.jpg" 
                    className="object-contain w-screen aspect-video"
                />
            </View> */}
            <TouchableOpacity className="flex-row m-3 mt-0 pt-3 space-x-1 border-t border-gray-300" onPress={() => { setOpenPostOptions(false); }}>
                <Ionicons name="chatbox-outline" size={20} color={"gray"} />
                <Text className="text-gray-500">{props.numberOfComments} bình luận</Text>
            </TouchableOpacity>
        </View>
    )
}
