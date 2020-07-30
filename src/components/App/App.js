import React from 'react';
import SearchBlock from '../SearchBlock';
import Header from '../Header';
import TodoList from '../TodoList';
import './App.css';
import Filter from '../Filter';
import ItemAddForm from '../ItemAddForm';

 

export default class App extends React.Component{

  cId = 100;

state = {
  todoData : [
    {text: 'Learn HTML', important: false, done: false, id:1}, 
    {text: 'Learn CSS', important: false, done: false, id:2}, 
    {text: 'Learn JS', important: false, done: false, id:3}  
  ],

  filter: 'Active',    // All || Active || Done
  search: ''  //type string
}


filter = (arr, filter) =>{
  switch(filter){
    case 'All':
      return arr;
    case 'Active':
      return arr.filter((el)  =>  !el.done);
    case 'Done':
      return arr.filter((el) => el.done);
    default:
      return arr;
  }
}

onSearchChange=(searchText)=>{

  this.setState((prevState)=>{

    const newArr = prevState.todoData.filter((el)=>el.text.toLowerCase().includes(searchText.toLowerCase()));
    
    return({
      search:searchText,
      searchArr:newArr
    });
  });

}

onDelete = (id)=>{
  this.setState((prevState)=>{
    const index = prevState.todoData.findIndex((el) => el.id===id);
    const arr = [...prevState.todoData.slice(0, index), ...prevState.todoData.slice(index + 1)];

    return {
      todoData: arr
    }

  })
}

onAdd = (label)=> {
 const obj = {
   text: label,
   important: false,
   id: this.cId++
 }

  this.setState((prevState)=>{

  const newArr = [ obj, ...prevState.todoData,]

    return {
      todoData: newArr
      }
    })
  }

getNewArrAccordingProp = (prop, prevState, id) =>{
  const index = prevState.todoData.findIndex((el) => el.id===id);

    const newObj = {
      ...prevState.todoData[index], [prop]: !prevState.todoData[index][prop]
    };

    const newArr = [
      ...prevState.todoData.slice(0,index),
      newObj,
      ...prevState.todoData.slice(index+1),
    ];

  return newArr;
   
}

onToggleDone = (id)=>{

  this.setState((prevState)=>{
    const newArr = this.getNewArrAccordingProp('done', prevState, id);
      return {
        todoData: newArr
      }
  });
}

onToggleImportant = (id) =>{
  this.setState((prevState)=>{
    const newArr = this.getNewArrAccordingProp('important', prevState, id);
      return {
        todoData:newArr
      }
  });
}

onFilterChange = (filter)=>{
    this.setState({
      filter: filter
    });
}

render(){

  const{ todoData, filter, search, searchArr } = this.state;

  const doneQuantity = this.state.todoData.filter((el)=>el.done).length;
  const todoQuantity = this.state.todoData.length - doneQuantity;
  const visibleTodos = search !=='' ? this.filter(searchArr, filter) : this.filter(todoData, filter);

  
    return (
      <div className="App">
        <Header  done={doneQuantity} todo={todoQuantity}/>
        <div className="line">
        <SearchBlock
          onSearchChange={this.onSearchChange}
          />
        <Filter
          filter={filter}
          onFilterChange={this.onFilterChange}
          />
        </div>
        <ItemAddForm onAdd={this.onAdd}/>
        <TodoList
          todos={visibleTodos}
          onDelete={this.onDelete}
          onToggleDone={this.onToggleDone}
          onToggleImportant={this.onToggleImportant}
      />
      </div>
    );
  }  
}
