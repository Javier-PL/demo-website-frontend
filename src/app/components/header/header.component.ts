import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  currentLang:string 
  currentUrlPath: string;

  constructor(
    private viewportScroller: ViewportScroller,
    private translate: TranslateService,
    private router: Router
  ) {
    this.translate.setDefaultLang('es');
    this.currentLang = this.translate.getDefaultLang()
  }

  ngOnInit(): void {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.currentUrlPath = event.url;
      }
    });
  }

  public scrollToContact(elementId: string): void {
    this.viewportScroller.scrollToAnchor(elementId);
  }

  useLanguage(language: string) {
    this.translate.use(language);
    this.currentLang = language
  }
}
