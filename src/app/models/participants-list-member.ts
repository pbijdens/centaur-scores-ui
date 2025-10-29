import { PersonalBestListEntryModel } from "./personal-lest-list-entry-model";

export interface ParticipantsListMember {
    id: number;
    name: string;
    group: string;
    subgroup: string;
    isDeactivated: boolean;
    personalBests: PersonalBestListEntryModel[];
    // calculated
    similarity: number;
    label?: string;
    competitionFormatDisciplineDivisionMap: CompetitionFormatDisciplineDivisionMapModel[];
}

export interface CompetitionFormatDisciplineDivisionMapModel {
    competitionID: number;
    disciplineCode: string;
    divisionCode: string;
}