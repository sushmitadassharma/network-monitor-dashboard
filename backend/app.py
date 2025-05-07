from flask import Flask, jsonify
from flask_cors import CORS
import psutil
import platform
import socket

app = Flask(__name__)
CORS(app, origins="http://localhost:3000")

@app.route('/system_health')
def system_health():
    uptime = psutil.boot_time()
    load_avg = psutil.getloadavg()

    return jsonify({
        'uptime': uptime,
        'load_avg': load_avg[0]  # 1-minute load average
    })

@app.route('/logs')
def get_logs():
    logs = [
        {'message': 'System started successfully.'},
        {'message': 'User logged in.'},
        {'message': 'Memory usage exceeded 80%.'},
    ]
    return jsonify(logs)

@app.route('/metrics')
def metrics():
    cpu = psutil.cpu_percent(interval=1)
    memory = psutil.virtual_memory()
    disk = psutil.disk_usage('/')
    net = psutil.net_io_counters()

    metrics = {
        'cpu_usage': cpu,
        'memory': {
            'total': memory.total,
            'used': memory.used,
            'percent': memory.percent
        },
        'disk': {
            'total': disk.total,
            'used': disk.used,
            'percent': disk.percent
        },
        'network': {
            'bytes_sent': net.bytes_sent,
            'bytes_recv': net.bytes_recv
        }
    }
    return jsonify(metrics)

@app.route('/network_traffic')
def network_traffic():
    import psutil
    net_io = psutil.net_io_counters()
    return jsonify({
        'bytes_sent': net_io.bytes_sent,
        'bytes_recv': net_io.bytes_recv
    })

if __name__ == '__main__':
    app.run(debug=True)
