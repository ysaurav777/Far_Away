import React, { useState } from "react";
import "./styles.css";

function Header() {
  return (
    <div className="headdiv">
      <h1>🌴 FAR AWAY 💼</h1>
    </div>
  );
}

function Forming({ AddonItems }) {
  const [description, setDescription] = useState("");
  const [itemnum, setNum] = useState(1);

  function HandleSubmit(e) {
    e.preventDefault();
    if (!description) return;
    const newItem = { description, itemnum, packed: false, id: Date.now() };
    AddonItems(newItem);
    setDescription("");
    setNum(1);
  }

  return (
    <form className="formdiv" onSubmit={HandleSubmit}>
      <h3>What do you need for your 😍 trip</h3>
      <select
        className="forminput"
        value={itemnum}
        onChange={(e) => setNum(e.target.value)}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        className="forminput"
        placeholder="item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button className="formbtn">Add</button>
    </form>
  );
}

function Footer({ totalItems }) {
  if (!totalItems.length) {
    return (
      <div className="footdiv">
        <em>
          <p>Start you Packing</p>
        </em>
      </div>
    );
  }
  const total = totalItems.length;
  const packeditems = totalItems.filter((item) => item.packed).length;
  const percen = Math.round((packeditems / total) * 100);
  return (
    <div className="footdiv">
      <em>
        {percen === 100
          ? "You are ready to go"
          : `💼 You have ${total} items on your list, and you already packed ${" "}
      ${packeditems} (${percen}%)`}
      </em>
    </div>
  );
}

function Item({ item, onDelete, onCheckbox }) {
  return (
    <li className="itemdiv">
      <div className={item.packed ? "itemsel" : ""}>
        <div className="productdisplay">
          <input
            type="checkbox"
            value={item.packed}
            onChange={() => onCheckbox(item.id)}
          />
          <p>{item.itemnum}</p>
          <p>{item.description}</p>
        </div>
      </div>
      <button className="itembtn" onClick={() => onDelete(item.id)}>
        ❌
      </button>
    </li>
  );
}

function ItemList({ itemList, onDelete, onCheckbox, clearList }) {
  const [sortBy, setSortBy] = useState("input");

  let sortItems;

  if (sortBy === "input") sortItems = itemList;

  if (sortBy === "description")
    sortItems = itemList
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));

  /*if (sortBy === "packed")
    sortItems = itemList
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));
      
    <option value="packed">Sort by Packed Status</option>
      */

  return (
    <div className="itemlistdiv">
      <ul className="unorder">
        {sortItems.map((it) => (
          <Item item={it} onDelete={onDelete} onCheckbox={onCheckbox} />
        ))}
      </ul>
      <div className="sortoptions">
        <select
          value={sortBy}
          className="forminput"
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="input">Sort by Input Order</option>
          <option value="description">Sort by Description</option>
        </select>
        <button className="btnforminput" onClick={clearList}>
          Clear List
        </button>
      </div>
    </div>
  );
}

const App = () => {
  const [items, setItems] = useState([]);

  function handleadditem(item) {
    setItems((items) => [...items, item]);
  }

  function handledelete(id) {
    setItems((items) => items.filter((item) => item.id != id));
  }

  function toggle(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function clearList() {
    setItems([]);
  }

  return (
    <div className="App">
      <Header />
      <Forming AddonItems={handleadditem} />
      <ItemList
        itemList={items}
        onDelete={handledelete}
        onCheckbox={toggle}
        clearList={clearList}
      />
      <Footer totalItems={items} />
    </div>
  );
};

export default App;
