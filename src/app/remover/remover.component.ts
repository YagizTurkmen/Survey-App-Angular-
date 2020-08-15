import { Component, OnInit, OnDestroy, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { RestApiService } from '../services/rest-api.service';

@Component({
  selector: 'app-remover',
  templateUrl: './remover.component.html',
  styleUrls: ['./remover.component.scss']
})
export class RemoverComponent implements OnInit {

  surveyName: string = '';
  warning: boolean = false;
  warningText: string = '';

  @Input('survey') survey: any;
  @Input('tagList') tagList: any;
  @Input('surveys') surveys: any;
  @Output() removed = new EventEmitter<boolean>();

  constructor(private restApiService: RestApiService) { }

  async ngOnInit() {

    

  }

  async ngOnChanges() {

    

  }

  async ngOnDestroy() {

  }

  async removeSurvey() {

    this.warning = false;

    if (this.surveyName != this.survey.Name) {

      this.warningText = this.tagList._WARN_WRONG_NAME;
      this.warning = true;

      return;

    } 

    let response = await this.restApiService.makeRequest('DELETE', {}, 'api/Survey/' + this.survey.ID);

    if (response[0].ID == this.survey.ID && response[0].Name == this.surveyName) { //BAŞARILI
      
      this.removed.emit(true);
      
    } 
    else {
      
      this.warningText = this.tagList._WARN_UNSUCCESS;
      this.warning = true;
    
    }

  }

}
