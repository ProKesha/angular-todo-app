import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    localStorage.clear();

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
    app.addTodo('Learn Angular');
    expect(app.todos).toEqual([
      {
        id: 1,
        title: 'Learn Angular',
        completed: false,
      },
    ]);

    app.toggleTodo(1);
    expect(app.todos[0].completed).toBe(true);

    app.setFilter('active');
    expect(app.filteredTodos).toEqual([]);

    app.setFilter('completed');
    expect(app.filteredTodos).toEqual(app.todos);
  });

  it('should rename todos and delete them when the title is empty', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;

    app.addTodo('JS');
    app.renameTodo({ id: 1, title: 'Angular' });

    expect(app.todos[0].title).toBe('Angular');

    app.renameTodo({ id: 1, title: '   ' });

    expect(app.todos).toEqual([]);
  });

  it('should load saved todos from localStorage', () => {
    localStorage.setItem('todos', JSON.stringify([
      {
        id: 7,
        title: 'Saved todo',
        completed: false,
      },
    ]));

    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;

    expect(app.todos).toEqual([
      {
        id: 7,
        title: 'Saved todo',
        completed: false,
      },
    ]);

    app.addTodo('Next todo');

    expect(app.todos[1].id).toBe(8);
  });
});
