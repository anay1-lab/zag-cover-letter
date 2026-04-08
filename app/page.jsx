"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

const coverLetter = {
  title: "Oh hey, Zag hiring team.",
  subtitle:
    "A tiny hidden cover letter. The clue is easy: move your cursor across the page and the story shows up right underneath it.",
  greeting: "Hey there,",
  paragraphs: [
    "Are you still moving your cursor to read this? haha… good. That means it’s working. And also probably a better start than ‘Dear Hiring Manager.’",
    "I’ve spent the last 2+ years in marketing and communications, but more than that, I’ve been building things. Not just content, but systems that actually help us understand what’s working. During high-profile events like K-Days at Explore Edmonton, I built a tracker that pulled in online coverage and used GPT-powered deep research to map sentiment across stories. It gave us a real-time view of what people were actually saying, not just what we hoped was landing.",
    "Alongside that, I’ve been working with the University of Alberta Innovation Fund, helping tell stories for companies across AI, health tech, and even space tech, which still feels insanely cool to say. My role has been translating complex ideas into something people can actually understand and care about.",
    "I also run nayfilms.ca, where I experiment with storytelling, video, and formats like this one. Most of what I’ve learned has come from building, iterating, and occasionally breaking things. I’m also pretty clear on one thing: AI isn’t a skill. It’s a tool. The real edge is how fast you learn to use it.",
    "Between leading an entrepreneurship club and constantly testing new ideas, I’ve built a habit of just starting. Felt better to show that than write about it.",
  ],
  signoff: "— Anay",
};

const hiddenNotes = [
  "not a pdf",
  "built with curiosity",
  "hover to unlock",
  "proof of work",
  "version one > no version",
  "tiny game, real intent",
];

