import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PmpWebRepositoryUsersFeatureComponent } from './pmp-web-repository-users-feature.component';
import { PmpWebSharedUiTableModule } from '@pimp-my-pr/pmp-web/shared/ui-table';
import { PmpWebSharedUiNavbarModule } from '@pimp-my-pr/pmp-web/shared/ui-navbar';
import { PmpWebSharedUiSidebarModule } from '@pimp-my-pr/pmp-web/shared/ui-sidebar';

describe('PmpWebRepositoryUsersFeatureComponent', () => {
  let component: PmpWebRepositoryUsersFeatureComponent;
  let fixture: ComponentFixture<PmpWebRepositoryUsersFeatureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PmpWebRepositoryUsersFeatureComponent],
      imports: [
        PmpWebSharedUiTableModule,
        PmpWebSharedUiNavbarModule,
        PmpWebSharedUiSidebarModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PmpWebRepositoryUsersFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
