import { MatchMetadataModel } from "./match-metadata-model";
import { ParticipantListMetadataModel } from "./participants-list-metadata-model";

export interface CompetitionModel {
    id: number;
    name: string;
    rulesetGroupName?: string;
    startDate?: string;
    endDate?: string;
    participantsList?: ParticipantListMetadataModel;
    matches?: MatchMetadataModel[];
}