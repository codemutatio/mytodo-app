import React, {Component} from 'react'
import  Head from 'next/head'
import TodoInput from '../components/TodoInput'
import TodoList from '../components/TodoList'
import uuid from 'uuid'
import fetch from 'isomorphic-unfetch'


class App extends Component {
  // the state object so as to create a communication between chioldrean since react support a one way data flow
  state={
    items:[],
    id:uuid(),
    item:'',
    editItem: false
  }
  static async getInitialProps () {
    // eslint-disable-next-line no-undef
    const res = await fetch('http://localhost:3000/api/v1/todos')
    const json = await res.json()
    return { items: json.todos }
  }

  componentWillMount() {
    this.setState({
      items: this.props.items
    })
  }

  //Function to get the input in the todo input and set it to the value of the item in the setState methhod
  handleChange = (e) =>{
    this.setState({
        item: e.target.value
    });
  };

  //Function to 1 prevent the default in the  todo input, 2 create a new object with the inputted todo item, 3 create an updatedItems array with the newitem and the state item 4 set the value of state to thehe new values inputted on submit
  handleSubmit = e => {
    e.preventDefault();

   const newItem ={
        id:  this.state.id,
        title: this.state.item 
    };

    const updatedItems = [...this.state.items, newItem];
    
    this.setState({
        items: updatedItems,
        item:'',
        id: uuid(),
        editItem: false
    });

  };

  //Funtion to clear the todo list on click of the clearlist button
  clearList = () => {
    this.setState({
        items: []
    });
};

//Function to delete items in the todo list on click of the delete icon
handleDelete = (id) => {
    const filteredItems = this.state.items.filter(item => item.id !== id);
    this.setState({
        items: filteredItems
    });
};

//Function to edit selected item
handleEdit = (id) => {
    const filteredItems = this.state.items.filter(item => item.id !== id);

    const selectedItem = this.state.items.find(item => item.id ===id );

    this.setState({
        items: filteredItems,
        item: selectedItem.title,
        editItem: true,
        id:id

    })
};

    render() {
        return (
            <section className='todoapp'>
              <Head>
                  <link rel="shortcut icon" type="image/x-icon" href="http://ryanjbaxter.com/wp-content/uploads/2014/05/logo-icon.png" width="16px" height="16px"/>
                  <title>TODO APP</title>
                  <meta name='viewport' content='initial-scale=1.0, width=device-width' />
                  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossOrigin="anonymous"></link>
                  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossOrigin="anonymous" />
                </Head>
                <div className="container">
                <div className="row">
                    <div className="col-10 mx-auto col-md-8 mt-4">
                        <h3 className="text-capitalized text-center">todo input</h3>
                        <TodoInput 
                        item={this.state.item} 
                        handleChange={this.handleChange}
                        handleSubmit={this.handleSubmit}
                        editItem={this.state.editItem}
                        />
                        <TodoList 
                        items={this.state.items}
                        clearList={this.clearList}
                        handleDelete={this.handleDelete}
                        handleEdit={this.handleEdit}
                        />
                    </div>
                </div>
              </div>
            </section>
        )
    }
}


export default App;