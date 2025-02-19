import { ParticipantData } from "./participant-data";

export interface HeadToHeadMatchStatus {
    participant: ParticipantData;
    endScores: number[];
    score: number;
    isWinner: boolean;
}
