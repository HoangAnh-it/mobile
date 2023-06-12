export const extractDay = (d) => {
    return d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();
}

export const extractTime = (d) => {
    const h = d.getHours() < 10 ? `0${d.getHours()}` : d.getHours()
    const m = d.getMinutes() < 10 ? `0${d.getMinutes()}`: d.getMinutes()
    return h + ":" + m;
}

export const extractDate = (d) => {
    return extractDay(d) + " " + extractTime(d)
}

export const convertStringToDate = (date) => {
    const [y, m, d] = date.split("-").map(item => Number(item))
    const ans = new Date()
    ans.setFullYear(y)
    ans.setMonth(m - 1)
    ans.setDate(d)
    return ans;
}

export const dictionary = {
    PENDING: 'Đang chờ',
    ACCEPTED: 'Đã nhận',
    CANCELED: "Đã hủy",
    DONE: 'Đã xong',
    REJECTED: 'Từ chối',
    FACE_TO_FACE: 'Trực tiếp',
    AT_HOME: 'Xét nghiệm tại nhà',
    ALL: 'Tất cả'
}