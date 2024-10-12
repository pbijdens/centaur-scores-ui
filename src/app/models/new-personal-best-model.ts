import { CompetitionModel } from "./competition-model";
import { MatchModel } from "./match-model";
import { ParticipantsListMember } from "./participants-list-member";

export interface NewPersonalBestModel {
    id: number;
    listId: number;
    competition: CompetitionModel;
    match: MatchModel;
    participant: ParticipantsListMember;
    score: number;
    notes: string;
    achieved: string;
    discipline: string;
    previousScore: number;
}