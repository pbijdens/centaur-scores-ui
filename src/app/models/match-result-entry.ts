import { ScoreInfoEntry } from "./score-info-entry";

export interface MatchResultEntry {
    position: number;
    participantInfo: string;
    scoreInfo: ScoreInfoEntry[];
    score: number;
    perArrowAverage: number;
    prPerArrowAverage: number;
    prScore: number;
    prAverage: number;
    isPR: boolean;
    tiebreakerInfo: string;
}