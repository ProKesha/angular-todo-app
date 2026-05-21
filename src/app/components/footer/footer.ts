import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

import type { TodoFilter } from '../../types/todo';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Footer {
  activeTodosCount = input.required<number>();
  completedTodosCount = input.required<number>();
  filter = input.required<TodoFilter>();

  filterChange = output<TodoFilter>();
  clearCompleted = output<void>();

  setFilter(event: Event, filter: TodoFilter): void {
    event.preventDefault();
    this.filterChange.emit(filter);
  }
}
