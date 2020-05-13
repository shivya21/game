import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Games arena';
  complete_data: any;
  data: any;
  currentPage: number;
  totalPage: number;
  suggestions: string[] = [];
  typeahead: FormControl = new FormControl();
  searchTitle: any;
  pageData: any;
  constructor(private http: HttpClient) {
    this.getData();
  }
  getData() {
    this.http.get('http://starlord.hackerearth.com/gamesarena').subscribe((data: any) => {
      data.splice(0, 1);
      this.complete_data = JSON.parse(JSON.stringify(data));
      this.totalPage = this.complete_data.length / 12;
      this.setPage(1);
    });
  }
  setPage(page: number) {
    if (page < 1 || page > this.totalPage) {
      return;
    } else {
      this.currentPage = page;
      this.data = this.complete_data.slice((page - 1) * 12, (page) * 12);
    }
  }
  suggest() {
    if(this.typeahead.value === ""){
      this.suggestions = [];
      this.setPage(1);
      this.searchTitle = "";
    }
    else{
    this.suggestions = this.complete_data
      .filter(
        c => c.title.toLowerCase().startsWith(this.typeahead.value))
        .slice(0, 5);
      }
  }
  autocompleteSelected(title){
    if(title === ""){
      this.setPage(1);
      this.searchTitle = "";
    }
    else{
      this.setPage(1);
      this.suggestions = [];
      this.currentPage = 0;
      this.searchTitle = title;
      this.data = this.complete_data
      .filter(
        c => c.title.startsWith(title))
        .slice(0, 5);
      }
  }
  sort(type){
    if(type === 1){
      this.data = this.data.sort((a,b) => a.score - b.score);
    } else if (type === 2){
      this.data = this.data.sort((a,b) => b.score - a.score);
    } else {
      this.setPage(1);
    }
  }
  getStars (rating) {
    // Get the value
    var val = parseFloat(rating);
    // Turn value into number/100
    var size = val/10*100;
    return size + '%';
  }
}