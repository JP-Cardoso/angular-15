import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UtilsService } from './toast/utils.service';
import { Observable, catchError, throwError, retry } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DownloadImageUser } from '../interfaces/downloadImageUser';
import { RegisterUser } from '../interfaces/registerUser';
import { UserLogin, LognUser } from '../interfaces/userLogin';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private httpClient: HttpClient,
    private utilsService: UtilsService,
  ) { }

  registerUser(user: any): Observable<RegisterUser> {
    const formData = new FormData();

    formData.append('name', user.name);
    formData.append('email', user.email);
    formData.append('age', user.age);
    formData.append('image', user.avatar);
    formData.append('password', user.password);
    formData.append('confirmPassword', user.confirmPassword);

    return this.httpClient.post<RegisterUser>(environment.BASE_URL + '/auth/register/user', formData)
      .pipe(
        catchError((err) => {
          if (err.status === 0 && err.status !== 404) {
            console.error('Ocorreu um erro na aplicação, tente novamente');
            this.utilsService.showError('Ocorreu um erro na aplicação, tente novamente');
          } else if (err.status === 404) {
            console.error(err.error.message);
            this.utilsService.showError(err.error.message);
          } else {
            console.error('Ocorreu um erro na aplicação, tente novamente mais tarde');
            this.utilsService.showError('Ocorreu um erro na aplicação, tente novamente mais tarde');
          }
          return throwError(() => err);
        })
      )
  }

  loginUser(user: UserLogin): Observable<LognUser> {
    return this.httpClient.post<LognUser>(environment.BASE_URL + '/auth/login', user)
      .pipe(
        //O retry tenta fazer a riquisição duas vezes ou mais. Se der erro ele tenta novamente
        retry(2),
        catchError((err) => {
          if (err.status === 0 && err.status !== 404) {
            console.error('Ocorreu um erro na aplicação, tente novamente');
            this.utilsService.showError('Ocorreu um erro na aplicação, tente novamente');
          } else if (err.status === 404) {
            console.error(err.error.message);
            this.utilsService.showError(err.error.message);
          } else {
            console.error('Ocorreu um erro na aplicação, tente novamente mais tarde');
            this.utilsService.showError('Ocorreu um erro na aplicação, tente novamente mais tarde');
          }
          return throwError(() => err);
        })
      )
  }

  downloadImage(imgName: string): Observable<DownloadImageUser> {
    const headers = new HttpHeaders().set('imgName', imgName);

    return this.httpClient.get<DownloadImageUser>(environment.BASE_URL + '/download/image', { headers })
      .pipe(
        catchError((err) => {
          if (err.status === 0 && err.status !== 404) {
            console.error('Ocorreu um erro na aplicação, tente novamente');
            this.utilsService.showError('Ocorreu um erro na aplicação, tente novamente');
          } else if (err.status === 404) {
            console.error(err.error.message);
            this.utilsService.showError(err.error.message);
          } else {
            console.error('Ocorreu um erro na aplicação, tente novamente mais tarde');
            this.utilsService.showError('Ocorreu um erro na aplicação, tente novamente mais tarde');
          }
          return throwError(() => err);
        })
      )
  }

}
