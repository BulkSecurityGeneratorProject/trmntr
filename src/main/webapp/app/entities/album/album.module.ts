import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TrmntrSharedModule } from '../../shared';
import {
    AlbumService,
    AlbumPopupService,
    AlbumComponent,
    AlbumDetailComponent,
    AlbumDialogComponent,
    AlbumPopupComponent,
    AlbumDeletePopupComponent,
    AlbumDeleteDialogComponent,
    albumRoute,
    albumPopupRoute,
    AlbumResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...albumRoute,
    ...albumPopupRoute,
];

@NgModule({
    imports: [
        TrmntrSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        AlbumComponent,
        AlbumDetailComponent,
        AlbumDialogComponent,
        AlbumDeleteDialogComponent,
        AlbumPopupComponent,
        AlbumDeletePopupComponent,
    ],
    entryComponents: [
        AlbumComponent,
        AlbumDialogComponent,
        AlbumPopupComponent,
        AlbumDeleteDialogComponent,
        AlbumDeletePopupComponent,
    ],
    providers: [
        AlbumService,
        AlbumPopupService,
        AlbumResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TrmntrAlbumModule {}
