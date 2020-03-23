import React from 'react';

export interface HeroListProps {
    items: {
        icon: string;
        primaryText: string;
    }[];
}

export default function HeroList({items}: HeroListProps) {
    return <div className='flex-center'>
        <ul className='ms-List ms-welcome__features ms-u-slideUpIn10'>
            {items.map((i, n) => <li className='ms-ListItem' key={n}>
                <i className={`ms-Icon ms-Icon--${i.icon}`}/>

                <span className='ms-font-m ms-fontColor-neutralPrimary' children={[i.primaryText]}/>
            </li>)}
        </ul>
    </div>;
}
