import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TrmntrSharedModule } from '../../shared';
import {
    ArtistService,
    ArtistPopupService,
    ArtistComponent,
    ArtistDetailComponent,
    ArtistDialogComponent,
    ArtistPopupComponent,
    ArtistDeletePopupComponent,
    ArtistDeleteDialogComponent,
    artistRoute,
    artistPopupRoute,
    ArtistResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...artistRoute,
    ...artistPopupRoute,
];

@NgModule({
    imports: [
        TrmntrSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        ArtistComponent,
        ArtistDetailComponent,
        ArtistDialogComponent,
        ArtistDeleteDialogComponent,
        ArtistPopupComponent,
        ArtistDeletePopupComponent,
    ],
    entryComponents: [
        ArtistComponent,
        ArtistDialogComponent,
        ArtistPopupComponent,
        ArtistDeleteDialogComponent,
        ArtistDeletePopupComponent,
    ],
    providers: [
        ArtistService,
        ArtistPopupService,
        ArtistResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TrmntrArtistModule {}
