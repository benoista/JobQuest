export type JobAdvert = {
    title: string;
    smallDescription: string;
    company: string;
};

type JobAdvertExpanded = {
    title: string;
    smallDescription: string;
    company: string;
    salary: number;
    location: string;
    contractType: string;
    jobDescription: string;
}