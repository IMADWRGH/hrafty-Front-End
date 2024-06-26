import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserStorageService } from './shared/services/storage/user-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'hrafty';
}
