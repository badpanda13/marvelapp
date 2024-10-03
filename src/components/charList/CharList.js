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
        const chars = this.state.chars
        const ulContent = ( chars && typeof(chars)!=="undefined") ? this.getView(chars) : '';
        return (
            <div className="char__list" >
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
        const imgStyle = (thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg") ? {'objectFit': 'contain'} : {'objectFit': 'cover'};
        const className = this.id === this.selected ? "char__item char__item_selected" : "char__item";
        return (
            <li key={id} className={className} onClick={() => this.props.onSelectChar(id)}>
            <img src={thumbnail} alt={name} style={imgStyle}/>
            <div className="char__name">{name}</div>
        </li>
        )
    }
}

export default CharList;