import React from 'react';
import TextInput from '../common/TextInput';
import PropTypes from 'prop-types'


const LoginForm=({onSave,user, username, onChange, errors,buttonname}) => {
    return(
        <form>
            <TextInput 
                name="username"
                label="username"
                value={buttonname=='update'? username : user.username }
                disabled={buttonname=='update'}
                onChange = {onChange} error={errors.noUser}
            />
            <TextInput 
                name="password"
                label="password"
                onChange = {onChange}
            />
            <input
                className="btn btn-primary btn-lg"
                type="submit"
                value = {buttonname}
                onClick={onSave}
            />
        </form>
    );
};


LoginForm.propTypes = {
    onSave: PropTypes.func.isRequired,
    errors: PropTypes.object
};

export default LoginForm;