import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { DateUtils, DataUtils, EventManager } from 'ng-jhipster';
import { TrmntrTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { ArtistDetailComponent } from '../../../../../../main/webapp/app/entities/artist/artist-detail.component';
import { ArtistService } from '../../../../../../main/webapp/app/entities/artist/artist.service';
import { Artist } from '../../../../../../main/webapp/app/entities/artist/artist.model';

describe('Component Tests', () => {

    describe('Artist Management Detail Component', () => {
        let comp: ArtistDetailComponent;
        let fixture: ComponentFixture<ArtistDetailComponent>;
        let service: ArtistService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TrmntrTestModule],
                declarations: [ArtistDetailComponent],
                providers: [
                    DateUtils,
                    DataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    ArtistService,
                    EventManager
                ]
            }).overrideComponent(ArtistDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ArtistDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ArtistService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Artist(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.artist).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
