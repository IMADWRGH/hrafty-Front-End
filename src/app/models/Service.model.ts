export interface Service {
    id: number;
    name: string;
    description: string;
    image: string;
    price: never;
    type: string;
    status: bigint;
}