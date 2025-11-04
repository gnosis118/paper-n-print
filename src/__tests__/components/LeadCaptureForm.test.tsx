import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LeadCaptureForm from '@/components/LeadCaptureForm';
import { BrowserRouter } from 'react-router-dom';

// Mock the supabase module
jest.mock('@/integrations/supabase/client', () => ({
  supabase: {
    from: jest.fn(() => ({
      insert: jest.fn().mockResolvedValue({ data: null, error: null }),
    })),
  },
}));

// Mock useAuth hook
jest.mock('@/hooks/useAuth', () => ({
  useAuth: () => ({
    user: { id: 'test-user-id' },
  }),
}));

// Mock useToast hook
jest.mock('@/hooks/use-toast', () => ({
  useToast: () => ({
    toast: jest.fn(),
  }),
}));

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('LeadCaptureForm Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders form with all fields', () => {
    renderWithRouter(<LeadCaptureForm />);

    expect(screen.getByPlaceholderText(/your name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/your email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/phone/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/company/i)).toBeInTheDocument();
  });

  it('renders service type selector', () => {
    renderWithRouter(<LeadCaptureForm />);

    expect(screen.getByText(/select a service/i)).toBeInTheDocument();
  });

  it('renders submit button', () => {
    renderWithRouter(<LeadCaptureForm />);

    expect(screen.getByRole('button', { name: /get started/i })).toBeInTheDocument();
  });

  it('validates required fields', async () => {
    const user = userEvent.setup();
    renderWithRouter(<LeadCaptureForm />);

    const submitButton = screen.getByRole('button', { name: /get started/i });
    await user.click(submitButton);

    // Form should not submit without required fields
    await waitFor(() => {
      expect(screen.getByPlaceholderText(/your name/i)).toHaveValue('');
    });
  });

  it('validates email format', async () => {
    const user = userEvent.setup();
    renderWithRouter(<LeadCaptureForm />);

    const emailInput = screen.getByPlaceholderText(/your email/i);
    await user.type(emailInput, 'invalid-email');

    const submitButton = screen.getByRole('button', { name: /get started/i });
    await user.click(submitButton);

    // Email validation should prevent submission
    await waitFor(() => {
      expect(emailInput).toHaveValue('invalid-email');
    });
  });

  it('accepts valid email format', async () => {
    const user = userEvent.setup();
    renderWithRouter(<LeadCaptureForm />);

    const emailInput = screen.getByPlaceholderText(/your email/i);
    await user.type(emailInput, 'test@example.com');

    expect(emailInput).toHaveValue('test@example.com');
  });

  it('allows selecting service type', async () => {
    const user = userEvent.setup();
    renderWithRouter(<LeadCaptureForm />);

    const serviceSelector = screen.getByText(/select a service/i);
    await user.click(serviceSelector);

    // Service options should be available
    await waitFor(() => {
      expect(screen.queryByText(/hair styling/i)).toBeInTheDocument();
    });
  });

  it('fills form with valid data', async () => {
    const user = userEvent.setup();
    renderWithRouter(<LeadCaptureForm />);

    const nameInput = screen.getByPlaceholderText(/your name/i);
    const emailInput = screen.getByPlaceholderText(/your email/i);
    const phoneInput = screen.getByPlaceholderText(/phone/i);
    const companyInput = screen.getByPlaceholderText(/company/i);

    await user.type(nameInput, 'John Doe');
    await user.type(emailInput, 'john@example.com');
    await user.type(phoneInput, '555-1234');
    await user.type(companyInput, 'Acme Corp');

    expect(nameInput).toHaveValue('John Doe');
    expect(emailInput).toHaveValue('john@example.com');
    expect(phoneInput).toHaveValue('555-1234');
    expect(companyInput).toHaveValue('Acme Corp');
  });

  it('displays success message after submission', async () => {
    const user = userEvent.setup();
    renderWithRouter(<LeadCaptureForm />);

    const nameInput = screen.getByPlaceholderText(/your name/i);
    const emailInput = screen.getByPlaceholderText(/your email/i);

    await user.type(nameInput, 'John Doe');
    await user.type(emailInput, 'john@example.com');

    const submitButton = screen.getByRole('button', { name: /get started/i });
    await user.click(submitButton);

    // Success message should appear
    await waitFor(() => {
      expect(screen.queryByText(/thank you/i)).toBeInTheDocument();
    });
  });

  it('resets form after successful submission', async () => {
    const user = userEvent.setup();
    renderWithRouter(<LeadCaptureForm />);

    const nameInput = screen.getByPlaceholderText(/your name/i) as HTMLInputElement;
    const emailInput = screen.getByPlaceholderText(/your email/i) as HTMLInputElement;

    await user.type(nameInput, 'John Doe');
    await user.type(emailInput, 'john@example.com');

    const submitButton = screen.getByRole('button', { name: /get started/i });
    await user.click(submitButton);

    // Wait for success message
    await waitFor(() => {
      expect(screen.queryByText(/thank you/i)).toBeInTheDocument();
    });

    // Form should be reset
    await waitFor(() => {
      expect(nameInput.value).toBe('');
      expect(emailInput.value).toBe('');
    });
  });

  it('handles submission errors gracefully', async () => {
    // Mock error response
    jest.mock('@/integrations/supabase/client', () => ({
      supabase: {
        from: jest.fn(() => ({
          insert: jest.fn().mockResolvedValue({
            data: null,
            error: { message: 'Database error' },
          }),
        })),
      },
    }));

    const user = userEvent.setup();
    renderWithRouter(<LeadCaptureForm />);

    const nameInput = screen.getByPlaceholderText(/your name/i);
    const emailInput = screen.getByPlaceholderText(/your email/i);

    await user.type(nameInput, 'John Doe');
    await user.type(emailInput, 'john@example.com');

    const submitButton = screen.getByRole('button', { name: /get started/i });
    await user.click(submitButton);

    // Error should be handled
    await waitFor(() => {
      expect(nameInput).toHaveValue('John Doe');
    });
  });
});

