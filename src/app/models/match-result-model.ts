import { GroupInfo } from "./group-info";
import { HeadToHeadScore } from "./head-to-head-score";
import { MatchResultEntry } from "./match-result-entry";

export interface MatchResultModel {
    groups: GroupInfo[];
    subgroups: GroupInfo[];
    ungrouped: MatchResultEntry[];
    byClass: { [key: string]: MatchResultEntry[] };
    bySubclass: { [key: string]: { [key: string]: MatchResultEntry[] } };
    finalScores: { [key: string]: { [key: number]: HeadToHeadScore[] } };
}