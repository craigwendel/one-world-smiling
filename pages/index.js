import { Typography } from '@material-ui/core';
import Slideshow from '../components/Slideshow';

export default function Home() {
  return (
    <div>
      <Slideshow />
      <Typography color="primary" variant="h3">
        One World Smiling
      </Typography>
      <Typography color="secondary" variant="h5">
        This a new site I'm creating!
      </Typography>
    </div>
  );
}
