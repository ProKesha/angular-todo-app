import { Component } from '@angular/core';

import { Todo } from './components/todo/todo';
import { Todo as TodoModel } from './types/todo';

type TodoFilter = 'all' | 'active' | 'completed';

@Component({
  selector: 'app-root',
  imports: [Todo],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  todos: TodoModel[] = [];
  filter: TodoFilter = 'all';
  errorMessage = '';

  private nextTodoId = 1;
  private errorTimer: ReturnType<typeof setTimeout> | null = null;

  get filteredTodos(): TodoModel[] {
    switch (this.filter) {
      case 'active':
        return this.todos.filter(todo => !todo.completed);

      case 'completed':
        return this.todos.filter(todo => todo.completed);

      default:
        return this.todos;
    }
  }

  get activeTodosCount(): number {
    return this.todos.filter(todo => !todo.completed).length;
  }

  get completedTodosCount(): number {
    return this.todos.length - this.activeTodosCount;
  }

  get allTodosCompleted(): boolean {
    return this.todos.length > 0 && this.activeTodosCount === 0;
  }

  addTodo(input: HTMLInputElement): void {
    const title = input.value.trim();

    if (!title) {
      this.setErrorMessage('Title should not be empty');
      return;
    }

    this.todos = [
      ...this.todos,
      {
        id: this.nextTodoId,
        title,
        completed: false,
      },
    ];
    this.nextTodoId += 1;
    input.value = '';
  }

  toggleTodo(todoId: number): void {
    this.todos = this.todos.map(todo => (
      todo.id === todoId
        ? { ...todo, completed: !todo.completed }
        : todo
    ));
  }

  deleteTodo(todoId: number): void {
    this.todos = this.todos.filter(todo => todo.id !== todoId);
  }

  renameTodo({ id, title }: { id: number; title: string }): void {
    const normalizedTitle = title.trim();

    if (!normalizedTitle) {
      this.deleteTodo(id);
      return;
    }

    this.todos = this.todos.map(todo => (
      todo.id === id
        ? { ...todo, title: normalizedTitle }
        : todo
    ));
  }

  toggleAllTodos(): void {
    const shouldComplete = !this.allTodosCompleted;

    this.todos = this.todos.map(todo => ({
      ...todo,
      completed: shouldComplete,
    }));
  }

  clearCompletedTodos(): void {
    this.todos = this.todos.filter(todo => !todo.completed);
  }

  setFilter(event: Event, filter: TodoFilter): void {
    event.preventDefault();
    this.filter = filter;
  }

  setErrorMessage(message: string): void {
    this.errorMessage = message;

    if (this.errorTimer) {
      clearTimeout(this.errorTimer);
    }

    if (message) {
      this.errorTimer = setTimeout(() => {
        this.errorMessage = '';
        this.errorTimer = null;
      }, 3000);
    }
  }
}
