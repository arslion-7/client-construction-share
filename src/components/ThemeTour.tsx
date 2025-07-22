import { Tour } from 'antd';
import { useState, useEffect } from 'react';
import type { TourProps } from 'antd';
import { hasSeenThemeTour, markThemeTourAsSeen } from '@/utils/tourUtils';

interface ThemeTourProps {
  themeSwitcherRef: React.RefObject<HTMLButtonElement>;
}

export default function ThemeTour({ themeSwitcherRef }: ThemeTourProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Check if this is the user's first visit
    if (!hasSeenThemeTour()) {
      // Delay the tour to ensure the component is rendered
      const timer = setTimeout(() => {
        setOpen(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const steps: TourProps['steps'] = [
    {
      title: 'Tema üýtgetmek',
      description:
        'Bu düwmäni ulanyp ýagty ýa-da garaňky temany saýlap bilersiňiz. Temanyňyz saýlanan ýerden ýatda saklanar.',
      target: () => themeSwitcherRef.current as HTMLElement,
      placement: 'bottom',
    },
  ];

  const handleTourClose = () => {
    setOpen(false);
    // Mark that the user has seen the tour
    markThemeTourAsSeen();
  };

  return (
    <Tour
      open={open}
      onClose={handleTourClose}
      steps={steps}
      placement='bottom'
      arrow={true}
      type='primary'
    />
  );
}
