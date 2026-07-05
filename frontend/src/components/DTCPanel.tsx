import { useState } from "react";
import type { DTCCode } from "../types";

export function DTCPanel() {
  const [codes, setCodes] = useState<DTCCode[]>([]);
  const [confirming, setConfirming] = useState(false);

  async function scan() {
    const res = await fetch("/api/dtc");
    const json = await res.json();
    setCodes(json.codes);
  }

  async function clear() {
    await fetch("/api/dtc/clear", { method: "POST" });
    setConfirming(false);
    scan();
  }

  return (
    <section className="bg-[#1c2128] border border-[#2a303a] rounded p-5 mx-7 mb-7">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-sm font-semibold">Códigos de fallo (DTC)</h2>
        <div className="flex gap-2">
          <button
            onClick={scan}
            className="bg-[#4a7fa5] text-[#0e1013] font-semibold text-sm px-4 py-2 rounded"
          >
            Escanear
          </button>
          <button
            onClick={() => setConfirming(true)}
            className="bg-[#a13d3d] text-[#f2e6e6] font-semibold text-sm px-4 py-2 rounded"
          >
            Borrar códigos
          </button>
        </div>
      </div>

      {confirming && (
        <div className="bg-[#26201d] border border-[#c98a2c] rounded p-3 mb-3 text-sm">
          <p className="mb-2">
            Vas a borrar el historial de fallos. Si no has solucionado la
            causa, el código puede volver a aparecer.
          </p>
          <div className="flex gap-2">
            <button
              onClick={clear}
              className="bg-[#a13d3d] text-[#f2e6e6] text-xs font-semibold px-3 py-1.5 rounded"
            >
              Confirmar borrado
            </button>
            <button
              onClick={() => setConfirming(false)}
              className="bg-[#2a303a] text-[#d8dce2] text-xs font-semibold px-3 py-1.5 rounded"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      <ul className="border-t border-[#2a303a]">
        {codes.length === 0 && (
          <li className="text-[#7a828e] py-3 text-sm">Sin códigos leídos aún</li>
        )}
        {codes.map((c, i) => (
          <li
            key={i}
            className="flex gap-3 py-2.5 border-b border-[#2a303a] text-sm"
          >
            <span className="text-[#c98a2c] font-bold min-w-[60px]">
              {c.code}
            </span>
            <span>{c.description}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
