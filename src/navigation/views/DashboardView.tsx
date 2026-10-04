import {
  useEffect,
  useState,
} from 'react';
import styled from 'styled-components';
import { useTheme } from '../../app/AppStyling';
import { TOTAL_GUESTS, weddingDate } from '../../helpers/constants';
import { db, onValue, ref } from '../../firebase/firebase';
import {
  BedDouble,
  Calendar,
  CalendarDays,
  Clock,
  Cloud,
  ClipboardList,
  Heart,
  Hourglass,
  Home,
  UserCheck,
  Users,
  UserX,
  Utensils,
  Building,
} from 'lucide-react';

const PageContainer = styled.div`
  min-height: 100vh;
  padding: 2rem 1rem 4rem;
  background: linear-gradient(
    180deg,
    #fdefda 0%,
    #f9ddc1 100%
  );
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 2.5rem;
  text-align: center;
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
`;

const HeartIcon = styled(Heart)`
  flex-shrink: 0;
  color: ${() => useTheme().colors.red.primary};
`;

const Title = styled.h1`
  margin: 0;
  color: ${() => useTheme().colors.red.primary};
  font-family: ${() => useTheme().fonts.serif};
  font-size: 2.25rem;
  font-weight: 700;

  @media (max-width: 768px) {
    font-size: 1.75rem;
  }
`;

const Subtitle = styled.p`
  margin: 0;
  font-family: ${() => useTheme().fonts.sans};
  font-size: 1rem;
  opacity: 0.85;
`;

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 1.5rem;
  width: 100%;
  max-width: 960px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }
`;

const BottomRow = styled.div`
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.article`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem;
  border: 1px solid ${() => useTheme().colors.red.secondary};
  border-radius: 12px;
  background: ${() => useTheme().colors.red.tertiary};
  box-shadow: 0 4px 20px ${() => useTheme().shadow.secondary};
  color: #4a2314;
  transition: box-shadow 0.2s ease;

  &:hover {
    box-shadow: 0 6px 24px rgba(181, 82, 57, 0.12);
  }
`;

const FullWidthCard = styled(Card)`
  grid-column: 1 / -1;
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const IconCircle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  border-radius: 10px;
  background: rgba(217, 108, 74, 0.15);
  color: ${() => useTheme().colors.red.primary};
`;

const CardTitle = styled.h2`
  margin: 0;
  color: ${() => useTheme().colors.red.primary};
  font-family: 'Linnea-bold', serif;
  font-size: 1.125rem;
  font-weight: 600;
  text-transform: uppercase;
`;

const CountdownRow = styled.div`
  display: flex;
  justify-content: space-around;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const CountdownUnit = styled.div`
  text-align: center;
`;

const CountdownValue = styled.div`
  font-family: ${() => useTheme().fonts.serif};
  font-size: 2rem;
  font-weight: 700;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const CountdownLabel = styled.div`
  margin-top: 0.25rem;
  font-family: ${() => useTheme().fonts.sans};
  font-size: 0.75rem;
  letter-spacing: 0.02em;
  opacity: 0.8;
  text-transform: uppercase;
`;

const RsvpCountdownSection = styled.div`
  margin-top: 1.25rem;
  padding-top: 1.25rem;
  border-top: 1px solid ${() => useTheme().colors.red.secondary};
  text-align: center;
`;

const RsvpBigNumber = styled.div`
  font-family: ${() => useTheme().fonts.serif};
  font-size: 2.5rem;
  font-weight: 700;
`;

const RsvpSubtext = styled.div`
  font-family: ${() => useTheme().fonts.sans};
  font-size: 0.95rem;
  opacity: 0.85;
`;

const ProgressBar = styled.div`
  height: 8px;
  overflow: hidden;
  border-radius: 4px;
  background: ${() => useTheme().colors.red.secondary};
`;

const ProgressFill = styled.div<{ $percent: number }>`
  width: ${({ $percent }) => `${$percent}%`};
  height: 100%;
  border-radius: 4px;
  background: ${() => useTheme().colors.red.primary};
  transition: width 0.5s ease;
`;

const RsvpBreakdown = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const RsvpRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: ${() => useTheme().fonts.sans};
  font-size: 0.95rem;
`;

const RsvpRowLeft = styled.span`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const RsvpRowRight = styled.span`
  font-weight: 600;
`;

const StayRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: ${() => useTheme().fonts.sans};
  font-size: 0.95rem;
`;

const StayLeft = styled.span`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const BigDayDate = styled.div`
  font-family: ${() => useTheme().fonts.serif};
  font-size: 2rem;
  font-weight: 700;
  line-height: 1.2;
`;

const BigDaySubtext = styled.div`
  font-family: ${() => useTheme().fonts.sans};
  font-size: 0.95rem;
  opacity: 0.85;
`;

const InfoList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin: 0;
  padding-left: 1.25rem;
`;

const InfoListItem = styled.li`
  font-family: ${() => useTheme().fonts.sans};
  font-size: 0.9rem;
  line-height: 1.4;
`;

const WeatherGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const WeatherDay = styled.div`
  padding: 0.75rem;
  border: 1px solid ${() => useTheme().colors.red.secondary};
  border-radius: 8px;
  background: ${() => useTheme().colors.red.tertiary};
`;

const WeatherDayName = styled.div`
  margin-bottom: 0.5rem;
  color: ${() => useTheme().colors.red.primary};
  font-family: ${() => useTheme().fonts.serif};
  font-size: 1rem;
  font-weight: 600;
`;

const WeatherTemp = styled.div`
  color: #4a2314;
  font-family: ${() => useTheme().fonts.serif};
  font-size: 1.5rem;
  font-weight: 700;
`;

const WeatherDesc = styled.div`
  margin-top: 0.25rem;
  font-family: ${() => useTheme().fonts.sans};
  font-size: 0.85rem;
  opacity: 0.9;
`;

const WeatherPrecip = styled.div`
  margin-top: 0.25rem;
  font-family: ${() => useTheme().fonts.sans};
  font-size: 0.8rem;
  opacity: 0.85;
`;

const WeatherUpdated = styled.div`
  margin-top: 0.75rem;
  font-family: ${() => useTheme().fonts.sans};
  font-size: 0.7rem;
  opacity: 0.7;
