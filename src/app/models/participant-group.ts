import { GroupInfo } from "./group-info";
import { ParticipantModel } from "./participant-model";

export class ParticipantGroup {
    public participants: Array<ParticipantModel> = [];

    constructor(public key: String, public group: GroupInfo) {}
}