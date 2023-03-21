import { EventEmitter, NgZone, Output } from '@angular/core';
import { Component, OnInit,HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { LoginUserCU } from 'src/app/usuario/application/user-logincu';
import { StorageService } from 'src/app/services/storage.service';
import { ResponseLogin } from 'src/app/usuario/domain/user-entity';
import { AuthService } from 'src/app/services/auth.service';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';


//IMPORT ISMA
import {OverlayContainer} from '@angular/cdk/overlay'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    selected1 = 'light-theme';

    selected = new FormControl('valid', [
        Validators.required,
        Validators.pattern('valid'),
      ]);
    
      selectFormControl = new FormControl('valid', [
        Validators.required,
        Validators.pattern('valid'),
      ]);
    
      nativeSelectFormControl = new FormControl('valid', [
        Validators.required,
        Validators.pattern('valid'),
      ]);

    //Cambios Isma
    @HostBinding('class') componentCssClass: any

    @Output() ResponseLogin = new EventEmitter<ResponseLogin>();
    
    nombreusuario:string;
    nombreempresa: string; 
    // Sidenav responsive
    width;
    height;
    mode = 'side';
    open = 'true';
    title = 'Responsive Sidenav Starter';
    navList: NavList[];

    constructor(public ngZone: NgZone,
                public route: Router,
                private readonly storage :StorageService,
                private readonly serviciologin: LoginUserCU,
                private readonly auth: AuthService,
                public overlayContainer: OverlayContainer
                ) {
        this.navList = [
            { categoryName: 'Menu', icon: 'face', dropDown: true,
                subCategory:
                    [
                        { subCategoryName: 'Submenu', subCategoryLink: '/link', visable: true, },
                        { subCategoryName: 'Submenu', subCategoryLink: '/principal', visable: true, },
                        { subCategoryName: 'Submenu', subCategoryLink: '/link1', visable: true, },
                    ]
            },
            { categoryName: 'Menu', icon: 'face', dropDown: false,
                subCategory:
                    [
                        { subCategoryName: 'Submenu', subCategoryLink: '/link', visable: true, },
                        { subCategoryName: 'Submenu', subCategoryLink: '/principal', visable: true, },
                        { subCategoryName: 'Submenu', subCategoryLink: '/link1', visable: true, },
                    ]
            },
            { categoryName: 'Menu', icon: 'question_answer', dropDown: false,
                subCategory:
                    [
                        { subCategoryName: 'Submenu', subCategoryLink: '/link1', visable: true, },
                        { subCategoryName: 'Submenu', subCategoryLink: '/link1', visable: true, },
                        { subCategoryName: 'Submenu', subCategoryLink: '/link1', visable: true, },
                    ]
            },
            { categoryName: 'Menu', icon: 'work', dropDown: false,
                subCategory:
                    [
                        { subCategoryName: 'Submenu', subCategoryLink: '/link1', visable: true, },
                        { subCategoryName: 'Submenu', subCategoryLink: '/link1', visable: true, },
                        { subCategoryName: 'Submenu', subCategoryLink: '/link1', visable: true, },
                    ]
            },
        ];
        this.changeMode();
        window.onresize = (e) => {
            ngZone.run(() => {
                this.changeMode();
            });
        };
        //Lista
    }
    //Cambia Color
    public onSetTheme(e: string){
       if(e != 'dark-theme')
          //  this.overlayContainer.getContainerElement().classList.add(e);
            this.overlayContainer.getContainerElement().classList.remove("dark-theme")
           
          //  this.componentCssClass = e;
        if(e != 'light-theme')
            //this.overlayContainer.getContainerElement().classList.add(e);
           // this.componentCssClass = e;
           this.overlayContainer.getContainerElement().classList.remove("light-theme")

           if(e != 'vivo-theme')
           //this.overlayContainer.getContainerElement().classList.add(e);
          // this.componentCssClass = e;
          this.overlayContainer.getContainerElement().classList.remove("vivo-theme")


            this.overlayContainer.getContainerElement().classList.add(e);
            this.componentCssClass = e;



        //Lista
    }
    //Cambia Color
  

    logout()
    {

       this.serviciologin.logout();

    }

    responselogin : ResponseLogin
    ngOnInit() {
    this.nombreusuario = this.storage.get("usuario")
    this.nombreempresa = this.storage.get("compania")
     //console.log( this.ResponseLogin.emit(this.responselogin))

     console.log(this.auth.getListaMenu())
    }

    changeMode() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        if (this.width <= 800) {
            this.mode = 'over';
            this.open = 'false';
        }
        if (this.width > 800) {
            this.mode = 'side';
            this.open = 'true';
        }
    }
}

export class NavList {
    categoryName: string;
    icon: string;
    dropDown: boolean;
    subCategory: NavListItem[];
    constructor(_categoryName: string, _icon: string, _dropDown: boolean, _subCategory: NavListItem[]) {
        this.categoryName = _categoryName;
        this.icon = _icon;
        this.dropDown = _dropDown;
        this.subCategory = _subCategory;
    }
}

export class NavListItem {
    subCategoryName: string;
    subCategoryLink: string;
    subCategoryQuery?: any;
    visable: boolean;
}