import type {ContractType} from "$lib/models/contractType";

export type Advert = {
    id: number;
    title: string;
    shortDescription: string;
    company: string;
    location: string;
    salary: number;
    contractType: ContractType;
    date: Date;
    // description: string;
    sector: string;
}


