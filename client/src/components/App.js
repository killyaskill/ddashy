import React, { Component } from "react";
import { BrowserRouter as Router} from "react-router-dom";

import NavigationBar from "./navigation/NavigationBar";

export default class App extends Component {
    state = {
        loading: true,
        user: null
    }

    componentDidMount() {
        fetch("https://dashy.deoxy.nl:3306/oauth/details", {
            credentials: "include"
        })
        .then(res => res.json())
        .then(res => {
            if(!res) return this.setState({ loading: false });
            this.setState({
                loading: false,
                user: res
            })
        })
        .catch(() => this.setState({loading: false}))




    }
    
    render(){
        if(this.state.loading){
            return(
                <React.Fragment>
                    <div className="container"><h1>Loading...</h1></div>
                </React.Fragment>
            );
        } else if(!this.state.user) {
            window.location.replace("https://dashy.deoxy.nl:3306/oauth/login");
            return(<React.Fragment></React.Fragment>);
        }else{
            <React.Fragment>
                <Router>
                    <div className="container">
                        <NavigationBar user={this.state.user}></NavigationBar>
                    </div>
                </Router>
            </React.Fragment>
        }
    }
}