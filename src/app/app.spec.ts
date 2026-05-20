import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render todo app title', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('todos');
  });

  it('should add, toggle, and filter todos', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    const input = { value: 'Learn Angular' } as HTMLInputElement;

    app.addTodo(input);
    expect(app.todos).toEqual([
      {
        id: 1,
        title: 'Learn Angular',
        completed: false,
      },
    ]);
    expect(input.value).toBe('');

    app.toggleTodo(1);
    expect(app.todos[0].completed).toBe(true);

    app.setFilter(new Event('click'), 'active');
    expect(app.filteredTodos).toEqual([]);

    app.setFilter(new Event('click'), 'completed');
    expect(app.filteredTodos).toEqual(app.todos);
  });
});
