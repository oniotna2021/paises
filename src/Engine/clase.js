import React, { Component } from 'react';

className clase extends Component {
    constructor(props) {
        super()
        state:{
            suma:0
        }
        this.sumar = this.sumar().bind.this
    }
    componentDidMount(){
            this.sumar
    }

    sumar(){
        const a=1;
        const b=2;
        this.state.suma(a+b)
        alert(this.state.suma)
    }
    
    
    
    render() {
        return (
            <div>
                hola
                {this.state.suma}
            </div>
        );
    }
}

export default clase;