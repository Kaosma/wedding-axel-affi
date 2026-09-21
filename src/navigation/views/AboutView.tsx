import styled from "styled-components";
import MainContentCard from "../../components/cards/MainContentCard";
import { useTheme } from "../../app/AppStyling";
import { ivarImage, saraImage } from "../../helpers/constants";
import { rgba } from "polished";


const RootContainer = styled.div`
  color: black;
  background-color: ${() => rgba(useTheme().colors.red.secondary, 0.95)};
  background-size: cover;
  background-position: center;
  height: fit-content;
  align-items: center;
  justify-content: center;
  display: flex;
  padding: 3rem 0;
  min-height: 65em;
`;
const Title = styled.h2`
  text-align: center;
  font-size: 2rem;
  color: green;
  margin-bottom: 2rem;
  font-family: 'Georgia', serif;
  margin-top: 0em;
`;
const Subtitle = styled.h3`
  text-align: center;
  font-size: 1.5rem;
  color: green;
  margin-bottom: 1.5rem;
  font-family: 'Georgia', serif;
  margin-top: 2rem;
`;
const ContentText = styled.p`
  text-align: left;
  font-size: 1.1rem;
  color: green;
  margin: 0 0 1.5rem 1rem;
  font-family: 'Georgia', serif;
  line-height: 1.6;
`;
const ToastmasterCard = styled.div`
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
  padding: 1.5rem;
  margin-bottom: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
`;
const ToastmasterName = styled.h4`
  color: green;
  margin-bottom: 0.5rem;
  font-family: 'Georgia', serif;
  font-size: 1.8rem;
  font-weight: 300;
`;
const ContactInfo = styled.div`
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 0.5rem;
  padding: 1rem;
  margin: 1rem 0;
  border-left: green;
`;
const TipsList = styled.ul`
  text-align: left;
  font-size: 1.1rem;
  color: green;
  margin-bottom: 1.5rem;
  font-family: 'Georgia', serif;
  line-height: 1.6;
  padding-left: 1.5rem;
`;
const TipsListItem = styled.li`
  margin-bottom: 0.5rem;
`;
const ImageWrapper = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  overflow: hidden;        // <— prevents zoom spill-out
`;
const ToastmasterImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  transform: scale(1.9);
  overflow: hidden;
  margin-bottom: 1rem;
  border: 3px solid rgba(255, 255, 255, 0.3);
`;
const ToastmasterContent = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`;
const ToastmasterInfo = styled.div`
  flex: 1;
`;

function AboutView() {

  return (
    <RootContainer>
      <MainContentCard backgroundColor="hsl(30 100% 94%)">
        <Title>Meet Our Toastmasters</Title>

        <ContentText>What's a ball at the castle? And what's a wedding party without its toastmasters? Absolutely NOTHING. That's why the joy was complete when Elvira and Erik, full of nerves and excitement, got a big, resounding YES from Sara and Ivar on a sunny day in August.</ContentText>

        <ContentText>We're talking about a dynamic duo here — a guy with charm and the room's comedian meets a girl with style and party on speed dial. Together, they become the life of the parties, the toast of the toasts, and the natural center of the evening. Honestly, what could possibly go wrong when these two take charge?</ContentText>

        <ToastmasterCard>
          <ToastmasterContent>
            <ImageWrapper>
              <ToastmasterImage src={ivarImage} alt="Ivar Söderberg" />
            </ImageWrapper>
            <ToastmasterInfo>
              <ToastmasterName>Ivar Söderberg</ToastmasterName>
              <ContentText>Ivar and Erik are old friends and have known each other for almost 20 years. During their years in school, they were part of the same basketball team and very often used to party together on weekends.</ContentText>
              <ContentText>In 2016 they went on a trip to Peru with a few other friends. During this trip it was clear to Erik that Ivar is one of his more likeminded friends, not afraid to attack new challenges in life. Like learning spanish in a foreign continent or picking up a tarantula in the jungle with his bare hands.</ContentText>
              <ContentText>For the wedding, Ivar brings his warm personality and excellent organizational skills to help coordinate our wedding speeches. With his attention to detail and friendly approach, he will make sure everyone feels comfortable and has a great time!</ContentText>
            </ToastmasterInfo>
          </ToastmasterContent>
        </ToastmasterCard>

        <ToastmasterCard>
          <ToastmasterContent>
            <ImageWrapper>
              <ToastmasterImage src={saraImage} alt="Sara Skaränger Littmarck" />
            </ImageWrapper>
            <ToastmasterInfo>
              <ToastmasterName>Sara Skaränger Littmarck</ToastmasterName>
              <ContentText>Sara and Elvira met each other during their student days in the city of birches, Umeå — and it was love at first sight. From day one, they were inseparable, so much so that half of Norrland's capital was convinced they were sisters. And that Sara, on top of that, would be from Stockholm? Excuse me? As someone from Uppsala, she didn't exactly think that was a popular assumption.</ContentText>
              <ContentText>In the group, Sara is the one who always has everything under control — the party, the schedule, and life in general. Need a theme? Call Sara. Someone has to give a speech but is panicking? Call Sara. Missing songbooks, games, or just general order? You guessed it — call Sara. She's simply the person you can't have a party without.</ContentText>
              <ContentText>Charming, creative, and always with a smile (and a few brilliant ideas up her sleeve), she was made for the role of toastmaster. And we can promise: she's going to absolutely own it.</ContentText>
            </ToastmasterInfo>
          </ToastmasterContent>
        </ToastmasterCard>

        <Subtitle>Want to Give a Speech?</Subtitle>

        <ContentText>If you'd like to give a speech or toast during the wedding weekend, please reach out to our toastmasters. They'll help coordinate the timing and ensure everything flows beautifully throughout the celebration.</ContentText>

        <ContactInfo>
          <ContentText style={{ marginBottom: '0.5rem', fontWeight: 'bold' }}>
            Contact Our Toastmasters:
          </ContentText>
          <ContentText style={{ marginBottom: '0.5rem' }}>
            • Ivar Söderberg - ivar.soderberg@gmail.com
          </ContentText>
          <ContentText style={{ marginBottom: '0rem' }}>
            • Sara Skaränger Littmarck - sara@skarmarck.se
          </ContentText>
        </ContactInfo>

        <Subtitle>Tips for Wedding Speeches</Subtitle>

        <ContentText>Whether you're a seasoned speaker or new to giving toasts, here are some helpful tips to make your speech memorable and meaningful:</ContentText>

        <TipsList>
          <TipsListItem>
            <strong>Keep it personal:</strong> Share specific memories or stories about the couple
          </TipsListItem>
          <TipsListItem>
            <strong>Keep it concise:</strong> Aim for 2-3 minutes to maintain everyone's attention
          </TipsListItem>
          <TipsListItem>
            <strong>Speak from the heart:</strong> Authentic emotions resonate more than perfect words
          </TipsListItem>
        </TipsList>

        <ContentText>Remember, the most important thing is speaking from the heart. Whether your speech is funny, emotional, or both, your genuine words will be appreciated by the couple and everyone present.</ContentText>
      </MainContentCard>
    </RootContainer>
  );
}

export default AboutView;