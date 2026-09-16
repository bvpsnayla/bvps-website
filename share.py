from pathlib import Path
from html import escape
from urllib.parse import quote
import re

# ============================================================
# BVPS STATIC SHARE PAGE GENERATOR
# GitHub Pages compatible — NO PHP required
# ============================================================

SITE_URL = "https://bvpsnayla.in"

IMAGE_FOLDER = Path("assets/images/independence-day-2026")
OUTPUT_FOLDER = Path("share")

EVENT_TITLE = "Independence Day Celebration 2026"

DESCRIPTION = (
    "Independence Day Celebration 2026 - "
    "Bal Vikas Senior Secondary School, Nayla, Jaipur"
)

# Create share folder
OUTPUT_FOLDER.mkdir(exist_ok=True)

# ============================================================
# FIND PHOTOS
# ============================================================

photos = []

pattern = re.compile(
    r"^15-aug-2026 \((\d+)\)\.JPG$",
    re.IGNORECASE
)

for file in IMAGE_FOLDER.iterdir():

    if not file.is_file():
        continue

    match = pattern.match(file.name)

    if match:
        number = int(match.group(1))
        photos.append((number, file))

# Sort numerically
photos.sort(key=lambda x: x[0])

print(f"Found {len(photos)} photos.")

# ============================================================
# GENERATE SHARE PAGES
# ============================================================

for number, image in photos:

    title = f"{EVENT_TITLE} - Photo {number}"

    # Convert Windows path to website URL
    relative_image_path = image.as_posix()

    image_url = (
        f"{SITE_URL}/"
        f"{quote(relative_image_path, safe='/')}"
    )

    share_filename = (
        f"independence-day-2026-photo-{number}.html"
    )

    share_url = (
        f"{SITE_URL}/share/{share_filename}"
    )

    html = f"""<!DOCTYPE html>
<html lang="en">

<head>

<meta charset="UTF-8">

<meta name="viewport"
      content="width=device-width, initial-scale=1.0">

<title>{escape(title)} – Bal Vikas Senior Secondary School</title>

<meta name="description"
      content="{escape(DESCRIPTION)}">


<!-- =========================
     OPEN GRAPH
     ========================= -->

<meta property="og:type"
      content="website">

<meta property="og:title"
      content="{escape(title)}">

<meta property="og:description"
      content="{escape(DESCRIPTION)}">

<meta property="og:url"
      content="{share_url}">

<meta property="og:image"
      content="{image_url}">

<meta property="og:image:secure_url"
      content="{image_url}">

<meta property="og:image:type"
      content="image/jpeg">

<meta property="og:image:width"
      content="1200">

<meta property="og:image:height"
      content="630">

<meta property="og:site_name"
      content="Bal Vikas Senior Secondary School">


<!-- =========================
     TWITTER / X
     ========================= -->

<meta name="twitter:card"
      content="summary_large_image">

<meta name="twitter:title"
      content="{escape(title)}">

<meta name="twitter:description"
      content="{escape(DESCRIPTION)}">

<meta name="twitter:image"
      content="{image_url}">


<style>

* {{
    box-sizing: border-box;
}}

body {{
    margin: 0;
    min-height: 100vh;

    display: flex;
    justify-content: center;
    align-items: center;

    background: #f4f6f9;

    font-family:
        Arial,
        Helvetica,
        sans-serif;
}}

.container {{
    width: min(900px, 94%);

    background: white;

    padding: 20px;

    border-radius: 18px;

    box-shadow:
        0 10px 40px rgba(0,0,0,.12);

    text-align: center;
}}

.photo {{
    width: 100%;
    max-height: 75vh;

    object-fit: contain;

    border-radius: 12px;

    display: block;
}}

h1 {{
    margin: 20px 0 8px;

    font-size: 24px;

    color: #172033;
}}

p {{
    margin: 0 0 20px;

    color: #667085;

    line-height: 1.6;
}}

.button {{
    display: inline-block;

    padding: 12px 22px;

    background: #123b67;

    color: white;

    text-decoration: none;

    border-radius: 8px;

    font-weight: 600;
}}

</style>

</head>

<body>

<div class="container">

    <img
        class="photo"
        src="{image_url}"
        alt="{escape(title)}"
    >

    <h1>
        {escape(title)}
    </h1>

    <p>
        Bal Vikas Senior Secondary School<br>
        Nayla, Jaipur
    </p>

    <a
        class="button"
        href="{SITE_URL}/gallery.html"
    >
        View Gallery
    </a>

</div>

</body>

</html>
"""

    output_file = OUTPUT_FOLDER / share_filename

    output_file.write_text(
        html,
        encoding="utf-8"
    )

    print(f"Created: {output_file}")


print()
print("======================================")
print("SHARE PAGES GENERATED SUCCESSFULLY")
print("======================================")
print(f"Total pages created: {len(photos)}")