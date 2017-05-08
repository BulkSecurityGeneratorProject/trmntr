import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { TrmntrAlbumModule } from './album/album.module';
import { TrmntrArtistModule } from './artist/artist.module';
import { TrmntrEntryModule } from './entry/entry.module';
import { TrmntrLabelModule } from './label/label.module';
import { TrmntrMemberModule } from './member/member.module';
import { TrmntrPlaylistModule } from './playlist/playlist.module';
import { TrmntrTrackModule } from './track/track.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        TrmntrAlbumModule,
        TrmntrArtistModule,
        TrmntrEntryModule,
        TrmntrLabelModule,
        TrmntrMemberModule,
        TrmntrPlaylistModule,
        TrmntrTrackModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TrmntrEntityModule {}
