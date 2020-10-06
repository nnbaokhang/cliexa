import React from 'react';
import './App.css';
import Draggable from "react-draggable";
import ReactDOM from "react-dom";
import Circle from './Circle'
//This is just a prototype
//
class Rectangle extends React.Component{
    constructor(props) {
        super(props);
        this.state = { id: this.props.id, title: null, coordinate: null, tempt_h: 0, tempt_v: 0, horizon: this.props.horizon, vertical: this.props.vertical, width:200,height:150,mousedown:false, mouseup:true}; //null for start, 1 for yes and 0 for no
        this.Yes = this.Yes.bind(this)
        this.No  = this.No.bind(this)
        this.rectangle = React.createRef();
        this.mouseMove = this.mouseMove.bind(this)

    }

    Yes(e){
        //If click yes
        e.preventDefault()
        const rect = ReactDOM
            .findDOMNode(this.rectangle.current)
            .getBoundingClientRect();
        // For now, search the text file and populate new data
        let coordinate = {title: this.props.title, id: this.state.id + 1,rect: {x:this.state.tempt_h + 200 ,y :  this.state.tempt_v}}

        let answer = 1
        this.props.parentMethod(coordinate,answer)
    }
    No(e){
        e.preventDefault()
        const rect = ReactDOM
            .findDOMNode(this.rectangle.current)
            .getBoundingClientRect();
        // For now, search the text file and populate new data
        let coordinate = {title: this.props.title, id: this.state.id + 1,rect: {x:this.state.horizon+200,y : this.state.tempt_v}}
        let answer = 0
        this.props.parentMethod(coordinate,answer)
    }
    //Can improve below function further by click and drag but now just dragging the mouse around

    mouseMove(e){

        if(this.props.mousedown && this.props.mousemove){
            let coordinate = {
                id: this.state.id,
                title: this.props.title,
                rect: {
                    x: e.clientX , y: e.clientY, width: this.state.width, height: this.state.height
                }
            }
            this.props.updateRectangleById(coordinate)

            this.setState({tempt_h:e.clientX, tempt_v:e.clientY})

        }

    }

    render() {
        return (
            <div   style={{position:'absolute'}} onMouseMove={this.mouseMove}>
                <Draggable  ref={this.rectangle}>
                    <div>
                        <div style={{position:'absolute',left: this.state.horizon + "px",top: this.state.vertical + 'px', width:this.state.width + "px",height:this.state.height + "px"}}>
                                <Circle horizon={this.state.width/2} vertical={0}/>
                                <div className="yes">
                                    <button onClick={this.Yes}>Yes</button>
                                </div>
                                <div className="no">
                                    <button onClick={this.No}>No</button>
                                </div>
                                <div className="innerRectangle">
                                    <p>{this.props.title}</p>
                                </div>
                        </div>
                    </div>
                </Draggable>
            </div>
        );
    }
}

export default Rectangle;
