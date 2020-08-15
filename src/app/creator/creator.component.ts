import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { RestApiService } from '../services/rest-api.service';

@Component({
  selector: 'app-creator',
  templateUrl: './creator.component.html',
  styleUrls: ['./creator.component.scss']
})
export class CreatorComponent implements OnInit {

  surveyName: string = '';
  warning: boolean = false;
  warningText: string = '';

  @Input('survey') survey: any;
  @Input('tagList') tagList: any;
  @Input('surveys') surveys: any;
  @Output() created = new EventEmitter<boolean>();

  constructor(private restApiService: RestApiService) { }

  async ngOnInit() {

  }

  async ngOnDestroy() {



  }

  async createSurvey() {

    this.warning = false;

    if (this.surveyName.length < 3) {

      this.warningText = this.tagList._WARN_3_CHAR;
      this.warning = true;

      return;

    } else if (this.surveys.find(item => {return item.Name == this.surveyName})) {

      this.warningText = this.tagList._WARN_DUPLICATION;
      this.warning = true;

      return;

    }

    let response = await this.restApiService.makeRequest('POST', { "Name": this.surveyName }, 'api/Survey');

    if (response[0].ID > 0) {

      this.created.emit(true);

    } else {

      this.warningText = this.tagList._WARN_UNSUCCESS;
      this.warning = true;

    }

  }

}
