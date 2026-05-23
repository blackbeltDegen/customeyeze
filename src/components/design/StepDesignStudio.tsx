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

const panel: React.CSSProperties = { backgroundColor: "#1D1D2C", border: "1px solid #2A2A3E", borderRadius: 16, padding: "18px" };
const inputSt: React.CSSProperties = { backgroundColor: "#13131E", border: "1px solid #2A2A3E", color: "#fff", borderRadius: 10, padding: "8px 12px", width: "100%", fontSize: 13, outline: "none" };
const labelSm: React.CSSProperties = { display: "block", fontSize: 11, color: "#7A7A9A", marginBottom: 5, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em" };

export default function StepDesignStudio({ order, onUpdate, onNext, onBack }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricRef = useRef<FabricCanvas | null>(null);
  const [side, setSide] = useState<"front" | "back">(order.designSide);
  const [textInput, setTextInput] = useState("");
  const [textColor, setTextColor] = useState("#FFFFFF");
  const [textFont, setTextFont] = useState("Arial");
  const [textSize, setTextSize] = useState(32);
  const [hasSelection, setHasSelection] = useState(false);
  const [fabricLoaded, setFabricLoaded] = useState(false);

  const initCanvas = useCallback(async () => {
    if (!canvasRef.current) return;
    const fabric = await import("fabric");
    setFabricLoaded(true);
    if (fabricRef.current) fabricRef.current.dispose();

    const canvas = new fabric.Canvas(canvasRef.current, { width: 380, height: 480, backgroundColor: order.color?.hex ?? "#FFFFFF" });
    fabricRef.current = canvas;

    canvas.on("selection:created", () => setHasSelection(true));
    canvas.on("selection:cleared", () => setHasSelection(false));
    canvas.on("selection:updated", () => setHasSelection(true));

    const printRect = new fabric.Rect({ left: 65, top: 90, width: 250, height: 270, fill: "transparent", stroke: "#4CAF50", strokeDashArray: [6, 4], strokeWidth: 1.5, selectable: false, evented: false });
    canvas.add(printRect);
    const label = new fabric.Text("Print Area", { left: 190, top: 80, fontSize: 11, fill: "#4CAF50", textAlign: "center", originX: "center", selectable: false, evented: false });
    canvas.add(label);
    canvas.renderAll();
  }, [order.color?.hex]);

  useEffect(() => { initCanvas(); return () => { fabricRef.current?.dispose(); }; }, [initCanvas]);

  useEffect(() => {
    if (fabricRef.current && order.color?.hex) {
      fabricRef.current.backgroundColor = order.color.hex;
      fabricRef.current.renderAll();
    }
  }, [order.color?.hex]);

  function uploadImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !fabricRef.current) return;
    const reader = new FileReader();
    reader.onload = async (evt) => {
      const dataUrl = evt.target?.result as string;
      const fabric = await import("fabric");
      const img = await fabric.Image.fromURL(dataUrl);
      img.scaleToWidth(180);
      img.set({ left: 100, top: 140 });
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
    const text = new fabric.IText(textInput, { left: 100, top: 190, fontSize: textSize, fill: textColor, fontFamily: textFont, editable: true });
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
    setSide(newSide);
    const objects = fabricRef.current.getObjects().filter((o) => (o as { selectable?: boolean }).selectable !== false);
    objects.forEach((o) => fabricRef.current?.remove(o));
    fabricRef.current.renderAll();
  }

  function handleContinue() {
    if (!fabricRef.current) return;
    const dataUrl = fabricRef.current.toDataURL({ format: "png", multiplier: 2 });
    onUpdate({ designDataUrl: dataUrl, designSide: side });
    onNext();
  }

  return (
    <div>
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <span style={{ display: "inline-block", fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", color: "#4CAF50", textTransform: "uppercase", marginBottom: 14, backgroundColor: "rgba(76,175,80,0.1)", padding: "5px 14px", borderRadius: 999, border: "1px solid rgba(76,175,80,0.2)" }}>Step 3 of 4</span>
        <h2 style={{ fontFamily: "var(--font-poppins)", fontSize: "clamp(24px, 3vw, 38px)", fontWeight: 900, color: "#fff", letterSpacing: "-1px", marginTop: 14, marginBottom: 10 }}>Design Studio</h2>
        <p style={{ fontSize: 15, color: "#7A7A9A" }}>Upload your artwork and make it yours.</p>
      </div>

      <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }} className="studio-layout">
        {/* Toolbox */}
        <div style={{ width: 260, flexShrink: 0, display: "flex", flexDirection: "column", gap: 14 }} className="studio-tools">
          {/* Upload */}
          <div style={panel}>
            <p style={labelSm}>Upload Artwork</p>
            <label style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, cursor: "pointer", border: "2px dashed #2A2A3E", borderRadius: 12, padding: "20px 12px", marginTop: 10, transition: "border-color 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = "#4CAF50")}
              onMouseLeave={e => (e.currentTarget.style.borderColor = "#2A2A3E")}>
              <span style={{ fontSize: 28 }}>📁</span>
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
                  onChange={(e) => setTextSize(parseInt(e.target.value) || 32)}
                  style={{ ...inputSt, padding: "6px 8px" }} />
              </div>
            </div>
            <div style={{ marginBottom: 12 }}>
              <label style={labelSm}>Text Color</label>
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
                <button onClick={deleteSelected} style={{ gridColumn: "1 / -1", fontSize: 12, padding: "8px", borderRadius: 8, border: "1px solid rgba(255,69,58,0.4)", color: "#FF6B6B", backgroundColor: "rgba(255,69,58,0.08)", cursor: "pointer" }}>🗑 Delete</button>
              </div>
            </div>
          )}

          {/* Tips */}
          <div style={{ ...panel, backgroundColor: "#13131E" }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: "#ccc", marginBottom: 10 }}>Tips</p>
            {["Click any object to select it", "Drag corners to resize", "Double-click text to edit", "Keep design inside the dashed box"].map(tip => (
              <p key={tip} style={{ fontSize: 12, color: "#7A7A9A", marginBottom: 6 }}>• {tip}</p>
            ))}
          </div>
        </div>

        {/* Canvas area */}
        <div style={{ flex: 1 }}>
          {/* Front/Back toggle */}
          <div style={{ display: "flex", gap: 10, justifyContent: "center", marginBottom: 16 }}>
            {(["front", "back"] as const).map((s) => (
              <button key={s} onClick={() => flipSide(s)} style={{
                padding: "9px 24px", borderRadius: 999, fontSize: 13, fontWeight: 600,
                cursor: "pointer", transition: "all 0.2s", textTransform: "capitalize",
                ...(side === s
                  ? { backgroundColor: "#4CAF50", color: "#fff", border: "none" }
                  : { backgroundColor: "transparent", border: "1px solid #2A2A3E", color: "#7A7A9A" }),
              }}>
                {s} of Shirt
              </button>
            ))}
          </div>

          <p style={{ textAlign: "center", fontSize: 13, color: "#7A7A9A", marginBottom: 14 }}>
            {order.shirt?.name} · {order.color?.name}
          </p>

          <div style={{ position: "relative", margin: "0 auto", borderRadius: 20, overflow: "hidden", width: 380, height: 480, backgroundColor: order.color?.hex ?? "#fff", border: "1px solid #2A2A3E", boxShadow: "0 20px 60px rgba(0,0,0,0.4)" }}>
            {!fabricLoaded && (
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#1D1D2C" }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ width: 32, height: 32, border: "3px solid #4CAF50", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.8s linear infinite", margin: "0 auto 12px" }} />
                  <p style={{ fontSize: 13, color: "#7A7A9A" }}>Loading studio...</p>
                </div>
              </div>
            )}
            <canvas ref={canvasRef} />
          </div>
          <p style={{ textAlign: "center", fontSize: 12, color: "#4A4A6A", marginTop: 12 }}>
            Keep your design inside the dashed green box for best print results.
          </p>
        </div>
      </div>

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
        .studio-layout { flex-direction: row; }
        .studio-tools { display: flex; }
        @media (max-width: 780px) {
          .studio-layout { flex-direction: column !important; }
          .studio-tools { width: 100% !important; flex-direction: row !important; flex-wrap: wrap; }
        }
      `}</style>
    </div>
  );
}
