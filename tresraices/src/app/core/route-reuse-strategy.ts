import { RouteReuseStrategy, ActivatedRouteSnapshot, DetachedRouteHandle } from '@angular/router';

export class CacheLandingReuseStrategy implements RouteReuseStrategy {
  private cache = new Map<string, DetachedRouteHandle>();

  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    return route.routeConfig?.path === '';
  }

  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
    if (route.routeConfig?.path === '') {
      this.cache.set('landing', handle);
    }
  }

  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    return route.routeConfig?.path === '' && this.cache.has('landing');
  }

  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
    if (route.routeConfig?.path !== '') return null;
    return this.cache.get('landing') ?? null;
  }

  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    return future.routeConfig === curr.routeConfig;
  }
}
