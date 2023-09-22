import { render } from '@testing-library/react';
import Logo from './Logo';

describe('Logo component', () => {
  test('render', () => {
    render(<Logo />);
  });
});
