import { StyleSheet } from "react-native";

export const StatusStyles = StyleSheet.create({

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

export const BackgroundColor = StyleSheet.create({
    primary: "#1AD1FF"
})