import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Select2Data, Select2Module, Select2UpdateEvent } from 'ng-select2-component';
import { Params } from '../../../../../shared/interface/core.interface';
import { AttributeService } from '../../../../../shared/services/attribute.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-collection-sort',
    imports: [TranslateModule, Select2Module],
templateUrl: './collection-sort.component.html',
    styleUrl: './collection-sort.component.scss'
})
export class CollectionSortComponent {

  @Input() filter: Params;
  @Input() gridCol: string;

  @Output() setGridClass: EventEmitter<string> = new EventEmitter();
  @Output() showFilter: EventEmitter<boolean> = new EventEmitter();

  public sorting: Select2Data = [{
      value: 'asc',
      label: this.translate.instant('Ascending Order'),
    },{
      value: 'desc',
      label: this.translate.instant('Descending Order'),
    },{
      value: 'low-high',
      label: this.translate.instant('Low - High Price'),
    },{
      value: 'high-low',
      label: this.translate.instant('High - Low Price'),
    },{
      value: 'a-z',
      label: this.translate.instant('A - Z Order'),
    },{
      value: 'z-a',
      label: this.translate.instant('Z - A Order'),
    },{
      value: 'discount-high-low',
      label: this.translate.instant('% Off - Hight To Low'),
    }];

  public selectedGrid: string = "collection_4_grid";
  public class: string = "row g-sm-4 g-3 row-cols-xl-4 row-cols-md-3 row-cols-2 product-list-section";
  public gridArray = ['collection_3_grid', 'collection_4_grid', 'collection_5_grid', 'collection_list_view'];

  constructor(private route: ActivatedRoute, private attributeService: AttributeService, private translate :TranslateService,
    private router: Router) {
    this.setGridClass.emit(this.class);
  }

  ngOnChanges(changes: SimpleChanges) {
    let layout = changes['filter']?.currentValue.layout;
    let gridCol = changes['gridCol']?.currentValue
     if(this.gridArray.includes(gridCol)){
      this.selectedGrid = String(this.grid(gridCol))
    }

    if(this.gridArray.includes(layout)){
      this.grid(layout);
    }
  }

  grid(value: string) {
    if(this.gridArray.includes(value)){
      if(value == 'collection_3_grid')
       this.class = "row g-sm-4 g-3 product-list-section row-cols-md-3 row-cols-2";
      else if(value == 'collection_4_grid')
       this.class = "row g-sm-4 g-3 product-list-section row-cols-xl-4 row-cols-md-3 row-cols-2";
      else if(value == 'collection_5_grid')
        this.class = "row g-sm-4 g-3 product-list-section row-cols-xxl-5 row-cols-xl-4 row-cols-md-3 row-cols-2";
      else if(value == 'collection_list_view')
       this.class = "row g-sm-4 g-3 product-list-section list-style";

      this.selectedGrid = value;
      this.setGridClass.emit(this.class);
    }
  }

  // SortBy Filter
  sortByFilter(data: Select2UpdateEvent) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        sortBy: data && data.value ? data.value : null,
      },
      queryParamsHandling: 'merge', // preserve the existing query params in the route
      skipLocationChange: false  // do trigger navigation
    });
  }

  openOffCanvasMenu() {
    this.attributeService.offCanvasMenu = true;
  }

  openFilter(value: boolean){
    this.attributeService.offCanvasMenu = value;
  }

}
