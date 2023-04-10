import { View, Text, TouchableOpacity, Image, TextInput, ScrollView } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import Post from "../../component/Post/Post"

export default function Community() {
    const posts = [
        {
            post_id: 3,
            user_id: "Nguyễn Văn An",
            createdAt: "9:30 10/4/2023",
            avatar: "https://cdn-icons-png.flaticon.com/512/147/147133.png",
            content: "Người bị bệnh tiểu đường type 1 có sử dụng insulin có nhất thiết phải giảm lượng carbohydrat ko? Người tiểu đường type 1 bị thiếu cân, cần tăng cân thì cần ăn nhưng gì?"
        },
        {
            post_id: 2,
            user_id: "Hoàng Thu Hương",
            createdAt: "15:35 9/4/2023",
            avatar: "https://i.pinimg.com/originals/a6/58/32/a65832155622ac173337874f02b218fb.png",
            content: "Chào mọi người, con em được gần 5 tháng mà thóp sau vẫn chưa đóng hẳn, sờ vẫn còn mềm. Như vậy có bình thường không ạ, có cần phải đi khám bác sĩ không ạ, cháu hiện được 9kg, do vậy cháu lại nằm ngửa nhiều nên đầu hơi bẹp, điều đó có ảnh hưởng gì đến sự phát triển của não không ạ?"
        },
        {
            post_id: 1,
            user_id: "Nguyễn Thị Lan",
            createdAt: "10:21 9/4/2023",
            avatar: "https://cdn.icon-icons.com/icons2/2643/PNG/512/female_woman_person_people_avatar_icon_159366.png",
            content: "Mọi người cho em hỏi, bố em hay đau thắt ở ngực, cảm giác lồng ngực cứ như có ai đó bóp chặt, đè nén với một áp lực rất lớn. Các bác sĩ cho em hỏi, triệu chứng như vậy có phải bố em bị bệnh mạch vành không? Bố em nên đi kiểm tra những gì?"
        },
        
    ];
    const postList = [];
    posts.forEach((post) => {
        postList.push(
            <Post 
                key={post.post_id}
                user_id={post.user_id}
                createdAt={post.createdAt}
                avatar={post.avatar}
                content={post.content}
            />
        )
    })

    return (
        <ScrollView className="flex-1">
            <TouchableOpacity className="flex-row items-center bg-white py-5 w-screen"> 
                <Image 
                    src="https://t3.ftcdn.net/jpg/03/53/11/00/360_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg"
                    className="w-10 h-10 rounded-full ml-3"
                    />
                <Text className="text-base ml-3 text-gray-500">Chia sẻ thông tin của bạn</Text>
                <View className="right-3 absolute">
                    <Ionicons name="images" size={28} color={"green"} />
                </View>
            </TouchableOpacity>

            <View>
                {postList}
            </View>
        </ScrollView>
    )
}