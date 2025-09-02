from fastapi import FastAPI, UploadFile, File
from fastapi.responses import JSONResponse, FileResponse, StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from ultralytics import YOLO
import shutil
import os
import uuid
import cv2

# ==========================
# CONFIG
# ==========================
MODEL_PATH = "runs/detect/train7/weights/best.pt"  # <-- your trained model
UPLOAD_DIR = "uploads"
OUTPUT_DIR = "runs/detect/predict"

# Init FastAPI
app = FastAPI()

# Serve YOLO output directories
app.mount("/runs", StaticFiles(directory="runs"), name="runs")
app.mount("/outputs", StaticFiles(directory="outputs"), name="outputs")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # change to frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load trained YOLO model
model = YOLO(MODEL_PATH)

# Ensure folders exist
os.makedirs(UPLOAD_DIR, exist_ok=True)
os.makedirs(OUTPUT_DIR, exist_ok=True)
os.makedirs("outputs", exist_ok=True)

# ==========================
# GLOBALS FOR LIVE STREAM
# ==========================
streaming = False
cap = None


@app.get("/")
def root():
    return {"message": "Space Station YOLO Backend 🚀"}


# ==========================
# IMAGE PREDICTION
# ==========================
@app.post("/predict/image")
async def predict_image(file: UploadFile = File(...)):
    unique_filename = f"{uuid.uuid4()}_{file.filename}"
    file_path = os.path.join(UPLOAD_DIR, unique_filename)
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    results = model.predict(
        file_path,
        save=True,
        conf=0.5,
        project="runs/detect",
        name="predict",
        exist_ok=True
    )

    detections = []
    for box in results[0].boxes:
        detections.append({
            "class": model.names[int(box.cls[0])],
            "confidence": float(box.conf[0]),
            "box": box.xyxy[0].tolist()
        })

    return JSONResponse(content={
        "filename": unique_filename,
        "detections": detections,
        "output_url": f"/runs/detect/predict/{unique_filename}"
    })


# ==========================
# DOWNLOAD RESULT FILE
# ==========================
@app.get("/download/{filename}")
async def download_file(filename: str):
    file_path = os.path.join(OUTPUT_DIR, filename)
    if os.path.exists(file_path):
        return FileResponse(file_path)
    return {"error": "File not found"}


# ==========================
# VIDEO PREDICTION
# ==========================
@app.post("/predict/video")
async def predict_video(file: UploadFile = File(...)):
    video_id = str(uuid.uuid4())
    input_path = f"uploads/{video_id}_{file.filename}"
    os.makedirs("uploads", exist_ok=True)
    os.makedirs("outputs", exist_ok=True)

    with open(input_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    results = model.predict(source=input_path, save=True, conf=0.5, project="outputs", name=video_id)
    processed_video = f"outputs/{video_id}/{os.path.basename(input_path)}"

    return {"video_url": f"/outputs/{video_id}/{os.path.basename(input_path)}"}


# ==========================
# LIVE WEBCAM STREAM
# ==========================
def generate_frames():
    global cap, streaming
    cap = cv2.VideoCapture(0)  # open webcam

    while streaming:
        success, frame = cap.read()
        if not success:
            break

        results = model(frame, conf=0.5)
        annotated_frame = results[0].plot()

        _, buffer = cv2.imencode('.jpg', annotated_frame)
        frame_bytes = buffer.tobytes()

        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame_bytes + b'\r\n')

    if cap:
        cap.release()
        cv2.destroyAllWindows()


@app.get("/live")
def live_feed():
    global streaming
    streaming = True
    return StreamingResponse(generate_frames(), media_type="multipart/x-mixed-replace; boundary=frame")


@app.post("/stop_live")
def stop_live():
    global streaming, cap
    streaming = False
    if cap:
        cap.release()
        cv2.destroyAllWindows()
        cap = None
    return {"status": "stopped"}
