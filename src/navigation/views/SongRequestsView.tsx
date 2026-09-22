import styled, { css, keyframes } from 'styled-components';
import {
  PointerEvent as ReactPointerEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useTheme } from '../../app/AppStyling';
import { Check, GripVertical, ListMusic, Trash2 } from 'lucide-react';
import { rgba } from 'polished';
import { db, onValue, ref, remove, update } from '../../firebase/firebase';
import LocaleCreamShell from '../../components/layout/LocaleCreamShell';

const Content = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
`;
const TitleWrapper = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;
const TitleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;
const Title = styled.h1`
  font-size: 2rem;
  font-family: 'Georgia', serif;
  color: ${() => useTheme().colors.red.primary};
  margin: 0;
`;
const Subtitle = styled.p`
  font-size: 1.1rem;
  color: ${() => useTheme().colors.red.primary};
  max-width: 40rem;
  margin: 0 auto;
  line-height: 1.6;
  font-family: 'Georgia', serif;
`;
const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 auto;
  max-width: 36rem;
  width: 100%;
  position: relative;
`;
const slideTransition = css`
  transition: transform 0.25s ease, opacity 0.2s ease, max-height 0.25s ease,
    margin 0.25s ease, padding 0.25s ease;
`;
const collapseOut = keyframes`
  to {
    max-height: 0;
    margin-bottom: 0;
    opacity: 0;
  }
`;
const ItemSlot = styled.li<{ $dragging: boolean; $removing: boolean }>`
  position: relative;
  margin-bottom: 0.5rem;
  border-radius: 0.5rem;
  z-index: ${({ $dragging }) => ($dragging ? 5 : 1)};

  ${({ $removing }) =>
    $removing &&
    css`
      pointer-events: none;
      overflow: hidden;
      animation: ${collapseOut} 0.2s ease forwards;
    `};
`;
const DeleteBg = styled.div<{ $progress: number }>`
  position: absolute;
  inset: 0;
  border-radius: 0.5rem;
  background: ${({ theme }) => theme.colors.error.delete};
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 1.25rem;
  color: #fff;
  opacity: ${({ $progress }) => Math.min(1, $progress)};
  pointer-events: none;
`;
const DeleteLabel = styled.span`
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, sans-serif;
  font-size: 0.85rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  margin-left: 0.5rem;
`;
type ForegroundProps = {
  $checked: boolean;
  $offsetX: number;
  $offsetY: number;
  $dragging: boolean;
  $swiping: boolean;
  $animateBack: boolean;
};
const ItemForeground = styled.div<ForegroundProps>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 0.85rem 0.75rem 0.85rem 0.5rem;
  border-radius: 0.5rem;
  background: ${({ $checked }) => ($checked ? 'rgba(0,0,0,0.06)' : '#fff8f1')};
  border: 1px solid ${() => rgba(useTheme().colors.red.primary, 0.12)};
  transform: translate3d(
    ${({ $offsetX }) => `${$offsetX}px`},
    ${({ $offsetY }) => `${$offsetY}px`},
    0
  )
    ${({ $dragging }) => ($dragging ? 'scale(1.02)' : 'scale(1)')};
  box-shadow: ${({ $dragging }) =>
    $dragging ? '0 12px 24px rgba(0, 0, 0, 0.18)' : 'none'};
  touch-action: pan-y;
  user-select: none;
  -webkit-user-select: none;
  ${({ $swiping, $dragging, $animateBack }) =>
    $animateBack || (!$swiping && !$dragging) ? slideTransition : ''};
