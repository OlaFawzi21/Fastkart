import { Component, Input } from '@angular/core';
import { Tag } from '../../../../shared/interface/tag.interface';
import { RouterModule } from '@angular/router';
import { NoDataComponent } from '../../../../shared/components/widgets/no-data/no-data.component';

@Component({
    selector: 'app-blog-tag',
    imports: [RouterModule, NoDataComponent],
    templateUrl: './blog-tag.component.html',
    styleUrl: './blog-tag.component.scss'
})
export class BlogTagComponent {

  @Input() tags: Tag[];

}
