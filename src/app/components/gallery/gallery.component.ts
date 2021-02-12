import { Component, Input, OnInit } from '@angular/core';
import { PhotoService } from 'src/app/services/photo.service';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/models/category.model';

import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
})
export class GalleryComponent implements OnInit {

  //data
  categories: Category[] = [];

  //gallery grid
  gridColsNum: number = 4;

  gridByBreakpoint = {
    xl: 7,
    lg: 5,
    md: 4,
    sm: 2,
    xs: 1,
  };

  constructor(
    private photoService: PhotoService,
    private mediaObserver: MediaObserver,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.mediaObserver
      .asObservable()
      .pipe(
        distinctUntilChanged(
          (prev, curr) => prev[0].mqAlias === curr[0].mqAlias
        ),
        map((arr: MediaChange[]) =>
          arr.map((change: MediaChange) => change.mqAlias)
        )
      )
      .subscribe((result: string[]) => {
        this.gridColsNum = this.gridByBreakpoint[result[0]];
      });

    this.categoryService.getCategories().subscribe(
      (data: any) => {
        this.categories = data;
        this.categories.sort((a, b) => a.title.localeCompare(b.title));
        console.log(this.categories);

        this.loadTabImages({ index: 0 });
      },
      (err) => console.log(err)
    );
  }

  loadTabImages(event: any) {
    let searchparam = this.categories[event.index].ID;
    this.photoService.getPhotosByCategoryID(searchparam).subscribe(
      (data: any) => {
        console.log(data);
        this.categories[event.index].photos = data;
      },
      (err) => console.log(err)
    );
  }

}
