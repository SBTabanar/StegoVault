
export class CryptoEngine {
  private static ALGORITHM = 'AES-GCM';
  private static KEY_DERIVATION_ALGORITHM = 'PBKDF2';
  private static SALT_LENGTH = 16;
  private static IV_LENGTH = 12;
  private static ITERATIONS = 100000;

  static async deriveKey(password: string, salt: Uint8Array): Promise<CryptoKey> {
    const encoder = new TextEncoder();
    const passwordKey = await window.crypto.subtle.importKey(
      'raw',
      encoder.encode(password),
      this.KEY_DERIVATION_ALGORITHM,
      false,
      ['deriveKey']
    );

    return window.crypto.subtle.deriveKey(
      {
        name: this.KEY_DERIVATION_ALGORITHM,
        salt: salt as BufferSource,
        iterations: this.ITERATIONS,
        hash: 'SHA-256',
      },
      passwordKey,
      { name: 'AES-GCM', length: 256 },
      false,
      ['encrypt', 'decrypt']
    );
  }

  static async encryptFile(file: File, password: string): Promise<Blob> {
    const salt = window.crypto.getRandomValues(new Uint8Array(this.SALT_LENGTH));
    const iv = window.crypto.getRandomValues(new Uint8Array(this.IV_LENGTH));
    const key = await this.deriveKey(password, salt);
    const fileData = await file.arrayBuffer();

    const encryptedContent = await window.crypto.subtle.encrypt(
      {
        name: this.ALGORITHM,
        iv: iv,
      },
      key,
      fileData
    );

    // Combine Salt + IV + Encrypted Data
    return new Blob([salt, iv, encryptedContent], { type: 'application/octet-stream' });
  }

  static async decryptFile(file: File, password: string): Promise<Blob> {
    const fileData = await file.arrayBuffer();
    
    // Extract Salt and IV
    const salt = new Uint8Array(fileData.slice(0, this.SALT_LENGTH));
    const iv = new Uint8Array(fileData.slice(this.SALT_LENGTH, this.SALT_LENGTH + this.IV_LENGTH));
    const encryptedContent = fileData.slice(this.SALT_LENGTH + this.IV_LENGTH);

    const key = await this.deriveKey(password, salt);

    try {
      const decryptedContent = await window.crypto.subtle.decrypt(
        {
          name: this.ALGORITHM,
          iv: iv,
        },
        key,
        encryptedContent
      );
      
      return new Blob([decryptedContent]);
    } catch (e) {
      throw new Error('Decryption failed. Incorrect password or corrupted file.');
    }
  }
}
