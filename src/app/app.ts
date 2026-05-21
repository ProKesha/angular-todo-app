import { ChangeDetectionStrategy, Component } from '@angular/core';

import { Footer } from './components/footer/footer';
import { Header } from './components/header/header';
import { Todo } from './components/todo/todo';
import { TodosService } from './services/todos';
import type {
  Todo as TodoModel,
  TodoFilter,
  TodoRename,
} from './types/todo';

@Component({
  selector: 'app-root',
  imports: [Footer, Header, Todo],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  todos: TodoModel[] = [];
  filter: TodoFilter = 'all';
  errorMessage = '';

  private nextTodoId = 1;
  private errorTimer: ReturnType<typeof setTimeout> | null = null;

  constructor(private todosService: TodosService) {
    this.todos = this.todosService.getTodos();
    this.nextTodoId = this.getNextTodoId();
  }

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

  addTodo(title: string): void {
    const normalizedTitle = title.trim();

    if (!normalizedTitle) {
      this.setErrorMessage('Title should not be empty');
      return;
    }

    this.setTodos([
      ...this.todos,
      {
        id: this.nextTodoId,
        title: normalizedTitle,
        completed: false,
      },
    ]);
    this.nextTodoId += 1;
  }

  toggleTodo(todoId: number): void {
    this.setTodos(this.todos.map(todo => (
      todo.id === todoId
        ? { ...todo, completed: !todo.completed }
        : todo
    )));
  }

  deleteTodo(todoId: number): void {
    this.setTodos(this.todos.filter(todo => todo.id !== todoId));
  }

  renameTodo({ id, title }: TodoRename): void {
    const normalizedTitle = title.trim();

    if (!normalizedTitle) {
      this.deleteTodo(id);
      return;
    }

    this.setTodos(this.todos.map(todo => (
      todo.id === id
        ? { ...todo, title: normalizedTitle }
        : todo
    )));
  }

  toggleAllTodos(): void {
    const shouldComplete = !this.allTodosCompleted;

    this.setTodos(this.todos.map(todo => ({
      ...todo,
      completed: shouldComplete,
    })));
  }

  clearCompletedTodos(): void {
    this.setTodos(this.todos.filter(todo => !todo.completed));
  }

  setFilter(filter: TodoFilter): void {
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

  private setTodos(todos: TodoModel[]): void {
    this.todos = todos;
    this.todosService.saveTodos(this.todos);
  }

  private getNextTodoId(): number {
    const maxTodoId = Math.max(0, ...this.todos.map(todo => todo.id));

    return maxTodoId + 1;
  }
}
