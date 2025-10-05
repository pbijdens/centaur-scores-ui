import { ParticipantListConfigurationModel } from "./participant-list-configuration-model";

export interface ParticipantListMetadataModel
{
    id: number;
    name: string;
    configuration?: ParticipantListConfigurationModel;
}