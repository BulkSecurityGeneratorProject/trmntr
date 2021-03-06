import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { DateUtils, DataUtils, EventManager } from 'ng-jhipster';
import { TrmntrTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { TrackDetailComponent } from '../../../../../../main/webapp/app/entities/track/track-detail.component';
import { TrackService } from '../../../../../../main/webapp/app/entities/track/track.service';
import { Track } from '../../../../../../main/webapp/app/entities/track/track.model';

describe('Component Tests', () => {

    describe('Track Management Detail Component', () => {
        let comp: TrackDetailComponent;
        let fixture: ComponentFixture<TrackDetailComponent>;
        let service: TrackService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TrmntrTestModule],
                declarations: [TrackDetailComponent],
                providers: [
                    DateUtils,
                    DataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    TrackService,
                    EventManager
                ]
            }).overrideComponent(TrackDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TrackDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TrackService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Track(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.track).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
