import React, { Component } from 'react';
import './App.css';

import DataBank from './components/DataBank';
import InputAccount from './components/InputAccount';

class App extends Component {

  constructor(props) {
    super()

    this.state = {
      accounts: [],
      onDataUpdate: false,
      selectedAccount: {}
    }
  }

  componentDidMount() {
    // Check if not empty
    if (localStorage.getItem('accounts') !== null) {
      // Get from localstorage
      var data = localStorage.getItem('accounts')

      // Parse to array
      var dataArr = JSON.parse(data)

      // Set to accounts
      this.setState({ accounts: dataArr })
    }
  }


  onSubmitAccount = (account) => {
    // copy current list of items
    const accounts = [...this.state.accounts];

    // add the new item to the list
    accounts.push(account);

    // update state with new list, reset the new item input
    this.setState({
      accounts,
    });

    // update localStorage
    localStorage.setItem("accounts", JSON.stringify(accounts));
  }


  onDeleteAccount = (name) => {
    // copy current list of items
    const accounts = [...this.state.accounts];

    // Filter for delete by name
    const updatedAccounts = accounts.filter(account => account.name !== name);

    // update state with new list
    this.setState({
      accounts: updatedAccounts
    });

    // update localStorage
    localStorage.setItem("accounts", JSON.stringify(updatedAccounts));
  }


  getDataAccount = (account, index) => {
    const toggleUpdate = () => {
       // Set toggle update
        if(this.state.selectedAccount){
          this.setState({ onDataUpdate: true})
        } else {
          this.setState({ onDataUpdate: false})
        }
    }
    // Set account based on holder name as id for update
    this.setState({ selectedAccount: account, indexSelectedAccount:  index }, toggleUpdate )
    
   
  }

  updateDataAccount = (data) => {
    // Get copy for accounts
    const { accounts, selectedAccount, indexSelectedAccount } =  this.state
    console.log('current account', data, selectedAccount, indexSelectedAccount)
    accounts.splice(indexSelectedAccount, 1, data)
    // const accountCopy = this.state.accounts.map((account, index) => {
      
    //   // Update account
    //   if (account.name === data.name) {
    //     account.number = data.number;
    //     account.code = data.code;
    //     account.address = data.address;
    //     account.city = data.city;
    //     account.country = data.country;
    //     account.currency = data.currency;
    //     account.type = data.type;
    //     account.first = data.first;
    //     account.last = data.last;
    //     account.company = data.company;
    //   }
    //   return account
    // })



    // Set state accounts
    this.setState((prevState, props) => ({
      accounts: accounts
    }));

    // Push to localstorage for update
    console.log('acount copy',accounts)
    localStorage.setItem('accounts', JSON.stringify(accounts));
  }

  render() {
    return (
      <div className="App">
        <div className="container">

          <div className="row">
            <div className="col-md-12">
              <DataBank accounts={this.state.accounts} onDelete={(name) => this.onDeleteAccount(name)} getDataAccount={(account, index) => this.getDataAccount(account, index)} />
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <InputAccount insertAccount={(account) => this.onSubmitAccount(account)} accounts={this.state.accounts} 
              selectedAccount={this.state.selectedAccount} onUpdate={(data) => this.updateDataAccount(data)} 
              onDataUpdate={this.state.onDataUpdate} getDataAccount={(account) => this.getDataAccount(account)}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
