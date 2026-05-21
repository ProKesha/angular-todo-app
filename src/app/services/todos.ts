import { Injectable } from '@angular/core';

import type { Todo } from '../types/todo';

const TODOS_STORAGE_KEY = 'todos';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  getTodos(): Todo[] {
    const savedTodos = localStorage.getItem(TODOS_STORAGE_KEY);

    if (!savedTodos) {
      return [];
    }

    try {
      const todos: unknown = JSON.parse(savedTodos);

      return this.isTodoList(todos) ? todos : [];
    } catch {
      return [];
    }
  }

  saveTodos(todos: Todo[]): void {
    localStorage.setItem(TODOS_STORAGE_KEY, JSON.stringify(todos));
  }

  private isTodoList(value: unknown): value is Todo[] {
    return Array.isArray(value)
      && value.every(todo => this.isTodo(todo));
  }

  private isTodo(value: unknown): value is Todo {
    if (typeof value !== 'object' || value === null) {
      return false;
    }

    const todo = value as Record<string, unknown>;

    return typeof todo['id'] === 'number'
      && typeof todo['title'] === 'string'
      && typeof todo['completed'] === 'boolean';
  }
}
