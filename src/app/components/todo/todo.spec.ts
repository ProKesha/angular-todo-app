import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Todo } from './todo';
import { Todo as TodoModel } from '../../types/todo';

describe('Todo', () => {
  let component: Todo;
  let fixture: ComponentFixture<Todo>;
  const todo: TodoModel = {
    id: 1,
    title: 'Learn Angular',
    completed: false,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Todo],
    }).compileComponents();

    fixture = TestBed.createComponent(Todo);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('todo', todo);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
