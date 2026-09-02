import { useEffect, useRef, useState } from "react";
import { useLang } from "../../i18n/LangContext";

type FishState = "swim" | "seek" | "eaten";
type Layer = "back" | "front";
type Phase = "idle" | "feeding" | "predator";

interface Fish {
  id: number;
  x: number;
  pageY: number;
  vx: number;
  size: number;
  color: string;
  layer: Layer;
  phase: number;
  state: FishState;
  spawnTime: number;
}

interface Food {
  id: number;
  x: number;
  pageY: number;
  vy: number;
  eaten: boolean;
}

interface Predator {
  x: number;
  pageY: number;
  vx: number;
  vy: number;
  size: number;
  startTime: number;
  eatenCount: number;
  exiting: boolean;
}

const FISH_COLORS = ["#2563eb", "#10b981", "#f59e0b", "#ec4899", "#8b5cf6"];

let idCounter = 0;
function nextId() {
  idCounter += 1;
  return idCounter;
}

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function getDocHeight() {
  return Math.max(document.body.scrollHeight, window.innerHeight);
}

function createFish(layer: Layer, docHeight: number, viewportWidth: number): Fish {
  return {
    id: nextId(),
    x: randomBetween(20, Math.max(40, viewportWidth - 20)),
    pageY: randomBetween(80, Math.max(200, docHeight - 80)),
    vx: randomBetween(0.4, 1) * (Math.random() < 0.5 ? -1 : 1),
    size: randomBetween(10, 16),
    color: FISH_COLORS[Math.floor(Math.random() * FISH_COLORS.length)],
    layer,
    phase: Math.random() * Math.PI * 2,
    state: "swim",
    spawnTime: performance.now(),
  };
}

