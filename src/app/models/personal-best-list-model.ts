import { PersonalBestListEntryModel } from "./personal-lest-list-entry-model";

export interface PersonalBestListModel {
    id: number;
    name: string;
    competitionFormat: string;
    entries: PersonalBestListEntryModel[];
    entriesByDiscipline: { [key: string]: PersonalBestListEntryModel[] };
}