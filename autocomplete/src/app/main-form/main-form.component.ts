import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-main-form',
  templateUrl: './main-form.component.html',
  styleUrls: ['./main-form.component.css']
})
export class MainFormComponent implements OnInit {
  public form: FormGroup;
  public data;
  public code;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: '',
      email: '',
      country: ''
    })
  }

  submit() {
    this.data = this.form.value;
    this.http.get("https://restcountries.eu/rest/v2/name/" + this.form.value['country'] + '?fields=alpha3Code').subscribe((response) => {
      this.data['country'] = response[0]['alpha3Code'];
    })
  }

}