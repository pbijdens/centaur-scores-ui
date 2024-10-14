import { ScoreInfoEntry } from "./score-info-entry";


export interface CompetitionRulesetResultEntry {
    scores: ScoreInfoEntry[];
    totalScore: number;
    perArrowAverage: number;
}
