import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';
import { store } from '../app.store';

test('successfully renders app', () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>,
  );
  const element = screen.getByText('Flight Comparison');
  expect(element).toBeInTheDocument();
});
