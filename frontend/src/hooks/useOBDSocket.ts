import { useEffect, useRef, useState } from "react";
import type { OBDData } from "../types";

export function useOBDSocket() {
  const [data, setData] = useState<OBDData | null>(null);
  const [connected, setConnected] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    let cancelled = false;

    function connect() {
      const ws = new WebSocket(`ws://${location.host}/ws/live`);
      wsRef.current = ws;

      ws.onopen = () => setConnected(true);
      ws.onmessage = (event) => {
        const parsed: OBDData = JSON.parse(event.data);
        setData(parsed);
      };
      ws.onclose = () => {
        setConnected(false);
        if (!cancelled) setTimeout(connect, 2000);
      };
      ws.onerror = () => ws.close();
    }

    connect();

    return () => {
      cancelled = true;
      wsRef.current?.close();
    };
  }, []);

  return { data, connected };
}
