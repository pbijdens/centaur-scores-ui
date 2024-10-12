import { GroupInfo } from "./group-info";

export interface RulesetModel {
    groupName: string;
    code: string;
    name: string;
    requiredEnds: number;
    requiredArrowsPerEnd: number;
    requiredClasses: GroupInfo[];
    requiredSubclasses: GroupInfo[];
    requiredTargets: GroupInfo[];
    requiredScoreValues: {}; // Dictionary<string, ScoreButtonDefinition[]>
    competitionFormat: string;
}