import { StyleSheet, View, Image, Text, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { StatusBar } from "expo-status-bar";
import useAxios from "../../hooks/useAxios";
import useSocket from "../../hooks/useSocket";

async function schedulePushNotification(data) {
    let trigger = Date.now();
    if (data.date == "Hôm nay") { 
        trigger = Date.now();
        trigger.setHours(data.time.split(":")[0]);
        trigger.setMinutes(data.time.split(":")[1]);
    } else {
        trigger.setHours(data.time.split(":")[0]);
        trigger.setMinutes(data.time.split(":")[1]);
        trigger.setDate(data.date.split("/")[0]);
        trigger.setMonth(data.date.split("/")[1]);
    }
    await Notifications.scheduleNotificationAsync({
        content: {
            title: data.name,
            body: data.date == "Hôm nay" ? data.time : data.time + ",\n" + data.date,
            data: { data: 'goes here' },
        },
        trigger: { seconds: 2 },
    });
}

// const drugs = [
//     {
//         name: "2 viên bù nước",
//         time: "09:30",
//         date: "Hôm nay",
//     },
//     {
//         name: "1 viên hoạt huyết",
//         time: "09:30",
//         date: "Hôm nay",
//     },
//     {
//         name: "1 viên vitamin sau ăn",
//         time: "11:30",
//         date: "Hôm nay",
//     }
// ];

// const checkSchedules = [
//     {
//         name: "Xét nghiệm máu",
//         time: "07:30",
//         date: "Hôm nay",
//     },
//     {
//         name: "Khám tổng quát định kỳ",
//         time: "09:30",
//         date: "10/5",
//     }
// ];

const DrugNoti = (props) => {
    return (
        <>
            <View className="h-0.5 w-full bg-gray-200" />
            <TouchableOpacity className="px-2 py-1 h-16 w-full flex-row items-center text-center rounded-lg">
                <View className="ml-2 border-gray-600 h-6 w-6 rounded-full items-center justify-center border">
                    {/* <Image alt="Overdue" source={require("../../assets/home-icon/past.png")} className='object-scale-down h-6 w-6 rounded-full'/> */}
                </View>
                <View className="left-3 w-full flex-row">
                    <Text className="w-2/3 h-fit my-auto text-left break-normal font-semibold justify-center">{props.name}</Text>
                    <View className="w-1/5 float-right mr-3">
                        <Text className="text-right break-normal font-semibold justify-center">{props.date == "Hôm nay" ? props.time : props.time + ",\n" + props.date}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </>
    )
}

const ScheduleNoti = async ({ data }) => {   
    schedulePushNotification(data);
    return (
        <>
            <View className="h-0.5 w-full bg-gray-200" />
            <TouchableOpacity className="px-2 py-1 h-16 w-full flex-row items-center text-center rounded-lg">
                <View className="ml-2 border-gray-600 h-6 w-6 rounded-full items-center justify-center border">
                    {/* <Image alt="Overdue" source={require("../../assets/home-icon/past.png")} className='object-scale-down h-6 w-6 rounded-full'/> */}
                </View>
                <View className="left-3 w-full flex-row">
                    <Text className="w-2/3 h-fit my-auto text-left break-normal font-semibold justify-center">{data.name}</Text>
                    <View className="w-1/5 float-right mr-3">
                        <Text className="text-right break-normal font-semibold justify-center">{data.date == "Hôm nay" ? data.time : data.time + ",\n" + data.date}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </>
    )
}

const formatNoti = (n) => {
    return {
        id: n.notificationId,
        content: n.content,
        time: n.createdAt,
        type: n.type,
        isRead: n.isRead
    }
}


export default function Notification({ navigation }) {
    const [notifications, setNotifications] = React.useState([])
    const axios = useAxios()
    const socket = useSocket()

    React.useEffect(() => {
        axios.get("/user/notification")
            .then(res => res.data.data)
            .then(noti => {
                setNotifications(noti.map(n => formatNoti(n)))
            }).catch(err => {
                console.log(JSON.stringify(err))
            })
    }, [])

    React.useEffect(() => {
        const notificationListener = (noti) => {
            setNotifications(prev => [formatNoti(noti), ...prev])
        }

        socket.on("notification", notificationListener)

        return () => {
            socket.off("notification", notificationListener)
        }
    }, [socket])

    const getDate = React.useMemo(() => (d) => {
        return d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();
    }, [])

    const getTime = React.useMemo(() => (d) => {
        return d.getHours() + ":" + (d.getMinutes() < 10 ? `0${d.getMinutes()}` : d.getMinutes());
    }, [])

    const clickNoti = (noti) => {

        axios.put(`/user/notification/read/${noti.id}`)
            .then(res => {
                const id = res.data
                setNotifications(prev => {
                    prev.forEach(n => {
                        if (n.id === id) {
                            n.isRead = true
                        }
                    })
                    return prev
                })
            }).catch(err => {
                console.log(JSON.stringify(err))
            })

        switch (noti.type) {
            case 'POST':
                navigation.navigate("Post Detail", { post: noti.post })
                break;

            case 'APPOINTMENT':
                navigation.navigate("Xem lịch khám")
                break;
            default:
                return
        }
    }

    return (
        <>
            <StatusBar />
            {/* <View className="flex-row items-center pt-12 pb-2 px-5 bg-white border border-gray-300 text-justify">
                <Text className="font-bold text-2xl text-center">Thông báo</Text>
            </View> */}
            <KeyboardAwareScrollView>
                <ScrollView pagingEnabled={true}>

                    {/* <View className="mt-2 mx-2 pt-2 bg-white rounded-xl w-fit max-w-s shadow-sm">
                        <Text style={styles.textColor} className="ml-2.5 mb-1 text-slate-900 text-lg font-bold">
                            Lịch uống thuốc
                        </Text>
                        {drugList}
                    </View>

                    <View className="m-2 pt-2 bg-white rounded-xl w-fit max-w-s shadow-sm">
                        <Text style={styles.textColor} className="ml-2.5 mb-1 text-slate-900 text-lg font-bold">
                            Lịch khám
                        </Text>
                        {checkNotiList}
                    </View> */}

                    {
                        notifications.length === 0 &&
                        <Text className="ml-2.5 mb-1 text-slate-900 text-center">Không có thông báo</Text>
                    }

                    {
                        notifications.map((noti, index) => {
                            
                            return (
                                <TouchableOpacity
                                    key={`noti-${index}-${noti.id}`}
                                    className="px-2 py-1 h-16 flex-row items-center text-center rounded-lg m-2"
                                    style={
                                        noti.isRead ? styles.read : styles.unRead
                                    }
                                    onPress={() => clickNoti(noti)}
                                >
                                    <View className="ml-2 border-gray-600 h-6 w-6 rounded-full items-center justify-center border">
                                        {/* <Image alt="Overdue" source={require("../../assets/home-icon/past.png")} className='object-scale-down h-6 w-6 rounded-full'/> */}
                                    </View>
                                    <View className="left-3 w-full flex-row">
                                        <Text className="w-2/3 h-fit my-auto text-left break-normal font-semibold justify-center">{noti.content}</Text>
                                        <View className="w-1/5 float-right mr-3">
                                            <Text className="text-right break-normal justify-center">{getTime(new Date(noti.time))}</Text>
                                            <Text className="text-right break-normal justify-center">{getDate(new Date(noti.time))}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )
                        })
                    }

                </ScrollView>
            </KeyboardAwareScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    textColor: {
        color: "#1AD1FF",
        fontWeight: "bold"
    },
    bgColor: {
        backgroundColor: "#1AD1FF",
        borderColor: "#1AD1FF"
    },

    unRead: {
        backgroundColor: "#ccc"
    },

    read: {
        backgroundColor: "#fff"
    }
});