export interface ParticipantsListMember {
    id: number;
    name: string;
    group: string;
    subgroup: string;
    // calculated
    similarity: number;
}