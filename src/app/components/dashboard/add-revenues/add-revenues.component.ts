import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryRevenue } from 'src/app/interfaces/categoryRevenue';

@Component({
  selector: 'app-add-revenues',
  templateUrl: './add-revenues.component.html',
  styleUrls: ['./add-revenues.component.scss']
})
export class AddRevenuesComponent implements OnInit {

  form!: FormGroup;
  typeRevenue!: string;
  revenues!: Array<CategoryRevenue>
  maxDate!: string
  constructor(
    private fb: FormBuilder,
    @Inject(DOCUMENT) private document: any,
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.revenues = [
      { name: 'Investimento' },
      { name: 'Outros' },
      { name: 'Fimanciamentos' },
      { name: 'Férias' },
      { name: '13° Salário' },
      { name: 'PLR' },
    ];
    this.preventFutureDate();
  }

  initForm() {
    this.form = this.fb.group(
      {
        typeRevenue: [null, Validators.required],
        value: [null, Validators.required],
        dateEntry: [null, Validators.required],
        fixedRevenue: [null]
      }
    )
  }

  submit() {
    console.log(this.form);
    this.form.patchValue({ typeRevenue: this.typeRevenue });
    if(this.isValidForm()) {
      let typeRevenue
    }
  }

  preventFutureDate() {
    const inputDate = this.document.querySelector('#dateEntry')

    let date = new Date();

    let month: any = date.getMonth() + 1;
    let day: any = date.getDate();
    let year = date.getFullYear();

    if (month < 10) {
      month = '0' + month.toString()
    }

    if (day < 10) {
      day = '0' + day.toString();
    }

    let maxDate = year + '-' + month + '-' + day;

    inputDate.max = maxDate;
  }

  isValidForm() {
    return this.form.valid;
  }

}
