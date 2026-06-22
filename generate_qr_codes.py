"""
Spirit Data Solutions — Employee QR Code Generator
---------------------------------------------------
Reads all employees from Supabase and generates a QR code PNG for each one.

Requirements:
    pip install qrcode[pil] supabase python-dotenv

Usage:
    python generate_qr_codes.py

Output:
    ./qr_codes/<Employee_ID>_<Full_Name>.png
"""

import os
import re
import qrcode
from dotenv import load_dotenv
from supabase import create_client, Client

# ── Configuration ─────────────────────────────────────────────────────────────

load_dotenv()  # reads your existing .env file

SUPABASE_URL: str = os.environ["VITE_SUPABASE_URL"]
SUPABASE_ANON_KEY: str = os.environ["VITE_SUPABASE_ANON_KEY"]

# Change this to your live domain once deployed, e.g. "https://spiritdatasolutions.com"
BASE_URL: str = os.getenv("PUBLIC_BASE_URL", "http://localhost:5173")

OUTPUT_DIR: str = "qr_codes"

# ── Helpers ───────────────────────────────────────────────────────────────────

def build_verify_url(qr_token: str) -> str:
    """
    Returns the full, absolute public URL for an employee's verification page.
    Example: https://spiritdatasolutions.com/employees/abc123-uuid
    """
    token = qr_token.strip()
    return f"{BASE_URL.rstrip('/')}/employees/{token}"


def safe_filename(employee_id: str, full_name: str) -> str:
    """Sanitises a string so it can be used as a file name on any OS."""
    name = f"{employee_id}_{full_name}"
    return re.sub(r'[\\/*?:"<>|]', "_", name)


def generate_qr(url: str, filepath: str) -> None:
    """Creates a high-quality QR code PNG at the given filepath."""
    qr = qrcode.QRCode(
        version=None,           # auto-size
        error_correction=qrcode.constants.ERROR_CORRECT_H,  # 30% damage tolerance
        box_size=12,
        border=4,
    )
    qr.add_data(url)
    qr.make(fit=True)

    img = qr.make_image(fill_color="#07162C", back_color="white")
    img.save(filepath)

# ── Main ──────────────────────────────────────────────────────────────────────

def main() -> None:
    supabase: Client = create_client(SUPABASE_URL, SUPABASE_ANON_KEY)

    print("Fetching employees from Supabase …")
    response = supabase.table("EmployeesDetails").select(
        "Employee_ID, Full Name, qr_token"
    ).execute()

    employees = response.data
    if not employees:
        print("No employees found. Exiting.")
        return

    os.makedirs(OUTPUT_DIR, exist_ok=True)
    print(f"Generating {len(employees)} QR code(s) → ./{OUTPUT_DIR}/\n")

    for emp in employees:
        qr_token: str = emp.get("qr_token", "")
        emp_id: str   = emp.get("Employee_ID", "UNKNOWN")
        full_name: str = emp.get("Full Name", "Unknown")

        if not qr_token:
            print(f"  ⚠  Skipping {emp_id} — no qr_token set in database")
            continue

        url = build_verify_url(qr_token)
        filename = safe_filename(emp_id, full_name) + ".png"
        filepath = os.path.join(OUTPUT_DIR, filename)

        generate_qr(url, filepath)
        print(f"  ✓  {emp_id:12s}  {full_name:30s}  →  {url}")

    print(f"\nDone! QR codes saved to ./{OUTPUT_DIR}/")


if __name__ == "__main__":
    main()
