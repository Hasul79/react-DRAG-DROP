import React, { useState } from 'react';
import './style.css';

const App = () => {
  const [boards, setBoards] = useState([
    {
      id: 1,
      title: <h1>Todo</h1>,
      items: [
        { id: 1, title: '1. to read' },
        { id: 2, title: '2. to write' },
        { id: 3, title: '3. to draw' },
      ],
    },
    {
      id: 2,
      title: <h1>In Progress</h1>,
      items: [
        { id: 4, title: '4. Reading' },
        { id: 5, title: '5. writing' },
        { id: 6, title: '6. drawing' },
      ],
    },
    {
      id: 3,
      title: <h1>Done</h1>,
      items: [
        { id: 7, title: '7. Poyti w magazin' },
        { id: 8, title: '8. wykinut musor' },
        { id: 9, title: '9. Pakushat' },
      ],
    },
  ]);

  const [currentBoard, setCurrentBoard] = useState('');
  const [currentItem, setCurrentItem] = useState('');

  function dragOverHandler(e, board, item) {
    e.preventDefault();
    if (e.target.className == 'item') {
      e.target.style.boxShadow = '0 4px 5px black';
    }
  }
  function dragLeaveHandler(e) {
    e.target.style.boxShadow = 'none';
  }
  function dragStartHandler(e, board, item) {
    setCurrentBoard(board);
    setCurrentItem(item);
  }
  function dragEndHandler(e) {
    e.target.style.boxShadow = 'none';
  }

  function dropHandler(e, board, item) {
    e.preventDefault();
    const currentIndex = currentBoard.items.indexOf(currentItem);
    currentBoard.items.splice(currentIndex, 1);
    const dropIndex = board.items.indexOf(item);
    board.items.splice(dropIndex + 1, 0, currentItem);
    setBoards(
      boards.map((b) => {
        if (b.id === board.id) {
          return board;
        }
        if (b.id === currentBoard.id) {
          return currentBoard;
        }
        return b;
      })
    );
    e.target.style.boxShadow = 'none';
  }
  function dropCardHandler(e, board) {
    board.items.push(currentItem);
    const currentIndex = currentBoard.items.indexOf(currentItem);
    currentBoard.items.splice(currentIndex, 1);
    setBoards(
      boards.map((b) => {
        if (b.id === board.id) {
          return board;
        }
        if (b.id === currentBoard.id) {
          return currentBoard;
        }
        return b;
      })
    );
    e.target.style.boxShadow = 'none';
  }

  return (
    <div className="app">
      <span>Drag & Drop</span>
      {/* ստեղծում ենք map ֆունցիա, շարժվում ենք ամբողջ մասսիվների վրայով,*/}
      {boards.map((board) => (
        //  յուր համար ստեղծում ենք բլոկ - board անունով
        <div
          className="board"
          onDragOver={(e) => dragOverHandler(e)}
          onDrop={(e) => dropHandler(e, board)}
        >
          {/* յուր․ board  ունի դինամիկ փոփոխվող վերնագիրն, ստանում է board.title կողմից  */}

          <div className="board__title">{board.title}</div>
          {/* յուր․ կողմ ունի առաջադրանքների զանգված []  և պահվում է item,  շարժվում է ամբողջի [] վրա */}
          {board.items.map((item) => (
            <div
              // և աշխատացնելու համար, ստեղծում ենք ֆունկցիայով աշխատացնող
              onDragOver={(e) => dragOverHandler(e)}
              onDragLeave={(e) => dragLeaveHandler(e)}
              onDragStart={(e) => dragStartHandler(e, board, item)}
              onDragEnd={(e) => dragEndHandler(e)}
              onDrop={(e) => dropHandler(e, board, item)}
              className="todo"
              //  օբյեկտները տեղափոխելու համար draggable=true հրամանը
              draggable={true}
              //  ստեղծում ենք բլոկ  item անունով,  ստանում է վերնագիր item.title կողմից
              className="item"
            >
              {item.title}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default App;