function drawFish(ctx: CanvasRenderingContext2D, fish: Fish, screenY: number, alpha: number) {
  const facingRight = fish.vx >= 0;
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.translate(fish.x, screenY);
  ctx.scale(facingRight ? 1 : -1, 1);

  ctx.fillStyle = fish.color;
  ctx.beginPath();
  ctx.ellipse(0, 0, fish.size, fish.size * 0.55, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(-fish.size, 0);
  ctx.lineTo(-fish.size * 1.6, -fish.size * 0.5);
  ctx.lineTo(-fish.size * 1.6, fish.size * 0.5);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = "#0a0a0a";
  ctx.beginPath();
  ctx.arc(fish.size * 0.45, -fish.size * 0.1, fish.size * 0.12, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

function drawPredator(ctx: CanvasRenderingContext2D, predator: Predator, screenY: number) {
  const facingRight = predator.vx >= 0;
  ctx.save();
  ctx.translate(predator.x, screenY);
  ctx.scale(facingRight ? 1 : -1, 1);

  ctx.fillStyle = "#0a0a0a";
  ctx.beginPath();
  ctx.ellipse(0, 0, predator.size, predator.size * 0.5, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(-predator.size, 0);
  ctx.lineTo(-predator.size * 1.7, -predator.size * 0.6);
  ctx.lineTo(-predator.size * 1.7, predator.size * 0.6);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = "#ef4444";
  ctx.beginPath();
  ctx.arc(predator.size * 0.5, -predator.size * 0.15, predator.size * 0.14, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

const INITIAL_FISH_COUNT = 10;
const FOOD_COUNT = 4;
const FEED_PHASE_MS = 4500;
const RESPAWN_DELAY_MS = 3500;
const PREDATOR_MAX_CATCH = 5;
const PREDATOR_MAX_HUNT_MS = 5500;
const PREDATOR_SPEED = 3;
const PREDATOR_CATCH_RADIUS_FACTOR = 0.85;

export function Aquarium() {
  const { t } = useLang();
  const backCanvasRef = useRef<HTMLCanvasElement>(null);
  const frontCanvasRef = useRef<HTMLCanvasElement>(null);
  const fishRef = useRef<Fish[]>([]);
  const foodRef = useRef<Food[]>([]);
  const predatorRef = useRef<Predator | null>(null);
  const phaseRef = useRef<Phase>("idle");
  const phaseTimerRef = useRef(0);
  const rafRef = useRef(0);
  const lastTimeRef = useRef(0);
  const scrollYRef = useRef(0);
  const [feedDisabled, setFeedDisabled] = useState(false);

  useEffect(() => {
    const backCanvas = backCanvasRef.current;
    const frontCanvas = frontCanvasRef.current;
    if (!backCanvas || !frontCanvas) return;

    const backCtxNullable = backCanvas.getContext("2d");
    const frontCtxNullable = frontCanvas.getContext("2d");
    if (!backCtxNullable || !frontCtxNullable) return;
    const backCtx: CanvasRenderingContext2D = backCtxNullable;
    const frontCtx: CanvasRenderingContext2D = frontCtxNullable;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;
      for (const canvas of [backCanvas as HTMLCanvasElement, frontCanvas as HTMLCanvasElement]) {
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        canvas.style.width = `${w}px`;
        canvas.style.height = `${h}px`;
        const ctx = canvas.getContext("2d");
        ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
      }
    }

    resize();

    function handleScroll() {
      scrollYRef.current = window.scrollY;
    }
    scrollYRef.current = window.scrollY;
    window.addEventListener("scroll", handleScroll, { passive: true });

    fishRef.current = Array.from({ length: INITIAL_FISH_COUNT }, (_, i) =>
      createFish(i % 2 === 0 ? "back" : "front", getDocHeight(), window.innerWidth),
    );

    function loop(time: number) {
      const dt = lastTimeRef.current ? Math.min((time - lastTimeRef.current) / 16.67, 3) : 1;
      lastTimeRef.current = time;

      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const scrollY = scrollYRef.current;

      backCtx.clearRect(0, 0, vw, vh);
      frontCtx.clearRect(0, 0, vw, vh);

      // --- food physics (gentle fall, tracked in page-space so it follows scroll) ---
      for (const food of foodRef.current) {
        food.vy = Math.min(food.vy + 0.05 * dt, 1.8);
        food.pageY += food.vy * dt;
      }
      foodRef.current = foodRef.current.filter((f) => !f.eaten && f.pageY - scrollY < vh + 30);

      // --- fish behaviour ---
      for (const fish of fishRef.current) {
        if (fish.state === "eaten") continue;

        if (fish.state === "seek") {
          const target = foodRef.current.find((f) => !f.eaten);
          if (!target) {
            fish.state = "swim";
          } else {
            const screenY = fish.pageY - scrollY;
            const targetScreenY = target.pageY - scrollY;
            const dx = target.x - fish.x;
            const dy = targetScreenY - screenY;
            const dist = Math.hypot(dx, dy) || 1;
            const speed = 2.6;
            fish.x += (dx / dist) * speed * dt;
            fish.pageY += (dy / dist) * speed * dt;
            fish.vx = dx >= 0 ? Math.abs(fish.vx) : -Math.abs(fish.vx);
            if (dist < 16) {
              target.eaten = true;
              fish.state = "swim";
            }
          }
        } else {
          fish.x += fish.vx * dt;
          fish.pageY += Math.sin(time * 0.0015 + fish.phase) * 0.15 * dt;
          if (fish.x < 10 || fish.x > vw - 10) fish.vx *= -1;
        }
      }

      // --- feeding phase: send visible fish to seek food ---
      if (phaseRef.current === "feeding") {
        const hasFood = foodRef.current.some((f) => !f.eaten);
        if (hasFood) {
          for (const fish of fishRef.current) {
            if (fish.state !== "swim") continue;
            const screenY = fish.pageY - scrollY;
            if (screenY < -20 || screenY > vh + 20) continue;
            fish.state = "seek";
          }
        }

        phaseTimerRef.current -= dt * 16.67;
        if (phaseTimerRef.current <= 0 || (!hasFood && foodRef.current.length === 0)) {
          phaseRef.current = "predator";
          const fromLeft = Math.random() < 0.5;
          predatorRef.current = {
            x: fromLeft ? -80 : vw + 80,
            pageY: scrollY + randomBetween(vh * 0.25, vh * 0.65),
            vx: fromLeft ? PREDATOR_SPEED : -PREDATOR_SPEED,
            vy: 0,
            size: 42,
            startTime: time,
            eatenCount: 0,
            exiting: false,
          };
        }
      }

      // --- predator phase: actively hunt the nearest visible fish ---
      if (phaseRef.current === "predator" && predatorRef.current) {
        const predator = predatorRef.current;
        const huntElapsed = time - predator.startTime;

        if (!predator.exiting) {
          let nearest: Fish | null = null;
          let nearestDist = Infinity;
          for (const fish of fishRef.current) {
            if (fish.state === "eaten") continue;
            const screenY = fish.pageY - scrollY;
            if (screenY < -20 || screenY > vh + 20) continue;
            const dist = Math.hypot(fish.x - predator.x, fish.pageY - predator.pageY);
            if (dist < nearestDist) {
              nearestDist = dist;
              nearest = fish;
            }
          }

          const shouldExit =
            !nearest || predator.eatenCount >= PREDATOR_MAX_CATCH || huntElapsed > PREDATOR_MAX_HUNT_MS;

          if (shouldExit) {
            predator.exiting = true;
            predator.vx = predator.x < vw / 2 ? -PREDATOR_SPEED : PREDATOR_SPEED;
            predator.vy = 0;
          } else if (nearest) {
            const dx = nearest.x - predator.x;
            const dy = nearest.pageY - predator.pageY;
            const dist = Math.hypot(dx, dy) || 1;
            predator.vx = (dx / dist) * PREDATOR_SPEED;
            predator.vy = (dy / dist) * PREDATOR_SPEED;

            if (dist < predator.size * PREDATOR_CATCH_RADIUS_FACTOR) {
              nearest.state = "eaten";
              predator.eatenCount += 1;
            }
          }
        }

        predator.x += predator.vx * dt;
        predator.pageY += predator.vy * dt;

        if (predator.exiting && (predator.x < -120 || predator.x > vw + 120)) {
          predatorRef.current = null;
          phaseRef.current = "idle";

          const eatenCount = fishRef.current.filter((f) => f.state === "eaten").length;
          fishRef.current = fishRef.current.filter((f) => f.state !== "eaten");
          const respawnCount = Math.max(eatenCount, 3);

          setTimeout(() => {
            const docHeight = getDocHeight();
            for (let i = 0; i < respawnCount; i++) {
              fishRef.current = [
                ...fishRef.current,
                createFish(Math.random() < 0.5 ? "back" : "front", docHeight, window.innerWidth),
              ];
            }
          }, RESPAWN_DELAY_MS);

          setFeedDisabled(false);
        }
      }

      // --- draw ---
      for (const fish of fishRef.current) {
        if (fish.state === "eaten") continue;
        const screenY = fish.pageY - scrollY;
        if (screenY < -30 || screenY > vh + 30) continue;
        const age = time - fish.spawnTime;
        const alpha = Math.min(age / 800, 1);
        const ctx = fish.layer === "back" ? backCtx : frontCtx;
        drawFish(ctx, fish, screenY, alpha);
      }

      for (const food of foodRef.current) {
        const foodScreenY = food.pageY - scrollY;
        frontCtx.save();
        frontCtx.fillStyle = "#f59e0b";
        frontCtx.beginPath();
        frontCtx.arc(food.x, foodScreenY, 4, 0, Math.PI * 2);
        frontCtx.fill();
        frontCtx.restore();
      }

      if (predatorRef.current) {
        drawPredator(frontCtx, predatorRef.current, predatorRef.current.pageY - scrollY);
      }

      rafRef.current = requestAnimationFrame(loop);
    }

    rafRef.current = requestAnimationFrame(loop);
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function handleFeed() {
    if (feedDisabled || phaseRef.current !== "idle") return;
    setFeedDisabled(true);
    phaseRef.current = "feeding";
    phaseTimerRef.current = FEED_PHASE_MS;

    const vw = window.innerWidth;
    const scrollY = scrollYRef.current;
    foodRef.current = Array.from({ length: FOOD_COUNT }, () => ({
      id: nextId(),
      x: randomBetween(40, Math.max(80, vw - 40)),
      pageY: scrollY - 20 - Math.random() * 60,
      vy: 0,
      eaten: false,
    }));
  }

  return (
    <>
      <canvas
        ref={backCanvasRef}
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 1, willChange: "transform", transform: "translateZ(0)" }}
      />
      <canvas
        ref={frontCanvasRef}
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 40, willChange: "transform", transform: "translateZ(0)" }}
      />
      <button
        type="button"
        onClick={handleFeed}
        disabled={feedDisabled}
        title={t("aquarium_feed")}
        aria-label={t("aquarium_feed")}
        className="fixed bottom-6 right-6 w-11 h-11 rounded-full bg-white/70 backdrop-blur border border-gray-200 shadow-sm flex items-center justify-center text-lg opacity-50 hover:opacity-100 disabled:opacity-30 disabled:cursor-not-allowed transition-opacity"
        style={{ zIndex: 45 }}
      >
        "."
      </button>
    </>
  );
}