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
  /**
   * Value of Country input fields
   * @var string country
   */
  private country: string;

  /**
   * List of countryOptions for dropdown
   * @var object|null countryOptions
   */
  private countryOptions: object|null;

  /**
   * Error message
   * @var string errMsg
   */
  private errMsg;

  /**
   * Get value of Custom Form Control
   */
  public get value() {
    return this.country;
  }

  /**
   * Set value of Custom Form Control
   */
  public set value(newValue) {
    this.country = newValue;
    this.onChange(newValue);
  }
  
  /**
   * Constructor for M2bRestAutocompleteComponent
   */
  public constructor(private http: HttpClient) {}

  /**
   * From OnInit interface
   */
  public ngOnInit() {}

  private onChange: any = () => {};

  /**
   * From ControlValueAccessor interface
   */
  public writeValue(newValue) {
    if(newValue){
      this.value = newValue;
      //this.onChange(newValue);
    }
  }

  /**
   * Called on change in Country input field.
   * Updates Custom Form Control value and posts Http request to retreive
   * country names for autocomplete dropdown list.
   */
  private changed() {
    this.value = this.country;
    this.http.get("https://restcountries.eu/rest/v2/name/" + this.country + '?fields=name;code').subscribe((response) => {
      this.countryOptions = response;
    },
    (error: HttpErrorResponse) => {
      this.errMsg = "Request unsuccessfull";
    })
  }

  /**
   * From ControlValueAccessor interface
   */
  public registerOnChange(fn){
    this.onChange = fn;
  }

  /**
   * From ControlValueAccessor interface
   */
  public registerOnTouched() {}
}