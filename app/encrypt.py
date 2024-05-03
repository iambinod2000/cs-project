
import hashlib
import os

def encrypt_password(password):
    """
    Encrypts the given password using SHA-256 hash function.
    Returns the hashed password.
    """
    salt = os.urandom(16)
    password_hash = hashlib.pbkdf2_hmac('sha256', password.encode('utf-8'), salt, 100000)
    return salt.hex() + password_hash.hex()

def verify_password(password, password_hash):
    """
    Verifies if the given password matches the hashed password.
    """
    salt = bytes.fromhex(password_hash[:32])
    stored_password_hash = bytes.fromhex(password_hash[32:])
    password_hash_to_check = hashlib.pbkdf2_hmac('sha256', password.encode('utf-8'), salt, 100000)
    return stored_password_hash == password_hash_to_check
