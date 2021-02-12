import {
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { PhotoService } from 'src/app/services/photo.service';
import { CategoryService } from 'src/app/services/category.service';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { MediaObserver, MediaChange } from '@angular/flex-layout';

@Component({
  selector: 'app-web',
  templateUrl: './web.component.html',
  styleUrls: ['./web.component.css', '../../../customstyles/carousel.css'],
  encapsulation: ViewEncapsulation.None,
})
export class WebComponent implements OnInit {
  //data
  pictures: any[];
  selectedTeamMember: any;
  showDetails: boolean = false;

  //carousel
  carrouselNumByBreakpoint = {
    xl: 3,
    lg: 3,
    md: 2,
    sm: 2,
    xs: 1,
  };
  carouselNumVisible: number = 3;
  carouselNumScroll = 1;
  responsiveOptions;

  //helpers
  screenHeight: number;
  screenWidth: number;

  //google maps
  latitude = 37.2536643;
  longitude = -6.9429049;
  mapType = 'roadmap';
  zoom = 18;

  constructor(
    private photoService: PhotoService,
    private categoryService: CategoryService,
    private mediaObserver: MediaObserver
  ) {
    //responsive carousel
    this.responsiveOptions = [
      {
        breakpoint: '1324px',
        numVisible: 3,
        numScroll: 1,
      },
      {
        breakpoint: '1250px',
        numVisible: 2,
        numScroll: 1,
      },
      {
        breakpoint: '600px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }

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
        this.carouselNumVisible = this.carrouselNumByBreakpoint[result[0]];
      });

    this.categoryService.getCategories().subscribe(
      (data: any) => {
        let categories = data;
        let teamCategory = categories.filter((cat) => cat.title === 'Equipo');
        let searchparam = teamCategory[0].ID;
        console.log(categories, teamCategory, searchparam);

        this.photoService.getPhotosByCategoryID(searchparam).subscribe(
          (data: any) => {
            console.log(data);
            this.pictures = data;
            this.selectedTeamMember = this.pictures[0];
          },
          (err) => console.log(err)
        );
      },
      (err) => console.log(err)
    );

    (async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));

      document.querySelectorAll('.moving-text').forEach((c) => {
        c.classList.add('moving-text-end');
      });
    })();
  }

  showPhotoDetails(pic: any) {
    this.selectedTeamMember = pic;
    this.showDetails = true;
  }

  closePhotoDetails() {
    this.showDetails = false;
  }
}
