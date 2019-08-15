import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import SignIn  from '../signIn';

it('should render SignIn', () => {
    const onSubmit = jest.fn();
    const component = shallow(<SignIn onSubmit={onSubmit} />);

    component.find('Formik').simulate('submit', { preventDefault: () => {} });

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(toJson(component)).toMatchSnapshot();
});