export function formatDateFromMillis(utcMillis: number): string {
    const date = new Date(utcMillis);

    const day = date.getUTCDate();
    const month = date.toLocaleString('default', {
        month: 'long',
        timeZone: 'UTC',
    });
    const year = date.getUTCFullYear();

    return `${month} ${day}${getDaySuffix(day)}, ${year}`;
}

export function getDaySuffix(day: number): string {
    if (day >= 11 && day <= 13) return 'th';

    switch (day % 10) {
        case 1:
            return 'st';
        case 2:
            return 'nd';
        case 3:
            return 'rd';
        default:
            return 'th';
    }
}
