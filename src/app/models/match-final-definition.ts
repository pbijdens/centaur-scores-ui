import { MatchResultEntry } from "./match-result-entry";

export class ResultListSelection {
  public name!: string;
  public participants!: MatchResultEntry[];
}

export class MatchFinalDefinitionClass {
    public name!: String;
    public isSetScored: boolean = false;
    public participants: MatchResultEntry[] = [];
    public allParticipants: MatchResultEntry[] = [];    
    public selectedList?: ResultListSelection;    
}

export class MatchFinalDefinition {
    public name!: string;
    public groups: MatchFinalDefinitionClass[] = [];
}