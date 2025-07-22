// Tour utility functions
export const TOUR_KEYS = {
  THEME_TOUR: 'theme-tour-seen',
} as const;

export const resetThemeTour = () => {
  localStorage.removeItem(TOUR_KEYS.THEME_TOUR);
};

export const hasSeenThemeTour = (): boolean => {
  return localStorage.getItem(TOUR_KEYS.THEME_TOUR) === 'true';
};

export const markThemeTourAsSeen = () => {
  localStorage.setItem(TOUR_KEYS.THEME_TOUR, 'true');
};
