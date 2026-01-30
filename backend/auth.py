from dotenv import load_dotenv
load_dotenv()



from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import httpx
import os

security = HTTPBearer()

SUPABASE_PROJECT_URL = os.getenv("SUPABASE_PROJECT_URL")
SUPABASE_ANON_KEY = os.getenv("SUPABASE_ANON_KEY")

async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
):
    token = credentials.credentials

    if not SUPABASE_PROJECT_URL or not SUPABASE_ANON_KEY:
        raise HTTPException(status_code=500, detail="Supabase env missing")

    async with httpx.AsyncClient() as client:
        res = await client.get(
            f"{SUPABASE_PROJECT_URL}/auth/v1/user",
            headers={
                "Authorization": f"Bearer {token}",
                "apikey": SUPABASE_ANON_KEY,
            },
        )

    if res.status_code != 200:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token",
        )

    user = res.json()
    return user["id"]  # ✅ SAFE user_id
