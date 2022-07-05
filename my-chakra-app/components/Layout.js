import * as React from 'react';
import Head from 'next/head';

export default function Layout({children}) {
    return (
        <><Head>
            <title>GREENSTONE</title>
            <link rel="icon" type="image/x-icon" href="/plant.ico"></link>
        </Head>
        <div>
            {children}
        </div>
        </>
    )
}


