import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { Header } from '../Header';

it('should render Header', () => {
    const email = "test@yopmail.com"
    const component = shallow(<Header
        isLoggedIn={true}
        email={email} />);

    expect(component.text()).toContain(email);
    expect(toJson(component)).toMatchSnapshot();
});