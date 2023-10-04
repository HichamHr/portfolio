import React, { Component } from 'react'
import Select from 'react-select'
export default class Multi extends Component {

  constructor(props){
    super(props)
    const selectedGenres = this.props.selectedGenres.map(d => ({
      "value" : d.uuid,
      "label" : d.name
    }))
    const options = this.props.genres.map(d => ({
      "value" : d.uuid,
      "label" : d.name
    }))
    this.state = {
      selectOptions : options,
      value: selectedGenres
    }
  }

  filterByUUID (filteredData)  {
    let genresL = [];
    let genres_ = this.props.genres;
    filteredData.forEach((item)=>{
      genres_.forEach((genre)=>{
        if(genre.uuid === item.value)
          genresL.push(genre)
      })
    })
    return genresL
  };

  handleChange(e){
    this.setState({value:e})
    this.props.onChange(this.filterByUUID(e));
  }

  render() {
    return (
      <div className={this.props.className}>
        <label className="form-label" >
          Genres
        </label>
        <Select value={this.state.value}
                options={this.state.selectOptions}
                onChange={this.handleChange.bind(this)}
                isMulti />
      </div>
    )
  }
}