`;

function useCountdown(target: Date) {
  const [left, setLeft] = useState({
    weeks: 0,
    days: 0,
    totalDays: 0,
    hours: 0,
    minutes: 0,
    isComplete: false,
  });

  useEffect(() => {
    const tick = () => {
      const now = new Date().getTime();
      const end = target.getTime();
      const diff = Math.max(0, end - now);

      const totalDays = Math.floor(
        diff / (1000 * 60 * 60 * 24)
      );

      setLeft({
        weeks: Math.floor(totalDays / 7),
        days: totalDays % 7,
        totalDays,
        hours: Math.floor(
          (diff % (1000 * 60 * 60 * 24)) /
          (1000 * 60 * 60)
        ),
        minutes: Math.floor(
          (diff % (1000 * 60 * 60)) /
          (1000 * 60)
        ),
        isComplete: diff === 0,
      });
    };

    tick();

    const id = window.setInterval(tick, 1000);

    return () => window.clearInterval(id);
  }, [target]);

  return left;
}

function formatWeddingDate(date: Date) {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    weekday: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

const WEDDING_WEATHER_LAT = 59.77;
const WEDDING_WEATHER_LON = 16.21;
const REFETCH_WEATHER_MS = 30 * 60 * 1000;

type OpenMeteoDaily = {
  time: string[];
  weathercode: (number | null)[];
  temperature_2m_max: (number | null)[];
  temperature_2m_min: (number | null)[];
  precipitation_sum: (number | null)[];
  precipitation_probability_max?: (
    number | null
  )[];
};

type WeddingDayForecast = {
  date: string;
  label: string;
  weathercode: number | null;
  tempMax: number | null;
  tempMin: number | null;
  precipSum: number | null;
  precipProbability: number | null;
};

type DashboardGuest = {
  name?: string;
  dietaryRestrictions?: string;
};

type DashboardRsvpResponse = {
  attendance?: 'yes' | 'no';
  accommodation?: 'castle' | 'other' | null;
  participationDays?: string[];
  guests?: DashboardGuest[];
};

type RsvpStats = {
  acceptedResponses: number;
  declinedResponses: number;
  pendingResponses: number;
  totalResponses: number;
  attendingGuests: number;
  declinedGuests: number;
  totalInvitedGuests: number;
  castleGuests: number;
  otherAccommodationGuests: number;
  fridayAttendance: number;
  saturdayAttendance: number;
  sundayAttendance: number;
  dietaryRequests: number;
  dietaryRequestList: string[];
  declinedNames: string[];
  loading: boolean;
  error: string | null;
};

function weatherCodeToLabel(code: number | null): string {
  if (code === null) {
    return '—';
  }

  const map: Record<number, string> = {
    0: 'Clear',
    1: 'Mainly clear',
    2: 'Partly cloudy',
    3: 'Overcast',
    45: 'Foggy',
    48: 'Foggy',
    51: 'Drizzle',
    53: 'Drizzle',
    55: 'Drizzle',
    61: 'Light rain',
    63: 'Rain',
    65: 'Heavy rain',
    71: 'Light snow',
    73: 'Snow',
    75: 'Heavy snow',
    77: 'Snow grains',
    80: 'Showers',
    81: 'Showers',
    82: 'Heavy showers',
    85: 'Snow showers',
    86: 'Snow showers',
    95: 'Thunderstorm',
    96: 'Thunderstorm',
    99: 'Thunderstorm',
  };

  return map[code] ?? 'Unknown';
}

function useWeddingWeather() {
  const [friday, setFriday] =
    useState<WeddingDayForecast | null>(null);

  const [saturday, setSaturday] =
    useState<WeddingDayForecast | null>(null);

  const [sunday, setSunday] =
    useState<WeddingDayForecast | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(
    null
  );

  const [lastUpdated, setLastUpdated] =
    useState<Date | null>(null);

  const fetchWeather = async () => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        latitude: String(WEDDING_WEATHER_LAT),
        longitude: String(WEDDING_WEATHER_LON),
        daily:
          'weathercode,temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max',
        timezone: 'Europe/Stockholm',
        start_date: '2027-07-02',
        end_date: '2027-07-04',
      });

      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?${params}`
      );

      if (!response.ok) {
        throw new Error(
          `Weather API ${response.status}`
        );
      }

      const data = (await response.json()) as {
        daily?: OpenMeteoDaily;
      };

      const daily = data.daily;

      if (!daily?.time?.length) {
        setFriday(null);
        setSaturday(null);
        setSunday(null);
        setLastUpdated(new Date());
        return;
      }

      const buildForecast = (
        index: number,
        label: string
      ): WeddingDayForecast => ({
        date: daily.time[index] ?? '',
        label,
        weathercode:
          daily.weathercode?.[index] ?? null,
        tempMax:
          daily.temperature_2m_max?.[index] ?? null,
        tempMin:
          daily.temperature_2m_min?.[index] ?? null,
        precipSum:
          daily.precipitation_sum?.[index] ?? null,
        precipProbability:
          daily.precipitation_probability_max?.[
          index
          ] ?? null,
      });

      setFriday(buildForecast(0, 'Friday 2 Jul'));
      setSaturday(buildForecast(1, 'Saturday 3 Jul'));
      setSunday(buildForecast(2, 'Sunday 4 Jul'));
      setLastUpdated(new Date());
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : 'Failed to load weather'
      );

      setFriday(null);
      setSaturday(null);
      setSunday(null);
      setLastUpdated(new Date());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchWeather();

    const id = window.setInterval(
      () => void fetchWeather(),
      REFETCH_WEATHER_MS
    );

    return () => window.clearInterval(id);
  }, []);

  return {
    friday,
    saturday,
    sunday,
    loading,
    error,
    lastUpdated,
  };
}

