import asyncio
import json
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from obd_reader import OBDReader

app = FastAPI(title="OBD CarScan")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

reader = OBDReader()


@app.get("/api/status")
def status():
    return {"connected": reader.is_connected()}


@app.post("/api/connect")
def connect():
    ok = reader.connect()
    return {"connected": ok}


@app.get("/api/dtc")
def get_dtc():
    return {"codes": reader.read_dtc()}


@app.post("/api/dtc/clear")
def clear_dtc():
    ok = reader.clear_dtc()
    return {"cleared": ok}


@app.websocket("/ws/live")
async def live_data(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            data = reader.read_all()
            if data:
                await websocket.send_text(json.dumps(data))
            await asyncio.sleep(0.5)
    except WebSocketDisconnect:
        pass
