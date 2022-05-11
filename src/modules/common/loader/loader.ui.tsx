import { useTranslation } from 'react-i18next';

import { Logo } from '../icons';
import { Typography } from '../typography';

export const Loader = () => {
  const { t } = useTranslation();
  return (
    <div
      className="
        flex
        flex-col
        items-center
        justify-center
        space-x-2
        animate-pulse
        h-full
        position-fixed
      "
    >
      <Logo className="w-32 h-auto" />
      <Typography>
        {t('loading')}
      </Typography>
    </div>
  );
};
