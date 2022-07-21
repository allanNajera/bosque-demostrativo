import { useState } from 'react';


export const UseForm = ( initialState = {} ) => {
    
    const [values, setValues] = useState(initialState);

    const reset = () => {
        setValues( initialState );
    }


    const handleInputChange = ({ target }) => {

        setValues({
            ...values,
            [ target.name ]: target.value
        });
        console.log('valor que busco', target)
    }

    return [ values, handleInputChange, reset ];

}