import { Component } from '@angular/core';
import { FormGroup, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { DiaryDataService } from '../shared/diary-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DiaryEntry } from '../shared/diary-entry.model';
import { setThrowInvalidWriteToSignalError } from '@angular/core/primitives/signals';

@Component({
  selector: 'app-diary-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './diary-form.component.html',
  styleUrl: './diary-form.component.css'
})
export class DiaryFormComponent {
  diaryForm: FormGroup;
  editMode = false;
  diaryEntry: DiaryEntry;
  paramId: number;

  constructor(private diaryDataService: DiaryDataService, private router: Router, private activatedRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (paramMap.has('id')) {
        this.editMode = true;
        this.paramId = +paramMap.get('id')!;
        this.diaryEntry = this.diaryDataService.getDiaryEntry(this.paramId);

      } else {
        this.editMode = false;
      }
    })

    this.diaryForm = new FormGroup({
      "date": new FormControl(this.editMode ? this.diaryEntry.date: null, [Validators.required]),
      "entry": new FormControl(this.editMode ? this.diaryEntry.entry: null, [Validators.required])
    })
  }

  onSubmit() {
    const newEntry = new DiaryEntry(this.diaryForm.value.date, this.diaryForm.value.entry);

    if (this.editMode) {
      this.diaryDataService.onEdit(this.paramId, newEntry)
    } else {
      this.diaryDataService.onAddNewDiaryEntry(newEntry);
    }
    this.router.navigateByUrl("");
  }
}
