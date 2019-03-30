import React, { Component } from 'react'
import DataBankItem from './DataBankItem';

export default class DataBank extends Component {  

    render() {

        const account = this.props.accounts.map((account) => {
            return <DataBankItem onDelete={this.props.onDelete} account={account} getDataAccount={this.props.getDataAccount} />
        })

        return (
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Holder Name</th>
                            <th scope="col">Number</th>
                            <th scope="col">Swift Code</th>
                            <th scope="col">Address</th>
                            <th scope="col">City</th>
                            <th scope="col">Country</th>
                            <th scope="col">Curency</th>
                            <th scope="col">Type</th>
                            <th scope="col">Aksi</th>
                        </tr>
                    </thead>

                    <tbody>
                        {account}
                    </tbody>

                </table>
            </div>
        )
    }
}
