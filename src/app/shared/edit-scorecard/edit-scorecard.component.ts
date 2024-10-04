import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { ParticipantModel } from '../../models/participant-model';
import { ScoreButtonDefinition } from '../../models/score-button-definition';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CreatearrayPipe } from "../../createarray.pipe";
import { EndscorePipe } from "../../endscore.pipe";
import { EndsubtotalPipe } from "../../endsubtotal.pipe";

@Component({
  selector: 'app-edit-scorecard',
  standalone: true,
  imports: [CommonModule, FormsModule, CreatearrayPipe, EndscorePipe, EndsubtotalPipe],
  templateUrl: './edit-scorecard.component.html',
  styleUrl: './edit-scorecard.component.less'
})
export class EditScorecardComponent {
  @Input() participant!: ParticipantModel;
  @Input() keyboard!: ScoreButtonDefinition[];
  @Input() arrowsPerEnd!: number;

  public selectedEnd = -11;
  public selectedArrow = 0;

  constructor(private ref: ChangeDetectorRef) { }

  async setIndex(endIndex: number, arrowIndex: number): Promise<void> {
    this.selectedEnd = endIndex;
    this.selectedArrow = arrowIndex;
  }

  async pressKey(key: ScoreButtonDefinition): Promise<void> {
    const ends = this.participant.ends;
    ends[this.selectedEnd].arrows[this.selectedArrow] = key.value === undefined ? null : key.value;
    this.participant.ends = JSON.parse(JSON.stringify(ends));
    this.selectedArrow++;
    if (this.selectedArrow >= this.arrowsPerEnd) {
      this.selectedArrow = 0;
      this.selectedEnd = (this.selectedEnd + 1) % this.participant.ends.length;
    }
    this.ref.detectChanges();
  }

}
