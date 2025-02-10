export const formatDate = (dateString) => {
    if (!dateString) return "Invalid Date";

    const [day, month, year] = dateString.split('/').map(Number); // Pastikan jadi angka
    const dateObj = new Date(Date.UTC(year, month - 1, day)); // Gunakan UTC untuk kompatibilitas

    return dateObj.toLocaleDateString('en-US', {
        weekday: 'long',  // Contoh: "Monday"
        day: '2-digit',    // Contoh: "10"
        month: 'long',     // Contoh: "February"
        year: 'numeric'    // Contoh: "2024"
    });
};

export const formatTime = (timeString) => {
    if (!timeString) return ""; // Cegah error jika null atau undefined

    const dateObj = new Date(`1970-01-01T${timeString}`);
    
    return dateObj.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    });
};
