import useMarvelService from '../../services/MarvelService';
import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage as FormikErrorMessage} from 'formik';
import * as Yup from 'yup'; 
import './searchPanel.scss';
import { Link } from 'react-router-dom';
import ErrorMessage from '../errorMessage/ErrorMessage';

const SearchPanel = (props) => {

    const [char, setChar] = useState(null);
    const {getCharacterByName, clearError, process, setProcess} = useMarvelService();


    const onCharLoaded = (char) => {
        console.log("onCharLoaded "+char.name);
        setChar(char);
    }

    const updateCharacter = (searchText) => {
        clearError();

        getCharacterByName(searchText)
        .then(onCharLoaded)
        .then(() => setProcess('confirmed'));
}

    const errorMessage = process === 'error' ? <div className="char__search-critical-error"><ErrorMessage /></div> : null;
    const results = !char ? null : char ?
                <div className="char__search-wrapper">
                    <div className="char__search-success">There is! Visit {char.name} page?</div>
                    <Link to={`/characters/${char.id}`} className="button button__secondary">
                        <div className="inner">To page</div>
                    </Link>
                </div> : 
                <div className="char__search-error">
                    The character was not found. Check the name and try again
                </div>;

return (
    <div className="char__search-form">
        <Formik
            initialValues = {{
                charName: ''
            }}
            validationSchema = {Yup.object({
                charName: Yup.string().required('This field is required')
            })}
            onSubmit = { ({charName}) => {
                updateCharacter(charName);
            }}
        >
            <Form>
                <label className="char__search-label" htmlFor="charName">Or find a character by name:</label>
                <div className="char__search-wrapper">
                    <Field 
                        id="charName" 
                        name='charName' 
                        type='text' 
                        placeholder="Enter name"/>
                    <button 
                        type='submit' 
                        className="button button__main"
                        disabled={process === 'loading'}>
                        <div className="inner">find</div>
                    </button>
                </div>
                <FormikErrorMessage component="div" className="char__search-error" name="charName" />
            </Form>
        </Formik>
        {results}
        {errorMessage}
    </div>
)
}

export default SearchPanel;