import { render, screen } from '@testing-library/react';

import Button from './Button';

describe('Button component', () => {
  test('should render a button with label', () => {
    // Arrange
    const buttonLabel = 'Save';
    render(<Button>{buttonLabel}</Button>);

    const buttonElement = screen.getByRole('button');

    expect(buttonElement).toHaveTextContent(buttonLabel);
  });

  test('should render a disabled button if button is disabled', () => {
    // Arrange
    render(<Button disabled>Save</Button>);

    // Assert.
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toBeDisabled();
  });

  test('should render a disabled button if button is loading', () => {
    // Arrange
    render(<Button isLoading={true}>Save</Button>);

    // Assert.
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toBeDisabled();
  });

  test('should render a button of type submit', () => {
    // Arrange
    render(<Button type="submit">Save</Button>);

    // Assert.
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toHaveAttribute('type', 'submit');
  });

  test('should render a button of type button', () => {
    // Arrange
    render(<Button>Save</Button>);

    // Assert.
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toHaveAttribute('type', 'button');
  });

  test('should render a full width button', () => {
    // Arrange
    render(<Button expanded>Save</Button>);

    // Assert.
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toHaveAttribute('type', 'button');
  });

  // test('should render a button as a Link', () => {
  //   // Arrange
  //   render(<Button as={Link} to="">Save</Button>);

  //   const linkElement = screen.getByRole('link');

  //   expect(linkElement).toHaveAttribute('href', '/');
  // });

  //    test('button clicked', () => {
  //      // Arrange
  //      render(<Button>Save</Button>);

  //      const buttonElement = screen.getByRole('button');
  //      userEvent.click(buttonElement)

  //    });
});
