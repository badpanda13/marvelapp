import './comicsList.scss';
import { useState, useEffect } from 'react';
import uw from '../../resources/img/UW.png';
import xMen from '../../resources/img/x-men.png';
import useMarvelService from '../../services/MarvelService';

const ComicsList = (props) => {
    const {loading, error, getComicsByChar, clearError} = useMarvelService();
    const [comicsList, setComicsList] = useState([]);

    useEffect(() => {
        onRequest();
        console.log("update comics list");
    }, [props.charId])

    const onRequest = () => {
        const {charId} = props;
        if(charId) {
            clearError();
            getComicsByChar(charId)
                .then(onComicsListLoaded)
        }
    }

    const onComicsListLoaded = (comicsList) => {
        console.log(comicsList[0]);
        setComicsList(comicsList);
    }
    
    const renderItems =(comicsList) => {
        const items = comicsList.map((item,i) => {
            return (
                <li className="comics__item" key={i}>
                    <a href={item.homepage}>
                        <img src={item.thumbnail} alt={item.title} className="comics__item-img"/>
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.price}$</div>
                    </a>
                </li>
            )
        })

        return items;
    }

  /*  if(!error){
        clearError();
    }*/
   // const comicsList = getAllComics(props.charId);
    console.log(props.charId);
    const items = props.charId ? renderItems(comicsList) : null;
    return (
        <div className="comics__list">
            <ul className="comics__grid">
                
                {items}
            </ul>
            <button className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;