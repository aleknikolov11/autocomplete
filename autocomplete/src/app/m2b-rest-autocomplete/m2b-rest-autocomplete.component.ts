import { Component, OnInit, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-m2b-rest-autocomplete',
  templateUrl: './m2b-rest-autocomplete.component.html',
  styleUrls: ['./m2b-rest-autocomplete.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => M2bRestAutocompleteComponent),
    multi: true
  }]
})
export class M2bRestAutocompleteComponent implements ControlValueAccessor, OnInit {
  public country;
  public countryOptions;
  public errMsg;

  get value() {
    return this.country;
  }

  set value(newValue) {
    this.country = newValue;
    this.onChange(newValue);
  }
  
  constructor(private http: HttpClient) {}

  ngOnInit() {}

  onChange: any = () => {};

  writeValue(newValue) {
    if(newValue){
      this.value = newValue;
      //this.onChange(newValue);
    }
  }

  changed() {
    this.value = this.country;
    this.http.get("https://restcountries.eu/rest/v2/name/" + this.country + '?fields=name;code').subscribe((response) => {
      this.countryOptions = response;
    },
    (error: HttpErrorResponse) => {
      this.errMsg = "Request unsuccessfull";
    })
  }

  registerOnChange(fn){
    this.onChange = fn;
  }

  registerOnTouched() {}
}