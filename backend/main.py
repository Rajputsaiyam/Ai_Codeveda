
from fastapi import FastAPI, UploadFile, File
from fastapi.responses import JSONResponse
from fastapi.responses import FileResponse
from ultralytics import YOLO
import shutil
import os



# Initialize FastAPI app
app = FastAPI()

# Load YOLO model
model = YOLO("yolov8n.pt")

# Create uploads folder
UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@app.get("/")
def root():
    return {"message": "YOLO Backend Running 🚀"}

@app.post("/predict/image")
async def predict(file: UploadFile = File(...)):
    # Save uploaded file locally
    file_path = os.path.join(UPLOAD_DIR, file.filename)
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Run YOLO prediction and force save location
    results = model.predict(
        file_path,
        save=True,
        project="runs/detect",
        name="predict",
        exist_ok=True
    )

    # Extract results
    detections = []
    for box in results[0].boxes:
        detections.append({
            "class": model.names[int(box.cls[0])],
            "confidence": float(box.conf[0]),
            "box": box.xyxy[0].tolist()
        })

    return JSONResponse(content={"detections": detections})


@app.get("/download/{filename}")
async def download_file(filename: str):
    file_path = os.path.join("runs/detect/predict", filename)
    if os.path.exists(file_path):
        return FileResponse(file_path)
    return {"error": "File not found"}
