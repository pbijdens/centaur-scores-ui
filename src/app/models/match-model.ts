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
    subGroups: Array<GroupInfo>;
    lijnen: Array<string>;

    lijnenAsString: string;
}