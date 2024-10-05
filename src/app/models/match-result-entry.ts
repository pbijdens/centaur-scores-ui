import { ScoreInfoEntry } from "./score-info-entry";

export interface MatchResultEntry {
    position: number;
    participantInfo: string;
    scoreInfo: ScoreInfoEntry[];
    score: number;
    tiebreakerInfo: string;
}