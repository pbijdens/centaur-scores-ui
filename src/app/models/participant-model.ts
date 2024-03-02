import { EndModel } from "./end-model";

export interface ParticipantModel {
    id: number;
    lijn: string;
    name: string;
    group: string;
    subGroup: string;
    score: number;
    ends: Array<EndModel>;
}