import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import { Volume2, ArrowDownUp } from 'lucide-react';

const VideoWrapper = styled.div`
  width: 30%;
  margin: 0 auto;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  @media (max-width: 1024px) {
    width: 50%;
  }
  @media (max-width: 768px) {
    width: 70%;
  }
  @media (max-width: 480px) {
    width: 90%;
  }
`;
const StyledVideo = styled.video<{ flip: boolean }>`
  width: 100%;
  height: auto;
  display: block;
  transform: ${(props) => (props.flip ? 'rotate(180deg)' : 'none')};
  transition: transform 0.3s ease-in-out;
`;
const Banner = styled.div`
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.75);
  color: white;
  padding: 8px 40px;
  border-radius: 8px;
  font-weight: 500;
  font-size: 25px;
  z-index: 2;
  box-shadow: 0 0 10px #dd5d13;
  align-items: center;
  display: flex;
`;
const BannerText = styled.div`
  width: max-content;
`;
const VolumeIcon = styled(Volume2)`
  color: #fff;
  width: 25px;
  height: 25px;
  margin-left: 20px;
`;
const ArrowsIcon = styled(ArrowDownUp)`
  color: #fff;
  width: 25px;
  height: 25px;
  margin-left: 10px;
`;
const ControlButtons = styled.div`
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
  z-index: 2;
`;
const FlipButton = styled.button`
display: flex;
align-items: center;
  padding: 8px 16px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
  &:focus-visible {
    outline: none;
  }
  &:focus {
    outline: none;
  }
`;

const VideoPlayer: React.FC = () => {
  const [showBanner, setShowBanner] = useState(true);
  const [flip, setFlip] = useState(false);

  const source = 'https://pub-a533d7a161bc41eca89a828f02f64e12.r2.dev/savethedate.mp4'
  const sourceDown = 'https://pub-a533d7a161bc41eca89a828f02f64e12.r2.dev/savethedatedown.mp4'

  useEffect(() => {
    const timer = setTimeout(() => setShowBanner(false), 3000);
    return () => clearTimeout(timer);
  }, []);
  const handleFlip = () => setFlip((prevFlip) => !prevFlip);

  return (
    <VideoWrapper>
      {showBanner && <Banner><BannerText>Volume up</BannerText> <VolumeIcon /></Banner>}
      <StyledVideo controls flip={flip}>
        <source
          src={window.innerWidth > 768 ? sourceDown : source}
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </StyledVideo>
      <ControlButtons>
        <FlipButton onClick={handleFlip}>{flip ? 'Flip Back' : 'Flip'} <ArrowsIcon /></FlipButton>
      </ControlButtons>
    </VideoWrapper>
  );
};

export default VideoPlayer;