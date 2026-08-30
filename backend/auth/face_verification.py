import cv2
import os
import numpy as np


FACE_DIR = os.path.join(
    os.path.dirname(__file__),
    "faces"
)

FACE_FILE = os.path.join(
    FACE_DIR,
    "authorized_face.npy"
)


def ensure_face_directory():
    os.makedirs(FACE_DIR, exist_ok=True)


def get_face_detector():

    return cv2.CascadeClassifier(
        cv2.data.haarcascades +
        "haarcascade_frontalface_default.xml"
    )


def detect_face(image):

    gray = cv2.cvtColor(
        image,
        cv2.COLOR_BGR2GRAY
    )

    cascade = get_face_detector()

    faces = cascade.detectMultiScale(
        gray,
        scaleFactor=1.1,
        minNeighbors=5,
        minSize=(100, 100)
    )

    if len(faces) == 0:
        return None

    # Select largest face
    x, y, w, h = max(
        faces,
        key=lambda f: f[2] * f[3]
    )

    face = gray[y:y + h, x:x + w]

    face = cv2.resize(
        face,
        (200, 200)
    )

    # Normalize lighting
    face = cv2.equalizeHist(face)

    return face


def capture_authorized_face():

    ensure_face_directory()

    camera = cv2.VideoCapture(0)

    if not camera.isOpened():

        raise RuntimeError(
            "Unable to access the camera."
        )

    print()
    print("=" * 60)
    print("FACE ENROLLMENT")
    print("=" * 60)
    print("Look directly at the camera.")
    print("Press SPACE to capture.")
    print("Press ESC to cancel.")
    print("=" * 60)

    captured_face = None

    while True:

        success, frame = camera.read()

        if not success:
            continue

        face = detect_face(frame)

        display_frame = frame.copy()

        if face is not None:

            cv2.putText(
                display_frame,
                "FACE DETECTED - PRESS SPACE",
                (20, 40),
                cv2.FONT_HERSHEY_SIMPLEX,
                0.8,
                (0, 255, 0),
                2
            )

        else:

            cv2.putText(
                display_frame,
                "NO FACE DETECTED",
                (20, 40),
                cv2.FONT_HERSHEY_SIMPLEX,
                0.8,
                (0, 0, 255),
                2
            )

        cv2.imshow(
            "AI Defence - Face Enrollment",
            display_frame
        )

        key = cv2.waitKey(1) & 0xFF

        if key == 32 and face is not None:

            captured_face = face
            break

        if key == 27:
            break

    camera.release()
    cv2.destroyAllWindows()

    if captured_face is None:
        return False

    np.save(
        FACE_FILE,
        captured_face
    )

    print()
    print("Authorized face enrolled successfully.")
    print(f"Saved to: {FACE_FILE}")

    return True


def calculate_similarity(face1, face2):

    face1 = face1.astype(np.float32)
    face2 = face2.astype(np.float32)

    # Normalize both faces
    face1 = cv2.normalize(
        face1,
        None,
        0,
        255,
        cv2.NORM_MINMAX
    )

    face2 = cv2.normalize(
        face2,
        None,
        0,
        255,
        cv2.NORM_MINMAX
    )

    difference = np.mean(
        np.abs(face1 - face2)
    )

    # Convert difference into similarity
    similarity = max(
        0.0,
        100.0 - difference
    )

    return similarity


def verify_face():

    if not os.path.exists(FACE_FILE):

        return {
            "verified": False,
            "message": "No authorized face enrolled."
        }

    authorized_face = np.load(
        FACE_FILE
    )

    camera = cv2.VideoCapture(0)

    if not camera.isOpened():

        return {
            "verified": False,
            "message": "Unable to access camera."
        }

    print()
    print("=" * 60)
    print("FACE VERIFICATION")
    print("=" * 60)
    print("Look directly at the camera.")
    print("Press SPACE to verify.")
    print("Press ESC to cancel.")
    print("=" * 60)

    result = False
    similarity_score = 0.0

    while True:

        success, frame = camera.read()

        if not success:
            continue

        face = detect_face(frame)

        display_frame = frame.copy()

        if face is not None:

            cv2.putText(
                display_frame,
                "FACE DETECTED - PRESS SPACE",
                (20, 40),
                cv2.FONT_HERSHEY_SIMPLEX,
                0.8,
                (0, 255, 0),
                2
            )

        else:

            cv2.putText(
                display_frame,
                "NO FACE DETECTED",
                (20, 40),
                cv2.FONT_HERSHEY_SIMPLEX,
                0.8,
                (0, 0, 255),
                2
            )

        cv2.imshow(
            "AI Defence - Face Verification",
            display_frame
        )

        key = cv2.waitKey(1) & 0xFF

        if key == 32 and face is not None:

            similarity_score = calculate_similarity(
                authorized_face,
                face
            )

            print(
                f"Face similarity: "
                f"{similarity_score:.2f}%"
            )

            # Prototype threshold
            if similarity_score >= 65:

                result = True

            break

        if key == 27:
            break

    camera.release()
    cv2.destroyAllWindows()

    if result:

        return {
            "verified": True,
            "similarity": round(
                similarity_score,
                2
            ),
            "message": "Face verified successfully."
        }

    return {
        "verified": False,
        "similarity": round(
            similarity_score,
            2
        ),
        "message": "Face verification failed."
    }