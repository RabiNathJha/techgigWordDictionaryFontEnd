import React from 'react';
import axios from 'axios';
import ReactJson from 'react-json-view'
class IndexPage extends React.Component {

  state = {
    selectedFile: null,
    uploadStatus: null,
    searchKey: null,
    searchResult: null,
  };

  onChangeUploadHandler=event=>{
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0,
    })
  }

  onChangeSearchHandler = event => {
    this.setState({
      searchKey: event.target.value,
      loaded: 0,
    })
  }

  onClickUploadHandler = () => {
    const data = new FormData() 
    data.append('dictionaryTxt', this.state.selectedFile)

    axios.post("http://localhost:5014/dictionary/upload", data)
    .then(() => {
      this.setState({uploadStatus:'success'})
    })
    .catch((err) => this.setState({uploadStatus:'faliure'}))
  }

  onClickSearchHandler = () => {
    const { searchKey } = this.state;
    axios.get(`http://localhost:5014/dictionary/search/${searchKey}`)
    .then(data => {
      this.setState({searchResult: data})
    })
    .catch((err) => {
      this.setState({searchResult: err})
    })
  }

  render(){

    const {uploadStatus, searchResult} = this.state;

    return(
      <div>
        <div>
            <h2 style={{color:'purple'}}>Upload dictionary:</h2>
            <input type="file" name="fileToUpload" id="fileToUpload" onChange={this.onChangeUploadHandler} />
            <button type="button" name="upload button" onClick={this.onClickUploadHandler}>Upload</button>
            {uploadStatus === 'success' && <h2 style={{color: 'green'}}>Successfuly uploaded</h2>}
            {uploadStatus === 'faliure' && <h2 style={{color: 'red'}}>Upload unsuccessful</h2>}
        </div>
        <div>
          <h2 style={{color:'blue'}}>Search words</h2>
          <input type="text" name="fname" onChange={this.onChangeSearchHandler} />
          <button type="button" name="search button" onClick={this.onClickSearchHandler}>Search</button>
          {searchResult && <ReactJson style={{marginTop:'20px'}} src={searchResult.data} />}
        </div>
      </div>
    );
  }
}

export default IndexPage
