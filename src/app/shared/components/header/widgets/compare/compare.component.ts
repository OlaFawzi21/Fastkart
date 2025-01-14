import { Component, inject } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { CompareState } from '../../../../state/compare.state';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-header-compare',
    imports: [CommonModule, RouterModule],
    templateUrl: './compare.component.html',
    styleUrl: './compare.component.scss'
})
export class CompareComponent {

  compareTotal$: Observable<number> = inject(Store).select(CompareState.compareTotal);

}
