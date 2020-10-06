import React from 'react';
import './App.css';
import Line from "./Line";
//This is just a prototype
//
class DynamicRectangle extends React.Component{
    constructor(props) {
        super(props);
        this.state = {set:true,draw:false}
    }

    componentWillReceiveProps(props) {
        const {p1,p2,p3,p4} = this.props;
        if (props.p2 !== p2 || props.p4 !== p4 || props.p1 !== p1 || props.p3 !== p3) {
            if(this.props.mousedown && this.state.draw === false){
                this.setState({draw:true})
            }
            else if(this.props.mouseup === true && this.state.draw === true){
                this.setState({draw:false})

            }
        }
    }
    render() {
        return (
            this.state.draw && (
            <div>
                <Line object1={this.props.p1} object2={this.props.p2} rotate="180.2" background="repeating-linear-gradient(to right,red 0,red 10px,transparent 10px,transparent 12px)"/>
                <Line object1={this.props.p2} object2={this.props.p3}  rotate = "90" background="repeating-linear-gradient(to right,red 0,red 10px,transparent 10px,transparent 12px)"/>
                <Line object1={this.props.p3} object2={this.props.p4}  rotate = "180.2" background="repeating-linear-gradient(to right,red 0,red 10px,transparent 10px,transparent 12px)"/>
                <Line object1={this.props.p4} object2={this.props.p1}  rotate = "90" background="repeating-linear-gradient(to right,red 0,red 10px,transparent 10px,transparent 12px)"/>
            </div>
            )
        );
    }
}

export default DynamicRectangle;
