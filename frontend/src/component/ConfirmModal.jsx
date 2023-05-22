import { View, Text, Modal, Pressable } from "react-native";
import React from 'react';

export default function ConfirmModal({
    title,
    action,
    modalVisible,
    off,
    isAlert,
    children
}) {

    return (
        <>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}>
                <View className="w-screen h-screen items-center justify-center">
                    <View className="w-screen h-screen bg-black opacity-25 absolute">
                    </View>
                    <View className="bg-white items-center justify-center w-2/3 p-4 rounded-md shadow-sm">
                        <Text className="font-bold text-lg text-center">{title}</Text>
                        <View className="flex-row justify-items-center">
                            {
                                !isAlert ?
                                    <>
                                        <Pressable
                                            className="mt-4 p-2 rounded mx-2"
                                            style={{ backgroundColor: "#1AD1FF" }}
                                            onPress={action}>
                                            <Text className="text-white font-bold">Xác nhận</Text>
                                        </Pressable>
                                        <Pressable
                                            className="mt-4 p-2 rounded  mx-2"
                                            style={{ backgroundColor: "#ccc" }}
                                            onPress={off}>
                                            <Text className="text-white font-bold">Hủy</Text>
                                        </Pressable>
                                    </>
                                    :
                                    <Pressable
                                        className="mt-4 p-2 rounded"
                                        style={{ backgroundColor: "#1AD1FF" }}
                                        onPress={off}>
                                        <Text className="text-white font-bold">Đã hiểu</Text>
                                    </Pressable>
                            }
                        </View>
                    </View>
                </View>
            </Modal>
            {children}
        </>
    )
}