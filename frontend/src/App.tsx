import { useEffect } from "react";
import { useOBDSocket } from "./hooks/useOBDSocket";
import { MetricPanel } from "./components/MetricPanel";
import { DTCPanel } from "./components/DTCPanel";
import { HistoryChart } from "./components/HistoryChart";

function App() {
  const { data, connected } = useOBDSocket();

  useEffect(() => {
    fetch("/api/connect", { method: "POST" });
  }, []);

  return (
    <div className="min-h-screen bg-[#14171c] text-[#d8dce2]">
      <header className="flex justify-between items-center px-7 py-4 bg-[#181c22] border-b-2 border-[#2a303a]">
        <div className="flex items-center gap-3">
          <span className="bg-[#4a7fa5] text-[#0e1013] font-bold text-xs px-2.5 py-1 rounded tracking-wide">
            OBD
          </span>
          <h1 className="text-lg font-semibold">CarScan</h1>
        </div>
        <div className="flex items-center gap-2 text-sm text-[#7a828e]">
          <span
            className={`w-2.5 h-2.5 rounded-full ${
              connected ? "bg-[#4c8c6b]" : "bg-[#a13d3d]"
            }`}
          />
          {connected ? "Conectado" : "Desconectado"}
        </div>
      </header>

      <main className="grid gap-3.5 p-7 grid-cols-[repeat(auto-fit,minmax(180px,1fr))]">
        <MetricPanel label="RPM" value={data?.rpm ?? null} unit="rpm" />
        <MetricPanel
          label="Velocidad"
          value={data?.speed ?? null}
          unit="km/h"
        />
        <MetricPanel
          label="Refrigerante"
          value={data?.coolant_temp ?? null}
          unit="°C"
          warn
        />
        <MetricPanel
          label="Admisión"
          value={data?.intake_temp ?? null}
          unit="°C"
        />
        <MetricPanel
          label="Acelerador"
          value={data?.throttle ?? null}
          unit="%"
        />
        <MetricPanel
          label="Combustible"
          value={data?.fuel_level ?? null}
          unit="%"
        />
        <MetricPanel
          label="Carga motor"
          value={data?.engine_load ?? null}
          unit="%"
        />
        <MetricPanel
          label="Presión rail"
          value={data?.rail_pressure ?? null}
          unit="kPa"
        />
      </main>

      <HistoryChart data={data} />
      <DTCPanel />
    </div>
  );
}

export default App;
