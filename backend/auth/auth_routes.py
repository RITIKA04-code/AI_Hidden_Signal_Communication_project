from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from backend.auth.password_auth import hash_password, verify_password
from backend.auth.security import create_access_token
from backend.auth.face_verification import verify_face


router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


AUTHORIZED_USERNAME = "admin"

AUTHORIZED_PASSWORD_HASH = hash_password("Admin@123")


class LoginRequest(BaseModel):
    username: str
    password: str


@router.post("/login")
def login(request: LoginRequest):

    # -----------------------------
    # Username verification
    # -----------------------------

    if request.username.strip() != AUTHORIZED_USERNAME:
        raise HTTPException(
            status_code=401,
            detail="Invalid username or password."
        )

    # -----------------------------
    # Password verification
    # -----------------------------

    if not verify_password(
        request.password,
        AUTHORIZED_PASSWORD_HASH
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid username or password."
        )

    # -----------------------------
    # Face verification
    # -----------------------------

    face_result = verify_face()

    if not face_result["verified"]:
        raise HTTPException(
            status_code=403,
            detail="Face verification failed."
        )

    # -----------------------------
    # JWT token
    # -----------------------------

    token = create_access_token(
        {
            "sub": AUTHORIZED_USERNAME,
            "role": "ADMIN"
        }
    )

    return {
        "success": True,
        "message": "Authentication successful.",
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "username": AUTHORIZED_USERNAME,
            "role": "ADMIN"
        }
    }