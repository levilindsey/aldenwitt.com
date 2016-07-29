import {OpaqueToken} from '@angular/core';

export let ROUTE_CONFIG = new OpaqueToken('route.config');

export type RouteConfig = RouteDefinition[];

export interface RouteDefinition {
  name: string,
  path: string,
  label: string,
  component: any,
  isDefault?: boolean
}
