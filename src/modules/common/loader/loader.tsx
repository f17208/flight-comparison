import { Logo } from '../icons/icons';
import { Typography } from '../typography/typography';

export const Loader = () => {
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
        Loading...
      </Typography>
    </div>
  );
};
