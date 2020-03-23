import React, {HTMLAttributes} from 'react';

export type HeaderProps = HTMLAttributes<HTMLElement> & {
    logo: string;
    message: string;
    title: string;
}

export default function Header({title, logo, message, ...props}: HeaderProps) {
    return <section className='flex-center pad-y ms-bgColor-neutralLighter ms-u-fadeIn500' {...props}>
        <img src={logo} alt={title} title={title}/>

        <h1 className='ms-fontSize-su ms-fontWeight-light ms-fontColor-neutralPrimary'>
            {message}
        </h1>
    </section>;
}