export default function Page() {
  const containerRef = useRef(null);
  const [started, setStarted] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [mouse, setMouse] = useState({ x: 50, y: 50 });
  const [targetMouse, setTargetMouse] = useState({ x: 50, y: 50 });

  useEffect(() => {
    if (!started) return;

    let frame = 0;
    const animate = () => {
      setMouse((prev) => ({
        x: prev.x + (targetMouse.x - prev.x) * 0.12,
        y: prev.y + (targetMouse.y - prev.y) * 0.12,
      }));
      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [started, targetMouse]);

  const maskStyle = useMemo(
    () => ({
      WebkitMaskImage: `radial-gradient(circle 300px at ${mouse.x}% ${mouse.y}%, transparent 0%, transparent 32%, rgba(0,0,0,0.88) 62%, black 100%)`,
      maskImage: `radial-gradient(circle 300px at ${mouse.x}% ${mouse.y}%, transparent 0%, transparent 32%, rgba(0,0,0,0.88) 62%, black 100%)`,
    }),
    [mouse]
  );

  const handleMove = (e) => {
    if (!containerRef.current || !started) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setTargetMouse({ x, y });
    if (!revealed) setRevealed(true);
  };

  const reset = () => {
    setStarted(false);
    setRevealed(false);
    setMouse({ x: 50, y: 50 });
    setTargetMouse({ x: 50, y: 50 });
  };

  return (
    <>
      <style jsx global>{`
        * { box-sizing: border-box; }
        html, body { margin: 0; padding: 0; }
        body {
          background: #0a0f18;
          color: #ffffff;
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }
        a { color: inherit; }
        .page {
          min-height: 100vh;
          padding: 32px 20px 40px;
          background: radial-gradient(circle at top, rgba(59,130,246,0.08), transparent 30%), #0a0f18;
        }
        .wrap {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          gap: 24px;
        }
        .hero {
          border-radius: 28px;
          border: 1px solid rgba(255,255,255,0.09);
          background: linear-gradient(135deg, #101827 0%, #0b1020 50%, #05070c 100%);
          padding: 28px;
          box-shadow: 0 24px 80px rgba(0,0,0,0.35);
          overflow: hidden;
          animation: riseIn 0.55s ease-out;
        }
        .eyebrow {
          display: flex;
          align-items: center;
          gap: 10px;
          color: rgba(255,255,255,0.58);
          font-size: 14px;
          margin-bottom: 18px;
        }
        .sparkle {
          width: 10px;
          height: 10px;
          border-radius: 999px;
          background: linear-gradient(135deg, #7dd3fc, #60a5fa);
          box-shadow: 0 0 16px rgba(125,211,252,0.65);
        }
        .heroGrid {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 24px;
          align-items: end;
        }
        .title {
          font-size: clamp(40px, 6vw, 72px);
          line-height: 0.96;
          font-weight: 900;
          letter-spacing: -0.04em;
          margin: 0;
        }
        .subtext {
          margin-top: 16px;
          max-width: 760px;
          color: rgba(255,255,255,0.78);
          font-size: 18px;
          line-height: 1.6;
        }
        .rightCol {
          display: grid;
          gap: 14px;
        }
        .panel {
          border-radius: 24px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.09);
          backdrop-filter: blur(10px);
        }
        .panelInner {
          padding: 20px;
        }
        .statusRow {
          display: flex;
          align-items: flex-start;
          gap: 14px;
        }
        .iconBox {
          width: 48px;
          height: 48px;
          border-radius: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255,255,255,0.08);
          font-size: 20px;
        }
        .label {
          font-size: 13px;
          color: rgba(255,255,255,0.58);
          margin-bottom: 4px;
        }
        .value {
          font-size: 16px;
          font-weight: 700;
          color: #fff;
        }
        .buttonRow {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }
        .btn {
          border: none;
          border-radius: 18px;
          padding: 15px 22px;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
          transition: transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease;
        }
        .btnPrimary {
          background: linear-gradient(135deg, #38bdf8, #60a5fa);
          color: #04111f;
          box-shadow: 0 10px 30px rgba(56,189,248,0.25);
        }
        .btnPrimary:hover { transform: translateY(-1px) scale(1.02); }
        .btnSecondary {
          background: rgba(255,255,255,0.06);
          color: white;
          border: 1px solid rgba(255,255,255,0.15);
        }
        .btnSecondary:hover { background: rgba(255,255,255,0.1); }
        .contentGrid {
          display: grid;
          grid-template-columns: 0.78fr 1.22fr;
          gap: 24px;
          align-items: start;
        }
        .notes {
          border-radius: 28px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.09);
          overflow: hidden;
        }
        .notesInner { padding: 24px; }
        .notesTitle {
          display: flex;
          align-items: center;
          gap: 10px;
          color: rgba(255,255,255,0.78);
          margin-bottom: 18px;
          font-size: 14px;
        }
        .notesText {
          display: grid;
          gap: 12px;
          color: rgba(255,255,255,0.78);
          font-size: 14px;
          line-height: 1.65;
        }
        .chipWrap {
          margin-top: 24px;
          border-radius: 24px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          padding: 16px;
        }
        .chipTitle {
          font-size: 11px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.42);
          margin-bottom: 14px;
        }
        .chips {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }
        .chip {
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.04);
          padding: 8px 12px;
          color: rgba(255,255,255,0.78);
          font-size: 12px;
        }
        .letterShell {
          position: relative;
          min-height: 680px;
          border-radius: 28px;
          overflow: hidden;
          border: 1px solid rgba(186,230,253,0.7);
          background: #f7f3eb;
          box-shadow: 0 20px 70px rgba(56,189,248,0.16);
        }
        .letterGlow {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: radial-gradient(circle at top, rgba(59,130,246,0.07), transparent 42%);
        }
        .letterInner {
          position: relative;
          z-index: 10;
          height: 100%;
          padding: 34px 32px 40px;
          color: #111827;
        }
        .letterTopFade {
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          height: 96px;
          background: linear-gradient(to bottom, rgba(224,242,254,0.35), transparent);
          pointer-events: none;
        }
        .letterContent {
          max-width: 760px;
        }
        .letterKicker {
          font-size: 11px;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: rgba(3,105,161,0.8);
          margin-bottom: 16px;
        }
        .letterTitle {
          margin: 0 0 12px;
          font-size: clamp(34px, 5vw, 58px);
          line-height: 1.03;
          font-weight: 900;
          letter-spacing: -0.04em;
          animation: riseSoft 0.6s ease-out;
        }
        .letterSubtitle {
          margin: 0 0 28px;
          color: #4b5563;
          font-size: 18px;
          line-height: 1.65;
          animation: riseSoft 0.7s ease-out;
        }
        .letterGreeting {
          font-size: 21px;
          font-weight: 700;
          margin-bottom: 18px;
          animation: riseSoft 0.75s ease-out;
        }
        .paragraphs {
          display: grid;
          gap: 18px;
          font-size: 17px;
          line-height: 1.9;
          color: #1f2937;
          text-shadow: 0 1px 1px rgba(15,23,42,0.08);
        }
        .paragraph {
          opacity: ${started ? 1 : 0.92};
          transform: translateY(0px);
          animation: riseSoft 0.8s ease-out;
        }
        .signoff {
          margin-top: 34px;
          font-size: 20px;
          font-weight: 700;
          text-shadow: 0 1px 1px rgba(15,23,42,0.08);
          animation: riseSoft 0.9s ease-out;
        }
        .overlay {
          position: absolute;
          inset: 0;
          z-index: 20;
          pointer-events: none;
        }
        .overlayLocked {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 32px;
          text-align: center;
          background: rgba(8,47,73,0.9);
          backdrop-filter: blur(2px);
        }
        .overlayLockedIcon {
          margin: 0 auto 16px;
          width: 56px;
          height: 56px;
          border-radius: 999px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(56,189,248,0.15);
          border: 1px solid rgba(186,230,253,0.2);
          font-size: 22px;
        }
        .overlayLocked h3 {
          margin: 0 0 12px;
          font-size: 34px;
          line-height: 1.1;
        }
        .overlayLocked p {
          margin: 0;
          max-width: 460px;
          color: rgba(224,242,254,0.92);
          line-height: 1.7;
          font-size: 16px;
        }
        .overlayReveal {
          position: absolute;
          inset: 0;
          background: rgba(8,47,73,0.82);
          backdrop-filter: blur(4px);
          transition: background 0.3s ease, backdrop-filter 0.3s ease, opacity 0.3s ease;
        }
        .overlayReveal::before {
          content: "";
          position: absolute;
          inset: 0;
          opacity: 0.3;
          background: linear-gradient(135deg, transparent 0%, rgba(125,211,252,0.18) 50%, transparent 100%);
        }
        .overlayReveal::after {
          content: "";
          position: absolute;
          inset: 0;
          opacity: 0.4;
          background: radial-gradient(circle at center, rgba(56,189,248,0.16), transparent 55%);
        }
        @keyframes riseIn {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes riseSoft {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 980px) {
          .heroGrid, .contentGrid { grid-template-columns: 1fr; }
          .title { font-size: clamp(34px, 10vw, 56px); }
          .subtext, .letterSubtitle { font-size: 16px; }
          .letterInner { padding: 28px 22px 34px; }
          .letterShell { min-height: 620px; }
        }
      `}</style>

      <div className="page">
        <div className="wrap">
          <section className="hero">
            <div className="eyebrow">
              <span className="sparkle" />
              <span>zag.letter.hidden</span>
            </div>

            <div className="heroGrid">
              <div>
                <h1 className="title">
                  Oh hey, Zag hiring team.
                  <br />
                  
                </h1>
                <p className="subtext">
                  Start hover reveal. A tiny interaction instead of a standard attachment. Move your cursor across the page and you’ll figure it out.
                </p>
              </div>

              <div className="rightCol">
                <div className="panel">
                  <div className="panelInner">
                    <div className="statusRow">
                      <div className="iconBox">{revealed ? "👁️" : "🔒"}</div>
                      <div>
                        <div className="label">Status</div>
                        <div className="value">{revealed ? "Letter detected" : "Content hidden"}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="buttonRow">
                  {!started ? (
                    <button className="btn btnPrimary" onClick={() => setStarted(true)}>
                      Start hover reveal
                    </button>
                  ) : (
                    <button className="btn btnSecondary" onClick={reset}>
                      Reset
                    </button>
                  )}
                </div>
              </div>
            </div>
          </section>

          <section className="contentGrid">
            <div className="notes">
              <div className="notesInner">
                <div className="notesTitle">
                  <span>✉️</span>
                  <span>How this works</span>
                </div>

                <div className="notesText">
                  <p>1. Click <strong>Start hover reveal</strong>.</p>
                  <p>2. Move your cursor anywhere on the page. That is the clue.</p>
                  <p>3. As you hover, the letter appears right under your cursor.</p>
                </div>

                <div className="chipWrap">
                  <div className="chipTitle">Hidden notes</div>
                  <div className="chips">
                    {hiddenNotes.map((note) => (
                      <span key={note} className="chip">
                        {note}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div ref={containerRef} onMouseMove={handleMove} className="letterShell">
              <div className="letterGlow" />

              <div className="letterInner">
                <div className="letterTopFade" />
                <div className="letterContent">
                  <div className="letterKicker">Unlocked letter</div>
                  <h2 className="letterTitle">{coverLetter.title}</h2>
                  <p className="letterSubtitle">{coverLetter.subtitle}</p>
                  <div className="letterGreeting">{coverLetter.greeting}</div>

                  <div className="paragraphs">
                    {coverLetter.paragraphs.map((paragraph, index) => (
                      <p key={index} className="paragraph">
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  <div className="signoff">{coverLetter.signoff}</div>
                </div>
              </div>

              <div className="overlay">
                {!started ? (
                  <div className="overlayLocked">
                    <div>
                      <div className="overlayLockedIcon">🔒</div>
                      <h3>Move your cursor to reveal</h3>
                      <p>Hit start, then move your cursor anywhere on the letter. That is the only clue you need.</p>
                    </div>
                  </div>
                ) : (
                  <div className="overlayReveal" style={maskStyle} />
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
