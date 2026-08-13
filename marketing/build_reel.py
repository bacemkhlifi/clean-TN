from pathlib import Path
import math

import imageio.v2 as imageio
import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import arabic_reshaper
from bidi.algorithm import get_display


ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "marketing" / "video-assets"
OUT = ROOT / "marketing" / "ndhaf-tounes-reel.mp4"
W, H = 1080, 1920
FPS = 24

FONT_BOLD = "C:/Windows/Fonts/tahomabd.ttf"
FONT_REG = "C:/Windows/Fonts/tahoma.ttf"


def font(size, bold=False):
    return ImageFont.truetype(FONT_BOLD if bold else FONT_REG, size)


def shape(text):
    if any("\u0600" <= ch <= "\u06ff" for ch in text):
        return get_display(arabic_reshaper.reshape(text))
    return text


def cover_crop(img, scale=1.0, x_shift=0, y_shift=0):
    img = img.convert("RGB")
    iw, ih = img.size
    base = max(W / iw, H / ih) * scale
    nw, nh = int(iw * base), int(ih * base)
    resized = img.resize((nw, nh), Image.Resampling.LANCZOS)
    left = int((nw - W) / 2 + x_shift * (nw - W) / 2)
    top = int((nh - H) / 2 + y_shift * (nh - H) / 2)
    left = max(0, min(left, nw - W))
    top = max(0, min(top, nh - H))
    return resized.crop((left, top, left + W, top + H))


def wrap_text(draw, text, draw_font, max_width):
    words = text.split()
    lines = []
    current = ""
    for word in words:
        candidate = f"{current} {word}".strip()
        if draw.textbbox((0, 0), shape(candidate), font=draw_font)[2] <= max_width:
            current = candidate
        else:
            if current:
                lines.append(current)
            current = word
    if current:
        lines.append(current)
    return lines


def draw_rounded_box(draw, xy, radius, fill):
    draw.rounded_rectangle(xy, radius=radius, fill=fill)


def draw_caption(frame, main, sub=None, position="bottom"):
    overlay = Image.new("RGBA", frame.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    main_font = font(58, bold=True)
    sub_font = font(34)
    max_width = W - 140
    main_lines = wrap_text(draw, main, main_font, max_width)
    sub_lines = wrap_text(draw, sub, sub_font, max_width) if sub else []
    line_h = 72
    sub_h = 46
    box_h = 58 + len(main_lines) * line_h + len(sub_lines) * sub_h
    y = 118 if position == "top" else H - box_h - 120
    x = 52
    draw_rounded_box(draw, (x, y, W - x, y + box_h), 28, (15, 93, 67, 224))
    ty = y + 30
    for line in main_lines:
        draw.text((W - x - 34, ty), shape(line), font=main_font, fill="white", anchor="ra")
        ty += line_h
    for line in sub_lines:
        draw.text((W - x - 34, ty), shape(line), font=sub_font, fill=(232, 255, 244), anchor="ra")
        ty += sub_h
    return Image.alpha_composite(frame.convert("RGBA"), overlay).convert("RGB")


def draw_brand(frame):
    overlay = Image.new("RGBA", frame.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    x, y = 52, 48
    draw_rounded_box(draw, (x, y, x + 360, y + 72), 36, (255, 255, 255, 228))
    draw.ellipse((x + 14, y + 12, x + 62, y + 60), fill=(19, 143, 93, 255))
    draw.text((x + 38, y + 49), shape("ن"), font=font(30, bold=True), fill="white", anchor="mm")
    draw.text((x + 82, y + 48), "Ndhaf Tounes", font=font(28, bold=True), fill=(23, 33, 28), anchor="lm")
    return Image.alpha_composite(frame.convert("RGBA"), overlay).convert("RGB")


def draw_end_card(frame):
    overlay = Image.new("RGBA", frame.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    draw.rectangle((0, 0, W, H), fill=(0, 0, 0, 58))
    draw_rounded_box(draw, (72, 1240, W - 72, 1705), 30, (255, 250, 240, 238))
    draw.text((W / 2, 1325), "Ndhaf Tounes", font=font(62, bold=True), fill=(23, 33, 28), anchor="mm")
    draw.text((W / 2, 1415), shape("نظّف قدّام دارك"), font=font(64, bold=True), fill=(15, 93, 67), anchor="mm")
    draw.text((W / 2, 1500), shape("تونس تولّي أنظف"), font=font(58, bold=True), fill=(215, 25, 32), anchor="mm")
    draw_rounded_box(draw, (208, 1568, W - 208, 1648), 18, (215, 25, 32, 255))
    draw.text((W / 2, 1610), shape("اطلب الكيت اليوم"), font=font(38, bold=True), fill="white", anchor="mm")
    return Image.alpha_composite(frame.convert("RGBA"), overlay).convert("RGB")


scenes = [
    {
        "path": "scene-01-before.png",
        "duration": 4.0,
        "main": "شنوة يصير كان كل واحد ينظّف قدّام دارو؟",
        "sub": "10 دقايق تنجم تبدّل الحومة",
        "position": "top",
        "shift": (-0.1, 0.05),
    },
    {
        "path": "scene-02-kit.png",
        "duration": 4.0,
        "main": "Kit فيه عصا التقاط + قفازات + أكياس",
        "sub": "Simple, propre, facile à utiliser",
        "position": "bottom",
        "shift": (0.0, 0.0),
    },
    {
        "path": "scene-03-action.png",
        "duration": 5.0,
        "main": "تنظّف بلا ما تلمس الزبلة",
        "sub": "آمن، خفيف، ومفيد لكل العائلة",
        "position": "top",
        "shift": (0.08, 0.0),
    },
    {
        "path": "scene-01-before.png",
        "duration": 4.0,
        "main": "صوّر قبل / بعد",
        "sub": "كل كيس معمّر = نقاط على المنصة",
        "position": "bottom",
        "shift": (0.0, 0.12),
    },
    {
        "path": "scene-04-after.png",
        "duration": 6.0,
        "main": "نظّف قدّام دارك، تونس تولّي أنظف",
        "sub": "اطلب الكيت اليوم",
        "position": "top",
        "shift": (0.02, 0.0),
        "end": True,
    },
]


def make_frame(scene, local_t):
    img = Image.open(ASSETS / scene["path"])
    progress = local_t / scene["duration"]
    scale = 1.04 + 0.035 * progress
    x_shift, y_shift = scene["shift"]
    frame = cover_crop(img, scale=scale, x_shift=x_shift, y_shift=y_shift)
    # Gentle vignette for legibility.
    vignette = Image.new("L", (W, H), 0)
    vd = ImageDraw.Draw(vignette)
    vd.ellipse((-250, -200, W + 250, H + 200), fill=210)
    vignette = vignette.filter(ImageFilter.GaussianBlur(90))
    dark = Image.new("RGB", (W, H), (0, 0, 0))
    frame = Image.composite(frame, dark, vignette)
    frame = draw_brand(frame)
    frame = draw_caption(frame, scene["main"], scene["sub"], scene["position"])
    if scene.get("end") and progress > 0.45:
        frame = draw_end_card(frame)
    return frame


def main():
    OUT.parent.mkdir(parents=True, exist_ok=True)
    with imageio.get_writer(OUT, fps=FPS, codec="libx264", quality=8, macro_block_size=1) as writer:
      for scene in scenes:
          total = int(scene["duration"] * FPS)
          for i in range(total):
              frame = make_frame(scene, i / FPS)
              writer.append_data(np.asarray(frame))
    print(OUT)


if __name__ == "__main__":
    main()
