import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Footer } from './footer';

describe('Footer', () => {
  let component: Footer;
  let fixture: ComponentFixture<Footer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Footer],
    }).compileComponents();

    fixture = TestBed.createComponent(Footer);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('activeTodosCount', 0);
    fixture.componentRef.setInput('completedTodosCount', 0);
    fixture.componentRef.setInput('filter', 'all');
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
