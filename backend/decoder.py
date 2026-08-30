import base64


def decode_signal(encoded_message: str):
    """
    Extract and decode the hidden signal.
    """

    marker = "|| SIGNAL:"

    if marker not in encoded_message:
        return None

    encoded_signal = encoded_message.split(marker, 1)[1].strip()

    try:
        hidden_signal = base64.b64decode(
            encoded_signal
        ).decode("utf-8")

        return hidden_signal

    except Exception:
        return None


if __name__ == "__main__":
    encoded_message = (
        "The convoy will depart tomorrow morning. "
        "|| SIGNAL:TUlTU0lPTi1BTFBIQS0wNw=="
    )

    result = decode_signal(encoded_message)

    print("\nEncoded Message:")
    print(encoded_message)

    print("\nRecovered Hidden Signal:")
    print(result)