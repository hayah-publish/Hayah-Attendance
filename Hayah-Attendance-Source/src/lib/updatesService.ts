import crypto from "crypto";

export interface UpdateItem {
  id: string;
  title: string;
  description: string;
  image_url: string;
  publish_time: string;
}

const FIREBASE_RTDB_URL = "https://hayah-att-default-rtdb.firebaseio.com/updates.json";
const ENCRYPTION_KEY = "com.hayah.att";

/**
 * Decrypts AES/CBC/PKCS7Padding ciphertext encrypted with SHA-256 derived key and zero IV.
 * Mirrors the Android AESCrypt implementation. Falls back gracefully to original text if not encrypted.
 */
export function decryptAES(cipherTextBase64: string, keyPhrase = ENCRYPTION_KEY): string {
  if (!cipherTextBase64 || typeof cipherTextBase64 !== "string") return "";
  try {
    const buf = Buffer.from(cipherTextBase64, "base64");
    // AES block size is 16 bytes. If decoded length is not multiple of 16, it is plaintext.
    if (buf.length === 0 || buf.length % 16 !== 0) return cipherTextBase64;

    const key = crypto.createHash("sha256").update(keyPhrase, "utf8").digest();
    const iv = Buffer.alloc(16, 0); // 16 zero bytes
    const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
    decipher.setAutoPadding(true);
    let decrypted = decipher.update(cipherTextBase64, "base64", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted.trim();
  } catch {
    // If decryption fails, safely fallback to the input string (already plain text)
    return cipherTextBase64;
  }
}

/**
 * Encrypts plain text using AES/CBC/PKCS7Padding with SHA-256 derived key and zero IV.
 * Mirrors the Android AESCrypt implementation.
 */
export function encryptAES(plainText: string, keyPhrase = ENCRYPTION_KEY): string {
  if (!plainText || typeof plainText !== "string") return "";
  try {
    const key = crypto.createHash("sha256").update(keyPhrase, "utf8").digest();
    const iv = Buffer.alloc(16, 0); // 16 zero bytes
    const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
    cipher.setAutoPadding(true);
    let encrypted = cipher.update(plainText, "utf8", "base64");
    encrypted += cipher.final("base64");
    return encrypted;
  } catch (err) {
    console.error("AES Encryption error for plainText:", plainText, err);
    return plainText;
  }
}


// Fallback mock items in case of network unavailability
export const FALLBACK_UPDATES: UpdateItem[] = [
  {
    id: "0",
    title: "تجاوزنا 1 مليون مشاهدة",
    description: "حققت قناة الحلقات هذا الشهر أكثر من مليون مشاهدة.",
    image_url: "https://i.ibb.co/JWbR5zrh/ic-test.png",
    publish_time: "الاثنين، 17 سبتمبر",
  },
  {
    id: "1",
    title: "مبروووك تجاوزنا 2 مليون مشترك",
    description: "حققت القناة 1 مليون مشترك في 9 شهور ووصلنا أكتر من 2 مليون مشترك",
    image_url: "",
    publish_time: "الأربعاء، 30 سبتمبر",
  },
];

/**
 * Fetches updates from Firebase Realtime Database and decrypts all encrypted fields.
 */
export async function fetchAndDecryptUpdates(): Promise<UpdateItem[]> {
  try {
    const response = await fetch(FIREBASE_RTDB_URL, {
      cache: "no-store", // ensure fresh updates
    });

    if (!response.ok) {
      console.warn("Firebase RTDB returned status:", response.status);
      return FALLBACK_UPDATES;
    }

    const rawData = await response.json();
    if (!rawData) return [];

    const itemsArray = Array.isArray(rawData) ? rawData : Object.values(rawData);
    const decryptedList = itemsArray
      .filter((item) => item && typeof item === "object")
      .map((item: any, index: number) => {
        const title = decryptAES(item.title) || item.title || "";
        const description = decryptAES(item.description) || item.description || "";
        const image_url = decryptAES(item.image_url) || item.image_url || "";
        const publish_time = decryptAES(item.publish_time) || item.publish_time || "";

        return {
          id: String(item.id ?? index),
          title,
          description,
          image_url,
          publish_time,
        };
      });

    // Return reversed array so newest items in Firebase are displayed first
    return decryptedList.length > 0 ? decryptedList.reverse() : [...FALLBACK_UPDATES].reverse();
  } catch (error) {
    console.error("Error fetching or decrypting updates from Firebase:", error);
    return [...FALLBACK_UPDATES].reverse();
  }
}
