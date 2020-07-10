import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Category from './Category';

class NewsFeed extends React.Component {
    state = {
        routes: [],    //Collecting our routes in a one array
    };

    componentDidMount() {
        const { sources } = this.props;
        const routes = [];

        //First we creating as much routes as we need
        for (let i = 0; i < sources.length; i++) {
            routes.push(<Route
                key={i}
                exact
                path={`/${sources[i].id}`}
                render={routeProps => <Category {...routeProps} newsData={this.props.newsData} key={Date().now} />}
            />)
        };
        //Then creating the "Home page" with the first news source feed
        routes.push(<Route key={routes.length} exact path='/' render={() => <Redirect to={sources[0].id}/>} />);
        //And finally the default Route
        routes.push(<Route key={routes.length + 1} render={() => <div>Sorry, page is not found :(</div>} />);
        
        this.setState({ routes: routes });
    }

    render() {
        return (
            <div className="NewsFeedContainer">
                <Switch>
                   {this.state.routes}
                </Switch>
            </div>
        )
    }
}

export default NewsFeed;