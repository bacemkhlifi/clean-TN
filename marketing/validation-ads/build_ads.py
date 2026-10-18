from pathlib import Path
import math
import subprocess
import sys
import wave

DEPS = Path(__file__).resolve().parents[2] / ".video_deps"
sys.path.insert(0, str(DEPS))

import imageio.v2 as imageio
import imageio_ffmpeg
import numpy as np
from PIL import Image, ImageDraw, ImageEnhance, ImageFilter, ImageFont
import arabic_reshaper
from bidi.algorithm import get_display


ROOT = Path(__file__).resolve().parents[2]
HERE = Path(__file__).resolve().parent
ASSETS = ROOT / "public" / "usage"
OUT = HERE / "output"
W, H = 1080, 1920
FPS = 24
FONT_BOLD = Path("C:/Windows/Fonts/tahomabd.ttf")
FONT_REG = Path("C:/Windows/Fonts/tahoma.ttf")


ADS = [
    {
        "slug": "01-utility-final",
        "voice": "voice-01-utility.mp3",
        "scenes": [
            ("home-floor.gif", 5.5, "كل مرة لازمك توطّي؟", "الحل أسهل ممّا تتصوّر"),
            ("pickup-demo.webp", 6.0, "شدّ الحاجة من غير ما تنحني", "ومن غير ما تلمس الوسخ"),
            ("high-shelf.gif", 5.5, "توصل للبلايص الصعيبة", "تحت الموبليا وفوق الرفوف"),
            ("product-details.webp", 5.5, "خفيفة • قابلة للطي • سهلة", "للدار، الحانوت، والجنان"),
            ("garden-clean.gif", 9.0, "35 د + 8 د توصيل", "المجموع 43 د • الخلاص عند الاستلام"),
        ],
    },
    {
        "slug": "02-parents-final",
        "voice": "voice-02-parents.mp3",
        "scenes": [
            ("mobility-helper.webp", 5.0, "هدية تنفعهم كل يوم", "لبوك، أمك، ولا جدّك"),
            ("home-floor.gif", 5.5, "ما عادش لازمهم ينحنيو", "يشدّوا الحاجة بسهولة"),
            ("high-shelf.gif", 5.0, "وتوصل للبلايص الصعيبة", "استعمالات كثيرة في الدار"),
            ("product-details.webp", 5.0, "فكرة بسيطة، فرق كبير", "Cleano Grabber"),
            ("mobility-helper.webp", 7.5, "43 د بالتوصيل", "أطلبها توّا • الخلاص عند الاستلام"),
        ],
    },
    {
        "slug": "03-mission-final",
        "voice": "voice-03-mission.mp3",
        "scenes": [
            ("garden-clean.gif", 5.5, "تونس الأنظف تبدأ منّا", "من قدّام دارنا وحوانتنا"),
            ("pickup-demo.webp", 5.0, "بلا ما تمسّ الوسخ", "وبلا ما تتعب ظهرك"),
            ("garden-clean.gif", 5.0, "10 دقايق تعمل فرق", "في شارعك وفي حومتك"),
            ("product-details.webp", 5.0, "Cleano تخلي البداية أسهل", "عصا خفيفة وقابلة للطي"),
            ("car-reach.webp", 7.5, "35 د + 8 د توصيل", "نبدأو من قدّام بابنا"),
        ],
    },
]


def font(size, bold=False):
    return ImageFont.truetype(str(FONT_BOLD if bold else FONT_REG), size)


def shape(text):
    if any("\u0600" <= ch <= "\u06ff" for ch in text):
        return get_display(arabic_reshaper.reshape(text))
    return text


def rounded(draw, box, radius, fill, outline=None, width=1):
    draw.rounded_rectangle(box, radius=radius, fill=fill, outline=outline, width=width)


def fit_cover(img, scale=1.0, pan=0.0):
    img = img.convert("RGB")
    iw, ih = img.size
    factor = max(W / iw, H / ih) * scale
    nw, nh = int(iw * factor), int(ih * factor)
    img = img.resize((nw, nh), Image.Resampling.LANCZOS)
    left = max(0, min(int((nw - W) * (0.5 + pan * 0.3)), nw - W))
    top = max(0, min(int((nh - H) * 0.5), nh - H))
    return img.crop((left, top, left + W, top + H))


def load_source(path, local_t, scale, pan):
    img = Image.open(path)
    frames = getattr(img, "n_frames", 1)
    if frames > 1:
        img.seek(int(local_t * 12) % frames)
        return fit_cover(img.copy(), scale=1.04, pan=pan)
    return fit_cover(img, scale=scale, pan=pan)


def add_backdrop(frame):
    frame = ImageEnhance.Color(frame).enhance(0.94)
    overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    for y in range(H):
        alpha = int(18 + 135 * (y / H) ** 2)
        draw.line((0, y, W, y), fill=(5, 24, 17, alpha))
    return Image.alpha_composite(frame.convert("RGBA"), overlay).convert("RGB")


def add_brand(frame):
    layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    draw = ImageDraw.Draw(layer)
    rounded(draw, (46, 46, 340, 124), 22, (252, 250, 243, 242))
    draw.ellipse((62, 60, 114, 112), fill=(17, 133, 88, 255))
    draw.text((88, 87), shape("ن"), font=font(31, True), fill="white", anchor="mm")
    draw.text((136, 87), "Cleano", font=font(34, True), fill=(18, 35, 28), anchor="lm")
    rounded(draw, (746, 58, 1034, 112), 18, (215, 28, 35, 236))
    draw.text((890, 86), "OFFRE LANCEMENT", font=font(20, True), fill="white", anchor="mm")
    return Image.alpha_composite(frame.convert("RGBA"), layer).convert("RGB")


