import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ContinuationRegisterComponent } from 'src/app/components/login/continuation-register/continuation-register.component';
import { LognUser } from 'src/app/interfaces/userLogin';
import { ApiService } from 'src/app/services/api.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { UtilsService } from 'src/app/services/toast/utils.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  formRegister!: FormGroup;
  formLogin!: FormGroup;
  unsub$: Subject<boolean> = new Subject<boolean>()

  constructor(
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private apiService: ApiService,
    private localStorageService: LocalstorageService,
    private utilService: UtilsService,
    private router: Router
  ) {

  }

  ngOnInit() {
    this.initForms();
  }

  initForms() {
    this.formRegister = this.formBuilder.group({
      name: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      age: [null, Validators.required]
    });

    this.formLogin = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
    })
  }


  createPayload() {
    const payload = this.formLogin.value;
    return payload;
  }


  isValidForm(): boolean {
    return this.formLogin.valid;
  }

  login() {
    const isValid = this.isValidForm();
    const payload = this.createPayload();
    console.log(payload);

    if (isValid) {
      this.apiService.loginUser(payload)
        .pipe(takeUntil(this.unsub$))
        .subscribe((res: LognUser) => {
          const { token } = res;
          this.localStorageService.setLocalStorage('token', JSON.stringify(token));
          this.localStorageService.setLocalStorage('email', JSON.stringify(payload.email));
          this.navigateUrl()
          this.utilService.showSuccess('Login realizado com sucesso!');
        });
    }
  }

  openDialogRegister() {
    this.dialog.open(
      ContinuationRegisterComponent,
      {
        width: '600px',
        autoFocus: false,
        maxHeight: '90vh',
        data: { data: this.createDataDialog() }
      },
    )
  }

  getValueControl(form: FormGroup, control: string) {
    //Retorna o valor do controle daquele formulario passado
    return form.controls[control].value;
  }

  createDataDialog(
    name = this.getValueControl(this.formRegister, 'name'),
    email = this.getValueControl(this.formRegister, 'email'),
    age = this.getValueControl(this.formRegister, 'age'),
  ) {
    const dataDialog = {
      name, email, age
    };

    return dataDialog;
  }

  navigateUrl() {
    this.router.navigate(['/dashboard'])
  }

  ngOnDestroy(): void {
    this.unsub$.next(true);
    this.unsub$.complete()
  }
}
