import type {ContractType} from "$lib/models/contractType";

export type FullAdvert = {
    id: number;
    title: string;
    shortDescription: string;
    description: string;
    company: string;
    location: string;
    salary: number;
    contractType: ContractType;
    date: Date;
    sector: string;
}