def wrap(draw, text, fnt, max_width):
    words = text.split()
    lines, current = [], ""
    for word in words:
        candidate = f"{current} {word}".strip()
        if draw.textbbox((0, 0), shape(candidate), font=fnt)[2] <= max_width:
            current = candidate
        else:
            if current:
                lines.append(current)
            current = word
    if current:
        lines.append(current)
    return lines


def add_caption(frame, main, sub, is_last=False):
    layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    draw = ImageDraw.Draw(layer)
    main_font, sub_font = font(61, True), font(34)
    main_lines = wrap(draw, main, main_font, 884)
    sub_lines = wrap(draw, sub, sub_font, 884)
    box_h = 86 + 73 * len(main_lines) + 48 * len(sub_lines)
    y = H - box_h - 134
    fill = (211, 26, 33, 242) if is_last else (12, 86, 61, 238)
    rounded(draw, (48, y, 1032, y + box_h), 30, fill)
    ty = y + 34
    for line in main_lines:
        draw.text((984, ty), shape(line), font=main_font, fill="white", anchor="ra")
        ty += 73
    for line in sub_lines:
        draw.text((984, ty), shape(line), font=sub_font, fill=(246, 252, 248), anchor="ra")
        ty += 48
    if is_last:
        rounded(draw, (250, y - 108, 830, y - 28), 18, (252, 250, 243, 248))
        draw.text((540, y - 68), "Cleano • Commander sur le site", font=font(28, True), fill=(18, 69, 50), anchor="mm")
    return Image.alpha_composite(frame.convert("RGBA"), layer).convert("RGB")


def add_progress(frame, index, count):
    layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    draw = ImageDraw.Draw(layer)
    gap, bar_w = 12, int((W - 92 - 12 * (count - 1)) / count)
    for i in range(count):
        x = 46 + i * (bar_w + gap)
        draw.rounded_rectangle((x, 146, x + bar_w, 154), radius=4, fill=(255, 255, 255, 230 if i <= index else 90))
    return Image.alpha_composite(frame.convert("RGBA"), layer).convert("RGB")


def render_ad(ad):
    silent = OUT / f"cleano-{ad['slug']}-silent.mp4"
    final = OUT / f"cleano-{ad['slug']}.mp4"
    if not silent.exists() or silent.stat().st_size < 1_000_000:
        with imageio.get_writer(silent, fps=FPS, codec="libx264", quality=8, macro_block_size=1) as writer:
            for scene_index, (asset, duration, main, sub) in enumerate(ad["scenes"]):
                total = int(duration * FPS)
                for i in range(total):
                    t = i / FPS
                    progress = i / max(total - 1, 1)
                    scale = 1.02 + 0.055 * (0.5 - 0.5 * math.cos(progress * math.pi))
                    pan = -0.4 + 0.8 * progress if scene_index % 2 == 0 else 0.4 - 0.8 * progress
                    frame = load_source(ASSETS / asset, t, scale, pan)
                    frame = add_backdrop(frame)
                    frame = add_brand(frame)
                    frame = add_progress(frame, scene_index, len(ad["scenes"]))
                    frame = add_caption(frame, main, sub, scene_index == len(ad["scenes"]) - 1)
                    writer.append_data(np.asarray(frame))

    ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()
    subprocess.run(
        [
            ffmpeg, "-y", "-i", str(silent), "-i", str(HERE / ad["voice"]), "-i", str(OUT / "music-bed.wav"),
            "-filter_complex", "[1:a]volume=1.35[a1];[2:a]volume=0.10[a2];[a1][a2]amix=inputs=2:duration=longest:dropout_transition=1[a]",
            "-map", "0:v", "-map", "[a]", "-c:v", "copy", "-c:a", "aac", "-b:a", "192k", "-shortest", str(final),
        ],
        check=True,
    )
    try:
        silent.unlink(missing_ok=True)
    except PermissionError:
        pass
    return final


def make_music(seconds=34, sample_rate=44100):
    path = OUT / "music-bed.wav"
    total = int(seconds * sample_rate)
    notes = [174.61, 196.00, 220.00, 261.63, 220.00, 196.00]
    data = np.zeros(total, dtype=np.float32)
    for i in range(total):
        t = i / sample_rate
        note = notes[int(t / 0.75) % len(notes)]
        pulse = 0.55 + 0.45 * math.sin(2 * math.pi * 1.1 * t)
        data[i] = 0.07 * pulse * math.sin(2 * math.pi * note * t)
        data[i] += 0.025 * math.sin(2 * math.pi * note * 0.5 * t)
    pcm = (np.clip(data, -0.2, 0.2) * 32767).astype(np.int16)
    with wave.open(str(path), "wb") as wav:
        wav.setnchannels(1)
        wav.setsampwidth(2)
        wav.setframerate(sample_rate)
        wav.writeframes(pcm.tobytes())


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    make_music()
    for ad in ADS:
        voice = HERE / ad["voice"]
        if not voice.exists():
            raise FileNotFoundError(f"Missing voice file: {voice}")
        final = OUT / f"cleano-{ad['slug']}.mp4"
        if final.exists() and final.stat().st_size > 1_000_000:
            print(final)
            continue
        print(render_ad(ad))


if __name__ == "__main__":
    main()
