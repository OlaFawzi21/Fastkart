import { Component, Input } from '@angular/core';
import { Blog } from '../../../../shared/interface/blog.interface';
import { RouterModule } from '@angular/router';
import { NoDataComponent } from '../../../../shared/components/widgets/no-data/no-data.component';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-recent-post',
    imports: [RouterModule, CommonModule, NoDataComponent],
    templateUrl: './recent-post.component.html',
    styleUrl: './recent-post.component.scss'
})
export class RecentPostComponent {

  @Input() blogs: Blog[];

}
