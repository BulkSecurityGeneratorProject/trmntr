import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';
import { Subscription } from 'rxjs/Rx';
import { AlertService, EventManager, JhiLanguageService, ParseLinks } from 'ng-jhipster';

import { Playlist } from './playlist.model';
import { PlaylistService } from './playlist.service';
import { Entry, EntryService } from '../entry';

@Component({
    selector: 'jhi-playlist-detail',
    templateUrl: './playlist-detail.component.html'
})
export class PlaylistDetailComponent implements OnInit, OnDestroy {

    playlist: Playlist;
    entries: Entry[];
    links: any;
    totalItems: any;
    queryCount: any;
    private subscription: any;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: EventManager,
        private alertService: AlertService,
        private jhiLanguageService: JhiLanguageService,
        private playlistService: PlaylistService,
        private entryService: EntryService,
        private parseLinks: ParseLinks,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['playlist', 'artist', 'album', 'entry', 'label']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInPlaylists();
    }

    load(id) {
        this.playlistService.find(id).subscribe((playlist) => {
            this.playlist = playlist;
        });
        this.entryService.findByPlaylistId(id).subscribe(
            (res: Response) => this.onSuccess(res.json(), res.headers),
            (res: Response) => this.onError(res.json())
        );
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPlaylists() {
        this.eventSubscriber = this.eventManager.subscribe('playlistListModification', (response) => this.load(this.playlist.id));
    }

    private onSuccess (data, headers) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = headers.get('X-Total-Count');
        this.queryCount = this.totalItems;
        this.entries = data;
    }

    private onError (error) {
        this.alertService.error(error.message, null, null);
    }
}
