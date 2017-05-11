import { Component, Input, OnInit, OnDestroy, OnChanges } from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormArray} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, JhiLanguageService, DataUtils, ParseLinks } from 'ng-jhipster';

import { Playlist } from './playlist.model';
import { PlaylistPopupService } from './playlist-popup.service';
import { PlaylistService } from './playlist.service';
import { Entry, EntryService } from '../entry';
import { Member, MemberService } from '../member';

@Component({
    selector: 'jhi-playlist-dialog',
    templateUrl: './playlist-dialog.component.html'
})
export class PlaylistDialogComponent implements OnInit, OnChanges {

    @Input() playlist: Playlist;
    authorities: any[];
    isSaving: boolean;
    entries: Entry[];
    links: any;
    totalItems: any;
    queryCount: any;
    members: Member[];
    editForm: FormGroup;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private alertService: AlertService,
        private playlistService: PlaylistService,
        private entryService: EntryService,
        private parseLinks: ParseLinks,
        private memberService: MemberService,
        private eventManager: EventManager,
        private fb: FormBuilder
    ) {
        this.jhiLanguageService.setLocations(['playlist', 'artist', 'album', 'entry', 'label']);
    }

    createForm() {
        this.editForm = this.fb.group({
            id: ['', [Validators.required]],
            showNumber: ['', [Validators.required]],
            theme: [''],
            guest: [''],
            airDate: [''],
            showType: [''],
            members: [[''], Validators.required],
            recordUrl: [''],
            createTime: [''],
            updateTime: [''],
            tracklist: this.fb.array([
                this.initTrack(),
            ])
        });
    }

    initTrack() {
        return this.fb.group({
            id: ['', Validators.required],
            position: ['', Validators.required],
            artist: ['', Validators.required],
            title: ['', Validators.required],
            release: ['', Validators.required],
            label: ['', Validators.required]
        });
    }

    ngOnChanges() {
        this.editForm.reset();
        this.setEntries(this.entries);
    }

    setEntries(entries: Entry[]) {
        const entryFGs = entries.map(entry => this.fb.group({
            id: [entry.id],
            position: [entry.position],
            artist: [entry.track.artist.name],
            title: [entry.track.title],
            release: [entry.track.album.title],
            label: [entry.track.album.label.name]
        }));
        const entryFormArray = this.fb.array(entryFGs);
        this.editForm.setControl('tracklist', entryFormArray);
    }

    get tracklist(): FormArray {
        return this.editForm.get('tracklist') as FormArray;
    };

    addTrack() {
        this.tracklist.push(this.initTrack());
    }

    removeTrack(index : number) {
        this.tracklist.removeAt(index);
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.memberService.query().subscribe(
            (res: Response) => { this.members = res.json(); }, (res: Response) => this.onError(res.json()));

        this.createForm();

        if (this.playlist.id) {
            //Set playlist data
            this.editForm.patchValue({
                id: this.playlist.id,
                showNumber: this.playlist.showNumber,
                theme: this.playlist.theme,
                guest: this.playlist.guest,
                airDate: this.playlist.airDate,
                showType: this.playlist.showType,
                members: this.playlist.members,
                recordUrl: this.playlist.recordUrl,
                createTime: this.playlist.createTime,
                updateTime: this.playlist.updateTime
            });
            //Get entries
            this.entryService.findByPlaylistId(this.playlist.id).subscribe(
                (res: Response) => this.onSuccess(res.json(), res.headers),
                (res: Response) => this.onError(res.json())
            );
        }
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

    private onSuccess (data, headers) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = headers.get('X-Total-Count');
        this.queryCount = this.totalItems;
        this.entries = data;

        // this.editForm.reset();
        this.setEntries(data);
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
