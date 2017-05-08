import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, JhiLanguageService } from 'ng-jhipster';

import { Playlist } from './playlist.model';
import { PlaylistPopupService } from './playlist-popup.service';
import { PlaylistService } from './playlist.service';
import { Member, MemberService } from '../member';

@Component({
    selector: 'jhi-playlist-dialog',
    templateUrl: './playlist-dialog.component.html'
})
export class PlaylistDialogComponent implements OnInit {

    playlist: Playlist;
    authorities: any[];
    isSaving: boolean;

    members: Member[];
        constructor(
        public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private alertService: AlertService,
        private playlistService: PlaylistService,
        private memberService: MemberService,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['playlist']);
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.memberService.query().subscribe(
            (res: Response) => { this.members = res.json(); }, (res: Response) => this.onError(res.json()));
    }
    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.playlist.id !== undefined) {
            this.playlistService.update(this.playlist)
                .subscribe((res: Playlist) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
        } else {
            this.playlistService.create(this.playlist)
                .subscribe((res: Playlist) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
        }
    }

    private onSaveSuccess(result: Playlist) {
        this.eventManager.broadcast({ name: 'playlistListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError(error) {
        try {
            error.json();
        } catch (exception) {
            error.message = error.text();
        }
        this.isSaving = false;
        this.onError(error);
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }

    trackMemberById(index: number, item: Member) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}

@Component({
    selector: 'jhi-playlist-popup',
    template: ''
})
export class PlaylistPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private playlistPopupService: PlaylistPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.playlistPopupService
                    .open(PlaylistDialogComponent, params['id']);
            } else {
                this.modalRef = this.playlistPopupService
                    .open(PlaylistDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
