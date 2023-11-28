import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaNotificarComponent } from './lista-notificar.component';

describe('ListaNotificarComponent', () => {
  let component: ListaNotificarComponent;
  let fixture: ComponentFixture<ListaNotificarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaNotificarComponent]
    });
    fixture = TestBed.createComponent(ListaNotificarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
