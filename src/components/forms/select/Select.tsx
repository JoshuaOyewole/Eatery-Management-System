import React, { useState } from 'react';
import Select from 'react-select';
import { SelectProps } from '../../../utils/types';

let jos = () => {
    console.log('Cleared');

}

export default (props: SelectProps) => {
    const [isClearable] = useState(true);
    const [isSearchable] = useState(true);
    return (
        <>
            <Select
                className="basic-single"
                classNamePrefix="select"
                isClearable={isClearable}
                isSearchable={isSearchable}
                name="color"
                onMenuClose={() => jos}
                options={props.options}
                onChange={props.handleChange}
            />
        </>
    )
}