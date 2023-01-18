import { City } from "../citys/city";
import { Country } from "../contrys/country";
import { State } from "../states/state";
import { EUsersSex } from "../users-sex/e-users-sex";

export interface User {
    id: number;
    name: string;
    birthDate: string;
    sex: EUsersSex;
    phone: string;
    email: string;
    password: string;
    // recupera o usuario
    username: string;
    role: string;
    city: City;
    state: State;
    country: Country;
}
