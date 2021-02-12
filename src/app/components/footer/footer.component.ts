import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  currentUrlPath: string;

  constructor(
    private viewportScroller: ViewportScroller,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.currentUrlPath = event.url;
      }
    });
  }

  scrollToTop(elementId: string): void {
    this.viewportScroller.scrollToAnchor(elementId);
  }
}
