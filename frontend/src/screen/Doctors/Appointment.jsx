import React from "react";
import { View, Text, StyleSheet } from "react-native";
import useAxios from "../../hooks/useAxios";
import { extractDate } from "../../helpers/helpers";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { dictionary } from "../../helpers/helpers";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";

const data = {
  name: "Vũ Hoàng Anh",
  sex: "Nam",
  dateOfBirth: "04-04-2002",
  date: extractDate(new Date()),
  type: "Gói xét nghiệm tại nhà",
  phone: "0123456789",
  address: "123, Xuân Thủy",
  status: "ACCEPTED",
};

const toAppointment = (data) => {
  return {};
};

export default function Appointments() {
  const [appointments, setAppointments] = React.useState([]);
  const axios = useAxios();
  const [search, setSearch] = React.useState({
    inputSearch: "",
    isSearch: false,
  });
  const [filter, setFilter] = React.useState({
    status: 'ALL',
    type: 'ALL'
  });
  const [showFilterForm, setShowFilterForm] = React.useState(false)

  const searchChange = (val) => {
    if (val.length != 0) {
      setSearch({
        inputSearch: val,
        isSearch: true,
      });
    } else {
      setSearch({
        inputSearch: val,
        isSearch: false,
      });
    }
  };

  const searchInfo = () => {
  }
  
  const filterSearch = (data) => {
    if(!search.inputSearch.trim()) return data
    return data.filter(d => d.fullname.toLowerCase().includes(search.inputSearch.toLowerCase().trim())
    )
  };
  
  const notification = () => {
    navigation.navigate("Thông báo");
  };

  const temporaryFilter = (data, _filter) => {
    if (_filter.status === 'ALL' && _filter.type === 'ALL') return data
    return data.filter(d => {
      return (_filter.status !== 'ALL' && _filter.status === d.status) || (_filter.type !== 'ALL' && d.type === _filter.type);
    })
  }

  React.useEffect(() => {
    fetch()
  }, [filter])

  React.useEffect(() => {
    axios
      .get("/doctor/appointment")
      .then((res) => {
        if (res.status === 200) {
        }
      })
      .catch((err) => {
        console.log(JSON.stringify(err));
      });
  }, []);

  return (
    <View className="">
      {/** Filter */}
      <View className="flex flex-row p-2 bg-gray-100 shadow-lg z-40">
        <View className="px-1 fixed flex flex-row justify-items-end">
          <TouchableOpacity
            className="px-1 flex flex-row justify-items-center items-center py-2 mx-1 border-transparent bg-gray-300 rounded-lg"
            style={{
              borderWidth: 1,
              borderBottomColor: "#ccc",
            }}
            onPress={() => setShowFilterForm(true)}
          >
            <Ionicons name="settings-outline" size={20} color={"gray"} />
            <Text className="font-bold mx-1 text-sm">Tùy chọn:</Text>
          </TouchableOpacity>
        </View>

        <View className="flex flex-row items-center justify-items-center text-sm">
          <Text className="ml-2.5">{dictionary[filter.type]}</Text>
          <Text className="ml-2.5"> --- </Text>
          <Text className="ml-2.5">{dictionary[filter.status]}</Text>
          <Text className="ml-2.5"> --- </Text>
          <Text className="ml-2.5">
            {filterSearch(temporaryFilter(appointments, filter)).length} hồ sơ
          </Text>
        </View>
      </View>

        <ScrollView className="m-4 mt-0">
        <Text className="mt-2 font-light text-right underline text-gray-700">
            Ấn để xem chi tiết
        </Text>
        {}
            <AppointmentItem data={data} />
            <AppointmentItem data={data} />
            <AppointmentItem data={data} />
            <AppointmentItem data={data} />
        </ScrollView>
    </View>
  );
}

const AppointmentItem = ({ data }) => {
  return (
    <TouchableOpacity>
      <View className="p-4 my-1 bg-white rounded-md shadow-sm">
        <Text className="font-semibold text-lg mb-3">
          Bệnh nhân: <Text className="text-xl">{data.name}</Text>
        </Text>
        <View className="flex-row py-1 border-b border-gray-200">
          <Text>Loại</Text>
          <Text className="right-0 bottom-1 absolute">{data.type}</Text>
        </View>
        <View className="flex-row py-1 border-b border-gray-200">
          <Text>Số điện thoại</Text>
          <Text className="right-0 bottom-1 absolute">{data.phone}</Text>
        </View>
        <View className="flex-row py-1 border-b border-gray-200">
          <Text>Giới tính</Text>
          <Text className="right-0 bottom-1 absolute">{data.sex}</Text>
        </View>
        <View className="flex-row py-1 border-b border-gray-200">
          <Text>Ngày sinh</Text>
          <Text className="right-0 bottom-1 absolute">{data.dateOfBirth}</Text>
        </View>
        {data.type === "Gói xét nghiệm tại nhà" && (
          <View className="flex-row py-1 border-b border-gray-200">
            <Text>Địa chỉ</Text>
            <Text className="right-0 top-1 absolute w-2/3 text-right">
              {data.address}
            </Text>
          </View>
        )}
        <View className="flex-row py-1">
          <Text>Thời gian khám</Text>
          <Text className="right-0 bottom-1 absolute">{data.date}</Text>
        </View>
        <View
          className="p-2 rounded-md right-4 top-4 absolute items-center"
          style={styles.status[data.status]}
        >
          <Text className="font-bold text-gray-700 w-fit text-right text-decoration-line: underline">
            {dictionary[data.status]}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  status: {
    PENDING: {
      backgroundColor: "#FFF192",
    },

    ACCEPTED: {
      backgroundColor: "#99ddff",
    },

    DONE: {
      backgroundColor: "#99ff99",
    },

    CANCELED: {
      backgroundColor: "#ffcc66",
    },

    REJECTED: {
      backgroundColor: "#ff8080",
    },
  },
});
