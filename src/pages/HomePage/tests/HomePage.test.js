import React from 'react';
import { shallow } from 'enzyme';
import { HomePage } from '../HomePage';
import SignIn from '../signIn'

describe('HomePage', () => {
    it('should render SignIn', () => {
        const component = shallow(<HomePage isLoggedIn={false} />);        

        expect(component.find(SignIn).exists()).toBeTruthy()
    });

    it('should render Applications', () => {
        const component = shallow(<HomePage isLoggedIn={true} accessToken="xxx" />);        

        expect(component.find('Connect(Applications)').exists()).toBeTruthy()
    });
});