import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';



export default function BasicTextFields() {
  
  const [value, setValue] = useState("");
  const [listEdit, setListEdit] = useState([]);
  const [dupList, setDupList] = useState([]);

  function handleDelete(item) {
    let listIndex = listItems.indexOf(item)
    const newList =  myList.filter(value => value !== item); //delete the item with the same value
    const secList = dupList
    secList.splice(listIndex, 1); //delete element of the same index as the value
    setMyList(newList);
    setDupList(secList);
  }

  function handleEdit(item) {
   setListEdit(item)
  }
  
  function handleUpdate(item){
    const dateTime = new Date();
    const cleanTime = "Time Added: " + dateTime.getMonth() + "/" + dateTime.getDate() + "/" + dateTime.getFullYear() + "-" + 
    dateTime.getHours() + ":" + dateTime.getMinutes() + ":" + dateTime.getSeconds()+ ":"+ dateTime.getMilliseconds();
    const changedList = myList
    const changedDup = dupList

    let i = myList.indexOf(item)
    let textInput = document.getElementById('update_input').value //get the input from the text box
    let inputItem = (document.getElementById('update_input').value + " " + cleanTime) //input with date and time

    for(let k = 0; k < dupList.length; k++){  //checking for duplicated when updating
        if(dupList[k] === textInput){
          alert("one or more of your todos are the same!"); //alert if there are duplicates
          return;
        }      
    }
    changedList.splice(i, 1, inputItem); //edit the element in list
    changedDup.splice(i, 1, textInput) //edit the element in the duplicate check list
    setMyList(changedList); 
    setDupList(changedDup)
    setListEdit([]); //update the listEdit state
  }

  const handleSubmit = (i) => { 
   i.preventDefault()
   const dateTime = new Date();
   
   const cleanTime = "Time Added: " + dateTime.getMonth() + "/" + dateTime.getDate() + "/" + dateTime.getFullYear() + "-" + 
        dateTime.getHours() + ":" + dateTime.getMinutes() + ":" + dateTime.getSeconds()+ ":"+ dateTime.getMilliseconds();
   if(value){ 
        setMyList(myList.concat([value+ " " + cleanTime]));   //adds time and date for the item
        setDupList(dupList.concat([value])); 
        for(let j = 0; j < dupList.length; j++){
            if(dupList[j] === value){
              alert("one or more of your todos are the same!"); //alert for duplicate items
              handleDelete(dupList[j]);
            } 
            
        }
    } 
  }


  // checkbox functionaity
  const [checked, setChecked] = React.useState([1]);
  const handleToggle = (value) => () => {
  const currentIndex = checked.indexOf(value);
  const newChecked = [...checked];
  if (currentIndex === -1) {
    newChecked.push(value);
  } else {
    newChecked.splice(currentIndex, 1);
  }
    setChecked(newChecked);
  }
  
  const[myList, setMyList] = useState([]); 
  const listItems = myList.map((item)=> //using map function to print the list
  <div>
    <Checkbox 
      edge="start"
      onChange={handleToggle(item)}
      checked={checked.indexOf(item) !== -1}
      inputProps={{ 'aria-labelledby': myList.id }} 
    /> {listEdit === item ? ( <input type="text" id = "update_input"/> ):(<div>{item}</div>)}
    <br/><button type="button" onClick={function(){handleDelete(item)}}>Delete</button><button type ="button" onClick={function(){handleEdit(item)}}>Edit</button><button type = "button" onClick={function(){handleUpdate(item)}}>Update</button>
  </div>
  );

  return (
    
    <form  noValidate autoComplete="off" onSubmit={handleSubmit}>
     <TextField 
      value = {value}
      id="outlined-basic"
      label="Add To-do Item"
      variant="outlined"
      onChange={(i) => setValue(i.target.value)}
      data-testid="new-item-input"
      />
      
      
      <Button
        type="submit"
        variant="outlined"
        size = "large"
        data-testid="new-item-button"
        >Add Item</Button>

      <div >{listItems} 
      </div>  
      
    </form>
  );
}

