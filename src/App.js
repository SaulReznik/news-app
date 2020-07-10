import React from 'react';
import { withRouter } from 'react-router-dom';

import './App.css';
import Header from './components/Header';
import NewsFeed from './components/NewsFeed';
import FormModal from './components/FormModal';
import baseURL from './baseURL';

//URL to get only 3 sources
const SOURCES_URL = 'https://newsapi.org/v2/sources?apiKey=197bf696b52f4fa98406e1c34a0cf724';

class App extends React.Component {
  state = {
    sources: [],              //Our source array where we will keep the names and ID's of sources
    currentSource: '',        //The ID of current selected source
    newsData: [],             //News from selected source
    searchInput: '',          
    isLoading: true,
    isFailedToLoad: false,
  }

  //Getting our sources first
  componentDidMount() {
    fetch(SOURCES_URL)
      .then(res => res.json())
      .then(json => {
        const result = [];
        //Taking only 3 sources
        for (let i = 0; i < 3; i++) {
          const source = {
            id: json.sources[i].id,
            name: json.sources[i].name
          }

          result.push(source);
        }

        this.setState({ sources: result });
    })
    .then(() => this.redirectSource(0))     //After getting sources intializating our news feed with the news from the first source
    .catch(err => {
      this.setState({
        isLoading: false,
        isFailedToLoad: true
      })
    });
  }

  //Method for news fetching from selected source
  redirectSource = index => {
    fetch(baseURL(this.state.sources[index].id))
      .then(res => res.json())
      .then(json => json.articles)
      .then(articles => {
        this.setState({
          newsData: articles,
          currentSource: this.state.sources[index].id,
          isLoading: false,
        });
      })
      .then(() => this.props.history.push(this.state.sources[index].id)) //Redirecting to the new source ('This part is seems bugy IMO, Redirect doesn't worked here)
      .catch(err => {
        this.setState({
          isLoading: false,
          isFailedToLoad: true
        })
      })
  }

  //Getting the filtered data from imput
  handleInputChange = value => {
    fetch(baseURL(this.state.currentSource))
      .then(res => res.json())
      .then(json => json.articles)
      .then(articles => {
        const updatedNews = articles.filter(news => {
          return news.title.substring(0, value.length) === value;
        });
        this.setState({
          newsData: updatedNews,
          isLoading: false,
        });
      })
      .catch(err => {
        this.setState({
          isLoading: false,
          isFailedToLoad: true
        })
      })
  }

  //Dealing with event bubbling (This part is suspicious, normal methods like e.stopPropagation() doesn't worked here)
  toggleForm = e => {
    if (
      e.target.className === 'FormModalWrapper' || 
      e.target.className === 'ContactButton' ||
      e.target.className === 'SubmitButton') {
      this.setState({ isFormOpen: !this.state.isFormOpen })
    }
  }

  render() {
    const { sources, newsData, isFailedToLoad, isLoading, isFormOpen} = this.state;
    //In case of Error
    if (isFailedToLoad) return <h1>Error</h1>
    //In case of Loading
    if (isLoading) return <h1>Loading...</h1>

    return (
      <div className="App">
        <Header 
          handleInputChange={this.handleInputChange} 
          redirectSource={this.redirectSource} 
          sources={sources}
          toggleForm={this.toggleForm}
        />
        <NewsFeed sources={sources} newsData={newsData}/>
        {isFormOpen ? 
          <FormModal toggleForm={this.toggleForm} /> 
        : null}
      </div>
    );
  }
}

export default withRouter(App);
