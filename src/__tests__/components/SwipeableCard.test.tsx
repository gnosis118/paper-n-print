import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SwipeableCard from '@/components/SwipeableCard';

describe('SwipeableCard Component', () => {
  const mockOnSwipeLeft = jest.fn();
  const mockOnSwipeRight = jest.fn();
  const mockActionClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders children correctly', () => {
    render(
      <SwipeableCard>
        <div>Test Content</div>
      </SwipeableCard>
    );

    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('calls onSwipeLeft when swiped left', () => {
    const { container } = render(
      <SwipeableCard onSwipeLeft={mockOnSwipeLeft}>
        <div>Swipe me left</div>
      </SwipeableCard>
    );

    const card = container.firstChild as HTMLElement;

    // Simulate swipe left
    fireEvent.touchStart(card, {
      touches: [{ clientX: 100, clientY: 50 }],
    });

    fireEvent.touchMove(card, {
      touches: [{ clientX: 30, clientY: 50 }],
    });

    fireEvent.touchEnd(card);

    expect(mockOnSwipeLeft).toHaveBeenCalled();
  });

  it('calls onSwipeRight when swiped right', () => {
    const { container } = render(
      <SwipeableCard onSwipeRight={mockOnSwipeRight}>
        <div>Swipe me right</div>
      </SwipeableCard>
    );

    const card = container.firstChild as HTMLElement;

    // Simulate swipe right
    fireEvent.touchStart(card, {
      touches: [{ clientX: 30, clientY: 50 }],
    });

    fireEvent.touchMove(card, {
      touches: [{ clientX: 100, clientY: 50 }],
    });

    fireEvent.touchEnd(card);

    expect(mockOnSwipeRight).toHaveBeenCalled();
  });

  it('does not trigger swipe if vertical movement is greater than horizontal', () => {
    const { container } = render(
      <SwipeableCard onSwipeLeft={mockOnSwipeLeft}>
        <div>Scroll me</div>
      </SwipeableCard>
    );

    const card = container.firstChild as HTMLElement;

    // Simulate vertical scroll (not a swipe)
    fireEvent.touchStart(card, {
      touches: [{ clientX: 50, clientY: 100 }],
    });

    fireEvent.touchMove(card, {
      touches: [{ clientX: 50, clientY: 30 }],
    });

    fireEvent.touchEnd(card);

    expect(mockOnSwipeLeft).not.toHaveBeenCalled();
  });

  it('renders action buttons when provided', () => {
    const actions = [
      {
        label: 'Delete',
        icon: <span>🗑️</span>,
        color: 'bg-red-500',
        onClick: mockActionClick,
      },
    ];

    render(
      <SwipeableCard actions={actions}>
        <div>Card with actions</div>
      </SwipeableCard>
    );

    expect(screen.getByText('Delete')).toBeInTheDocument();
  });

  it('calls action onClick when action button is clicked', async () => {
    const actions = [
      {
        label: 'Delete',
        icon: <span>🗑️</span>,
        color: 'bg-red-500',
        onClick: mockActionClick,
      },
    ];

    const { container } = render(
      <SwipeableCard actions={actions}>
        <div>Card with actions</div>
      </SwipeableCard>
    );

    const card = container.firstChild as HTMLElement;

    // Simulate swipe left to reveal actions
    fireEvent.touchStart(card, {
      touches: [{ clientX: 100, clientY: 50 }],
    });

    fireEvent.touchMove(card, {
      touches: [{ clientX: 30, clientY: 50 }],
    });

    fireEvent.touchEnd(card);

    // Click the action button
    const deleteButton = screen.getByText('Delete');
    fireEvent.click(deleteButton);

    expect(mockActionClick).toHaveBeenCalled();
  });

  it('applies custom className', () => {
    const { container } = render(
      <SwipeableCard className="custom-class">
        <div>Custom styled card</div>
      </SwipeableCard>
    );

    const card = container.firstChild as HTMLElement;
    expect(card).toHaveClass('custom-class');
  });

  it('resets swipe offset after action', async () => {
    const { container } = render(
      <SwipeableCard onSwipeLeft={mockOnSwipeLeft}>
        <div>Swipe me</div>
      </SwipeableCard>
    );

    const card = container.firstChild as HTMLElement;

    // First swipe
    fireEvent.touchStart(card, {
      touches: [{ clientX: 100, clientY: 50 }],
    });

    fireEvent.touchMove(card, {
      touches: [{ clientX: 30, clientY: 50 }],
    });

    fireEvent.touchEnd(card);

    // Check that swipe was detected
    expect(mockOnSwipeLeft).toHaveBeenCalledTimes(1);

    // Second swipe should work
    fireEvent.touchStart(card, {
      touches: [{ clientX: 100, clientY: 50 }],
    });

    fireEvent.touchMove(card, {
      touches: [{ clientX: 30, clientY: 50 }],
    });

    fireEvent.touchEnd(card);

    expect(mockOnSwipeLeft).toHaveBeenCalledTimes(2);
  });
});

