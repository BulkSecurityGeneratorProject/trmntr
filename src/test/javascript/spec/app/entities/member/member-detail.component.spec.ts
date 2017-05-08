import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { DateUtils, DataUtils, EventManager } from 'ng-jhipster';
import { TrmntrTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { MemberDetailComponent } from '../../../../../../main/webapp/app/entities/member/member-detail.component';
import { MemberService } from '../../../../../../main/webapp/app/entities/member/member.service';
import { Member } from '../../../../../../main/webapp/app/entities/member/member.model';

describe('Component Tests', () => {

    describe('Member Management Detail Component', () => {
        let comp: MemberDetailComponent;
        let fixture: ComponentFixture<MemberDetailComponent>;
        let service: MemberService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TrmntrTestModule],
                declarations: [MemberDetailComponent],
                providers: [
                    DateUtils,
                    DataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    MemberService,
                    EventManager
                ]
            }).overrideComponent(MemberDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MemberDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MemberService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Member(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.member).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
