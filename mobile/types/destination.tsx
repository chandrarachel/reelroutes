export interface Destination {
    id: string;
    name: string;
    location: string;
    image: string;
    description: string;
    hour: string;
    category: string;
    latitude: number;
    longitude: number;
    visited?: boolean;
}