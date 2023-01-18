import { State } from "../states/state";

export interface City {
    id: number;
    ibge: number;
    name: string;
    stateId: State;
}
