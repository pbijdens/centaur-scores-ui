export interface RulesetParametersModel {
    ScoringMatches: string; // number of scoring matches out of the total, when more available discard lowest scores, per match type
    Scoring: string; // F1 or default: F1 being 12, 10, 8, 7, ... 1* awarded for the highes score (overall / per discipline / per class)
}