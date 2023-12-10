export const formatDate = createdAt => {
    if (createdAt) {
        const createdAtDate = new Date(createdAt.seconds * 1000 + createdAt.nanoseconds / 1000000);
        const months = [
            'Januari',
            'Februari',
            'Maret',
            'April',
            'Mei',
            'Juni',
            'Juli',
            'Agustus',
            'September',
            'Oktober',
            'November',
            'Desember',
        ];
        const year = createdAtDate.getFullYear();
        const month = months[createdAtDate.getMonth()];
        const day = createdAtDate.getDate();
        return `${day} ${month} ${year}`;
    } else {
        return '';
    }
};