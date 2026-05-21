import { TestBed } from '@angular/core/testing';

import { TodosService } from './todos';

describe('TodosService', () => {
  let service: TodosService;

  beforeEach(() => {
    localStorage.clear();

    TestBed.configureTestingModule({});
    service = TestBed.inject(TodosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should save and load todos', () => {
    const todos = [
      {
        id: 1,
        title: 'Learn services',
        completed: false,
      },
    ];

    service.saveTodos(todos);

    expect(service.getTodos()).toEqual(todos);
  });
});
