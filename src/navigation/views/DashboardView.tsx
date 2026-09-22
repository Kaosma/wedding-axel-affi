import { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { useTheme } from '../../app/AppStyling';
import { TOTAL_GUESTS, weddingDate } from '../../helpers/constants';

import { db, ref, onValue } from '../../firebase/firebase';
import {
  Clock,
  Users,
  Calendar,
  Music,
  Check,
  Hourglass,
  Heart,
  Home,
  Building2,
  CalendarDays,
  Cloud,
  X,
} from 'lucide-react';
import { RsvpResponse } from '../../helpers/classes';

const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(180deg, #fdefda 0%, #f9ddc1 100%);
  padding: 2rem 1rem 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Header = styled.header`
  text-align: center;
  margin-bottom: 2.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;
const TitleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
`;
const HeartIcon = styled(Heart)`
  color: ${() => useTheme().colors.red.primary};
  flex-shrink: 0;
`;
const Title = styled.h1`
  font-family: ${() => useTheme().fonts.serif};
  color: ${() => useTheme().colors.red.primary};
  font-size: 2.25rem;
  margin: 0;
  font-weight: 700;

  @media (max-width: 768px) {
    font-size: 1.75rem;
  }
`;
const Subtitle = styled.p`
  font-family: ${() => useTheme().fonts.sans};
  font-size: 1rem;
  opacity: 0.85;
  margin: 0;
`;
const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 1.5rem;
  max-width: 960px;
  width: 100%;

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
  background: ${() => useTheme().colors.red.tertiary};
  border-radius: 12px;
  border: 1px solid ${() => useTheme().colors.red.secondary};
  box-shadow: 0 4px 20px ${() => useTheme().shadow.secondary};
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  color: #4a2314;
  transition: box-shadow 0.2s ease;

  &:hover {
    box-shadow: 0 6px 24px rgba(181, 82, 57, 0.12);
  }
`;
const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;
const IconCircle = styled.div<{ $accent?: 'purple' }>`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: ${({ $accent }) =>
    $accent ? 'rgba(147, 112, 219, 0.2)' : 'rgba(217, 108, 74, 0.15)'};
  color: ${({ $accent }) =>
    $accent ? '#9370db' : () => useTheme().colors.red.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;
const CardTitle = styled.h2`
  font-family: 'Linnea-bold', serif;
  color: ${() => useTheme().colors.red.primary};
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0;
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
  font-family: ${() => useTheme().fonts.sans};
  font-size: 0.75rem;
  opacity: 0.8;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  margin-top: 0.25rem;
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
  background: ${() => useTheme().colors.red.secondary};
  border-radius: 4px;
  overflow: hidden;
`;
const ProgressFill = styled.div<{ $percent: number }>`
  height: 100%;
  width: ${({ $percent }) => $percent}%;
  background: ${() => useTheme().colors.red.primary};
  border-radius: 4px;
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
  font-size: 0.9rem;
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
const SongCount = styled.div`
  font-family: ${() => useTheme().fonts.serif};
  font-size: 2rem;
  font-weight: 700;
`;
const SongSubtext = styled.div`
  font-family: ${() => useTheme().fonts.sans};
  font-size: 0.95rem;
  opacity: 0.85;
`;
const SongRequestsCard = styled(Card)`
  cursor: pointer;
`;
const SongList = styled.ul`
  margin: 0;
  padding-left: 1.25rem;
  display: grid;
  gap: 0.35rem;
  max-height: 300px;
  overflow: auto;
`;
const SongListItem = styled.li`
  font-family: ${() => useTheme().fonts.sans};
  font-size: 0.95rem;
`;
const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  z-index: 1200;
`;
const ModalContent = styled.div`
  width: min(720px, 100%);
  max-height: 80vh;
  background: ${() => useTheme().colors.red.tertiary};
  border: 1px solid ${() => useTheme().colors.red.secondary};
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
  padding: 1rem 1rem 1.25rem;
  overflow: auto;
`;
const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
`;
const ModalCloseButton = styled.button`
  border: 1px solid ${() => useTheme().colors.red.secondary};
  background: ${() => useTheme().colors.red.secondary};
  color: #4a2314;
  border-radius: 8px;
  padding: 0.3rem 0.45rem;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;


const FullWidthCard = styled(Card)`
  grid-column: 1 / -1;
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
  background: ${() => useTheme().colors.red.tertiary};
  border-radius: 8px;
  border: 1px solid ${() => useTheme().colors.red.secondary};
`;
const WeatherDayName = styled.div`
  font-family: ${() => useTheme().fonts.serif};
  font-size: 1rem;
  font-weight: 600;
  color: ${() => useTheme().colors.red.primary};
  margin-bottom: 0.5rem;
`;
const WeatherTemp = styled.div`
  font-family: ${() => useTheme().fonts.serif};
  font-size: 1.5rem;
  font-weight: 700;
  color: #4a2314;
`;
const WeatherDesc = styled.div`
  font-family: ${() => useTheme().fonts.sans};
  font-size: 0.85rem;
  opacity: 0.9;
  margin-top: 0.25rem;
`;
const WeatherPrecip = styled.div`
  font-family: ${() => useTheme().fonts.sans};
  font-size: 0.8rem;
  opacity: 0.85;
  margin-top: 0.25rem;
`;
const WeatherUpdated = styled.div`
  font-family: ${() => useTheme().fonts.sans};
  font-size: 0.7rem;
  opacity: 0.7;
  margin-top: 0.75rem;
`;
const EmailLists = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;
const EmailListCard = styled.div`
  border: 1px solid ${() => useTheme().colors.red.secondary};
  border-radius: 10px;
  padding: 0.9rem;
  background: ${() => useTheme().colors.red.tertiary};
`;
const EmailListHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
`;
const EmailListTitle = styled.div`
  font-family: ${() => useTheme().fonts.serif};
  color: ${() => useTheme().colors.red.primary};
  font-weight: 600;
`;
const CopyButton = styled.button`
  border: 1px solid ${() => useTheme().colors.red.secondary};
  background: ${() => useTheme().colors.red.secondary};
  color: #4a2314;
  border-radius: 8px;
  padding: 0.35rem 0.6rem;
  font-size: 0.8rem;
  cursor: pointer;

  &:hover {
    background: ${() => useTheme().colors.red.secondary};
  }
`;
const EmailBlock = styled.pre`
  margin: 0;
  max-height: 220px;
  overflow: auto;
  white-space: pre-wrap;
  word-break: break-word;
  font-family: ${() => useTheme().fonts.sans};
  font-size: 0.85rem;
  line-height: 1.4;
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
      const totalDays = Math.floor(diff / (1000 * 60 * 60 * 24));

      setLeft({
        weeks: Math.floor(totalDays / 7),
        days: totalDays % 7,
        totalDays,
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        isComplete: diff === 0,
      });
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);

  return left;
}

function formatWeddingDate(date: Date) {
  const options: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric',
    weekday: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  };
  return date.toLocaleDateString('en-US', options);
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
  precipitation_probability_max?: (number | null)[];
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

type RsvpStats = {
  confirmed: number;
  pending: number;
  total: number;
  herrgardenGuests: number;
  hotelGuests: number;
  songRequests: number;
  fridayAttendance: number;
  saturdayAttendance: number;
  saturdayBrunchAttendance: number;
  sundayBreakfastAttendance: number;
  alcoholGuests: number;
  nonAlcoholGuests: number;
  herrgardenEmails: string[];
  hotelEmails: string[];
  songRequestList: string[];
  loading: boolean;
  error: string | null;
};

function weatherCodeToLabel(code: number | null): string {
  if (code === null) return '—';
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

function useWeddingWeather(): {
  friday: WeddingDayForecast | null;
  saturday: WeddingDayForecast | null;
  loading: boolean;
  error: string | null;
  lastUpdated: Date | null;
} {
  const [friday, setFriday] = useState<WeddingDayForecast | null>(null);
  const [saturday, setSaturday] = useState<WeddingDayForecast | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchWeather = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({
        latitude: String(WEDDING_WEATHER_LAT),
        longitude: String(WEDDING_WEATHER_LON),
        daily: 'weathercode,temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max',
        timezone: 'Europe/Stockholm',
        start_date: '2026-07-24',
        end_date: '2026-07-25',
      });
      const res = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`);
      if (!res.ok) throw new Error(`Weather API ${res.status}`);
      const data = (await res.json()) as { daily?: OpenMeteoDaily };
      const daily = data.daily;
      if (!daily?.time?.length) {
        setFriday(null);
        setSaturday(null);
        setError(null);
        setLoading(false);
        setLastUpdated(new Date());
        return;
      }
      const build = (i: number, label: string): WeddingDayForecast => ({
        date: daily.time[i] ?? '',
        label,
        weathercode: daily.weathercode?.[i] ?? null,
        tempMax: daily.temperature_2m_max?.[i] ?? null,
        tempMin: daily.temperature_2m_min?.[i] ?? null,
        precipSum: daily.precipitation_sum?.[i] ?? null,
        precipProbability: daily.precipitation_probability_max?.[i] ?? null,
      });
      setFriday(build(0, 'Friday 24 Jul'));
      setSaturday(build(daily.time.length > 1 ? 1 : 0, 'Saturday 25 Jul'));
      setLastUpdated(new Date());
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load weather');
      setFriday(null);
      setSaturday(null);
      setLastUpdated(new Date());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWeather();
    const id = setInterval(fetchWeather, REFETCH_WEATHER_MS);
    return () => clearInterval(id);
  }, [fetchWeather]);

  return { friday, saturday, loading, error, lastUpdated };
}

function useRsvpStats(): RsvpStats {
  const [confirmed, setConfirmed] = useState(0);
  const [herrgardenGuests, setHerrgardenGuests] = useState(0);
  const [hotelGuests, setHotelGuests] = useState(0);
  const [songRequests, setSongRequests] = useState(0);
  const [fridayAttendance, setFridayAttendance] = useState(0);
  const [saturdayAttendance, setSaturdayAttendance] = useState(0);
  const [saturdayBrunchAttendance, setSaturdayBrunchAttendance] = useState(0);
  const [sundayBreakfastAttendance, setSundayBreakfastAttendance] = useState(0);
  const [alcoholGuests, setAlcoholGuests] = useState(0);
  const [nonAlcoholGuests, setNonAlcoholGuests] = useState(0);
  const [herrgardenEmails, setHerrgardenEmails] = useState<string[]>([]);
  const [hotelEmails, setHotelEmails] = useState<string[]>([]);
  const [songRequestList, setSongRequestList] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const rsvpRef = ref(db, 'rsvpResponses');
    const unsubscribe = onValue(
      rsvpRef,
      (snapshot) => {
        setLoading(false);
        setError(null);
        const data = snapshot.val();
        if (!data) {
          setConfirmed(0);
          setHerrgardenGuests(0);
          setHotelGuests(0);
          setSongRequests(0);
          setFridayAttendance(0);
          setSaturdayAttendance(0);
          setSaturdayBrunchAttendance(0);
          setSundayBreakfastAttendance(0);
          setAlcoholGuests(0);
          setNonAlcoholGuests(0);
          setHerrgardenEmails([]);
          setHotelEmails([]);
          setSongRequestList([]);
          return;
        }
        let totalGuests = 0;
        let herrgarden = 0;
        let hotel = 0;
        let songs = 0;
        let friday = 0;
        let saturday = 0;
        let saturdayBrunch = 0;
        let sundayBreakfast = 0;
        let alcohol = 0;
        let nonAlcohol = 0;
        const herrgardenEmailMap = new Map<string, string>();
        const hotelEmailMap = new Map<string, string>();
        const songRequestItems: string[] = [];
        const entries = Object.values(data) as RsvpResponse[];
        for (const entry of entries) {
          const guests = entry?.guests ?? [];
          if (!Array.isArray(guests)) continue;
          const count = guests.length;
          totalGuests += count;
          const acc = (entry?.accommodation ?? '').toLowerCase();
          if (acc === 'herrgarden') herrgarden += count;
          else if (acc === 'hotel') hotel += count;
          const email = typeof entry?.email === 'string' ? entry.email.trim() : '';
          if (email) {
            const normalizedEmail = email.toLowerCase();
            if (acc === 'herrgarden' && !herrgardenEmailMap.has(normalizedEmail)) {
              herrgardenEmailMap.set(normalizedEmail, email);
            }
            if (acc === 'hotel' && !hotelEmailMap.has(normalizedEmail)) {
              hotelEmailMap.set(normalizedEmail, email);
            }
          }

          // Count attendance by arrival day
          const arrival = entry?.arrival ?? '';
          const departure = entry?.departure ?? '';
          if (arrival === 'Fri') {
            // Arrival Friday → attend Friday; Saturday only if not leaving Friday
            friday += count;
            if (departure !== 'Fri') {
              saturday += count;
            }
          } else if (arrival === 'Sat') {
            // Arrival Saturday → attend only Saturday
            saturday += count;
          }

          if (departure === 'Sun') {
            // Departure Sunday
            sundayBreakfast += count;
          }

          // Count brunch attendance (Saturday brunch)
          const brunch = entry?.brunch ?? '';
          if (brunch === 'brunch' && departure !== 'Fri') {
            saturdayBrunch += count;
          }

          // Count song requests: guests with non-empty music field
          for (const guest of guests) {
            if (guest && typeof guest === 'object') {
              const guestRecord = guest as Record<string, unknown>;
              const alcoholChoice =
                typeof guestRecord.alcohol === 'string' ? guestRecord.alcohol.trim() : '';
              if (alcoholChoice === 'Alcohol') {
                alcohol += 1;
              } else if (alcoholChoice === 'Non-alcohol') {
                nonAlcohol += 1;
              }
              const music =
                typeof guestRecord.music === 'string' ? guestRecord.music : undefined;
              if (music && typeof music === 'string' && music.trim() !== '') {
                songs += 1;
                songRequestItems.push(music.trim());
              }
            }
          }
        }
        setConfirmed(totalGuests);
        setHerrgardenGuests(herrgarden);
        setHotelGuests(hotel);
        setSongRequests(songs);
        setFridayAttendance(friday);
        setSaturdayAttendance(saturday);
        setSaturdayBrunchAttendance(saturdayBrunch);
        setSundayBreakfastAttendance(sundayBreakfast);
        setAlcoholGuests(alcohol);
        setNonAlcoholGuests(nonAlcohol);
        setHerrgardenEmails(
          Array.from(herrgardenEmailMap.values()).sort((a, b) => a.localeCompare(b))
        );
        setHotelEmails(Array.from(hotelEmailMap.values()).sort((a, b) => a.localeCompare(b)));
        setSongRequestList(songRequestItems);
      },
      (err) => {
        setLoading(false);
        setError(err?.message ?? 'Failed to load RSVP data');
      }
    );
    return () => unsubscribe();
  }, []);

  const pending = Math.max(0, TOTAL_GUESTS - confirmed);
  return {
    confirmed,
    pending,
    total: TOTAL_GUESTS,
    herrgardenGuests,
    hotelGuests,
    songRequests,
    fridayAttendance,
    saturdayAttendance,
    saturdayBrunchAttendance,
    sundayBreakfastAttendance,
    alcoholGuests,
    nonAlcoholGuests,
    herrgardenEmails,
    hotelEmails,
    songRequestList,
    loading,
    error,
  };
}

function DashboardView() {
  const countdown = useCountdown(weddingDate);
  const {
    confirmed,
    pending,
    total,
    herrgardenGuests,
    hotelGuests,
    songRequests,
    fridayAttendance,
    saturdayAttendance,
    saturdayBrunchAttendance,
    sundayBreakfastAttendance,
    alcoholGuests,
    nonAlcoholGuests,
    herrgardenEmails,
    hotelEmails,
    songRequestList,
    loading: rsvpLoading,
    error: rsvpError,
  } = useRsvpStats();
  const { friday: weatherFriday, saturday: weatherSaturday, loading: weatherLoading, error: weatherError, lastUpdated: weatherLastUpdated } = useWeddingWeather();
  const rsvpPercent = total ? Math.round((confirmed / total) * 100) : 0;
  const [copiedList, setCopiedList] = useState<'herrgarden' | 'hotel' | null>(null);
  const [showSongList, setShowSongList] = useState(false);
  const herrgardenEmailsText = useMemo(() => herrgardenEmails.join('\n'), [herrgardenEmails]);
  const hotelEmailsText = useMemo(() => hotelEmails.join('\n'), [hotelEmails]);

  const copyEmails = useCallback(async (emails: string, list: 'herrgarden' | 'hotel') => {
    if (!emails) return;
    try {
      await navigator.clipboard.writeText(emails);
      setCopiedList(list);
      window.setTimeout(() => {
        setCopiedList((current) => (current === list ? null : current));
      }, 1500);
    } catch (err) {
      console.error('Failed to copy emails', err);
    }
  }, []);

  return (
    <PageContainer>
      <Header>
        <TitleRow>
          <HeartIcon size={28} strokeWidth={1.5} />
          <Title>Wedding Dashboard</Title>
          <HeartIcon size={28} strokeWidth={1.5} />
        </TitleRow>
        <Subtitle>Everything you need to know at a glance</Subtitle>
      </Header>

      <CardsGrid>
        <Card>
          <CardHeader>
            <IconCircle>
              <Clock size={22} />
            </IconCircle>
            <CardTitle>Countdown to &apos;I Do&apos;</CardTitle>
          </CardHeader>
          <CountdownRow>
            <CountdownUnit>
              <CountdownValue>{countdown.weeks}</CountdownValue>
              <CountdownLabel>Weeks</CountdownLabel>
            </CountdownUnit>
            <CountdownUnit>
              <CountdownValue>{countdown.days}</CountdownValue>
              <CountdownLabel>Days</CountdownLabel>
            </CountdownUnit>
            <CountdownUnit>
              <CountdownValue>{countdown.hours}</CountdownValue>
              <CountdownLabel>Hours</CountdownLabel>
            </CountdownUnit>
            <CountdownUnit>
              <CountdownValue>{countdown.minutes}</CountdownValue>
              <CountdownLabel>Minutes</CountdownLabel>
            </CountdownUnit>
          </CountdownRow>
          <RsvpCountdownSection>
            <RsvpBigNumber>{countdown.totalDays}</RsvpBigNumber>
            <CountdownLabel>
              {countdown.totalDays === 1 ? 'day' : 'days'} until the wedding
            </CountdownLabel>
          </RsvpCountdownSection>
        </Card>

        <Card>
          <CardHeader>
            <IconCircle>
              <Users size={22} />
            </IconCircle>
            <CardTitle>Guest RSVPs</CardTitle>
          </CardHeader>
          {rsvpError && (
            <RsvpSubtext style={{ color: useTheme().colors.error.light }}>{rsvpError}</RsvpSubtext>
          )}
          {rsvpLoading ? (
            <RsvpSubtext>Loading…</RsvpSubtext>
          ) : (
            <>
              <RsvpBigNumber>{confirmed}</RsvpBigNumber>
              <RsvpSubtext>of {total} guests confirmed</RsvpSubtext>
              <ProgressBar>
                <ProgressFill $percent={rsvpPercent} />
              </ProgressBar>
              <RsvpBreakdown>
                <RsvpRow>
                  <RsvpRowLeft>
                    <Check size={18} color={useTheme().colors.success.iconDetails} />
                    Confirmed
                  </RsvpRowLeft>
                  <RsvpRowRight>{confirmed}</RsvpRowRight>
                </RsvpRow>
                <RsvpRow>
                  <RsvpRowLeft>
                    <Hourglass size={18} color={useTheme().colors.red.primary} />
                    Pending
                  </RsvpRowLeft>
                  <RsvpRowRight>{pending}</RsvpRowRight>
                </RsvpRow>
                <RsvpRow>
                  <RsvpRowLeft>Alcohol</RsvpRowLeft>
                  <RsvpRowRight>{alcoholGuests}</RsvpRowRight>
                </RsvpRow>
                <RsvpRow>
                  <RsvpRowLeft>Non-alcohol</RsvpRowLeft>
                  <RsvpRowRight>{nonAlcoholGuests}</RsvpRowRight>
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
              <CardTitle>Where guests stay</CardTitle>
            </CardHeader>
            {rsvpLoading ? (
              <StayRow>
                <StayLeft>Loading…</StayLeft>
              </StayRow>
            ) : (
              <>
                <StayRow>
                  <StayLeft>
                    <Home size={18} color={useTheme().colors.red.primary} />
                    Herrgården
                  </StayLeft>
                  <span>{herrgardenGuests}</span>
                </StayRow>
                <StayRow>
                  <StayLeft>
                    <Building2 size={18} color={useTheme().colors.red.primary} />
                    Hotel
                  </StayLeft>
                  <span>{hotelGuests}</span>
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
              {weddingDate.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
              })}
            </BigDayDate>
            <BigDaySubtext>{formatWeddingDate(weddingDate)}</BigDaySubtext>
          </Card>

          <SongRequestsCard
            role="button"
            tabIndex={0}
            aria-expanded={showSongList}
            aria-label="Open song requests list"
            onClick={() => setShowSongList(true)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                setShowSongList(true);
              }
            }}
          >
            <CardHeader>
              <IconCircle $accent="purple">
                <Music size={22} />
              </IconCircle>
              <CardTitle>Song Requests</CardTitle>
            </CardHeader>
            {rsvpLoading ? (
              <SongSubtext>Loading…</SongSubtext>
            ) : (
              <>
                <SongCount>{songRequests}</SongCount>
                <SongSubtext>dance floor bangers submitted</SongSubtext>
              </>
            )}
          </SongRequestsCard>
        </BottomRow>

        <FullWidthCard>
          <CardHeader>
            <IconCircle>
              <CalendarDays size={22} />
            </IconCircle>
            <CardTitle>Attendance</CardTitle>
          </CardHeader>
          {rsvpLoading ? (
            <SongSubtext>Loading…</SongSubtext>
          ) : (
            <>
              <StayRow>
                <StayLeft>
                  <CalendarDays size={18} color={useTheme().colors.red.primary} />
                  Friday Dinner & Mingle
                </StayLeft>
                <span>{fridayAttendance}</span>
              </StayRow>
              <StayRow>
                <StayLeft>
                  <CalendarDays size={18} color={useTheme().colors.red.primary} />
                  Saturday Wedding
                </StayLeft>
                <span>{saturdayAttendance}</span>
              </StayRow>
              <StayRow>
                <StayLeft>
                  <CalendarDays size={18} color={useTheme().colors.red.primary} />
                  Saturday Brunch
                </StayLeft>
                <span>{saturdayBrunchAttendance}</span>
              </StayRow>
              <StayRow>
                <StayLeft>
                  <CalendarDays size={18} color={useTheme().colors.red.primary} />
                  Sunday Breakfast
                </StayLeft>
                <span>{sundayBreakfastAttendance}</span>
              </StayRow>
            </>
          )}
        </FullWidthCard>

        <FullWidthCard>
          <CardHeader>
            <IconCircle>
              <Users size={22} />
            </IconCircle>
            <CardTitle>RSVP Email Lists</CardTitle>
          </CardHeader>
          {rsvpLoading ? (
            <RsvpSubtext>Loading…</RsvpSubtext>
          ) : (
            <EmailLists>
              <EmailListCard>
                <EmailListHeader>
                  <EmailListTitle>Staying at Herrgarden ({herrgardenEmails.length})</EmailListTitle>
                  <CopyButton
                    type="button"
                    onClick={() => void copyEmails(herrgardenEmailsText, 'herrgarden')}
                    disabled={!herrgardenEmailsText}
                  >
                    {copiedList === 'herrgarden' ? 'Copied' : 'Copy'}
                  </CopyButton>
                </EmailListHeader>
                <EmailBlock>{herrgardenEmailsText || 'No emails yet.'}</EmailBlock>
              </EmailListCard>
              <EmailListCard>
                <EmailListHeader>
                  <EmailListTitle>Staying at Hotel ({hotelEmails.length})</EmailListTitle>
                  <CopyButton
                    type="button"
                    onClick={() => void copyEmails(hotelEmailsText, 'hotel')}
                    disabled={!hotelEmailsText}
                  >
                    {copiedList === 'hotel' ? 'Copied' : 'Copy'}
                  </CopyButton>
                </EmailListHeader>
                <EmailBlock>{hotelEmailsText || 'No emails yet.'}</EmailBlock>
              </EmailListCard>
            </EmailLists>
          )}
        </FullWidthCard>

        <FullWidthCard>
          <CardHeader>
            <IconCircle>
              <Cloud size={22} />
            </IconCircle>
            <CardTitle>Weather (Ramnäs)</CardTitle>
          </CardHeader>
          {weatherError && (
            <RsvpSubtext style={{ color: useTheme().colors.error.light }}>{weatherError}</RsvpSubtext>
          )}
          {weatherLoading && !weatherFriday && !weatherSaturday ? (
            <RsvpSubtext>Loading forecast…</RsvpSubtext>
          ) : weatherFriday || weatherSaturday ? (
            <>
              <WeatherGrid>
                {weatherFriday && (
                  <WeatherDay>
                    <WeatherDayName>{weatherFriday.label}</WeatherDayName>
                    <WeatherTemp>
                      {weatherFriday.tempMax != null ? `${Math.round(weatherFriday.tempMax)}°C` : '—'}
                      {weatherFriday.tempMin != null && ` / ${Math.round(weatherFriday.tempMin)}°C min`}
                    </WeatherTemp>
                    <WeatherDesc>{weatherCodeToLabel(weatherFriday.weathercode)}</WeatherDesc>
                    {(weatherFriday.precipSum != null && weatherFriday.precipSum > 0) || weatherFriday.precipProbability != null ? (
                      <WeatherPrecip>
                        {weatherFriday.precipSum != null && weatherFriday.precipSum > 0 && `${weatherFriday.precipSum} mm`}
                        {weatherFriday.precipProbability != null && ` · ${weatherFriday.precipProbability}% rain`}
                      </WeatherPrecip>
                    ) : null}
                  </WeatherDay>
                )}
                {weatherSaturday && (
                  <WeatherDay>
                    <WeatherDayName>{weatherSaturday.label}</WeatherDayName>
                    <WeatherTemp>
                      {weatherSaturday.tempMax != null ? `${Math.round(weatherSaturday.tempMax)}°C` : '—'}
                      {weatherSaturday.tempMin != null && ` / ${Math.round(weatherSaturday.tempMin)}°C min`}
                    </WeatherTemp>
                    <WeatherDesc>{weatherCodeToLabel(weatherSaturday.weathercode)}</WeatherDesc>
                    {(weatherSaturday.precipSum != null && weatherSaturday.precipSum > 0) || weatherSaturday.precipProbability != null ? (
                      <WeatherPrecip>
                        {weatherSaturday.precipSum != null && weatherSaturday.precipSum > 0 && `${weatherSaturday.precipSum} mm`}
                        {weatherSaturday.precipProbability != null && ` · ${weatherSaturday.precipProbability}% rain`}
                      </WeatherPrecip>
                    ) : null}
                  </WeatherDay>
                )}
              </WeatherGrid>
              {weatherLastUpdated && (
                <WeatherUpdated>
                  Updated {weatherLastUpdated.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
                  {' · refreshes every 30 min'}
                </WeatherUpdated>
              )}
            </>
          ) : (
            <RsvpSubtext>Forecast for 24–25 July available within 16 days of the date.</RsvpSubtext>
          )}
        </FullWidthCard>
      </CardsGrid>

      {showSongList && (
        <ModalOverlay onClick={() => setShowSongList(false)}>
          <ModalContent onClick={(event) => event.stopPropagation()}>
            <ModalHeader>
              <CardHeader>
                <IconCircle $accent="purple">
                  <Music size={22} />
                </IconCircle>
                <CardTitle>Song Request List ({songRequestList.length})</CardTitle>
              </CardHeader>
              <ModalCloseButton
                type="button"
                aria-label="Close song requests list"
                onClick={() => setShowSongList(false)}
              >
                <X size={16} />
              </ModalCloseButton>
            </ModalHeader>
            {rsvpLoading ? (
              <RsvpSubtext>Loading…</RsvpSubtext>
            ) : songRequestList.length === 0 ? (
              <RsvpSubtext>No song requests yet.</RsvpSubtext>
            ) : (
              <SongList>
                {songRequestList.map((song, index) => (
                  <SongListItem key={`${song}-${index}`}>{song}</SongListItem>
                ))}
              </SongList>
            )}
          </ModalContent>
        </ModalOverlay>
      )}
    </PageContainer>
  );
}

export default DashboardView;
