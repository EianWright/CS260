import React from "react";

class MessageDisplay extends React.Component {
    render() {
        let messageType = this.props.message.messageType;
        let text = this.props.message.messageText;
        if (messageType === 1) {
            return (
                <div className="error-message">
                    <p>{text}</p>
                </div>
            );
        }
        else if (messageType === 2) {
            return (
                <div className="success-message">
                    <p>{text}</p>
                </div>
            );
        }
        else {
            return (
                <></>
            );
        }
    }
}

export default MessageDisplay;