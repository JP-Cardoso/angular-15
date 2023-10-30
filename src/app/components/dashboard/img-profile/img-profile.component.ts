import { Component, Input } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-img-profile',
  templateUrl: './img-profile.component.html',
  styleUrls: ['./img-profile.component.scss']
})
export class ImgProfileComponent {

  @Input() img!: SafeResourceUrl | string; //Se não vier nada no input, carregamos a imagem default

}

/**
 * O Input é do pai para o filho.
 * Então o pai recebe o valor e repassa para o filho esse valor
 */
