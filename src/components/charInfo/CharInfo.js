import { useState, useEffect } from 'react';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import PropTypes from 'prop-types';
import Skeleton from '../skeleton/Skeleton';  
import './charInfo.scss';

const CharInfo =(props) => {
    const [char, setChar] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        updateChar();
    }, [props.selectedCharId])


    const marvelService = new MarvelService();


    const onCharLoaded =(char) => {
        setChar(char);
        setLoading(false);
    }


    const onCharLoading = () => {
        setLoading(true);
    }

    const onError = () => {
        setLoading(false);
        setError(true);
    }

    const updateChar = () => {
        const charId = props.selectedCharId;
        if(!charId) {
            return;
        }
        onCharLoading();

        marvelService
        .getCharacter(charId)
        .then(onCharLoaded)
        .catch(onError);
        
    }
    
    
        const skeleton = char || loading || error ? null : <Skeleton/>;
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error || !char) ? <View char={char} /> : null;

        return (
            <div className="char__info">
                {skeleton}
                {errorMessage}
                {spinner}
                {content}
            </div>
        )
    }

    const View = ({char}) => {
        const {id, name, thumbnail, description, homepage, wiki, comics} = char; 
        const imgStyle = (thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg") ? {'objectFit': 'contain'} : {'objectFit': 'cover'};
        
        return (
            <>
                <div className="char__basics" key={id}>
                    <img src={thumbnail} alt={name} style={imgStyle}/>
                    <div>
                        <div className="char__info-name">{name}</div>
                        <div className="char__btns">
                            <a href={homepage} className="button button__main">
                                <div className="inner">homepage</div>
                            </a>
                            <a href={wiki} className="button button__secondary">
                                <div className="inner">Wiki</div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="char__descr">
                    {description}
                </div>
            
                <div className="char__comics">Comics:</div>
                <ul className="char__comics-list">
                    {
                        (comics.length>0 )? null : 'There are no comics yet.'
                    }
                    {
                        comics.map((item, i) => {
                            return (
                                <li key={i} className="char__comics-item">
                                {item.name}
                            </li>
                            )
                        })
                    }
                </ul>
            </>
        )
    }

CharInfo.propTypes = {
    charId: PropTypes.number
}

export default CharInfo;