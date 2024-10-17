import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter  } from 'react-router-dom'


import {RootCmp} from './RootCmp.jsx'

import './assets/styles/main.scss'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
		<HashRouter>
			<RootCmp />
		</HashRouter>
)