`;
const DragHandle = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2.5rem;
  border: none;
  background: transparent;
  color: ${() => rgba(useTheme().colors.red.primary, 0.55)};
  cursor: grab;
  flex-shrink: 0;
  padding: 0;
  touch-action: none;

  &:active {
    cursor: grabbing;
  }

  &:focus-visible {
    outline: 2px solid ${() => useTheme().colors.red.tertiary};
    outline-offset: 2px;
    border-radius: 4px;
  }
`;
const SongMetaBlock = styled.div<{ $checked: boolean }>`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 1;
  min-width: 0;
  opacity: ${({ $checked }) => ($checked ? 0.55 : 1)};
  transition: opacity 0.2s ease;
`;
const SongText = styled.span<{ $checked: boolean }>`
  font-family: 'Georgia', serif;
  font-size: 1rem;
  color: ${() => useTheme().colors.red.primary};
  text-align: left;
  flex: 1;
  word-break: break-word;
  text-decoration: ${({ $checked }) => ($checked ? 'line-through' : 'none')};
`;
const Meta = styled.span`
  font-size: 0.75rem;
  color: ${() => rgba(useTheme().colors.red.primary, 0.65)};
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, sans-serif;
  flex-shrink: 0;
`;
const CheckButton = styled.button<{ $done: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  border: 2px solid
    ${({ $done, theme }) => ($done ? theme.colors.red.primary : theme.colors.red.primary)};
  background: ${({ $done, theme }) => ($done ? theme.colors.red.primary : 'transparent')};
  cursor: pointer;
  flex-shrink: 0;
  transition: background 0.15s ease, border-color 0.15s ease;

  &:hover {
    background: ${({ $done, theme }) =>
    $done ? theme.colors.red.primary : rgba(theme.colors.red.primary, 0.12)};
  }

  &:focus-visible {
    outline: 2px solid ${() => useTheme().colors.red.tertiary};
    outline-offset: 2px;
  }
`;
const EmptyState = styled.p`
  text-align: center;
  font-family: 'Georgia', serif;
  color: ${() => useTheme().colors.red.primary};
  opacity: 0.85;
`;

type SongRequestDoc = {
  id: string;
  song: string;
  checked: boolean;
  createdAt: number | null;
  order: number | null;
};

const SWIPE_LOCK_THRESHOLD = 8;
const SWIPE_DELETE_THRESHOLD = 110;
const SWIPE_MAX_TRAVEL = 360;

function formatTime(ms: number | null): string {
  if (ms == null || typeof ms !== 'number') return '';
  try {
    return new Date(ms).toLocaleString(undefined, {
      dateStyle: 'short',
      timeStyle: 'short',
    });
  } catch {
    return '';
  }
}

function sortSongRequests(arr: SongRequestDoc[]): SongRequestDoc[] {
  return [...arr].sort((a, b) => {
    if (a.checked !== b.checked) return a.checked ? 1 : -1;
    const aHas = typeof a.order === 'number';
    const bHas = typeof b.order === 'number';
    if (aHas && bHas) return (a.order as number) - (b.order as number);
    if (!aHas && !bHas) return (b.createdAt ?? 0) - (a.createdAt ?? 0);
    return aHas ? 1 : -1;
  });
}

type DragState = {
  id: string;
  pointerId: number;
  startY: number;
  currentY: number;
  slotOffset: number;
};

type SwipeState = {
  id: string;
  pointerId: number;
  startX: number;
  startY: number;
  axis: 'h' | 'v' | null;
};

function SongRequestsView() {

  const [items, setItems] = useState<SongRequestDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [removing, setRemoving] = useState<Set<string>>(new Set());
  const [draftOrder, setDraftOrder] = useState<string[] | null>(null);
  const [dragging, setDragging] = useState<DragState | null>(null);
  const [swipeOffsets, setSwipeOffsets] = useState<Record<string, number>>({});
  const [animatingBack, setAnimatingBack] = useState<Set<string>>(new Set());

  const itemRefs = useRef<Map<string, HTMLLIElement>>(new Map());
  const swipeRef = useRef<SwipeState | null>(null);
  const draftOrderRef = useRef<string[] | null>(null);
  const draggingRef = useRef<DragState | null>(null);

  useEffect(() => {
    draftOrderRef.current = draftOrder;
  }, [draftOrder]);

  useEffect(() => {
    draggingRef.current = dragging;
  }, [dragging]);

  useEffect(() => {
    const songRef = ref(db, 'songRequests');
    const unsub = onValue(songRef, (snapshot) => {
      const val = snapshot.val() as Record<
        string,
        { song?: unknown; checked?: unknown; createdAt?: unknown; order?: unknown }
      > | null;
      if (!val) {
        setItems([]);
        setLoading(false);
        return;
      }
      const next: SongRequestDoc[] = Object.entries(val).map(([id, row]) => ({
        id,
        song: typeof row.song === 'string' ? row.song : '',
        checked: Boolean(row.checked),
        createdAt: typeof row.createdAt === 'number' ? row.createdAt : null,
        order: typeof row.order === 'number' ? row.order : null,
      }));
      setItems(sortSongRequests(next));
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const displayItems = useMemo(() => {
    if (!draftOrder) return items;
    const map = new Map(items.map((it) => [it.id, it]));
    const ordered: SongRequestDoc[] = [];
    for (const id of draftOrder) {
      const it = map.get(id);
      if (it) ordered.push(it);
    }
    for (const it of items) {
      if (!draftOrder.includes(it.id)) ordered.push(it);
    }
    return ordered;
  }, [items, draftOrder]);

  const toggleChecked = useCallback(async (id: string, current: boolean) => {
    try {
      await update(ref(db, `songRequests/${id}`), { checked: !current });
    } catch {
      // swallow; the live listener will resync state
    }
  }, []);

  const performDelete = useCallback(async (id: string) => {
    setRemoving((prev) => {
      if (prev.has(id)) return prev;
      const next = new Set(prev);
      next.add(id);
      return next;
    });
    window.setTimeout(async () => {
      try {
        await remove(ref(db, `songRequests/${id}`));
      } catch {
        // noop
      } finally {
        setSwipeOffsets((prev) => {
          if (!(id in prev)) return prev;
          const next = { ...prev };
          delete next[id];
          return next;
        });
        setRemoving((prev) => {
          if (!prev.has(id)) return prev;
          const next = new Set(prev);
          next.delete(id);
          return next;
        });
      }
    }, 200);
  }, []);

  const handleItemPointerDown = useCallback(
    (e: ReactPointerEvent<HTMLDivElement>, id: string) => {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      const target = e.target as HTMLElement;
      if (target.closest('[data-drag-handle]') || target.closest('[data-check-button]')) {
        return;
      }
      if (draggingRef.current) return;
      swipeRef.current = {
        id,
        pointerId: e.pointerId,
        startX: e.clientX,
        startY: e.clientY,
        axis: null,
      };
      setAnimatingBack((prev) => {
        if (!prev.has(id)) return prev;
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    },
    [],
  );

  const handleItemPointerMove = useCallback(
    (e: ReactPointerEvent<HTMLDivElement>, id: string) => {
      const swipe = swipeRef.current;
      if (!swipe || swipe.id !== id || swipe.pointerId !== e.pointerId) return;
      const dx = e.clientX - swipe.startX;
      const dy = e.clientY - swipe.startY;
      if (!swipe.axis) {
        if (Math.abs(dx) < SWIPE_LOCK_THRESHOLD && Math.abs(dy) < SWIPE_LOCK_THRESHOLD) {
          return;
        }
        swipe.axis = Math.abs(dx) > Math.abs(dy) ? 'h' : 'v';
        if (swipe.axis === 'h') {
          try {
            (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
          } catch {
            // ignore
          }
        }
      }
      if (swipe.axis !== 'h') return;
      const next = Math.max(-SWIPE_MAX_TRAVEL, Math.min(0, dx));
      setSwipeOffsets((prev) => {
        if (prev[id] === next) return prev;
        return { ...prev, [id]: next };
      });
    },
    [],
  );

  const finishSwipe = useCallback(
    (e: ReactPointerEvent<HTMLDivElement>, id: string) => {
      const swipe = swipeRef.current;
      if (!swipe || swipe.id !== id || swipe.pointerId !== e.pointerId) return;
      swipeRef.current = null;
      try {
        (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {
        // ignore
      }
      const offset = swipeOffsets[id] ?? 0;
      if (swipe.axis === 'h' && offset <= -SWIPE_DELETE_THRESHOLD) {
        setSwipeOffsets((prev) => ({ ...prev, [id]: -SWIPE_MAX_TRAVEL }));
        setAnimatingBack((prev) => {
          const next = new Set(prev);
          next.add(id);
          return next;
        });
        void performDelete(id);
      } else if (offset !== 0) {
        setAnimatingBack((prev) => {
          const next = new Set(prev);
          next.add(id);
          return next;
        });
        setSwipeOffsets((prev) => ({ ...prev, [id]: 0 }));
        window.setTimeout(() => {
          setAnimatingBack((prev) => {
            if (!prev.has(id)) return prev;
            const next = new Set(prev);
            next.delete(id);
            return next;
          });
        }, 260);
      }
    },
    [performDelete, swipeOffsets],
  );

  const handleDragStart = useCallback(
    (e: ReactPointerEvent<HTMLButtonElement>, id: string) => {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      e.preventDefault();
      e.stopPropagation();
      try {
        e.currentTarget.setPointerCapture(e.pointerId);
      } catch {
        // ignore
      }
      const baseOrder = displayItems.map((it) => it.id);
      setDraftOrder(baseOrder);
      draftOrderRef.current = baseOrder;
      const next: DragState = {
        id,
        pointerId: e.pointerId,
        startY: e.clientY,
        currentY: e.clientY,
        slotOffset: 0,
      };
      setDragging(next);
      draggingRef.current = next;
    },
    [displayItems],
  );

  const handleDragMove = useCallback((e: ReactPointerEvent<HTMLButtonElement>) => {
    const current = draggingRef.current;
    if (!current || current.pointerId !== e.pointerId) return;
    const order = draftOrderRef.current;
    if (!order) return;
    if (order.indexOf(current.id) === -1) return;

    let slotOffset = current.slotOffset;
    let mutatedOrder = order;
    let visualOffset = e.clientY - current.startY - slotOffset;

    while (visualOffset > 0) {
      const liveIdx = mutatedOrder.indexOf(current.id);
      if (liveIdx === -1 || liveIdx + 1 >= mutatedOrder.length) break;
      const nextId = mutatedOrder[liveIdx + 1];
      const nextEl = itemRefs.current.get(nextId);
      if (!nextEl) break;
      const nextHeight = nextEl.offsetHeight + 8;
      if (visualOffset <= nextHeight / 2) break;
      mutatedOrder = [...mutatedOrder];
      [mutatedOrder[liveIdx], mutatedOrder[liveIdx + 1]] = [
        mutatedOrder[liveIdx + 1],
        mutatedOrder[liveIdx],
      ];
      slotOffset += nextHeight;
      visualOffset = e.clientY - current.startY - slotOffset;
    }

    while (visualOffset < 0) {
      const liveIdx = mutatedOrder.indexOf(current.id);
      if (liveIdx <= 0) break;
      const prevId = mutatedOrder[liveIdx - 1];
      const prevEl = itemRefs.current.get(prevId);
      if (!prevEl) break;
      const prevHeight = prevEl.offsetHeight + 8;
      if (visualOffset >= -prevHeight / 2) break;
      mutatedOrder = [...mutatedOrder];
      [mutatedOrder[liveIdx], mutatedOrder[liveIdx - 1]] = [
        mutatedOrder[liveIdx - 1],
        mutatedOrder[liveIdx],
      ];
      slotOffset -= prevHeight;
      visualOffset = e.clientY - current.startY - slotOffset;
    }

    if (mutatedOrder !== order) {
      draftOrderRef.current = mutatedOrder;
      setDraftOrder(mutatedOrder);
    }

    if (slotOffset !== current.slotOffset || e.clientY !== current.currentY) {
      const updated: DragState = {
        ...current,
        currentY: e.clientY,
        slotOffset,
      };
      draggingRef.current = updated;
      setDragging(updated);
    }
  }, []);

  const handleDragEnd = useCallback(
    async (e: ReactPointerEvent<HTMLButtonElement>) => {
      const current = draggingRef.current;
      if (!current || current.pointerId !== e.pointerId) return;
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {
        // ignore
      }
      const finalOrder = draftOrderRef.current;
      const originalOrder = items.map((it) => it.id);
      draggingRef.current = null;
      setDragging(null);

      if (
        finalOrder &&
        (finalOrder.length !== originalOrder.length ||
          finalOrder.some((id, i) => id !== originalOrder[i]))
      ) {
        const updates: Record<string, number> = {};
        finalOrder.forEach((id, i) => {
          updates[`songRequests/${id}/order`] = i;
        });
        try {
          await update(ref(db), updates);
        } catch {
          // swallow; live listener restores correct state
        }
      }
      setDraftOrder(null);
      draftOrderRef.current = null;
    },
    [items],
  );

  const draggedId = dragging?.id ?? null;
  const dragDelta = dragging ? dragging.currentY - dragging.startY - dragging.slotOffset : 0;

  return (
    <LocaleCreamShell>
      <Content>
        <TitleWrapper>
          <TitleRow>
            <ListMusic size={24} color={useTheme().colors.red.primary} />
            <Title>Requests</Title>
            <ListMusic size={24} color={useTheme().colors.red.primary} />
          </TitleRow>
          <Subtitle>Mark a song as played when it has been queued or played.</Subtitle>
        </TitleWrapper>

        {loading ? (
          <EmptyState>Loading…</EmptyState>
        ) : displayItems.length === 0 ? (
          <EmptyState>No song requests yet.</EmptyState>
        ) : (
          <List>
            {displayItems.map((row) => {
              const isDragging = draggedId === row.id;
              const isRemoving = removing.has(row.id);
              const offsetX = swipeOffsets[row.id] ?? 0;
              const offsetY = isDragging ? dragDelta : 0;
              const isSwiping =
                swipeRef.current?.id === row.id && swipeRef.current?.axis === 'h';
              const isAnimatingBack = animatingBack.has(row.id);
              const deleteProgress = Math.min(1, Math.abs(offsetX) / SWIPE_DELETE_THRESHOLD);

              return (
                <ItemSlot
                  key={row.id}
                  $dragging={isDragging}
                  $removing={isRemoving}
                  ref={(el: HTMLLIElement | null) => {
                    if (el) itemRefs.current.set(row.id, el);
                    else itemRefs.current.delete(row.id);
                  }}
                >
                  <DeleteBg $progress={deleteProgress} aria-hidden>
                    {deleteProgress > 0 ? (
                      <>
                        <Trash2 size={20} />
                        <DeleteLabel>Delete request</DeleteLabel>
                      </>
                    ) : null}
                  </DeleteBg>
                  <ItemForeground
                    $checked={row.checked}
                    $offsetX={offsetX}
                    $offsetY={offsetY}
                    $dragging={isDragging}
                    $swiping={isSwiping}
                    $animateBack={isAnimatingBack}
                    onPointerDown={(e) => handleItemPointerDown(e, row.id)}
                    onPointerMove={(e) => handleItemPointerMove(e, row.id)}
                    onPointerUp={(e) => finishSwipe(e, row.id)}
                    onPointerCancel={(e) => finishSwipe(e, row.id)}
                  >
                    <DragHandle
                      type="button"
                      data-drag-handle
                      aria-label="Drag to reorder"
                      onPointerDown={(e) => handleDragStart(e, row.id)}
                      onPointerMove={handleDragMove}
                      onPointerUp={handleDragEnd}
                      onPointerCancel={handleDragEnd}
                    >
                      <GripVertical size={18} aria-hidden />
                    </DragHandle>
                    <SongMetaBlock $checked={row.checked}>
                      <SongText $checked={row.checked}>{row.song}</SongText>
                      <Meta>{formatTime(row.createdAt)}</Meta>
                    </SongMetaBlock>
                    <CheckButton
                      type="button"
                      data-check-button
                      $done={row.checked}
                      onClick={() => toggleChecked(row.id, row.checked)}
                      aria-label={
                        row.checked
                          ? "Mark as unplayed"
                          : "Mark as played"
                      }
                      aria-pressed={row.checked}
                    >
                      <Check
                        size={18}
                        color={row.checked ? '#fffef8' : useTheme().colors.red.primary}
                        strokeWidth={row.checked ? 2.75 : 2}
                        aria-hidden
                      />
                    </CheckButton>
                  </ItemForeground>
                </ItemSlot>
              );
            })}
          </List>
        )}
      </Content>
    </LocaleCreamShell>
  );
}

export default SongRequestsView;
