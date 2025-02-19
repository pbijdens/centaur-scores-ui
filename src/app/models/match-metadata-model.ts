export interface MatchMetadataModel {
    id: number;
    matchCode: string;
    matchFlags: number;
    activeRound: number;
    numberOfRounds: number;
    matchName: string;
    rulesetCode: string;
    isActive: boolean;
}