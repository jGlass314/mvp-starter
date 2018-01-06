import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: ''
    }
  }

  onChange(e) {
    this.setState({
      term: e.target.value
    })
  }

  onClick() {
    this.props.callback(this.state.term);
    this.setState({
      term: ''
    });
  }

  render() {
    return (
      <div>
        <input type='text' value={this.state.term} style={{'background-color':'#c1f2c7'}} onChange={(event) => this.onChange(event)} />
        <button type='button' onClick={() => this.onClick()}>Search</button>
      </div>
    )
  }
}

export default Search;
