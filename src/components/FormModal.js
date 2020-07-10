import React from 'react';
import isEmail from 'validator/lib/isEmail';

import FormField from './FormField';

class FormModal extends React.Component {
    state = {
        fields: {
            name: '',
            email: '',
            text: ''
        },
        fieldErrors: {}
    }

    onFormSubmit = e => {
        e.preventDefault();
        //If validation is not passed then don't submit
        if (this.validate()) return;
        this.props.toggleForm();
    }

    //Getting the names, and if there's errors, that errors we will keep in our state to for further validation
    onInputChange = ({ name, value, error }) => {
        const fields = this.state.fields;
        const fieldErrors = this.state.fieldErrors;

        fields[name] = value;
        fieldErrors[name] = error;

        this.setState({ fields, fieldErrors });
    };

    validate = () => {
        const { fields, fieldErrors } = this.state;
        const errMessages = Object.keys(fieldErrors).filter((k) => fieldErrors[k]);

        //If one of our fields is empty
        if (!fields.name) return true;
        if (!fields.email) return true;
        if (!fields.text) return true;
        //Or we have at least one error then the validation was failed
        if (errMessages.length) return true;

        return false;
    };

    render() {

        return(
            <div onClick={e => this.props.toggleForm(e)} className='FormModalWrapper'>
                <div className='FormModal'>
                    <form onSubmit={this.onFormSubmit}>

                        <FormField
                            placeholder='Name'
                            name='name'
                            value={this.state.fields.name}
                            onChange={this.onInputChange}
                            validate={val => (val ? false : 'Name Required')} //If there's error, print the corresponding error
                        />
                        <FormField
                            placeholder='Email'
                            name='email'
                            value={this.state.fields.email}
                            onChange={this.onInputChange}
                            validate={val => (isEmail(val) ? false : 'Invalid Email')}
                        />
                        <FormField
                            placeholder='Text'
                            name='text'
                            type='textarea'
                            value={this.state.fields.text}
                            onChange={this.onInputChange}
                            validate={val => (val ? false : 'Text Required')}
                        />

                        <input className='SubmitButton' type='submit' disabled={this.validate()} value='Submit' />

                    </form>


                </div>
            </div>
        )
    }
}

export default FormModal;