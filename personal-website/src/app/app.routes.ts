import { Routes } from '@angular/router';
import { DiaryComponent } from './diary/diary.component';
import { DiaryFormComponent } from './diary-form/diary-form.component';

export const routes: Routes = [
    {path: "", component: DiaryComponent},
    {path: "data-entry", component: DiaryFormComponent},
    {path: "edit/:id", component: DiaryFormComponent}
];
