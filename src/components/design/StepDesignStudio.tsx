"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { OrderState } from "@/app/design/page";

type Props = {
  order: OrderState;
  onUpdate: (updates: Partial<OrderState>) => void;
  onNext: () => void;
  onBack: () => void;
};

type FabricModule = typeof import("fabric");
type FabricCanvas = InstanceType<FabricModule["Canvas"]>;

const FONTS = ["Arial", "Georgia", "Impact", "Courier New", "Verdana", "Comic Sans MS", "Trebuchet MS"];

// Shirt SVG container size
const SHIRT_W = 420;
const SHIRT_H = 500;

// Where the Fabric.js canvas sits on the shirt (the printable area)
const PRINT = {
  front: { x: 122, y: 160, w: 176, h: 210 },
  back:  { x: 122, y: 148, w: 176, h: 210 },
};

// T-shirt SVG — same outline for front and back, different neckline
function ShirtSVG({ color, side }: { color: string; side: "front" | "back" }) {
  const fill = color || "#EEEEEE";

  // Main body path (clockwise): neck-left → right-shoulder → right-sleeve → right-armhole → body → left-armhole → left-sleeve → left-shoulder
  const body = "M 158 82 C 174 48,246 48,262 82 L 350 76 L 408 148 L 368 170 L 340 150 L 340 474 L 80 474 L 80 150 L 52 170 L 12 148 L 70 76 Z";

  // Front neck: deep crew neck
  const frontNeckFill = "M 158 82 C 174 48,246 48,262 82 Q 210 100 158 82 Z";
  // Back neck: shallow curve
  const backNeckFill = "M 158 82 Q 210 66,262 82 Q 210 92 158 82 Z";

  return (
    <svg
      viewBox={`0 0 ${SHIRT_W} ${SHIRT_H}`}
      style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none" }}
    >
      <defs>
        <filter id="shirtDrop" x="-20%" y="-10%" width="140%" height="130%">
          <feDropShadow dx="0" dy="6" stdDeviation="10" floodColor="#000" floodOpacity="0.45" />
        </filter>
        {/* Sleeve inner shadow */}
        <linearGradient id="sleeveShadeL" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(0,0,0,0.14)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0)" />
        </linearGradient>
        <linearGradient id="sleeveShadeR" x1="100%" y1="0%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="rgba(0,0,0,0.14)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0)" />
        </linearGradient>
        {/* Chest highlight */}
        <radialGradient id="chestLight" cx="50%" cy="35%" r="40%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.12)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>
      </defs>

      {/* Shadow layer */}
      <path d={body} fill={fill} filter="url(#shirtDrop)" />

      {/* Main shirt body */}
      <path d={body} fill={fill} />

      {/* Left sleeve shading */}
      <path d="M 70 76 L 12 148 L 52 170 L 80 150 Z" fill="url(#sleeveShadeL)" />
      {/* Right sleeve shading */}
      <path d="M 350 76 L 408 148 L 368 170 L 340 150 Z" fill="url(#sleeveShadeR)" />

      {/* Chest highlight */}
      <path d={body} fill="url(#chestLight)" />

      {/* Shoulder seam lines */}
      <line x1="158" y1="82" x2="80" y2="150" stroke="rgba(0,0,0,0.09)" strokeWidth="1.5" />
      <line x1="262" y1="82" x2="340" y2="150" stroke="rgba(0,0,0,0.09)" strokeWidth="1.5" />

      {/* Sleeve hem lines */}
      <line x1="14" y1="150" x2="50" y2="168" stroke="rgba(0,0,0,0.09)" strokeWidth="2" />
      <line x1="370" y1="168" x2="406" y2="150" stroke="rgba(0,0,0,0.09)" strokeWidth="2" />

      {/* Bottom hem */}
      <line x1="80" y1="471" x2="340" y2="471" stroke="rgba(0,0,0,0.08)" strokeWidth="2" />

      {/* Neckline */}
      {side === "front" ? (
        <>
          <path d={frontNeckFill} fill="rgba(0,0,0,0.1)" />
          <path d="M 158 82 C 174 48,246 48,262 82" fill="none" stroke="rgba(0,0,0,0.12)" strokeWidth="1.5" />
        </>
      ) : (
        <>
          <path d={backNeckFill} fill="rgba(0,0,0,0.07)" />
          <path d="M 158 82 Q 210 66,262 82" fill="none" stroke="rgba(0,0,0,0.1)" strokeWidth="1.5" />
          {/* Back tag */}
          <rect x="200" y="82" width="20" height="10" rx="2" fill="rgba(255,255,255,0.22)" />
        </>
      )}

      {/* Shirt outline */}
      <path d={body} fill="none" stroke="rgba(0,0,0,0.12)" strokeWidth="1" />
    </svg>
  );
}

