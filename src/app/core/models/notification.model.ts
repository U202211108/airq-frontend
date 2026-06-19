export interface NotificationItem {

    title: string;

    message: string;

    severity:
    'HIGH' |
    'MEDIUM';

    sensorId: number;

    sensorSerialNumber: string;

    location: string;

    date: string;

    isRead: boolean;

}