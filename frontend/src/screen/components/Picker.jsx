import { Picker } from "@react-native-picker/picker";
import {
    Text,
  } from "react-native";
import React from "react";
  
export default function MyPicker({ role,setData, data }) {
    return (
        <>

            <Picker
                className=""
                selectedValue={data.type}
                onValueChange={(itemValue, itemIndex) => setData(prev => ({ ...prev, type: itemValue }))}
                style={{
                    width: "100%",
                }}
            >
                <Picker.Item label="Tất cả" value="ALL" />
                <Picker.Item label="Trực tiếp" value="FACE_TO_FACE" />
                <Picker.Item label="Xét nghiệm tại nhà" value="AT_HOME" />
            </Picker>

            <Text className="font-bold text-xl">Trạng thái:</Text>
            {
                role === 'HOSPITAL' &&
                <Picker
                    className=""
                    selectedValue={data.status}
                    onValueChange={(itemValue, itemIndex) => setData(prev => ({ ...prev, status: itemValue }))}
                    style={{
                        width: "100%",
                    }}
                >
                    <Picker.Item label="Tất cả" value="ALL" />
                    <Picker.Item label="Đang chờ" value="PENDING" />
                    <Picker.Item label="Đã nhận" value="ACCEPTED" />
                    <Picker.Item label="Đã xong" value="DONE" />
                    <Picker.Item label="Đã hủy" value="CANCELED" />
                    <Picker.Item label="Từ chối" value="REJECTED" />
                </Picker>
            }


            {
                role === 'DOCTOR' &&
                <Picker
                    className=""
                    selectedValue={data.status}
                    onValueChange={(itemValue, itemIndex) => setData(prev => ({ ...prev, status: itemValue }))}
                    style={{
                        width: "100%",
                    }}
                >
                    <Picker.Item label="Tất cả" value="ALL" />
                    <Picker.Item label="Đã nhận" value="ACCEPTED" />
                    <Picker.Item label="Đã xong" value="DONE" />
                    <Picker.Item label="Đã hủy" value="CANCELED" />
                </Picker>
            }
        </>
    )
}