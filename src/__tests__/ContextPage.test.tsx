import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ToggleProvider } from '@/providers/ToggleProvider';
import { ContextA, ContextB } from '@/components';

describe('Global state magagement by useContext', () => {
  it('Should change the toggle state globally', async () => {
    render(
      <ToggleProvider>
        <ContextA />
        <ContextB />
      </ToggleProvider>
    );

    expect(screen.getByTestId('toggle-a').textContent).toBe('false');
    expect(screen.getByTestId('toggle-b').textContent).toBe('false');

    await waitFor(() => userEvent.click(screen.getByRole('button')));

    expect(screen.getByTestId('toggle-a').textContent).toBe('true');
    expect(screen.getByTestId('toggle-b').textContent).toBe('true');
  });
});
