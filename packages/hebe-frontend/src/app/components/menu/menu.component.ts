import { Component, OnInit, ViewChild } from '@angular/core';
import { ActionSheetController, NavController } from '@ionic/angular';
import { NavbarComponent } from '../navbar/navbar.component';
// import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  @ViewChild('popover') popover;
  constructor(
    public navCtrl: NavController,
    public actionSheetController: ActionSheetController,
    private navComponent: NavbarComponent
  ) {}
  isOpen = false;

  ngOnInit() {}

  openModal() {
    return this.navComponent.openModal();
  }

  openCart(initBreakPoint: number) {
    return this.navComponent.openCart(initBreakPoint);
  }

  presentPopover(e: Event) {
    this.popover.event = e;
    this.isOpen = true;
  }
}
