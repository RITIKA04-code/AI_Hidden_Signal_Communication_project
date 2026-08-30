from face_verification import capture_authorized_face


if __name__ == "__main__":

    success = capture_authorized_face()

    if success:
        print("Enrollment complete.")
    else:
        print("Enrollment cancelled.")