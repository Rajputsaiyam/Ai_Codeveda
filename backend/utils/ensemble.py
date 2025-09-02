from ultralytics import YOLO
import os

# Path to your downloaded weights
model_path = os.path.join("models", "yolov8n.pt")

# Load YOLO model
model = YOLO(model_path)

# Example prediction
results = model.predict("test.jpg", conf=0.5)

# Show results
for r in results:
    r.show()
    r.save("output.jpg")
    