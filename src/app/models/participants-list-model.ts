import { ParticipantListConfigurationModel } from "./participant-list-configuration-model";

export interface ParticipantsListModel {
    id: number;
    name: string;
    isInactive: boolean;
    configuration?: ParticipantListConfigurationModel;
}