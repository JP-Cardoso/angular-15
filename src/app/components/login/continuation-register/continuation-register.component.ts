import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { RegisterUser } from 'src/app/interfaces/registerUser';
import { ApiService } from 'src/app/services/api.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { UtilsService } from 'src/app/services/toast/utils.service';
import { FormValidatios } from 'src/app/shared/validators/form-validators';

@Component({
  selector: 'app-continuation-register',
  templateUrl: './continuation-register.component.html',
  styleUrls: ['./continuation-register.component.scss']
})
export class ContinuationRegisterComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  preview!: any;
  isDefault: boolean = true;
  isDefaultImage: string = "../../../assets/img-profile/default.png"
  unsub$: Subject<boolean> = new Subject();

  constructor(
    //Assim que o component for inicializado, os dados do login será passado para cá
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private localStorageService: LocalstorageService,
    private utilsService: UtilsService,
  ) { }

  ngOnInit(): void {
    this.initForms();
  }

  initForms() {
    this.form = this.formBuilder.group({
      name: [this.data.data?.name, Validators.required],
      email: [this.data.data?.email, [Validators.email, Validators.required]],
      age: [this.data.data?.age, Validators.required],
      avatar: [null, Validators.required],
      password: [null, Validators.required],
      confirmPassword: [null, [Validators.required, FormValidatios.equalsTo('password')]],
    })
  }

  onChange(event: any) {
    console.log(event);

    if (event.target.files && event.target.files.length > 0) {
      this.isDefault = false;
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = (e) => {
        this.preview = reader.result;
      };

      reader.readAsDataURL(file)
      this.form.patchValue(
        { avatar: file }
      );
    }
  }

  createFormPayload() {
    const paylaod = this.form.value;
    console.log(paylaod);

    return paylaod;
  }

  submit() {
    const isTrue = this.isValidForm();
    if (isTrue) {
      this.apiService.registerUser(this.createFormPayload())
        .pipe(
          takeUntil(this.unsub$)
        )
        .subscribe((res: RegisterUser) => {
          console.log(res);
          this.utilsService.showSuccess(res.message);
          this.localStorageService.setLocalStorage('userInfo', JSON.stringify(res.user))
          this.refreshPage()
        })
    }
  }

  isValidForm(): boolean {
    return this.form.valid;
  }

  refreshPage() {
    setTimeout(() => {
      location.reload()
    }, 3000)
  }

  ngOnDestroy(): void {
    this.unsub$.next(true);
    this.unsub$.complete();
  }
}
