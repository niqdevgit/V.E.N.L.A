import React from 'react'
import {Helmet} from 'react-helmet-async'

const PageHead = () => {
    return (
        <Helmet>
        <title>V.E.N.L.A</title>
        <meta name='description' content='Valitse Elintarvike Neidollesi Lyhyessä Ajassa' />
        <link rel="manifest" href="manifest.json" />
        <meta name="theme-color" content="#000000" />
        </Helmet>
    )
}

export default PageHead