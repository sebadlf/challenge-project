import React from 'react';
import './error-message.css';

interface ErrorMessageProps {
	message: string;
}

const ErrorMessage = ({ message }: ErrorMessageProps): React.ReactElement => (
	<div className="ErrorMessage">{message}</div>
);

export default ErrorMessage;
