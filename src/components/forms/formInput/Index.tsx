/* const InputStyle = require('./_formInput.module.scss') */

type InputProps = {
    type: string,
    placeholder?: string,
    name?: string,
    className?: string,
    labelName?: string,
    label?: React.ReactHTMLElement<HTMLElement>
    [rest: string]: any;
}

const FormInput = ({ type, name, placeholder, labelName, ...rest }: InputProps) => {
    
    return (
        <div className='form-control'>
            {
            `${labelName}`
            &&
            <label className='form-label'>{labelName}</label>
            }
            <input type={type} placeholder={placeholder} name={name} className={`form-input`}  {...rest} />
            
        </div>
    )
}

export default FormInput