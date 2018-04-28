import { Component, OnInit } from '@angular/core';
import { NavBarService} from './navbar.service';
@Component({
    selector: 'nav-bar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css'],
    providers:[NavBarService]
})
export class NavBarComponent implements OnInit{
    constructor(private navBarService: NavBarService) {
        
    }
    ngOnInit() {
        //this.navBarService.getClientLogo();
    }
}