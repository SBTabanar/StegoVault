export class Steganography {
  // Encodes a secret message into an image file
  static async encode(image: File, message: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          if (!ctx) return reject('Canvas context not available');

          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);

          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const data = imageData.data;

          // Convert message to binary string + terminator
          let binaryMessage = '';
          for (let i = 0; i < message.length; i++) {
            let binaryChar = message.charCodeAt(i).toString(2);
            binaryMessage += '0'.repeat(8 - binaryChar.length) + binaryChar;
          }
          // Add null terminator (00000000) to signal end of message
          binaryMessage += '00000000';

          if (binaryMessage.length > data.length / 4) {
            return reject('Message is too long for this image.');
          }

          let dataIndex = 0;
          for (let i = 0; i < binaryMessage.length; i++) {
            // Get current pixel value
            let value = data[dataIndex];
            
            // Modify the Least Significant Bit (LSB)
            // If binary bit is 1, force LSB to 1. If 0, force LSB to 0.
            if (binaryMessage[i] === '1') {
              value |= 1; 
            } else {
              value &= ~1;
            }
            
            data[dataIndex] = value;
            
            // Move to next channel (skip alpha channel usually, but simple LSB uses all R,G,B)
            // We'll use R, G, B channels sequentially.
            dataIndex++;
            if ((dataIndex + 1) % 4 === 0) dataIndex++; // Skip Alpha channel to avoid visual artifacts
          }

          ctx.putImageData(imageData, 0, 0);
          resolve(canvas.toDataURL('image/png'));
        };
        img.src = event.target?.result as string;
      };
      reader.readAsDataURL(image);
    });
  }

  // Decodes a secret message from an image
  static async decode(image: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          if (!ctx) return reject('Canvas context not available');

          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);

          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const data = imageData.data;

          let binaryMessage = '';
          let currentByte = '';
          let message = '';

          // Read LSBs
          for (let i = 0; i < data.length; i++) {
            if ((i + 1) % 4 === 0) continue; // Skip Alpha

            // Extract LSB
            const bit = data[i] & 1;
            currentByte += bit;

            if (currentByte.length === 8) {
              if (currentByte === '00000000') {
                // Terminator found
                resolve(message);
                return;
              }
              
              const charCode = parseInt(currentByte, 2);
              // Filter out non-printable characters if necessary, but UTF-8 handles most
              message += String.fromCharCode(charCode);
              currentByte = '';
            }
          }
          
          resolve(message); // In case no terminator found (full read)
        };
        img.src = event.target?.result as string;
      };
      reader.readAsDataURL(image);
    });
  }
}
