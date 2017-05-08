import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { PlaylistComponent } from './playlist.component';
import { PlaylistDetailComponent } from './playlist-detail.component';
import { PlaylistPopupComponent } from './playlist-dialog.component';
import { PlaylistDeletePopupComponent } from './playlist-delete-dialog.component';

import { Principal } from '../../shared';

@Injectable()
export class PlaylistResolvePagingParams implements Resolve<any> {

  constructor(private paginationUtil: PaginationUtil) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
      const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
      return {
          page: this.paginationUtil.parsePage(page),
          predicate: this.paginationUtil.parsePredicate(sort),
          ascending: this.paginationUtil.parseAscending(sort)
    };
  }
}

export const playlistRoute: Routes = [
  {
    path: 'playlist',
    component: PlaylistComponent,
    resolve: {
      'pagingParams': PlaylistResolvePagingParams
    },
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'trmntrApp.playlist.home.title'
    },
    canActivate: [UserRouteAccessService]
  }, {
    path: 'playlist/:id',
    component: PlaylistDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'trmntrApp.playlist.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const playlistPopupRoute: Routes = [
  {
    path: 'playlist-new',
    component: PlaylistPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'trmntrApp.playlist.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: 'playlist/:id/edit',
    component: PlaylistPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'trmntrApp.playlist.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: 'playlist/:id/delete',
    component: PlaylistDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'trmntrApp.playlist.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
