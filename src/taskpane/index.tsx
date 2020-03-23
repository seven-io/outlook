import 'office-ui-fabric-react/dist/css/fabric.min.css';
import * as React from 'react';
import {AppContainer} from 'react-hot-loader';
import * as ReactDOM from 'react-dom';
import {initializeIcons} from 'office-ui-fabric-react/lib/Icons';

import App from './components/App';

initializeIcons();

const COMPONENT_PATH = './components/App';

let isOfficeInitialized = false;

const render = (Component: any) => ReactDOM.render(
    <AppContainer>
        <Component isOfficeInitialized={isOfficeInitialized}/>
    </AppContainer>,
    document.getElementById('container')
);

Office.initialize = () => {
    isOfficeInitialized = true;

    render(App); // Render application after Office initializes
};

render(App); // Initial render showing a progress bar

if ((module as any).hot) {
    (module as any).hot.accept(COMPONENT_PATH, () => render(require(COMPONENT_PATH).default));
}
