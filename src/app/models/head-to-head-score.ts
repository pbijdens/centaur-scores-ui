import { HeadToHeadMatchStatus } from "./head-to-head-match-status";

export interface HeadToHeadScore {
    bracketNumber: number;
    participant1: HeadToHeadMatchStatus | undefined | null;
    participant2: HeadToHeadMatchStatus | undefined | null;
}

