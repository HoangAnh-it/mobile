import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import React from "react";
import useAxios from "../../hooks/useAxios";
import useConfirmModal from "../../hooks/useConfirmModal";
import { extractDate } from "../../helpers/helpers";
import { extractDay } from "../../helpers/helpers";
const hours = [
    { hour: "07:00" },
    { hour: "07:30" },
    { hour: "08:00" },
    { hour: "08:30" },
    { hour: "09:00" },
    { hour: "09:30" },
    { hour: "10:00" },
    { hour: "11:30" },
    { hour: "14:00" },
    { hour: "14:30" },
    { hour: "15:00" },
    { hour: "15:30" },
    { hour: "16:00" },
    { hour: "16:30" },
]

const daysInWeek = {
    0 : "Chủ nhật",
    1 : "Thứ 2",
    2 : "Thứ 3",
    3 : "Thứ 4",
    4 : "Thứ 5",
    5 : "Thứ 6",
    6 : "Thứ 7"
};

const DateBox = (props) => {
    return (
        <TouchableOpacity
            className="items-center bg-slate-100 w-1/4 rounded-md p-2 m-2 border border-gray-200"
            onPress={() => { props.setSelectedDate(props.date) }}
            style={(props.selectedDate != null && props.selectedDate == props.date) ? styles.focus : null}
        >
            <Text className="font-bold" style={(props.selectedDate != null && props.selectedDate == props.date) ? styles.textColor : null}>{props.day}</Text>
            <Text style={(props.selectedDate != null && props.selectedDate == props.date) ? styles.textColor : null}>{props.shortDate}</Text>
        </TouchableOpacity>
    )
}

const HourBox = (props) => {
    if (props.available) {
        return (
            <TouchableOpacity
                className="items-center bg-slate-100 w-1/5 rounded-md p-2 m-2 border border-gray-200"
                onPress={() => { props.setSelectedHour(props.hour) }}
                style={(props.selectedHour != null && props.selectedHour == props.hour) ? styles.focus : null}
            >
                <Text style={(props.selectedHour != null && props.selectedHour == props.hour) ? styles.textColor : null}>{props.hour}</Text>
            </TouchableOpacity>
        )
    }
    return (
        <View
            className="items-center bg-gray-300 w-1/5 rounded-md p-2 m-2 border border-gray-300"
        >
            <Text>{props.hour}</Text>
        </View>
    )
}

export default function Book({ navigation, route }) {
    const { profile, hospital, department } = route.params;

    const [selectedDate, setSelectedDate] = React.useState(null);
    const [selectedHour, setSelectedHour] = React.useState(null);
    const [busyTime, setBusyTime] = React.useState([])
    const [loading, setLoading] = React.useState(false);
    const { setTitle, setIsAlert, setVisible } = useConfirmModal()

    const axios = useAxios()

    const listDates = React.useMemo(() => () => {
        const dates = [];
        let date = new Date();
        for (let i = 0; i < 7; i++) {
            dates.push({
                date: date.toDateString(),
                day: daysInWeek[date.getDay()],
                shortDate: date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear(),
            })
            date.setDate(date.getDate() + 1);
        }
        dates[0].day = "Hôm nay";
        return dates
    }, [Date.now().toString()])

    const chooseNext = () => {
        navigation.navigate("Xác nhận", {
            profile: profile,
            hospital: hospital,
            department: department,
            date: extractDay(new Date(selectedDate)),
            hour: selectedHour
        })
    }

    React.useEffect(() => {
        if (!selectedDate) return;
        setLoading(true)
        axios.get(`/patient/busy_time?day=${selectedDate}`)
            .then(res => {
                if (res.status === 200) {
                    setBusyTime(res.data.data)
                    setTimeout(() => {
                        setLoading(false)
                    }, 300)
                    setSelectedHour(null)
                }
            }).catch(err => {
                console.log(JSON.stringify(err))
                setTitle("Lỗi")
                setIsAlert(true)
                setVisible(true)
                setTimeout(() => {
                    setLoading(false)
                }, 300)
            })
    }, [selectedDate])

    return (
        <View className="flexHourBox-1">
            <View className="bg-white mt-3">
                <Text className="text-lg font-bold ml-8 mt-2">Ngày khám</Text>
                <View className="flex flex-row flex-wrap items-center justify-center w-screen overflow-hidden my-2">
                    {
                        listDates().map((d, index) =>
                            <DateBox
                                key={`${d.date}-${index}`}
                                date={d.date}
                                day={d.day}
                                shortDate={d.shortDate}
                                selectedDate={selectedDate}
                                setSelectedDate={setSelectedDate}
                            />)
                    }
                </View>
            </View>
            {selectedDate &&
                <View className="bg-white mt-3">
                    <Text className="text-lg font-bold ml-8 mt-2">Giờ khám</Text>
                    <View className="flex flex-row flex-wrap items-center justify-center w-screen overflow-hidden my-2">
                        {
                            loading &&
                            <View className="flex-1 items-center justify-center" >
                                <ActivityIndicator size="large" />
                            </View>
                        }
                        {
                            !loading && hours.map((h, index) =>
                                <HourBox
                                    key={`${h.hour}-${index}`}
                                    hour={h.hour}
                                    available={!busyTime.includes(h.hour)}
                                    selectedHour={selectedHour}
                                    setSelectedHour={setSelectedHour}
                                />)
                        }
                    </View>
                </View>
            }
            {
                (selectedDate && selectedHour) &&
                <TouchableOpacity
                    className="m-auto w-1/3 p-2 mt-4 mb-8 rounded" style={{ backgroundColor: "#1ad1ff" }}
                    onPress={chooseNext}
                >
                    <Text className="text-white font-bold text-center">Tiếp theo</Text>
                </TouchableOpacity>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    textColor: {
        color: "white",
    },
    focus: {
        backgroundColor: "#1ad1ff",
        borderColor: "#1ad1ff",
        borderTopColor: "#1ad1ff",
        borderBottomColor: "#1ad1ff"
    },

});