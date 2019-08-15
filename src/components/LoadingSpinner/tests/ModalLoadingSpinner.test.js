import React from 'react';
import { shallow } from 'enzyme';
import { Spinner } from 'react-bootstrap';
import { ModalLoadingSpinner }  from '../ModalLoadingSpinner';

it('renders without crashing', () => {
    const component = shallow(<ModalLoadingSpinner loading={true} />);
    expect(component.find(Spinner).length).toEqual(1);
});
