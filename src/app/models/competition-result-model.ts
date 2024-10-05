import { CompetitionResultEntry } from "./competition-result-entry";
import { CompetitionResultHeader } from "./competition-result-header";
import { GroupInfo } from "./group-info";

export interface CompetitionResultModel {
    name: string;
    rulesetGroupName: string;
    groups: GroupInfo[];
    subgroups: GroupInfo[];
    matches: { [key: string]: CompetitionResultHeader };
    ungrouped: CompetitionResultEntry[];
    byClass: { [key: string]: CompetitionResultEntry[] };
    bySubclass: { [key: string]: { [key: string]: CompetitionResultEntry[] } };
}