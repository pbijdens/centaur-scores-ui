import { GroupInfo } from "./group-info";

export interface MatchModel {
    id: number;
    matchCode: string;
    matchName: string;
    numberOfEnds: number;
    arrowsPerEnd: number;
    autoProgressAfterEachArrow: boolean;
    isActiveMatch: boolean;
    scoreValues: any; 
    groups: Array<GroupInfo>;
    subgroups: Array<GroupInfo>;
    lijnen: Array<string>;
    targets: Array<GroupInfo>;

    lijnenAsString: string;
}