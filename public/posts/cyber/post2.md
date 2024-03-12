---
title: 'Be Fast | Mapna CTF 2024'
tags: 'Crypto'
author: Jackson Kohls
---

## Be fast

### Investigation

```py
#!/usr/bin/env python3

from random import *
from binascii import *
from Crypto.Cipher import DES
from signal import *
import sys, os
from flag import flag

def die(*args):
	pr(*args)
	quit()

def pr(*args):
	s = " ".join(map(str, args))
	sys.stdout.write(s + "\n")
	sys.stdout.flush()

def sc():
	return sys.stdin.buffer.readline()

def shift(msg, l):
	assert l < len(msg)
	return msg[l:] + msg[:l]

def pad(text):
	if len(text) % 8 != 0:
		text += (b'\xff' * (8 - len(text) % 8))
	return text

def encrypt(msg, key):
	msg = pad(msg)
	assert len(msg) % 8 == 0
	assert len(key) == 8
	des = DES.new(key, DES.MODE_ECB)
	enc = des.encrypt(msg)
	return enc

def main():
	border = "+"
	pr(border*72)
	pr(border, ".::        Hi all, you should be fast, I mean super fact!!       ::.", border)
	pr(border, "You should send twenty 8-byte keys to encrypt the secret message and", border)
	pr(border, "just decrypt the ciphertext to get the flag, Are you ready to start?", border)
	pr(border*72)

	secret_msg = b'TOP_SECRET:' + os.urandom(40)
	
	cnt, STEP, KEYS = 0, 14, []
	md = 1

	while True:
		pr(border, "please send your key as hex: ")
		alarm(md + 1)
		ans = sc().decode().strip()
		alarm(0)
		try:
			key = unhexlify(ans)
			if len(key) == 8 and key not in KEYS:
				KEYS += [key]
				cnt += 1
			else:
				die(border, 'Kidding me!? Bye!!')
		except:
			die(border, 'Your key is not valid! Bye!!')
		if len(KEYS) == STEP:
			print(KEYS)
			HKEY = KEYS[:7]
			shuffle(HKEY)
			NKEY = KEYS[-7:]
			shuffle(NKEY)
			for h in HKEY: NKEY = [key, shift(key, 1)] + NKEY
			enc = encrypt(secret_msg, NKEY[0])
			for key in NKEY[1:]:
				enc = encrypt(enc, key)
			pr(border, f'enc = {hexlify(enc)}')
			pr(border, f'Can you guess the secret message? ')
			alarm(md + 1)
			msg = sc().strip()
			alarm(0)
			if msg == hexlify(secret_msg):
				die(border, f'Congrats, you deserve the flag: {flag}')
			else:
				die(border, f'Sorry, your input is incorrect! Bye!!')

if __name__ == '__main__':
	main()
```

We're given this code base as our challenge- after some initial inspection, we can see a few things:

- 14 keys: We give them 14 keys to encrypt with. They copy, shuffle, add and reuse keys we give them. Ordering is important for encryption, so this is problematic.
- DES encryption: The encryption being used is DES, a fairly old symmetric key encryption- we're giving 64 bit keys.
- No repeats: We can't repeat any keys.
- Be fast: we only have a second to respond with the plaintext.

We have a few first routes we can go: Being really fast, or figuring out DES. Going with the second, and with little research, we can see a funny result: DES uses only 56 bit keys! The last bit of every byte is a checksum digit, and not actually used! 

After a little bit of experimentation, we discover that encrypting with two keys that are `0x010..` and `0x000..` is effectively nothing. With these keys- 0's everywhere except the checksum digits- DES encryption is it's own inverse. 

### Solving

Thus, we generate these keys, submit them, and send back it's own ciphertext!
```py
import os
os.environ['PWNLIB_NOTERM'] = 'True'
from pwn import *
from binascii import *
from Crypto.Cipher import DES

keys = []

for i in range(7):
    new_key = "00"
    for j in range(i):
        new_key += "00"
    new_key += "01"
    for j in range(7 - (i+1)):
        new_key += "00"
    keys.append(new_key)
for i in range(7):
    new_key = "01"
    for j in range(i):
        new_key += "00"
    new_key += "01"
    for j in range(7 - (i+1)):
        new_key += "00"
    keys.append(new_key)
keys = keys[:13]
keys.append("0000000000000000")

print(keys)
conn = remote('3.75.180.117', 37773) 

for i in range(14):
    conn.sendlineafter("please send your key as hex: ".encode(), keys[i].encode())

```

and send back it's own ciphertext!

```py
_ = conn.recvline().decode()
_ = conn.recvline().decode()
line_with_the_enc = conn.recvline().decode()
print("line1: ", line_with_the_enc)
lwte = line_with_the_enc.split(" ")[-1].strip()[2:-1]
print("lwte:", lwte)
pt = bytes.fromhex(lwte)
print(pt)
print(len(pt))
print(hexlify(pt))
conn.sendlineafter("Can you guess the secret message? ".encode(), hexlify(pt))

conn.interactive()
```
And, it doesn't work. Some further investigation, we encouter the the obvious- it encrypts the message an odd number of times, not even. We need to encrypt/decrypt the text given and give back the plaintext.

```py
_ = conn.recvline().decode()
_ = conn.recvline().decode()
line_with_the_enc = conn.recvline().decode()
print("line1: ", line_with_the_enc)
lwte = line_with_the_enc.split(" ")[-1].strip()[2:-1]
print("lwte:", lwte)
ct = bytes.fromhex(lwte)
des = DES.new(unhexlify("0000000000000000"), DES.MODE_ECB)
pt = des.encrypt(ct)
pt = pt[:-5]
print(pt)
print(len(pt))
print(hexlify(pt))
conn.sendlineafter("Can you guess the secret message? ".encode(), hexlify(pt))

conn.interactive()
```

Thus, we get back the key- which informs us about what we discovered: DES weak keys.

