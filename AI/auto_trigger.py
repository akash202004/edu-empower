from flask import Flask, request
import subprocess

app = Flask(__name__)

@app.route('/trigger-ai', methods=['POST'])
def trigger_ai():
    try:
        subprocess.run(['python', 'main.py'], check=True)
        return {"message": "AI script executed successfully"}, 200
    except subprocess.CalledProcessError as e:
        return {"error": str(e)}, 500

if __name__ == "__main__":
    app.run(port=5001)
