import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';

export const productDetailGuard: CanActivateFn = (route, state) => {
  const id = Number(route.paramMap.get('id'));
  if (isNaN(id) || id < 1)
  {
    const router: Router = inject(Router);
    return router.createUrlTree(['/products']);
  }
  return true;
};
