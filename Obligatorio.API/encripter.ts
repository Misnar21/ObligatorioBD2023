import * as crypto from 'crypto';

const secretKey = Buffer.from('0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef', 'hex')
const iv = Buffer.from('0123456789abcdef0123456789abcdef', 'hex');

export function encrypt(text: string): string {
  const algorithm = 'aes-256-cbc';

  // Asegúrate de que la longitud del IV sea la correcta para AES en modo CBC (16 bytes)
  if (iv.length !== 16) {
    throw new Error('Longitud incorrecta del vector de inicialización (IV). Longitud:' + iv.length);
  }

  const cipher = crypto.createCipheriv(algorithm, Buffer.from(secretKey), iv);
  let encrypted = cipher.update(text, 'utf-8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

/* function decrypt(encryptedText: string): string {
  const algorithm = 'aes-256-cbc';
  const decipher = crypto.createDecipheriv(algorithm, Buffer.from(secretKey), iv);
  let decrypted = decipher.update(encryptedText, 'hex', 'utf-8');
  decrypted += decipher.final('utf-8');
  return decrypted;
} */

// Ejemplo de uso

/* 
const decryptedText = decrypt(encryptedText);
console.log('Texto descifrado:', decryptedText); */
