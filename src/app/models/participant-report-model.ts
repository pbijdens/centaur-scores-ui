export interface ParticipantCompetitionReportEntry {
  division: string;
  matchesPlayed: number;
  arrowsShot: number;
  arrowTotal: number;
  perArrowAverage: number;
}

export interface ParticipantReportEntry {
  memberId: number;
  name: string;
  competitions: Array<ParticipantCompetitionReportEntry | null>;
}

export interface ParticipantReport {
  discipline: string;
  participants: ParticipantReportEntry[];
  activeCompetitions: string[];
}