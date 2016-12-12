import React, { Component } from 'react';

class App extends Component {
    constructor() {
        super();
        this.state = {
            stageIndex: 0,
            subscriberName: '',
            subscriberEmail: '',
            inputValid: true,
            submitted: false
        }
        this._handleButtonClick = this._handleButtonClick.bind(this);
        this._handleTextfieldChange = this._handleTextfieldChange.bind(this);
    }

    _handleButtonClick() {
        if (this.state.stageIndex == 2) {
            if (this.state.subscriberName.length == 0 || !this.state.subscriberEmail.match(/@/)) {
                this.setState({
                    inputValid: false
                })
                return;
            } else {
                Meteor.call('subscribers.insert', this.state.subscriberName, this.state.subscriberEmail, (err, result) => {
                    if (err) {
                        console.log(err);
                    } else {
                        this.setState({
                            submitted: true
                        })
                    }
                });
            }
        }
        this.setState({
            stageIndex: this.state.stageIndex < 2 ?
                this.state.stageIndex + 1 : this.state.stageIndex
        })
    }

    _getButtonLabel(stageIndex) {
        switch (stageIndex) {
            case 0:
                return 'Who are we?';
            case 1:
                return 'Get notified';
            case 2:
                return 'Submit';
        }

    }

    _handleTextfieldChange(event, value) {
        this.setState({
            [event.target.id]: event.target.value,
            inputValid: true
        })
    }

    render() {
        const infoMessageClasses = this.state.stageIndex == 0 ?
            'message hide' : 'message';
        const subscribeMessageClasses = this.state.stageIndex <= 1 ?
            'message hide' : 'message';
        const subscribeFieldsClasses = this.state.stageIndex <= 1 ?
            'subscribe hide' : 'subscribe';
        const submitButtonClasses = this.state.inputValid ?
            'main-button' : 'main-button invalid-input'
        return (
            <div className='intro'>
                <h1>coil.ink</h1>
                <p>tattoos x technology</p>
                <div className='container'>
                    <p className={infoMessageClasses}>
                        Our mission is to give tattoo and body art studios the technology to make managing their business a breeze, so they can focus on what really matters
                    </p>
                    <div className={'separator ' + subscribeMessageClasses}/>
                    <p className={subscribeMessageClasses}>
                        Enter your name and email below to subscribe to our mailing list. Don't worry, we'll only send you emails about important updates!
                    </p>
                    <div className={subscribeFieldsClasses}>
                        <input
                            className='textfield u-full-width'
                            type='text'
                            placeholder='Name'
                            id='subscriberName'
                            onChange={this._handleTextfieldChange}/>
                        <input
                            className='textfield u-full-width'
                            type='email'
                            placeholder='Email'
                            id='subscriberEmail'
                            onChange={this._handleTextfieldChange}/>
                    </div>
                    <button
                        className={submitButtonClasses}
                        onClick={this._handleButtonClick}
                        disabled={this.state.submitted}>
                            {this._getButtonLabel(this.state.stageIndex)}
                    </button>
                    {this.state.submitted ? <p>Thank you for subscribing!</p> : null}
                </div>
            </div>
        )
    }
}

export default App;
