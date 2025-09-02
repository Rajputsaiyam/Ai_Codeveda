from ultralytics import YOLO

def main():
    # Load a YOLOv8 model (you can start with yolov8n.pt for speed on CPU)
    model = YOLO("yolov8n.pt")

    # Train on your custom dataset
    model.train(
        data="data/data.yaml",   # path to your dataset yaml
        epochs=10,               # adjust as needed
        imgsz=640,               # image size
        batch=4,                 # smaller batch for CPU
        device="cpu"             # ✅ force CPU training
    )

if __name__ == "__main__":
    main()
