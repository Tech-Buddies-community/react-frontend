import dayjs from "dayjs";

export const formatDate = (dateString) => {
    if (!dateString) return "Invalid Date";

    const formattedDate = dayjs(dateString, ["DD/MM/YYYY", "YYYY-MM-DD"]).format("dddd, DD MMMM YYYY");

    return formattedDate !== "Invalid Date" ? formattedDate : "Invalid Date";
}

export const formatTime = (timeString) => {
    if (!timeString) return ""; // Cegah error jika null atau undefined

    const dateObj = new Date(`1970-01-01T${timeString}`);
    
    return dateObj.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    });
};
