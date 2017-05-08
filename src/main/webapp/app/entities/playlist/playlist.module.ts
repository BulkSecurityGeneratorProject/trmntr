import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TrmntrSharedModule } from '../../shared';
import {
    PlaylistService,
    PlaylistPopupService,
    PlaylistComponent,
    PlaylistDetailComponent,
    PlaylistDialogComponent,
    PlaylistPopupComponent,
    PlaylistDeletePopupComponent,
    PlaylistDeleteDialogComponent,
    playlistRoute,
    playlistPopupRoute,
    PlaylistResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...playlistRoute,
    ...playlistPopupRoute,
];

@NgModule({
    imports: [
        TrmntrSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        PlaylistComponent,
        PlaylistDetailComponent,
        PlaylistDialogComponent,
        PlaylistDeleteDialogComponent,
        PlaylistPopupComponent,
        PlaylistDeletePopupComponent,
    ],
    entryComponents: [
        PlaylistComponent,
        PlaylistDialogComponent,
        PlaylistPopupComponent,
        PlaylistDeleteDialogComponent,
        PlaylistDeletePopupComponent,
    ],
    providers: [
        PlaylistService,
        PlaylistPopupService,
        PlaylistResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TrmntrPlaylistModule {}
