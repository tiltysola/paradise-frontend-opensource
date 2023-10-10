import { useEffect, useRef } from 'react';

import {
  createOrbitControls,
  RotatingAnimation,
  SkinViewer,
  WalkingAnimation,
} from 'skinview3d';

interface Props {
  userId: string;
  skin?: string;
  cape?: string;
  skinType?: number;
}

const Index = (props: Props) => {
  const { userId, skin, cape, skinType } = props;

  const canvas = useRef<any>();

  useEffect(() => {
    const skinViewer = new SkinViewer({
      canvas: canvas.current,
      skin: skin
        ? `/api/user/texture/preview?userId=${userId}&uuid=${skin}&type=skin`
        : `/images/${skinType === 0 ? 'defaultskin' : 'slimskin'}.png`,
      cape:
        cape &&
        `/api/user/texture/preview?userId=${userId}&uuid=${cape}&type=cape`,
    });
    const control = createOrbitControls(skinViewer);
    control.enableRotate = false;
    control.enableZoom = false;
    control.enablePan = false;
    skinViewer.animations.add(WalkingAnimation);
    skinViewer.animations.add(RotatingAnimation);
    return () => {
      skinViewer.dispose();
    };
  }, [cape, skin, skinType]);

  return <canvas width={1200} height={1200} ref={canvas} />;
};

export default Index;
