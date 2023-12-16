import React, { useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";
import { v4 as uuid } from "uuid";

function ShoppingList({ items, setItems}) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [itemData, setItemData] = useState({name:"", category:"Produce"});

  const [selected, setSelected] = useState("Produce"); // Declare a state variable

  const [search, setSearch] = useState("");


  
  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }

  const filteredProducts = items.filter(item => item.name.includes(search));

  const itemsToDisplay = filteredProducts.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });


  function handleChange(event){
    // id,name and category are the KEY in the itemData object we are trying to update
    
    const name = event.target.name;
    let value = event.target.value;

      // Update state based on name and value
  if (name === "category") {
    setItemData({ ...itemData, [name]: value }); // Set itemData.category state
  } else {
    // Update item data name state
    setItemData({ ...itemData, [name]: value });
  }
    
  }

  function onItemFormSubmit(event){
    event.preventDefault();
    const newItem = {
      id: uuid(), // the `uuid` library can be used to generate a unique id
      name: itemData.name,
      category: itemData.category,
    };
  
    // Add the new item to the items list
    setItems([...items, newItem]);
  
    // // Clear the form fields
    // setItemData({name: "", category: "Produce"});

    

  }

  

  return (
    <div className="ShoppingList">
      <ItemForm itemData={itemData} handleChange={handleChange} onItemFormSubmit={onItemFormSubmit} selected={selected} setSelected={setSelected} />
      <Filter onCategoryChange={handleCategoryChange} search={search} onSearchChange={setSearch} />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} name={item.name} category={item.category} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
