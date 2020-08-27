# first-react-todo

세상에서 제일 간단한 TodoList

[개발 포스트](https://zinirun.github.io/2020/08/27/react-first-todolist/)

## 파일 구성과 로직

핵심적인 파일은

```
App.js
CreateTodo.js
TodoList.js
```

다음과 같이 3개이다.

투두리스트를 추가, 토글, 삭제하는 함수는 `App.js`에 작성되어 있다. `App.js`에서 앱의 전체적인 구조(`<CreateTodo>` 컴포넌트와 `<TodoList>` 컴포넌트)를 렌더링한다.

## 핵심 코드 작성하기

### useState(), useRef() 작성

```jsx
const [inputs, setInputs] = useState({
  title: '',
});

const [todos, setTodos] = useState([
  {
    id: 1,
    title: '리액트 혼내주기',
    isImportant: false,
  },
]);

const nextId = useRef(2);
```

앱에서 사용하는 변수를 `useState()`를 사용하여 선언한다. 투두리스트는 할 일(title)과 중요 여부(isImportant)로 구성되어 있다.

id는 1씩 증가시켜야 하는데, 비렌더링 객체로 관리해주기 위해 `useRef()`를 사용한다.

### 할 일 추가, 중요 여부 토글, 삭제 구현

#### onCreate()

```jsx
const onCreate = () => {
  if (title.length < 1) {
    return;
  } else {
    const newTodo = {
      id: nextId.current,
      title,
    };
    setTodos([...todos, newTodo]);
    setInputs({
      title: '',
    });
    nextId.current += 1;
  }
};
```

`CreateTodo` 객체에서 `onCreate()` 함수가 호출되면 입력된 `title` 값을 `useState()`의 set 메소드로 추가해준다. `setTodo`에서 spread 방식으로 배열에 요소를 추가해줬는데, `concat()` 메소드를 써도 상관없다. 할 일이 추가되었다면 `setInputs()` 메소드로 사용자가 입력한 값을 초기화한다. 그 후 `nextId.current`를 1 증가시킨다. (뒤에 `.current`를 붙이는 이유는 일반적인 숫자 객체가 아닌 `useRef()`로 선언된 객체이기 때문이다)

### onRemove()

```jsx
const onRemove = (id) => {
  setTodos(todos.filter((todo) => todo.id !== id));
};
```

`Todo` 객체에서 `onRemove()` 함수가 호출되면 `id`를 인자로 받아서 해당 `id` 값을 가진 요소를 제외한 배열을 필터링해서 `setTodo()` 메소드로 변수를 다시 지정한다.

### onToggle()

```jsx
const onToggle = (id) => {
  setTodos(
    todos.map((todo) => (todo.id === id ? { ...todo, isImportant: !todo.isImportant } : todo)),
  );
};
```

중요 여부를 바꿀 수 있는 `onToggle()` 객체이다. 위에서 작성한 `onRemove()` 함수와 작동방식은 비슷한데, `id`를 인자로 받아 해당 `id` 값을 가진 요소의 `isImportant`를 true, false로 바꿔준다.

### TodoList 컴포넌트 작성

`TodoList` 컴포넌트로 `todos` 데이터가 들어오면 각각을 매핑하여 `Todo` 객체로 만들어 반환한다.

```jsx
function TodoList({ todos, onRemove, onToggle }) {
  return (
    <div className="todolist-wrapper">
      {todos.map((todo) => (
        <Todo key={todo.id} todo={todo} onRemove={onRemove} onToggle={onToggle} />
      ))}
    </div>
  );
}
```
