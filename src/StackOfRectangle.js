import React from 'react';
import './App.css';
import Rectangle from "./Rectangle";
import Line from "./Line";
import SearchBar from "./SearchBar";
//This is just a prototype
//
// data structure

class StackOfRectangle extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            switch: true,
            depth: - 1,
            data:[
                  {id:0,q:"Do you smoke?",yes:1,no:4},
                  {id:1,q:"How many packs do you smoke per day? Yes > 5 or No N 5", yes:2,no:3},
                  {id:2,q:"Did you have lungs surgery before?",yes:6,no:4},
                  {id:3,q:"Do you cough often?",yes:5,no:4},
                  {id:4,q:"Good for you",goto:6},
                  {id:5,q:"Sorry to hear that?", goto:6},
                  {id:6,q:"We are finalizing your result",loading:1}
                ],
            answer:null,top:[]}; //null for start, 1 for yes and 0 for no
        this.expand = this.expand.bind(this)
        this.updateRectangleById = this.updateRectangleById.bind(this)
        this.goBack              = this.goBack.bind(this)
        this.clickOnSearch       = this.clickOnSearch.bind(this)
    }



    expand(coordinate,answer){
        //What is the current ask?
        let index = 6
        if(answer){
            index = this.state.data[this.state.depth].yes
            if(index === undefined) {
                index = this.state.data[this.state.depth].goto
            }
            coordinate.title = this.state.data[index].q
        }
        else{
            index = this.state.data[this.state.depth].no
            
            if(index === undefined) {
                index = this.state.data[this.state.depth].goto
            }
            coordinate.title = this.state.data[index].q
        }

        this.setState(prevState => ({
            top: [...prevState.top, coordinate],
            depth: this.state.depth + 1
        }))
    }
    updateRectangleById(coordinate){
        let newArray = [...this.state.top]
        newArray[coordinate.id] = coordinate
        this.setState({top:newArray})
    }

    goBack(){
        var array = [...this.state.top]; // make a separate copy of the array
        var index = this.state.top.length - 1
        if (index !== -1) {
            array.splice(index, 1);
            this.setState({top: array});
        }
        else{
            this.setState({switch:true})
        }
    }

    clickOnSearch(data){

        let initData = {id:0,title: data,rect:{x:100,y:100}}
        this.setState({switch: false,top:[initData], depth: this.state.depth + 1});
    }

    render() {
        return (
            <div className="container">
                { this.state.switch &&
                    <SearchBar data={this.state.data} clickOnSearch={this.clickOnSearch}/>
                }
                {   !this.state.switch &&
                    <div>
                        <button onClick={this.goBack}>Go back</button>
                        {
                            this.state.top.map((item, i) => {
                                return (
                                    <div>
                                        <Rectangle parentMethod={this.expand}
                                                   updateRectangleById={this.updateRectangleById}
                                                   mouseX={this.props.mouseX} mouseY={this.props.mouseY}
                                                   mousedown={this.props.mousedown} mouseup={this.props.mouseup}
                                                   mousemove={this.props.mousemove}
                                                   id={i} horizon={item.rect.x} vertical={item.rect.y}
                                                   title={this.state.top[i].title}
                                        />
                                        {i > 0 && i < this.state.top.length &&
                                        <Line object1={this.state.top[i - 1]} object2={this.state.top[i]}
                                              background="repeating-linear-gradient(to right,red 0,red 10px,transparent 10px,transparent 12px)"/>
                                        }
                                    </div>
                                )
                            })
                        }
                    </div>
                }
            </div>

        );
    }
}

export default StackOfRectangle;
