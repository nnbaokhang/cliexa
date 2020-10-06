import React, { Component } from 'react'

class SearchBar extends Component {
    constructor (props) {
        super(props)
        this.state = {switch: false, question:"", match: []}
        this.handleSearch = this.handleSearch.bind(this)
        this.clickOnQuestion = this.clickOnQuestion.bind(this)
    }

    handleSearch (e) {
        e.preventDefault()
        let newMatch = []
        for(let i = 0; i < this.props.data.length; i++){
            if(e.target.value ===  this.props.data[i].q){
                newMatch.push(this.props.data[i])
            }

        }

        this.setState({question:e.target.value,match:newMatch})

    }

    clickOnQuestion(e){
            this.props.clickOnSearch(e.target.dataset.id)
    }
    render () {
        return (
            <div className='SearchBar-Container' >
                <input
                    style={{ height: "50px",width: "400px",fontSize:"25px", borderRadius: "50px 20px"}}
                        type='text'
                        placeholder='Search your question!...'
                        onChange={this.handleSearch}
                        value={this.state.question} />
                { this.state.match.length > 0 &&
                <div className='SearchBar-Container-Result'>
                        {
                            this.state.match.map((item, i) => {
                                return (
                                    <div key={i} onClick={this.clickOnQuestion} data-id={item.q}>{item.q}</div>
                                )
                            })
                        }
                    </div>
                }

            </div>
        )
    }
}

export default SearchBar