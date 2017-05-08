import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TrmntrSharedModule } from '../../shared';
import {
    MemberService,
    MemberPopupService,
    MemberComponent,
    MemberDetailComponent,
    MemberDialogComponent,
    MemberPopupComponent,
    MemberDeletePopupComponent,
    MemberDeleteDialogComponent,
    memberRoute,
    memberPopupRoute,
} from './';

const ENTITY_STATES = [
    ...memberRoute,
    ...memberPopupRoute,
];

@NgModule({
    imports: [
        TrmntrSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        MemberComponent,
        MemberDetailComponent,
        MemberDialogComponent,
        MemberDeleteDialogComponent,
        MemberPopupComponent,
        MemberDeletePopupComponent,
    ],
    entryComponents: [
        MemberComponent,
        MemberDialogComponent,
        MemberPopupComponent,
        MemberDeleteDialogComponent,
        MemberDeletePopupComponent,
    ],
    providers: [
        MemberService,
        MemberPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TrmntrMemberModule {}