function useRsvpStats(): RsvpStats {
  const [stats, setStats] = useState<RsvpStats>({
    acceptedResponses: 0,
    declinedResponses: 0,
    pendingResponses: TOTAL_GUESTS,
    totalResponses: 0,
    attendingGuests: 0,
    declinedGuests: 0,
    totalInvitedGuests: TOTAL_GUESTS,
    castleGuests: 0,
    otherAccommodationGuests: 0,
    fridayAttendance: 0,
    saturdayAttendance: 0,
    sundayAttendance: 0,
    dietaryRequests: 0,
    dietaryRequestList: [],
    declinedNames: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    const rsvpRef = ref(db, 'rsvpResponses');

    const unsubscribe = onValue(
      rsvpRef,
      (snapshot) => {
        const data = snapshot.val();

        if (!data) {
          setStats({
            acceptedResponses: 0,
            declinedResponses: 0,
            pendingResponses: TOTAL_GUESTS,
            totalResponses: 0,
            attendingGuests: 0,
            declinedGuests: 0,
            totalInvitedGuests: TOTAL_GUESTS,
            castleGuests: 0,
            otherAccommodationGuests: 0,
            fridayAttendance: 0,
            saturdayAttendance: 0,
            sundayAttendance: 0,
            dietaryRequests: 0,
            dietaryRequestList: [],
            declinedNames: [],
            loading: false,
            error: null,
          });

          return;
        }

        const entries = Object.values(
          data
        ) as DashboardRsvpResponse[];

        let acceptedResponses = 0;
        let declinedResponses = 0;
        let attendingGuests = 0;
        let declinedGuests = 0;
        let castleGuests = 0;
        let otherAccommodationGuests = 0;
        let fridayAttendance = 0;
        let saturdayAttendance = 0;
        let sundayAttendance = 0;
        let dietaryRequests = 0;

        const dietaryRequestList: string[] = [];
        const declinedNames: string[] = [];

        for (const entry of entries) {
          if (!entry) {
            continue;
          }

          const guests = Array.isArray(entry.guests)
            ? entry.guests
            : [];

          if (entry.attendance === 'no') {
            declinedResponses += 1;

            const declinedGuest = guests[0];

            if (declinedGuest?.name?.trim()) {
              declinedGuests += 1;
              declinedNames.push(
                declinedGuest.name.trim()
              );
            }

            continue;
          }

          if (entry.attendance !== 'yes') {
            continue;
          }

          acceptedResponses += 1;
          attendingGuests += guests.length;

          if (entry.accommodation === 'castle') {
            castleGuests += guests.length;
          }

          if (entry.accommodation === 'other') {
            otherAccommodationGuests += guests.length;
          }

          const participationDays = Array.isArray(
            entry.participationDays
          )
            ? entry.participationDays
            : [];

          if (participationDays.includes('Friday')) {
            fridayAttendance += guests.length;
          }

          if (participationDays.includes('Saturday')) {
            saturdayAttendance += guests.length;
          }

          if (participationDays.includes('Sunday')) {
            sundayAttendance += guests.length;
          }

          for (const guest of guests) {
            const request =
              guest?.dietaryRestrictions?.trim() ?? '';

            if (request) {
              dietaryRequests += 1;

              dietaryRequestList.push(
                `${guest.name?.trim() || 'Unnamed guest'}: ${request}`
              );
            }
          }
        }

        const totalResponses =
          acceptedResponses + declinedResponses;

        const pendingResponses = Math.max(
          0,
          TOTAL_GUESTS - totalResponses
        );

        setStats({
          acceptedResponses,
          declinedResponses,
          pendingResponses,
          totalResponses,
          attendingGuests,
          declinedGuests,
          totalInvitedGuests: TOTAL_GUESTS,
          castleGuests,
          otherAccommodationGuests,
          fridayAttendance,
          saturdayAttendance,
          sundayAttendance,
          dietaryRequests,
          dietaryRequestList,
          declinedNames: declinedNames.sort(),
          loading: false,
          error: null,
        });
      },
      (error) => {
        setStats((previous) => ({
          ...previous,
          loading: false,
          error:
            error?.message ?? 'Failed to load RSVP data',
        }));
      }
    );

    return () => unsubscribe();
  }, []);

  return stats;
}

