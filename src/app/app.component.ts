import { Component, OnInit } from '@angular/core';
import { RestApiService } from './services/rest-api.service';

const appConfig = require('../appConfig.json');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  operationSelector: number = 0;
  survey: any;
  tagList: any;
  surveys: any;
  languages: any;
  selectedLang: string = 'EN';
  numberOfSurveys: number;

  constructor(private restApiService: RestApiService) {}

  async ngOnInit() {

    this.languages = (await this.restApiService.makeRequest('GET', {}, 'api/Language'))[0];

    this.getLanguage();
    this.getSurveys();

  }

  async getSurveys() {

    this.surveys = (await this.restApiService.makeRequest('GET', {}, 'api/Survey'))[0];

    this.numberOfSurveys = this.surveys.length;

  }

  async getLanguage() {

    let apiTagList = this.languages.find(item => {return item.Code == this.selectedLang}).TagList;
    
    let appTagList = appConfig.Languages.find(item => {return item.Code == this.selectedLang}).TagList;
    
    this.tagList = {...apiTagList, ...appTagList};

  }

  openCreator() {

    this.operationSelector = 1;

  }

  openUpdater(survey) {

    this.survey = survey;
    
    this.operationSelector = 2;

  }

  openRemover(survey) {

    this.survey = survey;
    
    this.operationSelector = 3;

  }

  closeOperation() {

    this.operationSelector = 0;

  }

  onCreated(isSuccess: boolean) {

    if (isSuccess) {
      
      this.operationSelector = 0;
      this.getSurveys();
    
    }

  }

  onUpdated(isSuccess: boolean) {

    if (isSuccess) {
      
      this.operationSelector = 0;
      this.getSurveys();
    
    }

  }

  onRemoved(isSuccess: boolean) {

    if (isSuccess) {
      
      this.operationSelector = 0;
      this.getSurveys();
    
    }

  }

}
