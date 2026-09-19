import styled from "styled-components";
import MainContentCard from "../../components/cards/MainContentCard";
import ScheduleCard from "../../components/cards/ScheduleCard";
import { CheckCheck, Disc, Beef, Church, Martini, Utensils, PartyPopper, Map, EggFried, Music, Wine, Coffee, Sandwich } from "lucide-react";
import { useTheme } from "../../app/AppStyling";
import { rgba } from "polished";
import { useTranslation } from "react-i18next";

const RootContainer = styled.div`
  color: black;
  background: ${() => rgba(useTheme().colors.terracotta.secondary, 0.95)};
  background-size: cover;
  background-position: center;
  height: fit-content;
  width: 100%;
  align-items: center;
  justify-content: center;
  display: flex;
  padding: 3em 0;
`;
const DayByDayWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
  margin-top: 2em;
`;
const ScheduleTitle = styled.div`
  color: ${() => useTheme().colors.mix.dark};
  font-size: 30px;
  font-family: "linnea-bold", "PP Cirka", sans-serif;
  font-weight: 800;
`;

function ScheduleView() {
  const { t } = useTranslation();
  return (
    <RootContainer>
      <MainContentCard backgroundColor='hsl(30 100% 94%)'>
        <DayByDayWrapper>
          <ScheduleTitle>{t('Friday')}</ScheduleTitle>
          <ScheduleCard
            icon={CheckCheck}
            time="18:00"
            title={t('WelcomeAndCheckIn')}
            description={t('WelcomeAndCheckInDescription')}
            location={t('ManorHouse')}
          />
          <ScheduleCard
            icon={Beef}
            time="19:00"
            title={t('Dinner')}
            description={t('DinnerDescription')}
            location={t('ManorTerrace')}
          />
          <ScheduleCard
            icon={Music}
            time="20:30"
            title={t('Entertainment')}
            description={t('EntertainmentDescription')}
            location={t('ManorTerrace')}
          />
          <ScheduleCard
            icon={Wine}
            time="22:00"
            title={t('ChillOutNight')}
            description={t('ChillOutNightDescription')}
            location={t('ManorTerrace')}
          />
        </DayByDayWrapper>
        <DayByDayWrapper>
          <ScheduleTitle>{t('Saturday')}</ScheduleTitle>
          <ScheduleCard
            icon={EggFried}
            time="09:00-11:00"
            title="Brunch"
            description={t('BrunchDescription')}
            location={t('ManorHouse')}
          />
          <ScheduleCard
            icon={Map}
            time="12:00"
            title={t('ChampagneTreasureHunt')}
            description={t('ChampagneTreasureHuntDescription')}
            location={t('ManorGarden')}
          />
          <ScheduleCard
            icon={Sandwich}
            time="13:00"
            title={t('SaturdayLunch')}
            description={t('HotdogDescription')}
            location={t('ManorHouse')}
          />
          <ScheduleCard
            icon={Church}
            time="16:00"
            title={t('WeddingCeremony')}
            description={t('WeddingCeremonyDescription')}
            location={t('RamnäsChurch')}
          />
          <ScheduleCard
            icon={Martini}
            time="17:15"
            title={t('WeddingToast')}
            description={t('WeddingToastDescription')}
            location={t('ManorTerrace')}
          />
          <ScheduleCard
            icon={Utensils}
            time="19:00"
            title={t('WeddingDinner')}
            description={t('WeddingDinnerDescription')}
            location={t('ManorStables')}
          />
          <ScheduleCard
            icon={PartyPopper}
            time="22:30"
            title={t('WeddingParty')}
            description={t('WeddingPartyDescription')}
            location={t('ManorStables')}
          />
          <ScheduleCard
            icon={Disc}
            time="02:00"
            title={t('AfterParty')}
            description={t('AfterPartyDescription')}
            location={t('ManorHouse')}
          />
        </DayByDayWrapper>
        <DayByDayWrapper>
          <ScheduleTitle>{t('Sunday')}</ScheduleTitle>
          <ScheduleCard
            icon={Coffee}
            time="09:00-12:00"
            title={t('GoodbyeBreakfast')}
            description={t('GoodbyeBreakfastDescription')}
            location={t('ManorHouse')}
          />
        </DayByDayWrapper>
      </MainContentCard>
    </RootContainer>
  );
}

export default ScheduleView;