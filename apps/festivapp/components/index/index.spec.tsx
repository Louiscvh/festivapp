import React from 'react';
import { render } from '@testing-library/react';

import Index from '../../pages/index';

describe('Test for the navigations', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Index />);
    expect(baseElement).toBeTruthy();
  });
});
