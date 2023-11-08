import React from 'react';

import HeroList from './HeroList';

export default function Welcome() {
    return <section className='ms-welcome'>
        <HeroList items={[
            {
                icon: 'Ribbon',
                primaryText: 'Redirect your emails as SMS',
            },
            {
                icon: 'Unlock',
                primaryText: 'Send out text2voice messages',
            },
            {
                icon: 'Design',
                primaryText: 'Dispatched messaging',
            },
        ]}/>

        <p className='ms-font-l'>
            Type in your seven API key, then click <b>OK</b>.
        </p>
    </section>;
}
