import type {ContractType} from "$lib/models/contractType";

export type Advertisements = {
    id: number;
    title: string;
    short_description: string;
    company: string;
    localization: string;
    salary: number;
    contract_type: string;
    date: Date;
    description: string;
    id_sector: number;
    working_time: number;
}
