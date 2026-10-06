import { decryptAES } from "./updatesService";
import { getTodayShortDateString } from "./dateUtils";

export interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  greetingName: string;
  email: string;
  phone: string;
  job: string;
  section: string;
  appointmentDate: string;
  lastUpdated: string;
  address: string;
  city: string;
  birthday: string;
  age: string;
  maritalStatus: string;
  workSystem: string;
  avatarLetter: string;
}

const FIREBASE_USERS_URL = "https://hayah-att-default-rtdb.firebaseio.com/users";

// Default decrypted data for user mo991999 from Firebase (exact raw data without translation)
export const DEFAULT_USER: UserData = {
  id: "mo991999",
  firstName: "Mohamed",
  lastName: "Amin",
  fullName: "Mohamed Amin",
  greetingName: "أهلاً، Mohamed",
  email: "mohamedamieen2000@gmail.com",
  phone: "+201271901193",
  job: "Dev/Backend",
  section: "Development",
  appointmentDate: "27 سبتمبر 2026",
  lastUpdated: getTodayShortDateString(),
  address: "حي المستشفي المركزي",
  city: "Awlad-Saqr",
  birthday: "9/9/1999",
  age: "27",
  maritalStatus: "متزوج",
  workSystem: "في مقر العمل",
  avatarLetter: "M",
};

/**
 * Fetches and decrypts user data from Firebase Realtime Database for given userId.
 */
export async function fetchAndDecryptUser(userId = "mo991999"): Promise<UserData> {
  try {
    const res = await fetch(`${FIREBASE_USERS_URL}/${userId}.json`, {
      cache: "no-store",
    });

    if (!res.ok) {
      return DEFAULT_USER;
    }

    const raw = await res.json();
    if (!raw || typeof raw !== "object") {
      return DEFAULT_USER;
    }

    const rawFirstName = raw.first_name ? decryptAES(raw.first_name) : "";
    const rawLastName = raw.last_name ? decryptAES(raw.last_name) : "";
    const email = raw.email ? decryptAES(raw.email) : DEFAULT_USER.email;
    const phone = raw.phone ? decryptAES(raw.phone) : DEFAULT_USER.phone;
    const appointmentDate = raw.appointment_date ? decryptAES(raw.appointment_date) : DEFAULT_USER.appointmentDate;
    const job = raw.job ? decryptAES(raw.job) : DEFAULT_USER.job;
    const section = raw.section ? decryptAES(raw.section) : DEFAULT_USER.section;
    const address = raw.address ? decryptAES(raw.address) : DEFAULT_USER.address;
    const city = raw.city ? decryptAES(raw.city) : DEFAULT_USER.city;
    const birthday = raw.birthday ? decryptAES(raw.birthday) : DEFAULT_USER.birthday;
    const age = raw.age ? decryptAES(raw.age) : DEFAULT_USER.age;
    const maritalStatus = raw.marital_status ? decryptAES(raw.marital_status) : DEFAULT_USER.maritalStatus;
    const workSystem = raw.work_system ? decryptAES(raw.work_system) : DEFAULT_USER.workSystem;

    const isDefaultUser = userId === "mo991999";
    const firstName = rawFirstName || (isDefaultUser ? "Mohamed" : userId);
    const lastName = rawLastName || (isDefaultUser ? "Amin" : "");
    const fullName = `${firstName} ${lastName}`.trim() || firstName || userId;
    const greetingName = `أهلاً، ${firstName}`;
    const avatarLetter = firstName ? firstName[0].toUpperCase() : (userId[0]?.toUpperCase() || "U");
    const lastUpdated = getTodayShortDateString();

    return {
      id: raw.id || userId,
      firstName,
      lastName,
      fullName,
      greetingName,
      email: email || (isDefaultUser ? DEFAULT_USER.email : ""),
      phone: phone || (isDefaultUser ? DEFAULT_USER.phone : ""),
      job: job || (isDefaultUser ? DEFAULT_USER.job : ""),
      section: section || (isDefaultUser ? DEFAULT_USER.section : ""),
      appointmentDate: appointmentDate || (isDefaultUser ? DEFAULT_USER.appointmentDate : ""),
      lastUpdated,
      address: address || (isDefaultUser ? DEFAULT_USER.address : ""),
      city: city || (isDefaultUser ? DEFAULT_USER.city : ""),
      birthday: birthday || (isDefaultUser ? DEFAULT_USER.birthday : ""),
      age: age || (isDefaultUser ? DEFAULT_USER.age : ""),
      maritalStatus: maritalStatus || (isDefaultUser ? DEFAULT_USER.maritalStatus : ""),
      workSystem: workSystem || (isDefaultUser ? DEFAULT_USER.workSystem : ""),
      avatarLetter,
    };
  } catch (err) {
    console.warn(`Could not fetch user ${userId} from Firebase, using default:`, err);
    if (userId !== "mo991999") {
      return {
        ...DEFAULT_USER,
        id: userId,
        firstName: userId,
        lastName: "",
        fullName: userId,
        greetingName: `أهلاً، ${userId}`,
        job: "",
        avatarLetter: userId[0]?.toUpperCase() || "U",
      };
    }
    return DEFAULT_USER;
  }
}
