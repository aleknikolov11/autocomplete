import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  /**
   * Form
   * @var FormGroup form
   */
  private form: FormGroup;

  /**
   * Data submitted by the form
   * @var object|null data
   */
  private data: object|null;
  
  /**
   * Constructor for AppComponent
   */
  public constructor(private formBuilder: FormBuilder, private http: HttpClient) { }

  /**
   * From OnInit Interface
   */
  private ngOnInit() {
    this.form = this.formBuilder.group({
      name: '',
      email: '',
      country: ''
    })
  }

  /**
   * Submit the form and retreive the Alpha3Code for the submitted country
   */
  private submit() {
    this.data = this.form.value;
    this.http.get("https://restcountries.eu/rest/v2/name/" + this.form.value['country'] + '?fields=alpha3Code').subscribe((response) => {
      this.data['country'] = response[0]['alpha3Code'];
    })
  }
}
