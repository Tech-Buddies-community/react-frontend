export const formatDate = (dateString) => {
    const [day, month, year] = dateString.split('/'); // Pecah format dd/mm/yyyy
    const dateObj = new Date(`${year}-${month}-${day}`); // Buat Date object

    return dateObj.toLocaleDateString('en-US', {
        weekday: 'long',  // Nama hari (Senin, Selasa, ...)
        day: '2-digit',    // Tanggal
        month: 'long',     // Nama bulan
        year: 'numeric'    // Tahun
    });
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
