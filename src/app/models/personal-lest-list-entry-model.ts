import { ParticipantsListMember } from "./participants-list-member";

export interface PersonalBestListEntryModel {
    id: number;
    participant: ParticipantsListMember;
    score: number;
    achieved: string;
    notes: string;
    discipline: string;
}