import React from 'react'
import { Route, Switch } from 'react-router-dom';

import {
    HomePage
} from '../../pages';

export default function Routes() {
    return (
        <Switch>
            <Route path='(/|/home)' component={HomePage} />
        </Switch>
    )
}