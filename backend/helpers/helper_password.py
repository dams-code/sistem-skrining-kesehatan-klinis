from pwdlib import PasswordHash

set_hash = PasswordHash.recommended()

def verify_password(password: str, hashed_pasword: str) -> bool:
    return set_hash.verify(password, hashed_pasword)

def get_password_hash(password: str) -> str:
    return set_hash.hash(password)