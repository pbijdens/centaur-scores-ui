import { EndModel } from "./end-model";

export interface ParticipantModel {
    id: number;
    lijn: string;
    name: string;
    group: string;
    subgroup: string;
    target: string;
    score: number;
    ends: Array<EndModel>;
    deviceID: string;
    participantListEntryId?: number;

    // V2 only
    groupName?: string;
    subgroupName?: string;
    targetName?: string;    
}