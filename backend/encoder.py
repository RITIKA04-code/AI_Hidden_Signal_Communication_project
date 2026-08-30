import base64


def encode_signal(message: str, hidden_signal: str) -> str:
    """
    Encode a hidden signal into a message using Base64.
    
    This is our initial prototype layer.
    Later we will replace this with an AI-based
    hidden-signal mechanism.
    """

    encoded_signal = base64.b64encode(
        hidden_signal.encode("utf-8")
    ).decode("utf-8")

    return f"{message} || SIGNAL:{encoded_signal}"


if __name__ == "__main__":
    message = "The convoy will depart tomorrow morning."
    hidden_signal = "MISSION-ALPHA-07"

    result = encode_signal(message, hidden_signal)

    print("\nOriginal Message:")
    print(message)

    print("\nHidden Signal:")
    print(hidden_signal)

    print("\nEncoded Message:")
    print(result)