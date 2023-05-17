import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import Community from "../../screen/Tabs/Community";
import PostDetail from "../../screen/Post/PostDetail";
import NewPost from "../../screen/Post/NewPost";
import SearchPost from "../../screen/Search/SearchPost";
import Notification from "../../screen/Tabs/Notification";

const Stack = createStackNavigator();
export default function CommunityStack() {
    return (
        <Stack.Navigator initialRoutName="Cộng đồng">
            <Stack.Screen
                name="Cộng đồng "
                component={Community}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Post Detail"
                component={PostDetail}
                options={{ headerShown: false }}

            />
            <Stack.Screen
                name="New Post"
                component={NewPost}
                options={{ headerShown: false }}

            />
            <Stack.Screen
                name="Tìm kiếm bài viết"
                component={SearchPost}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Thông báo"
                component={Notification}
                options={{
                    headerTintColor: "#24dce2",
                    headerTitleStyle: { color: "#000000" },
                }}
                navigationOptions={({ navigation, route }) => ({
                    headerLeft: (
                        <Ionicons
                            labelVisible={false}
                            title="Trở về"
                            style={{ color: "#24dce2" }}
                        />
                    ),
                })}
            />
        </Stack.Navigator>
    )
}