import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import { useState } from "react";
import CharList from "../charList/CharList";
import PropTypes from 'prop-types';
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import decoration from '../../resources/img/vision.png';
import ComicsList from "../comicsList/ComicsList";

 const App = () => {

    const [selectedChar, setChar] = useState(null);
    const [comicsList, setComicsListhar] = useState(null);
    
    const onSelectChar = (charId) => {
       setChar(charId);
    }
   
        return (
            <div className="app">
                <AppHeader/>
                <main>
                    <ErrorBoundary>
                        <RandomChar/>
                    </ErrorBoundary>
                    <div className="char__content">
                    <ErrorBoundary>
                        <ComicsList charId = {selectedChar} hidden={selectedChar ? false : true}/>
                    </ErrorBoundary>
                        <ErrorBoundary>
                        <   CharList onCharSelected={onSelectChar}/>
                        </ErrorBoundary>
                        <ErrorBoundary>
                            <CharInfo charId = {selectedChar} />
                        </ErrorBoundary>
                    </div>
                    <img className="bg-decoration" src={decoration} alt="vision"/>
                </main>
            </div>
        )
    }   


App.propTypes = {
    onSelectChar : PropTypes.func
}

export default App;