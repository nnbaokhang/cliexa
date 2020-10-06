import React from 'react';
import './App.css';
import StackOfRectangle from "./StackOfRectangle";
import DynamicRectangle from "./DynamicRectangle";
import SearchBar from "./SearchBar";
//This is just a prototype
//
class App extends React.Component{
    constructor(props) {
        super(props);
        this.mouseDown  = this.mouseDown.bind(this)
        this.mouseUp    = this.mouseUp.bind(this)
        this.mouseMove  = this.mouseMove.bind(this)
        this.state = {mousedown: false, mouseup: true, mousemove: false, x: 0, y: 0, p1:null,p2:null,p3:null,p4:null}
    }
    mouseDown(e){
        this.setState({mousedown:true,p2:{rect:{x:e.clientX,y:e.clientY,width:0,height:0}}})
    }
    mouseMove(e){
        if(this.state.mousedown){
            this.setState({mousemove:true,p1:{rect:{x:e.clientX,y:this.state.p2.rect.y,width:0,height:0}},p3:{rect:{x:this.state.p2.rect.x,y:e.clientY,width:0,height:0}},p4:{rect:{x:e.clientX,y:e.clientY,width:0,height:0}}})
        }
        else{
            this.setState({mousemove:false, x:e.screenX,y:e.screenY})
        }
    }
    mouseUp(e){
        this.setState({mousedown:false})
        if(this.state.mousemove) {
            this.setState({mousedown: false, mousemove: false, mouseup:true,p1:{rect:{x:0,y:e.clientY,width:0,height:0}}, p2:{rect:{x:0,y:e.clientY,width:0,height:0}},p3:{rect:{x:0,y:e.clientY,width:0,height:0}} , p4:{rect:{x:0,y:e.clientY,width:0,height:0}}})
        }
    }

    render() {
        return (
      <div className="App">
        <div className="container"  onMouseDown={this.mouseDown} onMouseMove={this.mouseMove} onMouseUp={this.mouseUp}>

            <StackOfRectangle mouseX={this.state.x} mouseY={this.state.y} mousedown={this.state.mousedown} mouseup={this.state.mouseup} mousemove={this.state.mousemove}/>
            <DynamicRectangle mousedown={this.state.mousedown} mouseup={this.state.mouseup} p1={this.state.p1} p2={this.state.p2} p3={this.state.p3} p4={this.state.p4}/>
        </div>

      </div>

      )}

}

export default App;
