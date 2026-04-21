import React, { useCallback, useEffect, useRef, useState } from "react";
import BunnyMascot from "./BunnyMascot";
import Floaters from "./Floaters";

const NO_MESSAGES = [
  "No",
  "Are u sure boba? 🥺",
  "Really really sure ah di?",
  "Plz di? unaku dhn periya manasu irukula, Give me One more chance 💔",
  "Last chance my honeycake.... 🥲",
];

const CATCH_ME_LABEL = "Idhuku mela idha click panna vida maatten 😛";

const Proposal = () => {
  const [answer, setAnswer] = useState(null); // null | "yes"
  const [noClicks, setNoClicks] = useState(0);
  const [isFloating, setIsFloating] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const btnRef = useRef(null);

  const expression =
    answer === "yes"
      ? "happy"
      : noClicks === 0
        ? "neutral"
        : noClicks < 3
          ? "sad"
          : noClicks < 5
            ? "pleading"
            : "crying";

  const label =
    noClicks >= 5 ? CATCH_ME_LABEL : NO_MESSAGES[Math.min(noClicks, NO_MESSAGES.length - 1)];

  // initial floating position near current button
  const startFloating = useCallback(() => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    setPos({ x: rect.left, y: rect.top });
    setIsFloating(true);
  }, []);

  const moveAway = useCallback(() => {
    const btnW = btnRef.current?.offsetWidth || 220;
    const btnH = btnRef.current?.offsetHeight || 56;
    const pad = 12;
    const maxX = Math.max(pad, window.innerWidth - btnW - pad);
    const maxY = Math.max(pad, window.innerHeight - btnH - pad);
    const nx = pad + Math.random() * (maxX - pad);
    const ny = pad + Math.random() * (maxY - pad);
    setPos({ x: nx, y: ny });
  }, []);

  // on touch devices, periodically dodge since no hover event
  useEffect(() => {
    if (!isFloating) return;
    const id = setInterval(() => {
      // slight drift automatically so it feels alive
      moveAway();
    }, 1600);
    return () => clearInterval(id);
  }, [isFloating, moveAway]);

  const handleNoClick = () => {
    const next = noClicks + 1;
    setNoClicks(next);
    if (next === 5) {
      // enter floating mode on the 5th click
      setTimeout(startFloating, 0);
    }
  };

  const handleYes = () => setAnswer("yes");

  const handleRestart = () => {
    setAnswer(null);
    setNoClicks(0);
    setIsFloating(false);
  };

  // global mousemove: dodge when cursor gets near
  useEffect(() => {
    if (!isFloating) return;
    const handler = (e) => {
      const btnW = btnRef.current?.offsetWidth || 220;
      const btnH = btnRef.current?.offsetHeight || 56;
      const cx = pos.x + btnW / 2;
      const cy = pos.y + btnH / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      if (dist < 110) {
        moveAway();
      }
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, [isFloating, pos, moveAway]);

  return (
    <div className="proposal-bg" data-testid="proposal-page">
      <Floaters count={26} />

      <span className="big-heart" style={{ top: "10%", left: "6%" }}>
        💗
      </span>
      <span className="big-heart" style={{ bottom: "12%", right: "7%", animationDelay: "1.5s" }}>
        🌸
      </span>

      <div className="content">
        <div className="card" data-testid="proposal-card">
          <div className="bunny-wrap" data-testid="bunny-wrap">
            <BunnyMascot expression={expression} />
          </div>

          {answer === "yes" ? (
            <div className="yes-reveal" data-testid="yes-reveal">
              <h1 className="yes-msg" data-testid="yes-message">
                Enaku theriyum nee yes dhan solluvanu! 💍✨
              </h1>
              <p className="yes-sub" data-testid="yes-submessage">
                Jolly Jolly 😘🫂💕
              </p>
              <button
                className="restart"
                onClick={handleRestart}
                data-testid="restart-button"
              >
                start over
              </button>
            </div>
          ) : (
            <>
              <h1 className="title" data-testid="proposal-title">
                Sowmu, Will you marry me?
              </h1>
              <p className="subtitle" data-testid="proposal-subtitle">
                ipdi kekave vetkame iruke 🫣 
              </p>

              <div className="btn-row" data-testid="button-row">
                <button
                  className="btn btn-yes"
                  onClick={handleYes}
                  data-testid="yes-button"
                >
                  Yes 💖
                </button>

                {!isFloating && (
                  <button
                    ref={btnRef}
                    className="btn btn-no"
                    onClick={handleNoClick}
                    data-testid="no-button"
                  >
                    {label}
                  </button>
                )}
              </div>

              {noClicks > 0 && noClicks < 5 && (
                <p className="hint" data-testid="hint">
                  yes button pavom 🥺
                </p>
              )}
            </>
          )}
        </div>
      </div>

      {/* Floating dodging button rendered at body level */}
      {isFloating && answer !== "yes" && (
        <button
          ref={btnRef}
          className="btn btn-no floating"
          style={{ left: pos.x, top: pos.y }}
          onMouseEnter={moveAway}
          onFocus={moveAway}
          onClick={handleNoClick}
          data-testid="no-button-floating"
        >
          {CATCH_ME_LABEL}
        </button>
      )}
    </div>
  );
};

export default Proposal;