import React, { Component } from 'react'
import axios from 'axios'

export default class InputAccount extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            number: '',
            code: '',
            address: '',
            city: '',
            country: '',
            currency: '',
            type: '',
            first: '',
            last: '',
            company: '',
            countries: []
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.selectedAccount.name !== this.state.name) {
            this.setState({ name: this.props.selectedAccount.name }, () => this.setSelectedAccount())
        }

    }

    componentDidMount(){
        this.getCurencyList()
    }

    getCurencyList = async () => {
        const { data, status } = await axios.get('https://restcountries.eu/rest/v2/all')
        if(status === 200){
            this.setState({countries: data})
        }

    }

    setSelectedAccount = () => {
        const selectedAccount = this.props.selectedAccount
        this.setState({
            name: selectedAccount.name,
            number: selectedAccount.number,
            code: selectedAccount.code,
            address: selectedAccount.address,
            city: selectedAccount.city,
            country: selectedAccount.country,
            currency: selectedAccount.currency,
            type: selectedAccount.type,
            first: selectedAccount.first,
            last: selectedAccount.last,
            company: selectedAccount.company
        })
    }


    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmitAccount = () => {
        const account = {
            name: this.state.name,
            number: this.state.number,
            code: this.state.code,
            address: this.state.address,
            city: this.state.city,
            country: this.state.country,
            currency: this.state.currency,
            type: this.state.type,
            first: this.state.first,
            last: this.state.last,
            company: this.state.company
        }

        this.props.insertAccount(account)
        this.emptyForm()
    }

    onUpdateAccount = () => {
        const account = {
            name: this.state.name,
            number: this.state.number,
            code: this.state.code,
            address: this.state.address,
            city: this.state.city,
            country: this.state.country,
            currency: this.state.currency,
            type: this.state.type,
            first: this.state.first,
            last: this.state.last,
            company: this.state.company
        }

        this.props.onUpdate(account)
        this.emptyForm()
    }

    emptyForm = () => {
        this.setState({
            name: '',
            number: '',
            code: '',
            address: '',
            city: '',
            country: '',
            currency: '',
            first: '',
            last: '',
            company: ''
        })
    }


    renderCountries = () => {
        const { countries } = this.state
        
        return (  
                <div className="input-group mb-3">
                    <select className="custom-select" name="country" placeholder={"country"} value={this.state.country} onChange={this.handleInputChange.bind(this)}>
                        {
                            countries.length > 0 ?
                                countries.map(country => (
                                <option key={country.name} value={country.name}>{country.name}</option>
                            )) :
                            <option value=""></option>
                        }
                    </select>
                </div>
        )
    }

    renderCurrencies = () => {
        const { countries, country } = this.state
        const selectedCountry = countries.filter( currCountry => currCountry.name == country )
        let currencies = selectedCountry.length > 0 ? selectedCountry[0].currencies : []
        return (        
            <div className="input-group mb-3">
                <select className="custom-select" name="currency" placeholder={"currency"} value={this.state.currency} onChange={this.handleInputChange.bind(this)}>
                    {
                        currencies.length > 0 ?
                        currencies.map(currency => (
                            <option key={currency.name} value={currency.name}>{`${currency.name}, ${currency.symbol}`}</option>
                        )) :
                        <option value=""></option>
                    }
                </select>    
            </div>
        )

    }

    render() {

        const typeAccount = () => {
            if (this.state.type === 'company') {
                return (
                    <div>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" placeholder="Company Name" name="company" value={this.state.company} onChange={this.handleInputChange.bind(this)} />
                        </div>

                    </div>
                )
            } else if (this.state.type === 'individual') {
                return (
                    <div>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" placeholder="First Name" name="first" value={this.state.first} onChange={this.handleInputChange.bind(this)} />
                        </div>

                        <div className="input-group mb-3">
                            <input type="text" className="form-control" placeholder="Last name" name="last" value={this.state.last} onChange={this.handleInputChange.bind(this)} />
                        </div>
                    </div>

                )
            }
        }

        // const currencyList = () => {

        // }

        return (
            <div>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Account Holder Name" name="name" value={this.state.name || ''} onChange={this.handleInputChange.bind(this)} />
                </div>

                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Account number" name="number" value={this.state.number || ''} onChange={this.handleInputChange.bind(this)} />
                </div>

                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Swift code" name="code" value={this.state.code || ''} onChange={this.handleInputChange.bind(this)} />
                </div>

                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Address" name="address" value={this.state.address || ''} onChange={this.handleInputChange.bind(this)} />
                </div>

                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="City" name="city" value={this.state.city || ''} onChange={this.handleInputChange.bind(this)} />
                </div>

                {/* <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Country" name="country" value={this.state.country || ''} onChange={this.handleInputChange.bind(this)} />
                </div> */}
                 {this.renderCountries()}

                 {this.renderCurrencies()}

                {/* <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Currency" name="currency" value={this.state.currency || ''} onChange={this.handleInputChange.bind(this)} />
                </div> */}

                <div className="input-group mb-3">
                    <select className="custom-select" name="type" value={this.state.type} onChange={this.handleInputChange.bind(this)}>
                        <option value=""></option>
                        <option value="individual">individual</option>
                        <option value="company">Company</option>
                    </select>
                </div>

                {typeAccount()}
               

                <button onClick={this.onUpdateAccount} className="btn btn-primary" type="submit">Update</button>
                <button onClick={this.onSubmitAccount} className="btn btn-primary" type="submit">Submit</button>
            </div>
        )
    }
}