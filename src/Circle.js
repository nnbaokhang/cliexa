import React from 'react';



class Circle extends React.Component {

    constructor(props) {
        super(props);

    }
    render() {
        return (
            <div style={{  left:this.props.horizon, top:this.props.vertical, position:"absolute", height: "25px",width: "25px", backgroundColor:"red", borderRadius:"50%"}}/>
        )
    }
}

export default Circle