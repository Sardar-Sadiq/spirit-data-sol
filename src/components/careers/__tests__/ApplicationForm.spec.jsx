import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import ApplicationForm from '../ApplicationForm';

vi.mock('../ScrollReveal', () => ({
  default: ({ children }) => <div>{children}</div>,
}));

describe('ApplicationForm', () => {
  const openRoles = [{ title: 'Frontend Developer' }, { title: 'Backend Developer' }];

  beforeEach(() => {
    vi.stubEnv('VITE_WEB3FORMS_ACCESS_KEY', 'test-access-key');
    globalThis.fetch = vi.fn();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it('renders application form with resume link input field', () => {
    render(<ApplicationForm selectedPosition="" openRoles={openRoles} />);

    expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Phone Number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Position Applied For/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Years of Experience/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/LinkedIn Profile/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Resume \/ CV Link/i)).toBeInTheDocument();
  });

  it('handles form submission with Google Drive resume link', async () => {
    globalThis.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true, message: 'Submission successful' }),
    });

    render(<ApplicationForm selectedPosition="Frontend Developer" openRoles={openRoles} />);

    fireEvent.change(screen.getByLabelText(/Full Name/i), { target: { value: 'Jane Doe' } });
    fireEvent.change(screen.getByLabelText(/Email Address/i), { target: { value: 'jane@example.com' } });
    fireEvent.change(screen.getByLabelText(/Phone Number/i), { target: { value: '+123456789' } });
    fireEvent.change(screen.getByLabelText(/Years of Experience/i), { target: { value: '3' } });
    fireEvent.change(screen.getByLabelText(/LinkedIn Profile/i), { target: { value: 'linkedin.com/in/janedoe' } });
    fireEvent.change(screen.getByLabelText(/Resume \/ CV Link/i), { target: { value: 'https://drive.google.com/file/d/12345/view' } });

    fireEvent.click(screen.getByRole('button', { name: /Submit Application/i }));

    await waitFor(() => {
      expect(globalThis.fetch).toHaveBeenCalledWith('https://api.web3forms.com/submit', expect.any(Object));
      expect(screen.getByText(/Application Submitted/i)).toBeInTheDocument();
    });
  });
});
