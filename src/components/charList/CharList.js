import { Component } from 'react';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import MarvelService from '../../services/MarvelService';
import './charList.scss';

class CharList extends Component {

    state = {
        charList:[],
        selected:'',
        newItemLoading: false,
        loading: true,
        error: false,
        offset: 1530,
        charEnded: false
    }

    marvelService = new MarvelService();

    onSelectChar = (charId) => {
       // console.log("select char in list " +charId+ " and "+this.state.selected);
        this.setState({selected: charId});
        console.log("select 2char in list " +charId+ " and "+this.state.selected);
        this.props.onSelectChar(charId);
    }

    onCharListLoaded = (newCharList) => {
        let ended = false;
        if (newCharList.length < 9) {
            ended = true;
        }

        this.setState(({offset, charList}) => ({
            charList: [...charList, ...newCharList],
            loading: false,
            newItemLoading: false,
            offset: offset + 9,
            charEnded: ended
        }))
    }

    onError = () => {
        this.setState({eror: true, loading: false});
    }

    onRequest = (offset) => {
        this.onCharListLoading();
        this.marvelService.getAllCharacters(offset).then(
            this.onCharListLoaded
        ).catch(this.onError);
    }

    selectChar =(id) => {
        this.setState({id});
    } 

    componentDidMount(){
        this.onRequest(); 
    }

    onCharListLoading = () => {
        this.setState({newItemLoading: true});

    }
    render(){
        console.log("selected "+this.selected);
        const chars = this.state.charList;
        const {offset, newItemLoading, error, loading, charEnded} = this.state;
        const ulContent = ( chars && typeof(chars)!=="undefined") ? this.getView(chars) : '';
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        return (
            <div className="char__list" >
                {errorMessage}
                {spinner}
                {ulContent}
                <button className="button button__main button__long"
                onClick={() => this.onRequest(offset)}
                disabled={newItemLoading}
                style={{'display': charEnded ? 'none' : 'block'}}>
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
        const className = (id === this.state.selected) ? "char__item char__item_selected" : "char__item";
        return (
            <li key={id} className={className} onClick={() => {this.onSelectChar(id)}}>
            <img src={thumbnail} alt={name} style={imgStyle}/>
            <div className="char__name">{name}</div>
        </li>
        )
    }
}

export default CharList;