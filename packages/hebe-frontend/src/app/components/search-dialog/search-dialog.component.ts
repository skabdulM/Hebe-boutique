import { Component, HostListener, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-search-dialog',
  templateUrl: './search-dialog.component.html',
  styleUrls: ['./search-dialog.component.scss'],
})
export class SearchDialogComponent implements OnInit {
  constructor(private modalCtrl: ModalController, private router: Router) {}
  toRotate: any;
  el: any;
  loopNum: number;
  period: number;
  txt: string;
  isDeleting: boolean;
  searchForm: FormGroup = new FormGroup({
    searchQuery: new FormControl('', [
      Validators.minLength(1),
      Validators.min(1),
      Validators.nullValidator,
    ]),
  });

  ngOnInit() {
    const elements = document.getElementsByClassName('typewrite');
    for (var i = 0; i < elements.length; i++) {
      var toRotate = elements[i].getAttribute('data-type');
      var period = elements[i].getAttribute('data-period');
      if (toRotate) {
        this.TxtType(elements[i], JSON.parse(toRotate), period);
      }
    }
  }

  TxtType(el: Element, toRotate: any, period: any | null) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
  }
  tick = () => {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];
    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }
    this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';
    var that = this;
    var delta = 500 - Math.random() * 100;
    if (this.isDeleting) {
      delta /= 2;
    }
    if (!this.isDeleting && this.txt === fullTxt) {
      delta = this.period;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      this.loopNum++;
      delta = 1000;
    }
    setTimeout(function () {
      that.tick();
    }, delta);
  };

  cancel() {
    this.modalCtrl.dismiss();
  }

  confirm() {
    const searchQuery = this.searchForm.controls['searchQuery'].value.trim();
    if (searchQuery !== ' ' && searchQuery.length != 0) {
      this.modalCtrl.dismiss().then((data) => {
        let navigationExtras: NavigationExtras = {
          queryParams: {
            search: searchQuery,
          },
        };
        this.router.navigate(['/search'], navigationExtras);
      });
    }
  }

  @HostListener('window:popstate', ['$event'])
  dismiss() {
    this.cancel();
  }
}
