import { CanActivateFn } from '@angular/router';

export const productDetailGuard: CanActivateFn = (route, state) => {
  const id = Number(route.paramMap.get('id'));
  if (isNaN(id) || id < 1)
  {
    alert('Id produit non valide');
    state.router
    return false;
  }
  return true;
};
