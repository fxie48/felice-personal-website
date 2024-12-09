import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DiaryDataService} from '../shared/diary-data.service'
import {DiaryEntry} from '../shared/diary-entry.model'
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-diary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './diary.component.html',
  styleUrl: './diary.component.css'
})
export class DiaryComponent implements OnInit{
  diaryEntries: DiaryEntry[];
  diarySubscription = new Subscription()
  
  constructor(private diaryDataService: DiaryDataService, private router: Router) {}

  ngOnInit(): void {
    this.diarySubscription = this.diaryDataService.diarySubject.subscribe((diaryEntries: DiaryEntry[]) => {
      this.diaryEntries = diaryEntries;
    })
    this.diaryEntries = this.diaryDataService.diaryEntries
  }

  onDelete(index: number) {
    this.diaryDataService.onDelete(index);

  }

  onEdit(index: number) {
    this.router.navigate(["edit", index])
    
  }

  getDiaryEntry(index: number) {
    return {...this.diaryEntries[index]}
  }

}
