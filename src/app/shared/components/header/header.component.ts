import { Component, inject, Input } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ThemeOptionState } from '../../state/theme-option.state';
import { Option } from '../../interface/theme-option.interface';
import { ThemeState } from '../../state/theme.state';
import { CommonModule } from '@angular/common';
import { StandardHeaderComponent } from './standard-header/standard-header.component';
import { MobileMenuComponent } from './widgets/mobile-menu/mobile-menu.component';

@Component({
    selector: 'app-header',
    imports: [CommonModule, StandardHeaderComponent, MobileMenuComponent
    ],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent {

  themeOption$: Observable<Option> = inject(Store).select(ThemeOptionState.themeOptions) as Observable<Option>;
  activeTheme$: Observable<String> = inject(Store).select(ThemeState.activeTheme);

  @Input() logo?: string | undefined;

  public style: string = 'basic_header';
  public sticky: boolean = true;
  public path: string;

}
