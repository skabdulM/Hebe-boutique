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
    private search: NavbarComponent
  ) {}
  isOpen = false;

  ngOnInit() {}

  openModal() {
    return this.search.openModal();
  }

  presentPopover(e: Event) {
    this.popover.event = e;
    this.isOpen = true;
  }
}
