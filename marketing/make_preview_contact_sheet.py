from pathlib import Path

import imageio.v2 as imageio
from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parents[1]
VIDEO = ROOT / "marketing" / "cleano-reel-pro.mp4"
OUT = ROOT / "marketing" / "cleano-reel-pro-preview.jpg"

reader = imageio.get_reader(VIDEO)
times = [2, 7, 14, 22, 29]
frames = []
for second in times:
    frame = Image.fromarray(reader.get_data(second * 24)).resize((216, 384))
    frames.append((second, frame))
reader.close()

sheet = Image.new("RGB", (216 * len(frames), 430), "white")
draw = ImageDraw.Draw(sheet)
for idx, (second, frame) in enumerate(frames):
    x = idx * 216
    sheet.paste(frame, (x, 0))
    draw.text((x + 10, 395), f"{second}s", fill=(0, 0, 0))

sheet.save(OUT, quality=92)
print(OUT)
