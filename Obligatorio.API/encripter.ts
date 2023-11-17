import * as crypto from 'crypto';

const algorithm = 'aes-256-cbc';
const key = 'your-secret-key';
const iv = crypto.randomBytes(16); // Initialization vector, debe ser único y no secreto

export function encrypt(text: string): string {
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
  let encrypted = cipher.update(text, 'utf-8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

/* function decrypt(encryptedText: string): string {
  const decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
  let decrypted = decipher.update(encryptedText, 'hex', 'utf-8');
  decrypted += decipher.final('utf-8');
  return decrypted;
} */

// Ejemplo de uso
const plaintext = 'Hola, este es un mensaje secreto.';
const encryptedText = encrypt(plaintext);
console.log('Texto cifrado:', encryptedText);
/* 
const decryptedText = decrypt(encryptedText);
console.log('Texto descifrado:', decryptedText); */
