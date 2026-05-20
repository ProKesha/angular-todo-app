import {
  Component,
  ElementRef,
  effect,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';

import { Todo as TodoModel } from '../../types/todo';

@Component({
  selector: 'app-todo',
  imports: [],
  templateUrl: './todo.html',
  styleUrl: './todo.scss',
})
export class Todo {
  todo = input.required<TodoModel>();

  toggle = output<number>();
  delete = output<number>();
  rename = output<{ id: number; title: string }>();

  editing = signal(false);
  titleField = viewChild<ElementRef<HTMLInputElement>>('titleField');

  constructor() {
    effect(() => {
      if (this.editing()) {
        this.titleField()?.nativeElement.focus();
      }
    });
  }

  startEditing(): void {
    this.editing.set(true);
  }

  stopEditing(): void {
    this.editing.set(false);
  }

  saveTitle(input: HTMLInputElement): void {
    if (!this.editing()) {
      return;
    }

    this.rename.emit({
      id: this.todo().id,
      title: input.value,
    });

    this.stopEditing();
  }
}
