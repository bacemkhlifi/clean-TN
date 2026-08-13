from pathlib import Path
import math
import subprocess
import wave

import imageio.v2 as imageio
import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import arabic_reshaper
from bidi.algorithm import get_display
import imageio_ffmpeg


ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "marketing" / "video-assets"
OUT_SILENT = ROOT / "marketing" / "ndhaf-tounes-reel-pro-silent.mp4"
VOICE = ROOT / "marketing" / "voiceover-ar-female.mp3"
MUSIC = ROOT / "marketing" / "music-bed.wav"
OUT = ROOT / "marketing" / "ndhaf-tounes-reel-pro.mp4"
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


def rounded(draw, xy, radius, fill):
    draw.rounded_rectangle(xy, radius=radius, fill=fill)


def draw_brand(frame):
    overlay = Image.new("RGBA", frame.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    x, y = 44, 44
    rounded(draw, (x, y, x + 332, y + 72), 36, (255, 255, 255, 232))
    draw.ellipse((x + 14, y + 12, x + 62, y + 60), fill=(19, 143, 93, 255))
    draw.text((x + 38, y + 48), shape("ن"), font=font(30, bold=True), fill="white", anchor="mm")
    draw.text((x + 82, y + 48), "Ndhaf Tounes", font=font(27, bold=True), fill=(23, 33, 28), anchor="lm")
    return Image.alpha_composite(frame.convert("RGBA"), overlay).convert("RGB")


def draw_caption(frame, main, sub=None, position="bottom", red=False):
    overlay = Image.new("RGBA", frame.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    main_font = font(54, bold=True)
    sub_font = font(32)
    max_width = W - 130
    main_lines = wrap_text(draw, main, main_font, max_width)
    sub_lines = wrap_text(draw, sub, sub_font, max_width) if sub else []
    box_h = 58 + len(main_lines) * 66 + len(sub_lines) * 42
    x = 46
    y = 156 if position == "top" else H - box_h - 116
    fill = (215, 25, 32, 232) if red else (15, 93, 67, 230)
    rounded(draw, (x, y, W - x, y + box_h), 28, fill)
    ty = y + 30
    for line in main_lines:
        draw.text((W - x - 32, ty), shape(line), font=main_font, fill="white", anchor="ra")
        ty += 66
    for line in sub_lines:
        draw.text((W - x - 32, ty), shape(line), font=sub_font, fill=(246, 255, 249), anchor="ra")
        ty += 42
    return Image.alpha_composite(frame.convert("RGBA"), overlay).convert("RGB")


def draw_end_card(frame):
    overlay = Image.new("RGBA", frame.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    draw.rectangle((0, 0, W, H), fill=(0, 0, 0, 66))
    rounded(draw, (68, 1218, W - 68, 1716), 32, (255, 250, 240, 244))
    draw.text((W / 2, 1300), "Ndhaf Tounes", font=font(64, bold=True), fill=(23, 33, 28), anchor="mm")
    draw.text((W / 2, 1394), shape("نظّف قدّام دارك"), font=font(68, bold=True), fill=(15, 93, 67), anchor="mm")
    draw.text((W / 2, 1486), shape("تونس تولّي أنظف"), font=font(62, bold=True), fill=(215, 25, 32), anchor="mm")
    rounded(draw, (196, 1572, W - 196, 1654), 18, (215, 25, 32, 255))
    draw.text((W / 2, 1614), shape("اطلب الباك اليوم"), font=font(40, bold=True), fill="white", anchor="mm")
    return Image.alpha_composite(frame.convert("RGBA"), overlay).convert("RGB")


scenes = [
    {
        "path": "scene-01-before.png",
        "duration": 5.0,
        "main": "ديما نقولو تونس لازمة تولّي أنظف",
        "sub": "أما شكون يبدأ؟",
        "position": "top",
        "shift": (-0.12, 0.02),
    },
    {
        "path": "scene-02-kit.png",
        "duration": 5.4,
        "main": "أنا نبدأ من قدّام داري",
        "sub": "Ndhaf Tounes Pack",
        "position": "bottom",
        "shift": (0.0, 0.02),
    },
    {
        "path": "scene-03-action.png",
        "duration": 7.0,
        "main": "تنظّف بلا ما تلمس الزبلة",
        "sub": "عصا التقاط، قفازات، وأكياس",
        "position": "top",
        "shift": (0.1, 0.0),
    },
    {
        "path": "scene-01-before.png",
        "duration": 5.0,
        "main": "صوّر قبل وبعد",
        "sub": "كل كيس معمّر يعطيك نقاط",
        "position": "bottom",
        "shift": (0.0, 0.14),
    },
    {
        "path": "scene-04-after.png",
        "duration": 9.8,
        "main": "خطوة صغيرة منك تبدّل حومتك",
        "sub": "وتعاون تونس",
        "position": "top",
        "shift": (0.02, 0.0),
        "end": True,
    },
]


def make_frame(scene, local_t):
    img = Image.open(ASSETS / scene["path"])
    progress = local_t / scene["duration"]
    eased = 0.5 - 0.5 * math.cos(progress * math.pi)
    frame = cover_crop(
        img,
        scale=1.035 + 0.045 * eased,
        x_shift=scene["shift"][0],
        y_shift=scene["shift"][1],
    )
    vignette = Image.new("L", (W, H), 0)
    draw_v = ImageDraw.Draw(vignette)
    draw_v.ellipse((-250, -200, W + 250, H + 200), fill=214)
    vignette = vignette.filter(ImageFilter.GaussianBlur(88))
    frame = Image.composite(frame, Image.new("RGB", (W, H), (0, 0, 0)), vignette)
    frame = draw_brand(frame)
    frame = draw_caption(frame, scene["main"], scene["sub"], scene["position"], red=scene.get("red", False))
    if scene.get("end") and progress > 0.43:
        frame = draw_end_card(frame)
    return frame


def render_video():
    with imageio.get_writer(OUT_SILENT, fps=FPS, codec="libx264", quality=8, macro_block_size=1) as writer:
        for scene in scenes:
            total = int(scene["duration"] * FPS)
            for i in range(total):
                writer.append_data(np.asarray(make_frame(scene, i / FPS)))


def make_music(duration=21.0, sample_rate=44100):
    total = int(duration * sample_rate)
    melody = [220, 261.63, 293.66, 329.63, 392, 329.63, 293.66, 261.63]
    data = np.zeros(total, dtype=np.float32)
    beat_len = sample_rate // 2
    for i in range(total):
        t = i / sample_rate
        beat = (i // beat_len) % len(melody)
        env = 0.5 + 0.5 * math.sin(2 * math.pi * 1.2 * t)
        data[i] += 0.09 * env * math.sin(2 * math.pi * melody[beat] * t)
        data[i] += 0.035 * math.sin(2 * math.pi * 82.41 * t)
    data = np.clip(data, -0.25, 0.25)
    pcm = (data * 32767).astype(np.int16)
    with wave.open(str(MUSIC), "wb") as wav:
        wav.setnchannels(1)
        wav.setsampwidth(2)
        wav.setframerate(sample_rate)
        wav.writeframes(pcm.tobytes())


def mux_audio():
    ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()
    subprocess.run(
        [
            ffmpeg,
            "-y",
            "-i",
            str(OUT_SILENT),
            "-i",
            str(VOICE),
            "-i",
            str(MUSIC),
            "-filter_complex",
            "[1:a]volume=1.55[a1];[2:a]volume=0.18[a2];[a1][a2]amix=inputs=2:duration=first:dropout_transition=0[a]",
            "-map",
            "0:v",
            "-map",
            "[a]",
            "-c:v",
            "copy",
            "-c:a",
            "aac",
            "-b:a",
            "160k",
            "-shortest",
            str(OUT),
        ],
        check=True,
    )


def main():
    render_video()
    make_music(sum(scene["duration"] for scene in scenes))
    mux_audio()
    print(OUT)


if __name__ == "__main__":
    main()