function DashboardView() {
  const countdown = useCountdown(weddingDate);

  const {
    acceptedResponses,
    declinedResponses,
    pendingResponses,
    totalResponses,
    attendingGuests,
    declinedGuests,
    totalInvitedGuests,
    castleGuests,
    otherAccommodationGuests,
    fridayAttendance,
    saturdayAttendance,
    sundayAttendance,
    dietaryRequests,
    dietaryRequestList,
    declinedNames,
    loading: rsvpLoading,
    error: rsvpError,
  } = useRsvpStats();

  const {
    friday: weatherFriday,
    saturday: weatherSaturday,
    sunday: weatherSunday,
    loading: weatherLoading,
    error: weatherError,
    lastUpdated: weatherLastUpdated,
  } = useWeddingWeather();

  const [showDeclinedNames, setShowDeclinedNames] =
    useState(false);

  const [showDietaryRequests, setShowDietaryRequests] =
    useState(false);

  const responsePercent = totalInvitedGuests
    ? Math.min(
      100,
      Math.round(
        (totalResponses / totalInvitedGuests) * 100
      )
    )
    : 0;

  return (
    <PageContainer>
      <Header>
        <TitleRow>
          <HeartIcon size={28} strokeWidth={1.5} />
          <Title>Wedding Dashboard</Title>
          <HeartIcon size={28} strokeWidth={1.5} />
        </TitleRow>

        <Subtitle>
          Everything you need to know at a glance
        </Subtitle>
      </Header>

      <CardsGrid>
        <Card>
          <CardHeader>
            <IconCircle>
              <Clock size={22} />
            </IconCircle>

            <CardTitle>
              Countdown to &apos;I Do&apos;
            </CardTitle>
          </CardHeader>

          <CountdownRow>
            <CountdownUnit>
              <CountdownValue>
                {countdown.weeks}
              </CountdownValue>
              <CountdownLabel>Weeks</CountdownLabel>
            </CountdownUnit>

            <CountdownUnit>
              <CountdownValue>
                {countdown.days}
              </CountdownValue>
              <CountdownLabel>Days</CountdownLabel>
            </CountdownUnit>

            <CountdownUnit>
              <CountdownValue>
                {countdown.hours}
              </CountdownValue>
              <CountdownLabel>Hours</CountdownLabel>
            </CountdownUnit>

            <CountdownUnit>
              <CountdownValue>
                {countdown.minutes}
              </CountdownValue>
              <CountdownLabel>Minutes</CountdownLabel>
            </CountdownUnit>
          </CountdownRow>

          <RsvpCountdownSection>
            <RsvpBigNumber>
              {countdown.totalDays}
            </RsvpBigNumber>

            <CountdownLabel>
              {countdown.totalDays === 1
                ? 'day'
                : 'days'}{' '}
              until the wedding
            </CountdownLabel>
          </RsvpCountdownSection>
        </Card>

        <Card>
          <CardHeader>
            <IconCircle>
              <Users size={22} />
            </IconCircle>

            <CardTitle>RSVP status</CardTitle>
          </CardHeader>

          {rsvpError && (
            <RsvpSubtext
              style={{
                color: useTheme().colors.error.light,
              }}
            >
              {rsvpError}
            </RsvpSubtext>
          )}

          {rsvpLoading ? (
            <RsvpSubtext>Loading…</RsvpSubtext>
          ) : (
            <>
              <RsvpBigNumber>
                {attendingGuests}
              </RsvpBigNumber>

              <RsvpSubtext>
                guests attending
              </RsvpSubtext>

              <ProgressBar>
                <ProgressFill
                  $percent={responsePercent}
                />
              </ProgressBar>

              <RsvpSubtext>
                {totalResponses} of {totalInvitedGuests}{' '}
                RSVP responses received
              </RsvpSubtext>

              <RsvpBreakdown>
                <RsvpRow>
                  <RsvpRowLeft>
                    <UserCheck
                      size={18}
                      color={
                        useTheme().colors.success
                          .iconDetails
                      }
                    />
                    Accepted
                  </RsvpRowLeft>

                  <RsvpRowRight>
                    {acceptedResponses}
                  </RsvpRowRight>
                </RsvpRow>

                <RsvpRow>
                  <RsvpRowLeft>
                    <UserX
                      size={18}
                      color={
                        useTheme().colors.red.primary
                      }
                    />
                    Unable to attend
                  </RsvpRowLeft>

                  <RsvpRowRight>
                    {declinedResponses}
                  </RsvpRowRight>
                </RsvpRow>

                <RsvpRow>
                  <RsvpRowLeft>
                    <Hourglass
                      size={18}
                      color={
                        useTheme().colors.red.primary
                      }
                    />
                    No response yet
                  </RsvpRowLeft>

                  <RsvpRowRight>
                    {pendingResponses}
                  </RsvpRowRight>
                </RsvpRow>
              </RsvpBreakdown>
            </>
          )}
        </Card>

        <BottomRow>
          <Card>
            <CardHeader>
              <IconCircle>
                <Home size={22} />
              </IconCircle>

              <CardTitle>Accommodation</CardTitle>
            </CardHeader>

            {rsvpLoading ? (
              <StayRow>
                <StayLeft>Loading…</StayLeft>
              </StayRow>
            ) : (
              <>
                <StayRow>
                  <StayLeft>
                    <BedDouble
                      size={18}
                      color={
                        useTheme().colors.red.primary
                      }
                    />
                    Häringe Castle
                  </StayLeft>

                  <span>{castleGuests}</span>
                </StayRow>

                <StayRow>
                  <StayLeft>
                    <Building
                      size={18}
                      color={
                        useTheme().colors.red.primary
                      }
                    />
                    Other accommodation
                  </StayLeft>

                  <span>
                    {otherAccommodationGuests}
                  </span>
                </StayRow>
              </>
            )}
          </Card>

          <Card>
            <CardHeader>
              <IconCircle>
                <Calendar size={22} />
              </IconCircle>

              <CardTitle>The Big Day</CardTitle>
            </CardHeader>

            <BigDayDate>
              {weddingDate.toLocaleDateString(
                'en-US',
                {
                  month: 'short',
                  day: 'numeric',
                }
              )}
            </BigDayDate>

            <BigDaySubtext>
              {formatWeddingDate(weddingDate)}
            </BigDaySubtext>
          </Card>

          <Card>
            <CardHeader>
              <IconCircle>
                <ClipboardList size={22} />
              </IconCircle>

              <CardTitle>Planning notes</CardTitle>
            </CardHeader>

            {rsvpLoading ? (
              <RsvpSubtext>Loading…</RsvpSubtext>
            ) : (
              <RsvpBreakdown>
                <RsvpRow>
                  <RsvpRowLeft>
                    <Users
                      size={18}
                      color={
                        useTheme().colors.red.primary
                      }
                    />
                    Attending guests
                  </RsvpRowLeft>

                  <RsvpRowRight>
                    {attendingGuests}
                  </RsvpRowRight>
                </RsvpRow>

                <RsvpRow>
                  <RsvpRowLeft>
                    <UserX
                      size={18}
                      color={
                        useTheme().colors.red.primary
                      }
                    />
                    Declined guests
                  </RsvpRowLeft>

                  <RsvpRowRight>
                    {declinedGuests}
                  </RsvpRowRight>
                </RsvpRow>

                <RsvpRow>
                  <RsvpRowLeft>
                    <Utensils
                      size={18}
                      color={
                        useTheme().colors.red.primary
                      }
                    />
                    Dietary requests
                  </RsvpRowLeft>

                  <RsvpRowRight>
                    {dietaryRequests}
                  </RsvpRowRight>
                </RsvpRow>
              </RsvpBreakdown>
            )}
          </Card>
        </BottomRow>

        <FullWidthCard>
          <CardHeader>
            <IconCircle>
              <CalendarDays size={22} />
            </IconCircle>

            <CardTitle>
              Wedding weekend attendance
            </CardTitle>
          </CardHeader>

          {rsvpLoading ? (
            <RsvpSubtext>Loading…</RsvpSubtext>
          ) : (
            <RsvpBreakdown>
              <StayRow>
                <StayLeft>
                  <CalendarDays
                    size={18}
                    color={
                      useTheme().colors.red.primary
                    }
                  />
                  Friday welcome dinner
                </StayLeft>

                <span>{fridayAttendance}</span>
              </StayRow>

              <StayRow>
                <StayLeft>
                  <CalendarDays
                    size={18}
                    color={
                      useTheme().colors.red.primary
                    }
                  />
                  Saturday ceremony and dinner
                </StayLeft>

                <span>{saturdayAttendance}</span>
              </StayRow>

              <StayRow>
                <StayLeft>
                  <CalendarDays
                    size={18}
                    color={
                      useTheme().colors.red.primary
                    }
                  />
                  Sunday goodbye breakfast
                </StayLeft>

                <span>{sundayAttendance}</span>
              </StayRow>
            </RsvpBreakdown>
          )}
        </FullWidthCard>

        <FullWidthCard>
          <CardHeader>
            <IconCircle>
              <ClipboardList size={22} />
            </IconCircle>

            <CardTitle>
              Guest information
            </CardTitle>
          </CardHeader>

          {rsvpLoading ? (
            <RsvpSubtext>Loading…</RsvpSubtext>
          ) : (
            <>
              <RsvpRow>
                <RsvpRowLeft>
                  <UserX
                    size={18}
                    color={
                      useTheme().colors.red.primary
                    }
                  />
                  Guests unable to attend
                </RsvpRowLeft>

                <RsvpRowRight>
                  {declinedNames.length}
                </RsvpRowRight>
              </RsvpRow>

              {declinedNames.length > 0 && (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      setShowDeclinedNames(
                        (current) => !current
                      )
                    }
                  >
                    {showDeclinedNames
                      ? 'Hide declined names'
                      : 'Show declined names'}
                  </button>

                  {showDeclinedNames && (
                    <InfoList>
                      {declinedNames.map((name, index) => (
                        <InfoListItem
                          key={`${name}-${index}`}
                        >
                          {name}
                        </InfoListItem>
                      ))}
                    </InfoList>
                  )}
                </>
              )}

              <RsvpRow>
                <RsvpRowLeft>
                  <Utensils
                    size={18}
                    color={
                      useTheme().colors.red.primary
                    }
                  />
                  Dietary requests
                </RsvpRowLeft>

                <RsvpRowRight>
                  {dietaryRequests}
                </RsvpRowRight>
              </RsvpRow>

              {dietaryRequestList.length > 0 && (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      setShowDietaryRequests(
                        (current) => !current
                      )
                    }
                  >
                    {showDietaryRequests
                      ? 'Hide dietary requests'
                      : 'Show dietary requests'}
                  </button>

                  {showDietaryRequests && (
                    <InfoList>
                      {dietaryRequestList.map(
                        (request, index) => (
                          <InfoListItem
                            key={`${request}-${index}`}
                          >
                            {request}
                          </InfoListItem>
                        )
                      )}
                    </InfoList>
                  )}
                </>
              )}
            </>
          )}
        </FullWidthCard>

        <FullWidthCard>
          <CardHeader>
            <IconCircle>
              <Cloud size={22} />
            </IconCircle>

            <CardTitle>
              Weather at Häringe Castle
            </CardTitle>
          </CardHeader>

          {weatherError && (
            <RsvpSubtext
              style={{
                color: useTheme().colors.error.light,
              }}
            >
              {weatherError}
            </RsvpSubtext>
          )}

          {weatherLoading &&
            !weatherFriday &&
            !weatherSaturday &&
            !weatherSunday ? (
            <RsvpSubtext>
              Loading forecast…
            </RsvpSubtext>
          ) : weatherFriday ||
            weatherSaturday ||
            weatherSunday ? (
            <>
              <WeatherGrid>
                {[
                  weatherFriday,
                  weatherSaturday,
                  weatherSunday,
                ]
                  .filter(
                    (
                      forecast
                    ): forecast is WeddingDayForecast =>
                      forecast !== null
                  )
                  .map((forecast) => (
                    <WeatherDay key={forecast.date}>
                      <WeatherDayName>
                        {forecast.label}
                      </WeatherDayName>

                      <WeatherTemp>
                        {forecast.tempMax !== null
                          ? `${Math.round(
                            forecast.tempMax
                          )}°C`
                          : '—'}

                        {forecast.tempMin !== null &&
                          ` / ${Math.round(
                            forecast.tempMin
                          )}°C min`}
                      </WeatherTemp>

                      <WeatherDesc>
                        {weatherCodeToLabel(
                          forecast.weathercode
                        )}
                      </WeatherDesc>

                      {(forecast.precipSum !== null &&
                        forecast.precipSum > 0) ||
                        forecast.precipProbability !== null ? (
                        <WeatherPrecip>
                          {forecast.precipSum !== null &&
                            forecast.precipSum > 0 &&
                            `${forecast.precipSum} mm`}

                          {forecast.precipProbability !==
                            null &&
                            ` · ${forecast.precipProbability}% rain`}
                        </WeatherPrecip>
                      ) : null}
                    </WeatherDay>
                  ))}
              </WeatherGrid>

              {weatherLastUpdated && (
                <WeatherUpdated>
                  Updated{' '}
                  {weatherLastUpdated.toLocaleTimeString(
                    'en-GB',
                    {
                      hour: '2-digit',
                      minute: '2-digit',
                    }
                  )}
                  {' · refreshes every 30 min'}
                </WeatherUpdated>
              )}
            </>
          ) : (
            <RsvpSubtext>
              Forecast for the wedding weekend becomes
              available closer to the date.
            </RsvpSubtext>
          )}
        </FullWidthCard>
      </CardsGrid>
    </PageContainer>
  );
}

export default DashboardView;