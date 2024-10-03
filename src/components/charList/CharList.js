import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import './charList.scss';

class CharList extends Component {

    state = {
        chars:[],
        selected:''
    }

    marvelService = new MarvelService();

    onCharLoaded =(chars) => {
        this.setState({chars});
    }

    updateCharacters = () => {
        this.marvelService.getCharacters(9).then(
            this.onCharLoaded
        );
    }

    selectChar =(id) => {
        this.setState({id});
    } 

    componentDidMount(){
        this.updateCharacters(); 
    }

    render(){
        const ulContent = (this.state.chars && typeof(this.state.chars)!=="undefined") ? this.getView(this.state.chars) : '';
        return (
            <div className="char__list">
                {ulContent}
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }

    getView = (chars) => {
        const charsLi = (chars  && typeof(chars)!=="undefined") ? chars.map(this.getViewChar) : '';
        return (
            <ul className="char__grid">
                {charsLi}
            </ul>
        )
    }
 

    getViewChar = (char) => {
        const {id, name,  thumbnail} = char;
        const className = this.id === this.selected ? "char__item char__item_selected" : "char__item";
        return (
            <li className={className} onClick={this.selectChar(id)}>
            <img src={thumbnail} alt={name}/>
            <div className="char__name">{this.name}</div>
        </li>
        )
    }
}

export default CharList;