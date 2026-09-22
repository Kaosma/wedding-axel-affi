import styled from "styled-components";
import MainContentCard from "../../components/cards/MainContentCard";
// import ScheduleCard from "../../components/cards/ScheduleCard";
// import { CheckCheck } from "lucide-react";
import { useTheme } from "../../app/AppStyling";
import { rgba } from "polished";


const RootContainer = styled.div`
  color: black;
  background: ${() => rgba(useTheme().colors.red.secondary, 0.95)};
  background-size: cover;
  background-position: center;
  height: fit-content;
  width: 100%;
  align-items: center;
  justify-content: center;
  display: flex;
  padding: 3em 0;
`;
// const DayByDayWrapper = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 1em;
//   margin-top: 2em;
// `;
// const ScheduleTitle = styled.div`
//   color: ${() => useTheme().colors.mix.dark};
//   font-size: 30px;
//   font-family: "linnea-bold", "PP Cirka", sans-serif;
//   font-weight: 800;
// `;
const TempText = styled.div`
  color: ${() => useTheme().colors.red.primary};
`;

function ScheduleView() {

  return (
    <RootContainer>
      <MainContentCard backgroundColor='hsl(30 100% 94%)'>
        {/* <DayByDayWrapper>
          <ScheduleTitle>Friday</ScheduleTitle>
          <ScheduleCard
            icon={CheckCheck}
            time="18:00"
            title="Title"
            description="Dscription"
            location="Location"
          />
        </DayByDayWrapper>
        <DayByDayWrapper>
          <ScheduleTitle>Saturday</ScheduleTitle>
          <ScheduleCard
            icon={CheckCheck}
            time="18:00"
            title="Title"
            description="Dscription"
            location="Location"
          />
        </DayByDayWrapper>
        <DayByDayWrapper>
          <ScheduleTitle>Sunday</ScheduleTitle>
          <ScheduleCard
            icon={CheckCheck}
            time="18:00"
            title="Title"
            description="Dscription"
            location="Location"
          />
        </DayByDayWrapper> */}
        <TempText>Stay tuned, more info will come soon.</TempText>
      </MainContentCard>
    </RootContainer>
  );
}

export default ScheduleView;