export const formatDate = (dateString) => {
    if (!dateString || !/\d{2}\/\d{2}\/\d{4}/.test(dateString)) return "Invalid Date";

    const [day, month, year] = dateString.split('/').map(Number); // Convert ke angka
    const dateObj = new Date(year, month - 1, day); // Gunakan cara yang benar

    return dateObj.toLocaleDateString('en-US', {
        weekday: 'long',  // Nama hari
        day: '2-digit',    // Tanggal
        month: 'long',     // Nama bulan
        year: 'numeric'    // Tahun
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
