import { Country } from "../contrys/country";

export interface State {
    id: number;
    ddd: number;
    ibge: number;
    name: string;
    uf: string;
    countryId: Country;
}
