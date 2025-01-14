import { Component, inject, Input } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { StoreState } from '../../../../shared/state/store.state';
import { Stores, StoresModel } from '../../../../shared/interface/store.interface';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NoDataComponent } from '../../../../shared/components/widgets/no-data/no-data.component';

@Component({
    selector: 'app-top-seller',
    imports: [RouterModule, NgbModule, NoDataComponent],
    templateUrl: './top-seller.component.html',
    styleUrl: './top-seller.component.scss'
})
export class TopSellerComponent {

  @Input() sellerIds: number[];

  public sellers: Stores[];

  store$: Observable<StoresModel> = inject(Store).select(StoreState.store) as Observable<StoresModel>;

  ngOnInit(){
    this.store$.subscribe(stores =>{
      if(this.sellerIds?.length)
        this.sellers = stores.data.filter(seller => this.sellerIds.includes(seller.id));
    })
  }

}
