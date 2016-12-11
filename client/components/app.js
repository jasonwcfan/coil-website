import React, { Component } from 'react';

class App extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className='intro'>
                <h1>coil.ink</h1>
                <p>tattoos x technology</p>
                <button id="notify-button">get notified</button>
            </div>
        )
    }
}

export default App;
