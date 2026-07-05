import obd
import time


class OBDReader:
    def __init__(self, port=None):
        self.connection = None
        self.port = port

    def connect(self):
        self.connection = obd.OBD(self.port, fast=False, timeout=10)
        return self.connection.is_connected()

    def is_connected(self):
        return self.connection is not None and self.connection.is_connected()

    def read_all(self):
        if not self.is_connected():
            return None
        data = {}
        commands = {
            "rpm": obd.commands.RPM,
            "speed": obd.commands.SPEED,
            "coolant_temp": obd.commands.COOLANT_TEMP,
            "intake_temp": obd.commands.INTAKE_TEMP,
            "throttle": obd.commands.THROTTLE_POS,
            "fuel_level": obd.commands.FUEL_LEVEL,
            "engine_load": obd.commands.ENGINE_LOAD,
            "rail_pressure": obd.commands.FUEL_RAIL_PRESSURE_DIRECT,
        }
        for key, cmd in commands.items():
            try:
                response = self.connection.query(cmd)
                data[key] = response.value.magnitude if not response.is_null() else None
            except Exception:
                data[key] = None
        data["timestamp"] = time.time()
        return data

    def read_dtc(self):
        if not self.is_connected():
            return []
        response = self.connection.query(obd.commands.GET_DTC)
        if response.is_null():
            return []
        return [{"code": code, "description": desc} for code, desc in response.value]

    def clear_dtc(self):
        if not self.is_connected():
            return False
        self.connection.query(obd.commands.CLEAR_DTC)
        return True

    def close(self):
        if self.connection:
            self.connection.close()
