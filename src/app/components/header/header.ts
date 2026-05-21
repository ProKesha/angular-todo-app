import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  showToggleAll = input.required<boolean>();
  allTodosCompleted = input.required<boolean>();

  add = output<string>();
  toggleAll = output<void>();

  addTodo(input: HTMLInputElement): void {
    this.add.emit(input.value);

    if (input.value.trim()) {
      input.value = '';
    }
  }
}
