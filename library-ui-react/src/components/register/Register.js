import React from "react";

class Register extends React.Component {

    constructor(props) {
        super(props);
        this.state = { value: '' , loading: false};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        const val = this.state.value;
        this.setState({value: '', loading: true})
        this.register(val)
        event.preventDefault();
    }

    async register(val) {
        const data = await fetch('http://localhost:5041/api/user?name='+val)
            .then(o => o.json())
            .then(o => 
                this.setState({
                    account: o,
                    loading: "false"
                })
            );
    }

    render() {
        return (
            <div>
                <h1>Register</h1>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Name:
                        <input type="text" value={this.state.value} onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
                <p>{this.state?.account ? "Account number: " + this.state?.account : ""}</p>
            </div>
        )
    }
}
export default Register;