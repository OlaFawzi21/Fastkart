import { Component, inject, Input } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { BrandState } from '../../../../shared/state/brand.state';
import { Brand, BrandModel } from '../../../../shared/interface/brand.interface';
import { RouterModule } from '@angular/router';
import { NoDataComponent } from '../../../../shared/components/widgets/no-data/no-data.component';


@Component({
    selector: 'app-brand',
    imports: [RouterModule, NoDataComponent],
    templateUrl: './brand.component.html',
    styleUrl: './brand.component.scss'
})
export class BrandComponent {

  @Input() brandIds: number[];

  public brands: Brand[];

  brand$: Observable<BrandModel> = inject(Store).select(BrandState.brand) as Observable<BrandModel>;

  ngOnInit(){
    this.brand$.subscribe(brands =>{
      this.brands = brands.data.filter(brand => this.brandIds.includes(brand.id));
    })
  }

}
