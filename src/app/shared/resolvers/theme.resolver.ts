import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Store } from '@ngxs/store';

import { GetHomePage } from '../action/theme.action';
import { Observable } from 'rxjs';

export const ThemeResolver: ResolveFn<Observable<any>> = (route, state) => {
  const store = inject(Store);
  const slug = route.paramMap.get('slug') || 'paris';

  return store.dispatch(new GetHomePage(slug));
};
