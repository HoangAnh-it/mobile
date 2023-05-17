import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  StyleSheet,
  Image,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import useAxios from "../../hooks/useAxios";

export default function Home({ navigation }) {
  const [search, setSearch] = React.useState({
    inputSearch: null,
    isSearch: false,
  });
  const [hospitalList, setHospitalList] = React.useState([]);
  const axios = useAxios();

  const Item = (props) => {
    return (
      <TouchableOpacity
        className="bg-white mx-5 mb-5 h-1/5 flex-row items-center rounded-lg"
        style={styles.item}
        onPress={props.onPress}
      >
        <View className="ml-2 bg-cyan-100 h-3/4 aspect-square rounded-full items-center justify-center">
          <Image source={props.image} className="object-scale-down h-10 w-10" />
        </View>
        <Text className="ml-3 font-semibold text-lg">{props.title}</Text>
        <View className="right-3 absolute">
          <Ionicons name="caret-forward" size={24} color="#24DCE2" />
        </View>
      </TouchableOpacity>
    );
  };

    React.useEffect(() => {
        axios.get("/search-hospital/ ")
            .then(res => res.data.data.hospitals)
          .then(hs => {
                setHospitalList(hs.map(i => ({
                    id: i.hospitalId,
                    name: i.name,
                    address: i.address,
                    imageURL: i.avatar || "https://insmart.com.vn/wp-content/uploads/2021/05/BV-108-2.jpg"
                })))
            })
            .catch(err => {
                console.log(JSON.stringify(err))
            })
    }, [])
   
  const InfoHospital = (props) => {
        return (
            <View className="bg-white rounded-xl w-40 h-full mr-4">
                <Image
                    src={props.imageURL}
                    className="object-scale-down w-40 h-28 rounded-t-xl overflow-hidden"
                />
                <View className="px-2 py-1 space-y-1">
                    <Text className="font-semibold h-9" numberOfLines={2}>{props.name}</Text>
                    <Text className="text-gray-500 text-xs h-16" numberOfLines={3}>{props.address}</Text>
                    <TouchableOpacity className="rounded-full" style={{ backgroundColor: "#24DCE2" }}
                        onPress={() => { navigation.navigate("Hồ sơ", { hospital: props }) }}
                    >
                        <Text className="font-semibold text-base text-center text-white p-1">Đặt khám</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    
const items = [
    {
      title: "Xét nghiệm tại nhà",
      image: require("./../../assets/home-icon/blood-test.png"),
      onPress: () => {
        navigation.navigate("Xét nghiệm tại nhà");
      },
    },
    {
      title: "Xem lịch khám",
      image: require("./../../assets/home-icon/calendar.png"),
      onPress: () => {
        navigation.navigate("Xem lịch khám");
      },
    },
    {
      title: "Danh sách bác sĩ",
      image: require("./../../assets/home-icon/shortlist.png"),
      onPress: () => {
        navigation.navigate("Danh sách bác sĩ");
      },
    },
  ];

  const itemList = [];
  items.forEach((item) => {
    itemList.push(
      <Item
        key={item.title}
        title={item.title}
        image={item.image}
        onPress={item.onPress}
      />
    );
  });

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
    navigation.navigate("Tìm kiếm", { search });
  };

  const notification = () => {
    navigation.navigate("Thông báo");
  };

  React.useEffect(() => {
    if (!search.inputSearch?.trim()) {
      return;
    }
    setSearch({
      inputSearch: "",
      isSearch: false,
    });
  }, []);

  return (
    <>
      <StatusBar />
      <View className="flex-row pt-10 pb-2 px-5 space-x-2 bg-white">
        <View className="bg-gray-200 rounded-full px-3 py-2 w-11/12 flex-row items-center">
          {search.isSearch ? (
            <Ionicons name="search" size={20} color="black" />
          ) : (
            <Ionicons name="search" size={20} color="gray" />
          )}

                <TextInput
                    className="pl-2" placeholder='Nhập tên bác sĩ/bệnh viện'
                    onChangeText={(val) => searchChange(val)}
                    onEndEditing={() => searchInfo(search)}
                />
            </View>
            <TouchableOpacity
                className="w-1/12 justify-center items-center"
                onPress={() => notification()}>
                <Ionicons name="notifications-outline" size={28} />
            </TouchableOpacity>
        </View>
        <ScrollView
            horizontal={false}
            showsVerticalScrollIndicator={true}
        >
            <LinearGradient
                colors={['#ffffff', 'rgba(36, 220, 226, 0.5)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                className="w-100 min-h-screen"
            >
                <Text className="font-bold mx-5 text-xl" >Đặt khám</Text>
                <ScrollView
                    className="flex-1 m-5 mt-3 h-fit"
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                >
                    {
                        hospitalList.map((h, index) => {
                            return <InfoHospital key={`hospital-home-${h.id}-${index}`} id={h.id} name={h.name} address={h.address} imageURL={h.imageURL} />
                        })
                    }
                </ScrollView>
                <View className="h-3/5">
                    {itemList}
                </View>

            </LinearGradient>
        </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  item: {
    minHeight: 96,
  },
});
