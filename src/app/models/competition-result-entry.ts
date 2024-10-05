import { CompetitionRulesetResultEntry } from "./competition-ruleset-result-entry";

export interface CompetitionResultEntry{
    participantInfo: string;
    position: number;
    totalScore: number;
    perRuleset: { [key: string]: CompetitionRulesetResultEntry };
}