// Dashed print-area guide drawn on top of the canvas
function PrintGuide({ side }: { side: "front" | "back" }) {
  const p = PRINT[side];
  return (
    <svg
      viewBox={`0 0 ${SHIRT_W} ${SHIRT_H}`}
      style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none" }}
    >
      <rect
        x={p.x} y={p.y} width={p.w} height={p.h}
        fill="none"
        stroke="rgba(76,175,80,0.7)"
        strokeWidth="1.5"
        strokeDasharray="7,4"
        rx="3"
      />
      <text x={p.x + p.w / 2} y={p.y - 6} fill="rgba(76,175,80,0.8)" fontSize="10" textAnchor="middle" fontFamily="Arial, sans-serif">
        Print Area
      </text>
    </svg>
  );
}

const panel: React.CSSProperties = { backgroundColor: "#1D1D2C", border: "1px solid #2A2A3E", borderRadius: 16, padding: "18px" };
const inputSt: React.CSSProperties = { backgroundColor: "#13131E", border: "1px solid #2A2A3E", color: "#fff", borderRadius: 10, padding: "8px 12px", width: "100%", fontSize: 13, outline: "none" };
const labelSm: React.CSSProperties = { display: "block", fontSize: 11, color: "#7A7A9A", marginBottom: 5, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em" };

export default function StepDesignStudio({ order, onUpdate, onNext, onBack }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricRef = useRef<FabricCanvas | null>(null);
  const [side, setSide] = useState<"front" | "back">(order.designSide);
  const [textInput, setTextInput] = useState("");
  const [textColor, setTextColor] = useState("#000000");
  const [textFont, setTextFont] = useState("Arial");
  const [textSize, setTextSize] = useState(28);
  const [hasSelection, setHasSelection] = useState(false);
  const [fabricLoaded, setFabricLoaded] = useState(false);

  const initCanvas = useCallback(async () => {
    if (!canvasRef.current) return;
    const fabric = await import("fabric");
    setFabricLoaded(true);
    if (fabricRef.current) fabricRef.current.dispose();

    // Use current side's print area dimensions
    const p = PRINT[side];
    const canvas = new fabric.Canvas(canvasRef.current, {
      width: p.w,
      height: p.h,
      // No backgroundColor — canvas is transparent so the shirt SVG shows through
    });
    fabricRef.current = canvas;

    canvas.on("selection:created", () => setHasSelection(true));
    canvas.on("selection:cleared", () => setHasSelection(false));
    canvas.on("selection:updated", () => setHasSelection(true));

    canvas.renderAll();
  }, [side]);

  useEffect(() => {
    initCanvas();
    return () => { fabricRef.current?.dispose(); };
  }, [initCanvas]);

  function uploadImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !fabricRef.current) return;
    const reader = new FileReader();
    reader.onload = async (evt) => {
      const dataUrl = evt.target?.result as string;
      const fabric = await import("fabric");
      const img = await fabric.Image.fromURL(dataUrl);
      const p = PRINT[side];
      img.scaleToWidth(p.w * 0.7);
      img.set({ left: p.w * 0.15, top: p.h * 0.1 });
      fabricRef.current?.add(img);
      fabricRef.current?.setActiveObject(img);
      fabricRef.current?.renderAll();
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  }

  async function addText() {
    if (!textInput.trim() || !fabricRef.current) return;
    const fabric = await import("fabric");
    const p = PRINT[side];
    const text = new fabric.IText(textInput, {
      left: p.w * 0.1,
      top: p.h * 0.35,
      fontSize: textSize,
      fill: textColor,
      fontFamily: textFont,
      editable: true,
    });
    fabricRef.current.add(text);
    fabricRef.current.setActiveObject(text);
    fabricRef.current.renderAll();
    setTextInput("");
  }

  function deleteSelected() {
    const canvas = fabricRef.current;
    if (!canvas) return;
    const active = canvas.getActiveObject();
    if (active) { canvas.remove(active); canvas.discardActiveObject(); canvas.renderAll(); }
  }

  function bringForward() {
    const canvas = fabricRef.current;
    const active = canvas?.getActiveObject();
    if (canvas && active) { canvas.bringObjectForward(active); canvas.renderAll(); }
  }

  function sendBackward() {
    const canvas = fabricRef.current;
    const active = canvas?.getActiveObject();
    if (canvas && active) { canvas.sendObjectBackwards(active); canvas.renderAll(); }
  }

  function flipSide(newSide: "front" | "back") {
    if (!fabricRef.current) return;
    const dataUrl = fabricRef.current.toDataURL({ format: "png", multiplier: 2 });
    onUpdate({ designDataUrl: dataUrl, designSide: newSide });
    // Clear objects — initCanvas re-runs because `side` changes
    setSide(newSide);
  }

  function handleContinue() {
    if (!fabricRef.current) return;
    const dataUrl = fabricRef.current.toDataURL({ format: "png", multiplier: 2 });
    onUpdate({ designDataUrl: dataUrl, designSide: side });
    onNext();
  }

  const p = PRINT[side];

  return (
    <div>
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <span style={{ display: "inline-block", fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", color: "#4CAF50", textTransform: "uppercase", marginBottom: 14, backgroundColor: "rgba(76,175,80,0.1)", padding: "5px 14px", borderRadius: 999, border: "1px solid rgba(76,175,80,0.2)" }}>Step 3 of 4</span>
        <h2 style={{ fontFamily: "var(--font-poppins)", fontSize: "clamp(24px, 3vw, 38px)", fontWeight: 900, color: "#fff", letterSpacing: "-1px", marginTop: 14, marginBottom: 10 }}>Design Studio</h2>
        <p style={{ fontSize: 15, color: "#7A7A9A" }}>Upload your artwork and make it yours.</p>
      </div>

      <div style={{ display: "flex", gap: 24, alignItems: "flex-start" }} className="studio-layout">
        {/* ── Toolbox ── */}
        <div style={{ width: 250, flexShrink: 0, display: "flex", flexDirection: "column", gap: 14 }}>
          {/* Upload */}
          <div style={panel}>
            <p style={labelSm}>Upload Artwork</p>
            <label style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, cursor: "pointer", border: "2px dashed #2A2A3E", borderRadius: 12, padding: "18px 12px", marginTop: 10, transition: "border-color 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = "#4CAF50")}
              onMouseLeave={e => (e.currentTarget.style.borderColor = "#2A2A3E")}>
              <span style={{ fontSize: 26 }}>📁</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: "#4CAF50" }}>Click to upload</span>
              <span style={{ fontSize: 11, color: "#7A7A9A" }}>PNG, JPG, SVG</span>
              <input type="file" accept="image/*" style={{ display: "none" }} onChange={uploadImage} />
            </label>
          </div>

          {/* Text */}
          <div style={panel}>
            <p style={labelSm}>Add Text</p>
            <input type="text" placeholder="Type something..." value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addText()}
              style={{ ...inputSt, marginTop: 8, marginBottom: 10 }} />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 10 }}>
              <div>
                <label style={labelSm}>Font</label>
                <select value={textFont} onChange={(e) => setTextFont(e.target.value)} style={{ ...inputSt, padding: "6px 8px" }}>
                  {FONTS.map((f) => <option key={f} value={f}>{f}</option>)}
                </select>
              </div>
              <div>
                <label style={labelSm}>Size</label>
                <input type="number" value={textSize} min={8} max={120}
                  onChange={(e) => setTextSize(parseInt(e.target.value) || 28)}
                  style={{ ...inputSt, padding: "6px 8px" }} />
              </div>
            </div>
            <div style={{ marginBottom: 12 }}>
              <label style={labelSm}>Color</label>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 4 }}>
                <input type="color" value={textColor} onChange={(e) => setTextColor(e.target.value)}
                  style={{ width: 32, height: 32, borderRadius: 8, border: "1px solid #2A2A3E", backgroundColor: "transparent", cursor: "pointer" }} />
                <span style={{ fontSize: 12, color: "#7A7A9A" }}>{textColor}</span>
              </div>
            </div>
            <button onClick={addText} disabled={!textInput.trim() || !fabricLoaded}
              style={{ width: "100%", padding: "9px", borderRadius: 10, fontSize: 13, fontWeight: 700, border: "none", backgroundColor: "#4CAF50", color: "#fff", cursor: textInput.trim() && fabricLoaded ? "pointer" : "not-allowed", opacity: textInput.trim() && fabricLoaded ? 1 : 0.5 }}>
              Add Text
            </button>
          </div>

          {/* Selection actions */}
          {hasSelection && (
            <div style={panel}>
              <p style={labelSm}>Selected Object</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 10 }}>
                <button onClick={bringForward} style={{ fontSize: 12, padding: "8px", borderRadius: 8, border: "1px solid #2A2A3E", color: "#ccc", backgroundColor: "#13131E", cursor: "pointer" }}>↑ Forward</button>
                <button onClick={sendBackward} style={{ fontSize: 12, padding: "8px", borderRadius: 8, border: "1px solid #2A2A3E", color: "#ccc", backgroundColor: "#13131E", cursor: "pointer" }}>↓ Back</button>
                <button onClick={deleteSelected} style={{ gridColumn: "1 / -1", fontSize: 12, padding: "8px", borderRadius: 8, border: "1px solid rgba(255,80,80,0.4)", color: "#FF6B6B", backgroundColor: "rgba(255,80,80,0.08)", cursor: "pointer" }}>🗑 Delete</button>
              </div>
            </div>
          )}

          {/* Tips */}
          <div style={{ ...panel, backgroundColor: "#13131E" }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: "#ccc", marginBottom: 8 }}>Tips</p>
            {["Click object to select", "Drag corners to resize", "Double-click text to edit", "Keep design inside guide"].map(tip => (
              <p key={tip} style={{ fontSize: 12, color: "#7A7A9A", marginBottom: 5 }}>• {tip}</p>
            ))}
          </div>
        </div>

        {/* ── Shirt Preview ── */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
          {/* Front / Back toggle */}
          <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
            {(["front", "back"] as const).map((s) => (
              <button key={s} onClick={() => flipSide(s)} style={{
                padding: "9px 24px", borderRadius: 999, fontSize: 13, fontWeight: 700,
                cursor: "pointer", transition: "all 0.2s", textTransform: "capitalize",
                ...(side === s
                  ? { backgroundColor: "#4CAF50", color: "#fff", border: "none" }
                  : { backgroundColor: "transparent", border: "1px solid #2A2A3E", color: "#7A7A9A" }),
              }}>
                {s === "front" ? "Front" : "Back"} of Shirt
              </button>
            ))}
          </div>

          <p style={{ fontSize: 13, color: "#7A7A9A", marginBottom: 16 }}>
            {order.shirt?.name} · <span style={{ color: "#ccc" }}>{order.color?.name}</span>
          </p>

          {/* Shirt + Canvas container */}
          <div style={{ position: "relative", width: SHIRT_W, height: SHIRT_H, maxWidth: "100%" }}>
            {/* T-shirt SVG behind */}
            <ShirtSVG color={order.color?.hex ?? "#EEEEEE"} side={side} />

            {/* Fabric.js canvas — sits at the print area position */}
            {!fabricLoaded && (
              <div style={{
                position: "absolute", top: p.y, left: p.x, width: p.w, height: p.h,
                display: "flex", alignItems: "center", justifyContent: "center",
                backgroundColor: "rgba(0,0,0,0.15)",
              }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ width: 28, height: 28, border: "3px solid #4CAF50", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.8s linear infinite", margin: "0 auto 8px" }} />
                  <p style={{ fontSize: 12, color: "#7A7A9A" }}>Loading...</p>
                </div>
              </div>
            )}
            <div style={{ position: "absolute", top: p.y, left: p.x }}>
              <canvas ref={canvasRef} style={{ display: "block" }} />
            </div>

            {/* Print area guide on top */}
            <PrintGuide side={side} />
          </div>

          <p style={{ fontSize: 12, color: "#4A4A6A", marginTop: 12, textAlign: "center" }}>
            Place your design inside the dashed guide for best print results
          </p>
        </div>
      </div>

      {/* Nav buttons */}
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 36 }}>
        <button onClick={onBack} style={{ padding: "13px 28px", borderRadius: 999, fontWeight: 600, fontSize: 15, border: "1px solid #2A2A3E", color: "#7A7A9A", backgroundColor: "transparent", cursor: "pointer" }}>← Back</button>
        <button onClick={handleContinue} style={{
          backgroundColor: "#4CAF50", color: "#fff", border: "none",
          padding: "13px 36px", borderRadius: 999, fontWeight: 700, fontSize: 16, cursor: "pointer", transition: "transform 0.2s",
        }}
          onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.04)")}
          onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
        >
          Review Order →
        </button>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        .studio-layout { flex-direction: row; align-items: flex-start; }
        @media (max-width: 820px) {
          .studio-layout { flex-direction: column !important; align-items: center !important; }
        }
      `}</style>
    </div>
  );
}
