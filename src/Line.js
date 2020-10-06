import React from 'react';


class Line extends React.Component{
    constructor(props) {
        super(props);
        this.state = {width:0,top:0,left:0,transform: ""}
    }
    componentDidMount() {
        if(this.props.object1 !== null && this.props.object2 !== null) {
            let rectA = this.props.object1.rect
            let rectB = this.props.object2.rect

            let x1 = rectA.width / 2 + rectA.x
            let y1 = rectA.height / 2 + rectA.y
            let x2 = rectB.width / 2 + rectB.x
            let y2 = rectB.height / 2 + rectB.y
            //Find out the distance
            let distance = Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2))
            let m = Math.atan2(y2 - y1, x2 - x1)
            let  degree = (m * 180) / Math.PI

            if(this.props.rotate !== undefined){
                degree = this.props.rotate
            }

            this.setState({
                width: distance,
                top: (y1 + y2) / 2,
                left: ((x1 + x2) / 2 - (distance / 2)),
                transform: "rotate(" + degree + "deg)"
            })
        }
    }

    componentWillReceiveProps(props) {
        const { object1, object2} = this.props;

        if (props.object1 !== object1 || props.object2 !== object2 ) {
            if(object1 !== null && object2 !== null) {
                let rectA = object1.rect
                let rectB = object2.rect
                let x1 =  rectA.x
                let y1 =  rectA.y
                let x2 =  rectB.x
                let y2 =  rectB.y

                //Find out the distance
                let distance = Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2))
                let m = Math.atan2(y2 - y1, x2 - x1)
                let   degree = (m * 180) / Math.PI
                if(this.props.rotate !== undefined){
                    degree = this.props.rotate
                }
                this.setState({
                    width: distance,
                    top: (y1 + y2) / 2,
                    left: ((x1 + x2) / 2 - (distance / 2)),
                    transform: "rotate(" + degree + "deg)"
                })
            }
        }
    }

    render() {
        return (
               <div>
                   <div style={{height:"2px",position:"absolute",backgroundColor:"black",background: this.props.background,width:this.state.width, top:this.state.top,left:this.state.left,transform:this.state.transform}}/>
               </div>
        )
    }
}



export default Line;
