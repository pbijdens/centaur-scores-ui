import { GroupInfo } from "./group-info";
import { ScoreButtonDefinition } from "./score-button-definition";

export interface ParticipantListConfigurationModel {
    disciplines: DisciplineModel[];
    divisions: DivisionModel[];
    targets: TargetModel[];
    competitionFormats: string[];
}

export interface DisciplineModel extends GroupInfo {
}

export interface DivisionModel extends GroupInfo {
}

export interface TargetModel extends GroupInfo {
    keyboard: ScoreButtonDefinition[];
}
