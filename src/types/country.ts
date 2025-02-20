export type PopulationInfo = {
    year: number;
    value: number;
};

export type Country = {
    country: string;
    code: string;
    iso3: string;
    populationCounts: PopulationInfo[];
};
