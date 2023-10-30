import { Component, OnInit, Sanitizer } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { DownloadImageUser } from 'src/app/interfaces/downloadImageUser';
import { ApiService } from 'src/app/services/api.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  messageHour!: string;
  showNameUser!: string;
  isDefaultImage: string = "../../../../assets/img-profile/default.png";
  imageUser!: SafeResourceUrl;
  imageBase64!: string;

  constructor(
    private localstorageService: LocalstorageService,
    private apiService: ApiService,
    private sanitizer: DomSanitizer,
    private router: Router
  ) { }

  ngOnInit() {
    this.getNameUser();
    // this.getImageUser();
  }

  getMessageHour(message: string) {
    this.messageHour = message
  }

  getNameUser() {
    const nameUser = this.localstorageService.getLocalStorage('userInfo');
    this.showNameUser = nameUser.name ? nameUser.name : "Etevaldo";
  }

  getImageUser() {
    const nameIamage = this.localstorageService.getLocalStorage('userInfo');
    this.apiService.downloadImage(nameIamage.image)
      .subscribe((res: DownloadImageUser) => {
        this.imageBase64 = res.image;
        // console.log(this.imageBase64);
        let url = 'data:image/jpg;base64,' + res.image;
        this.imageUser = this.sanitizer.bypassSecurityTrustResourceUrl(url);

      })
  }

  logOut() {
    this.localstorageService.removeLocalStorage('token');    
    this.router.navigate(['/']);
  }


}
