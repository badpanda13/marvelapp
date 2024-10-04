import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import { Component } from "react";
import CharList from "../charList/CharList";
import PropTypes from 'prop-types';
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import decoration from '../../resources/img/vision.png';

class App extends Component {

    state = {
        selectedChar: null
    }

    
    onSelectChar = (charId) => {
       // this.myRef.
       console.log("api select: "+charId);
        this.setState({selectedChar : charId});
    }

    setInputRef = (elem) => {
        this.myRef = elem;
        if(elem !== this.selectedCharRef) {
            //меняем классы
           // this.selectedCharRef.changeClassNameUnselect();
            this.selectedCharRef = elem;
        }
    }
    render() {    
        return (
            <div className="app">
                <AppHeader/>
                <main>
                    <ErrorBoundary>
                        <RandomChar/>
                    </ErrorBoundary>
                    <div className="char__content">
                        <ErrorBoundary>
                        <   CharList ref={this.setInputRef} onSelectChar={this.onSelectChar}/>
                        </ErrorBoundary>
                        <ErrorBoundary>
                            <CharInfo selectedCharId = {this.state.selectedChar}/>
                        </ErrorBoundary>
                    </div>
                    <img className="bg-decoration" src={decoration} alt="vision"/>
                </main>
            </div>
        )
    }   
}

App.propTypes = {
    onSelectChar : PropTypes.func
}

export default App;