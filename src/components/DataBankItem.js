import React, { Component } from 'react'

export default class DataBankItem extends Component {

    getDataAccount = () => {
        this.props.getDataAccount(this.props.account, this.props.index)
    }

    deleteAccount = (name) => {
        this.props.onDelete(this.props.account.name)
    }

    render() {
        const account = this.props.account;
        return (
            <tr>
                <th scope="row">1</th>
                <td>{account.name}</td>
                <td>{account.number}</td>
                <td>{account.code}</td>
                <td>{account.address}</td>
                <td>{account.city}</td>
                <td>{account.country}</td>
                <td>{account.currency}</td>
                <td>{account.type}</td>
                <td>
                    <button onClick={this.getDataAccount} type="button" className="btn btn-warning btn-sm">Update</button>
                    <button onClick={this.deleteAccount} type="button" className="btn btn-danger btn-sm">Delete</button>
                </td>
            </tr>
        )
    }
}