import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager , JhiLanguageService  } from 'ng-jhipster';

import { Playlist } from './playlist.model';
import { PlaylistService } from './playlist.service';

@Component({
    selector: 'jhi-playlist-detail',
    templateUrl: './playlist-detail.component.html'
})
export class PlaylistDetailComponent implements OnInit, OnDestroy {

    playlist: Playlist;
    private subscription: any;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: EventManager,
        private jhiLanguageService: JhiLanguageService,
        private playlistService: PlaylistService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['playlist']);
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
}
