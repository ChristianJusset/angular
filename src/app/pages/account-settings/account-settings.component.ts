import { Component, OnInit } from '@angular/core';
import { SettingService } from 'src/app/services/setting.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [
  ]
})
export class AccountSettingsComponent implements OnInit {
  
  constructor(private settingsService: SettingService ) { 
  }

  ngOnInit(): void {
    this.settingsService.checkCurrentTheme();
  }
  changeTheme( theme: string ) {
        
    this.settingsService.changeTheme( theme );
  }
}
