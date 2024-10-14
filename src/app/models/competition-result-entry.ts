import { CompetitionRulesetResultEntry } from "./competition-ruleset-result-entry";

export interface CompetitionResultEntry{
    participantInfo: string;
    position: number;
    totalScore: number;
    perArrowAverage: number;
    perRuleset: { [key: string]: CompetitionRulesetResultEntry };
}