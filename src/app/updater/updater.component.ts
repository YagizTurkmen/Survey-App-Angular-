import { Component, OnInit, OnDestroy, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { RestApiService } from '../services/rest-api.service';

@Component({
  selector: 'app-updater',
  templateUrl: './updater.component.html',
  styleUrls: ['./updater.component.scss']
})
export class UpdaterComponent implements OnInit {

  surveyName: string = '';
  warning: boolean = false;
  warningText: string = '';

  @Input('survey') survey: any;
  @Input('tagList') tagList: any;
  @Input('surveys') surveys: any;
  @Output() updated = new EventEmitter<boolean>();

  constructor(private restApiService: RestApiService) { }

  async ngOnInit() {

    this.surveyName = this.survey.Name;

  }

  async ngOnChanges() {

    this.surveyName = this.survey.Name;
  }

  async ngOnDestroy() {

  }

  async updateSurvey() {

    this.warning = false;

    if (this.surveyName.length < 3) {

      this.warningText = this.tagList._WARN_3_CHAR;
      this.warning = true;

      return;

    } else if (this.survey.Name == this.surveyName) {

      this.warningText = this.tagList._WARN_NO_CHANGE;
      this.warning = true;

      return;

    } else if (this.surveys.find(item => {return item.Name == this.surveyName})) {

      this.warningText = this.tagList._WARN_DUPLICATION;
      this.warning = true;

      return;

    }

    let response = await this.restApiService.makeRequest('PUT', {"ID": this.survey.ID, "Name": this.surveyName }, 'api/Survey/' + this.survey.ID);

    if (response[0].ID == this.survey.ID && response[0].Name == this.surveyName) //BAŞARILI
      this.updated.emit(true);
    else {
      
      this.warningText = this.tagList._WARN_UNSUCCESS;
      this.warning = true;
    
    }

  }

}
