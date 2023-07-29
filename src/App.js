import './App.css';
import { useEffect, useState } from 'react';
const arrToDos = [
  { content: 'quet nha', isCompleted: true },
  { content: 'Nau com', isCompleted: false },
];
const App = () => {
  const [count, setCount] = useState(0);
  const [todos, setTodos] = useState([]);
  console.log({ todos });
  useEffect(() => {
    //get data từ localStorage lên cập lại useState todos
    const dataLocalStorage = getLocalStorage('toDo');
    if (dataLocalStorage) setTodos(dataLocalStorage);
  }, []);
  const handleCount = (type) => {
    switch (type) {
      case 'tang':
        setCount(count + 1);
        break;
      case 'giam':
        if (count === 0) return;
        setCount(count - 1);
        break;
      default:
        break;
    }
  };
  const handleSetLocalStorage = (val) => {
    localStorage.setItem('toDo', JSON.stringify(val));
  };
  // handleSetLocalStorage(arrToDos);
  const handleChecked = (index) => {
    console.log(index);
    // update obj thu index lai thang check
    const updaTodos = [...todos];
    updaTodos[index].isCompleted = updaTodos[index].isCompleted ? false : true;
    setTodos(updaTodos);
    // mỗi lần updata thì lưu lại local
    handleSetLocalStorage(todos);
  };
  const getLocalStorage = (key) => {
    return JSON.parse(localStorage.getItem(key));
  };

  const renderArrTodos = (arr) => {
    return arr?.map((item, index) => {
      return (
        <li
          key={index}
          className='list-item'
          onClick={() => handleChecked(index)}
        >
          <input
            type='checkbox'
            id='checkbox'
            checked={item.isCompleted}
            readOnly
          />
          <span  className={item.isCompleted ? 'isChecked ' : ''}>{item.content}</span>
          <button>X</button>
        </li>
      );
    });
  };
  return (
    <div className='App'>
      <p>{count}</p>
      <button onClick={() => handleCount('giam')}>-</button>
      <button onClick={() => handleCount('tang')}>+</button>

      <div className='to-do-app'>
        <h1>Todo Aapp</h1>
        <input type='text' id='' placeholder='Enter new task' />
        <button>add</button>
        <ul className='list-todo'>{renderArrTodos(todos)}</ul>
      </div>
    </div>
  );
};

export default App;
