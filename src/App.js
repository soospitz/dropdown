import React, { useState } from "react";
import "./App.css";

function App() {
  const [lists, setLists] = useState([
    { id: 1, text: "Monday", selected: false },
    { id: 2, text: "Tuesday", selected: false },
    { id: 3, text: "Wednesday", selected: false },
    { id: 4, text: "Thursday", selected: false },
    { id: 5, text: "Friday", selected: false },
    { id: 6, text: "Saturday", selected: false },
    { id: 7, text: "Sunday", selected: false },
  ]);
  const [selected, setSelected] = useState([]);
  const [posted, setPosted] = useState([]);
  const [dropdown, setDropdown] = useState(false);
  const [dropdownStyle, setdropdownStyle] = useState({ display: "none" });
  

  const handleClick = (id) => {
    let clickedItem = {};
    let copyList = [...lists];
    copyList.forEach((list) => {
      let listSelected = list.selected;
      if (list.id === id) {
        list.selected = !listSelected;
        clickedItem = list;
      }
    });

    selected.push(clickedItem);
    setSelected(selected);

    let filteredSortedSelected = selected
      .filter((list) => list.selected)
      .sort((a, b) => a.id - b.id);

    //Array.from: turning set back to array
    //new Set(addresses.map(a => a.id)): Set to only allow unique values
    //.map(id => [...]): w/ array of ids, return the actual list
    let post = Array.from(new Set(filteredSortedSelected.map((a) => a.id))).map(
      (id) => {
        return filteredSortedSelected.find((a) => a.id === id);
      }
    );

    // //Another way using reduce:
    // const post = filteredSortedSelected.reduce((acc, current) => {
    //   const x = acc.find(item => item.id === current.id);
    //   if (!x) {
    //     return acc.concat([current]);
    //   } else {
    //     return acc;
    //   }
    // }, []);
    
    // [1,4,6,4].reduce((acc,curr)=>{
    //   return acc + curr
    // },0)

    setPosted(post);
    setLists(copyList);
  };

  const handleDelete = (id) => {
    let copyPosted = [...posted];
    copyPosted.forEach((list) => {
      if (list.id === id) {
        list.selected = false;
      }
    });
    let deletedList = copyPosted.filter((list) => {
      return list.id !== id;
    });
    setPosted(deletedList);
  };

  const dropdownClick = () => {
    console.log("dropdown clicked");
    setDropdown(!dropdown);
    if (dropdown) {
      setdropdownStyle({ display: "none" });
    } else {
      setdropdownStyle({ display: "block" });
    }
  };

  const dropdwonDelete = () => {
    posted.forEach((list) => (list.selected = false));
    setPosted([]);
  };

  const list = lists.map((list) => {
    return (
      <li
        onClick={() => {
          handleClick(list.id);
        }}
        key={list.id}
        className="list"
      >
        {list.text}
      </li>
    );
  });

  const postedList = posted.map((list) => {
    return (
      <div className="postedContainer">
        <p className="posted">
          {list.text}
          <i
            class="fas fa-times-circle"
            onClick={() => {
              handleDelete(list.id);
            }}
            key={list.id}
          ></i>
        </p>
      </div>
    );
  });

  return (
    <div className="App">
      <h1>dropdown</h1>
      <div className="dropdownContainer">
        <div className="dropdown">
          <div className="postedList">{postedList}</div>
          <i class="fas fa-times fa-lg" onClick={dropdwonDelete} id="x"></i>
          {dropdown ? (
            <i
              class="fas fa-caret-up fa-2x"
              onClick={dropdownClick}
              id="caret"
            ></i>
          ) : (
            <i
              class="fas fa-caret-down fa-2x"
              onClick={dropdownClick}
              id="caret"
            ></i>
          )}
        </div>
        <ul className="listContainer" style={dropdownStyle}>
          {list}
        </ul>
      </div>
    </div>
  );
}

export default App;
