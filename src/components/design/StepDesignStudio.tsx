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

    if (fabricRef.current) {
      fabricRef.current.dispose();
    }

    const canvas = new fabric.Canvas(canvasRef.current, {
      width: 400,
      height: 500,
      backgroundColor: order.color?.hex ?? "#FFFFFF",
    });

    fabricRef.current = canvas;

    canvas.on("selection:created", () => setHasSelection(true));
    canvas.on("selection:cleared", () => setHasSelection(false));
    canvas.on("selection:updated", () => setHasSelection(true));

    const printRect = new fabric.Rect({
      left: 75,
      top: 100,
      width: 250,
      height: 280,
      fill: "transparent",
      stroke: "#4CAF50",
      strokeDashArray: [6, 4],
      strokeWidth: 1.5,
      selectable: false,
      evented: false,
    });
    canvas.add(printRect);

    const label = new fabric.Text("Print Area", {
      left: 200,
      top: 90,
      fontSize: 11,
      fill: "#4CAF50",
      textAlign: "center",
      originX: "center",
      selectable: false,
      evented: false,
    });
    canvas.add(label);

    canvas.renderAll();
  }, [order.color?.hex]);

  useEffect(() => {
    initCanvas();
    return () => { fabricRef.current?.dispose(); };
  }, [initCanvas]);

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
      img.scaleToWidth(200);
      img.set({ left: 100, top: 150 });
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
    const text = new fabric.IText(textInput, {
      left: 120,
      top: 200,
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
    if (active) {
      canvas.remove(active);
      canvas.discardActiveObject();
      canvas.renderAll();
    }
  }

  function bringForward() {
    const canvas = fabricRef.current;
    const active = canvas?.getActiveObject();
    if (canvas && active) {
      canvas.bringObjectForward(active);
      canvas.renderAll();
    }
  }

  function sendBackward() {
    const canvas = fabricRef.current;
    const active = canvas?.getActiveObject();
    if (canvas && active) {
      canvas.sendObjectBackwards(active);
      canvas.renderAll();
    }
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

  const panelStyle = { backgroundColor: "#2C2C2E", border: "1px solid #3A3A3C", borderRadius: "16px", padding: "20px" };
  const inputStyle = { backgroundColor: "#1C1C1E", border: "1px solid #3A3A3C", color: "#FFFFFF", borderRadius: "10px", padding: "8px 12px", width: "100%", fontSize: "13px", outline: "none" };
  const labelSmStyle = { display: "block", fontSize: "11px", color: "#8E8E93", marginBottom: "4px", fontWeight: "600", textTransform: "uppercase" as const, letterSpacing: "0.05em" };

  return (
    <div>
      <div className="text-center mb-10">
        <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#4CAF50" }}>Step 3</p>
        <h2 className="text-3xl font-extrabold mb-2" style={{ fontFamily: "var(--font-poppins)", color: "#FFFFFF" }}>
          Design Studio
        </h2>
        <p style={{ color: "#8E8E93" }}>Upload your artwork and make it yours.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Toolbox */}
        <div className="lg:w-68 flex-shrink-0 space-y-4" style={{ width: "272px" }}>
          {/* Upload */}
          <div style={panelStyle}>
            <p style={labelSmStyle}>Upload Artwork</p>
            <label className="flex flex-col items-center justify-center gap-2 cursor-pointer rounded-xl p-4 mt-2 transition-colors"
              style={{ border: "2px dashed #3A3A3C" }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = "#4CAF50")}
              onMouseLeave={e => (e.currentTarget.style.borderColor = "#3A3A3C")}>
              <span className="text-3xl">📁</span>
              <span className="text-sm font-medium" style={{ color: "#4CAF50" }}>Click to upload</span>
              <span className="text-xs" style={{ color: "#8E8E93" }}>PNG, JPG, SVG</span>
              <input type="file" accept="image/*" className="hidden" onChange={uploadImage} />
            </label>
          </div>

          {/* Text */}
          <div style={panelStyle}>
            <p style={labelSmStyle}>Add Text</p>
            <input type="text" placeholder="Type something..." value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addText()}
              style={{ ...inputStyle, marginTop: "8px", marginBottom: "10px" }} />
            <div className="grid grid-cols-2 gap-2 mb-3">
              <div>
                <label style={labelSmStyle}>Font</label>
                <select value={textFont} onChange={(e) => setTextFont(e.target.value)}
                  style={{ ...inputStyle, padding: "6px 8px" }}>
                  {FONTS.map((f) => <option key={f} value={f}>{f}</option>)}
                </select>
              </div>
              <div>
                <label style={labelSmStyle}>Size</label>
                <input type="number" value={textSize} min={8} max={120}
                  onChange={(e) => setTextSize(parseInt(e.target.value) || 32)}
                  style={{ ...inputStyle, padding: "6px 8px" }} />
              </div>
            </div>
            <div className="mb-3">
              <label style={labelSmStyle}>Text Color</label>
              <div className="flex items-center gap-2 mt-1">
                <input type="color" value={textColor} onChange={(e) => setTextColor(e.target.value)}
                  className="w-8 h-8 rounded cursor-pointer" style={{ border: "1px solid #3A3A3C", backgroundColor: "transparent" }} />
                <span className="text-xs" style={{ color: "#8E8E93" }}>{textColor}</span>
              </div>
            </div>
            <button onClick={addText} disabled={!textInput.trim() || !fabricLoaded}
              className="w-full py-2 rounded-xl text-sm font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ backgroundColor: "#4CAF50", color: "#FFFFFF" }}>
              Add Text
            </button>
          </div>

          {/* Selection actions */}
          {hasSelection && (
            <div style={panelStyle}>
              <p style={labelSmStyle}>Selected Object</p>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <button onClick={bringForward}
                  className="text-xs py-2 rounded-lg transition-colors"
                  style={{ border: "1px solid #3A3A3C", color: "#EBEBF0", backgroundColor: "#1C1C1E" }}>
                  Bring Forward
                </button>
                <button onClick={sendBackward}
                  className="text-xs py-2 rounded-lg transition-colors"
                  style={{ border: "1px solid #3A3A3C", color: "#EBEBF0", backgroundColor: "#1C1C1E" }}>
                  Send Back
                </button>
                <button onClick={deleteSelected}
                  className="col-span-2 text-xs py-2 rounded-lg transition-colors"
                  style={{ border: "1px solid #FF453A", color: "#FF453A", backgroundColor: "rgba(255,69,58,0.08)" }}>
                  🗑 Delete Selected
                </button>
              </div>
            </div>
          )}

          {/* Tips */}
          <div className="rounded-xl p-4 text-xs space-y-1" style={{ backgroundColor: "#1C1C1E", border: "1px solid #3A3A3C" }}>
            <p className="font-semibold mb-2" style={{ color: "#EBEBF0" }}>Tips</p>
            {["Click any object to select it", "Drag corners to resize", "Double-click text to edit inline", "Keep design inside the dashed box"].map(tip => (
              <p key={tip} style={{ color: "#8E8E93" }}>• {tip}</p>
            ))}
          </div>
        </div>

        {/* Canvas */}
        <div className="flex-1">
          {/* Front/Back toggle */}
          <div className="flex gap-2 mb-4 justify-center">
            {(["front", "back"] as const).map((s) => (
              <button key={s} onClick={() => flipSide(s)}
                className="px-6 py-2 rounded-full text-sm font-semibold capitalize transition-all"
                style={side === s
                  ? { backgroundColor: "#4CAF50", color: "#FFFFFF" }
                  : { border: "1px solid #3A3A3C", color: "#8E8E93", backgroundColor: "transparent" }
                }>
                {s} of Shirt
              </button>
            ))}
          </div>

          <p className="text-center text-sm mb-3" style={{ color: "#8E8E93" }}>
            {order.shirt?.name} · {order.color?.name}
          </p>

          <div className="relative mx-auto rounded-2xl overflow-hidden shadow-2xl"
            style={{ width: 400, height: 500, backgroundColor: order.color?.hex ?? "#FFFFFF", border: "1px solid #3A3A3C" }}>
            {!fabricLoaded && (
              <div className="absolute inset-0 flex items-center justify-center" style={{ backgroundColor: "#2C2C2E" }}>
                <div className="text-center">
                  <div className="w-8 h-8 border-4 border-t-transparent rounded-full animate-spin mx-auto mb-2"
                    style={{ borderColor: "#4CAF50", borderTopColor: "transparent" }} />
                  <p className="text-sm" style={{ color: "#8E8E93" }}>Loading studio...</p>
                </div>
              </div>
            )}
            <canvas ref={canvasRef} />
          </div>
          <p className="text-center text-xs mt-3" style={{ color: "#8E8E93" }}>
            The dashed green box shows your printable area. Keep your design inside for best results.
          </p>
        </div>
      </div>

      <div className="flex justify-between mt-10">
        <button onClick={onBack}
          className="px-8 py-4 rounded-full font-semibold border"
          style={{ borderColor: "#3A3A3C", color: "#8E8E93" }}>
          ← Back
        </button>
        <button onClick={handleContinue}
          className="px-10 py-4 rounded-full font-bold text-lg transition-all"
          style={{ backgroundColor: "#4CAF50", color: "#FFFFFF" }}>
          Review Order →
        </button>
      </div>
    </div>
  );
}
