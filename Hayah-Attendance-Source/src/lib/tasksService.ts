import { fetchAndDecryptUser } from "./userService";
import { decryptAES } from "./updatesService";

export interface RequestTask {
  code: string;
  info: string;
  priority: "low" | "medium" | "high" | string;
  publish_date: string;
  publish_time: string;
  send_to: string;
  sent_from: string;
  status: "In progress" | "not started" | "completed" | string;
  title: string;
  sender_name?: string;
  sender_first_name?: string;
  sender_last_name?: string;
  sender_job?: string;
  sender_avatar?: string;
}

const FIREBASE_TASKS_URL = "https://hayah-att-default-rtdb.firebaseio.com/requests/tasks.json";

// Fallback tasks matching user mo991999 with sender details
export const FALLBACK_TASKS: RequestTask[] = [
  {
    code: "h-01",
    info: "اكتب اهم التفاصيل عن الأحداث اللي حصلت اثناء وصول القافلة لجزيرة الدجال وأهم الحوارات اللي تمت مع الجساسة والدجال",
    priority: "high",
    publish_date: "الثلاثاء, 6 أكتوبر 2026",
    publish_time: "10:03 AM",
    send_to: "mo991999",
    sent_from: "razki03",
    status: "not started",
    title: "كتابة موضوع عن قافلة تميم الداري والمسيخ الدجال",
    sender_name: "Rahma Ahmed",
    sender_first_name: "Rahma",
    sender_last_name: "Ahmed",
    sender_job: "Ui/Ux",
    sender_avatar: "R",
  },
  {
    code: "h-02",
    info: "مومجود اخطاء املائية كتير في الاسكريبت وعاوز تصحيح ومراجعة كامل للأسكريبت ده",
    priority: "low",
    publish_date: "الخميس, 8 أكتوبر 2026",
    publish_time: "11:45 AM",
    send_to: "mo991999",
    sent_from: "ag-hayah",
    status: "In progress",
    title: "تصحيح سكريبت أدولف هيتلر",
    sender_name: "Ahmed Galal",
    sender_first_name: "Ahmed",
    sender_last_name: "Galal",
    sender_job: "CEO",
    sender_avatar: "A",
  },
];

/**
 * Fetches all tasks from Firebase Realtime Database under requests/tasks,
 * decrypts encrypted fields, and enriches them with sender name and job from users node.
 */
export async function fetchAllTasks(): Promise<RequestTask[]> {
  try {
    const res = await fetch(FIREBASE_TASKS_URL, {
      cache: "no-store",
    });

    let rawTasks: RequestTask[] = [];
    if (!res.ok) {
      rawTasks = FALLBACK_TASKS;
    } else {
      const data = await res.json();
      if (!data) {
        rawTasks = FALLBACK_TASKS;
      } else if (Array.isArray(data)) {
        rawTasks = data.filter(Boolean);
      } else if (typeof data === "object") {
        rawTasks = Object.values(data);
      }
    }

    if (rawTasks.length === 0) {
      rawTasks = FALLBACK_TASKS;
    }

    // Decrypt all fields of each task (fallback handles already plain text gracefully)
    const decryptedTasks: RequestTask[] = rawTasks.map((task) => {
      if (!task || typeof task !== "object") return task;
      return {
        ...task,
        code: decryptAES(task.code) || task.code || "",
        info: decryptAES(task.info) || task.info || "",
        priority: (decryptAES(task.priority) || task.priority || "low") as any,
        publish_date: decryptAES(task.publish_date) || task.publish_date || "",
        publish_time: decryptAES(task.publish_time) || task.publish_time || "",
        send_to: decryptAES(task.send_to) || task.send_to || "",
        sent_from: decryptAES(task.sent_from) || task.sent_from || "",
        status: (decryptAES(task.status) || task.status || "not started") as any,
        title: decryptAES(task.title) || task.title || "",
      };
    });

    // Cache of fetched sender profiles to avoid duplicate network requests
    const senderCache = new Map<string, {
      name: string;
      firstName: string;
      lastName: string;
      job: string;
      avatar: string;
    }>();

    // Enrich each task with sender user data (Name + Job) from users node
    const enrichedTasks = await Promise.all(
      decryptedTasks.map(async (task) => {
        if (!task || typeof task !== "object") return task;
        const senderId = task.sent_from;
        if (!senderId) return task;


        let senderInfo = senderCache.get(senderId);
        if (!senderInfo) {
          try {
            const user = await fetchAndDecryptUser(senderId);
            if (user) {
              senderInfo = {
                name: user.fullName || user.firstName || senderId,
                firstName: user.firstName || senderId,
                lastName: user.lastName || "",
                job: user.job || "",
                avatar: user.avatarLetter || senderId[0]?.toUpperCase() || "U",
              };
              senderCache.set(senderId, senderInfo);
            }
          } catch (e) {
            console.warn(`Could not load user data for sender ${senderId}:`, e);
          }
        }

        return {
          ...task,
          sender_name: senderInfo?.name || task.sender_name || senderId,
          sender_first_name: senderInfo?.firstName || task.sender_first_name || senderId,
          sender_last_name: senderInfo?.lastName || task.sender_last_name || "",
          sender_job: senderInfo?.job ?? task.sender_job ?? "",
          sender_avatar: senderInfo?.avatar || task.sender_avatar || senderId[0]?.toUpperCase() || "U",
        };
      })
    );

    return enrichedTasks;
  } catch (err) {
    console.warn("Could not fetch tasks from Firebase, using fallback:", err);
    return FALLBACK_TASKS;
  }
}

/**
 * Fetches tasks assigned to a specific user ID checking the send_to key.
 */
export async function fetchUserTasks(userId: string = "mo991999"): Promise<RequestTask[]> {
  const allTasks = await fetchAllTasks();
  return allTasks.filter(
    (task) => task && typeof task === "object" && task.send_to === userId
  );
}

const FIREBASE_COMPLETED_URL = "https://hayah-att-default-rtdb.firebaseio.com/requests/completed.json";

/**
 * Fetches all completed tasks from Firebase Realtime Database under requests/completed,
 * decrypts encrypted fields, and enriches them with sender name and job from users node.
 */
export async function fetchAllCompleted(): Promise<RequestTask[]> {
  try {
    const res = await fetch(FIREBASE_COMPLETED_URL, {
      cache: "no-store",
    });

    let rawCompleted: RequestTask[] = [];
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data)) {
        rawCompleted = data.filter(Boolean);
      } else if (typeof data === "object" && data) {
        rawCompleted = Object.values(data);
      }
    }

    const decryptedCompleted: RequestTask[] = rawCompleted.map((task) => {
      if (!task || typeof task !== "object") return task;
      return {
        ...task,
        code: decryptAES(task.code) || task.code || "",
        info: decryptAES(task.info) || task.info || "",
        priority: (decryptAES(task.priority) || task.priority || "low") as any,
        publish_date: decryptAES(task.publish_date) || task.publish_date || "",
        publish_time: decryptAES(task.publish_time) || task.publish_time || "",
        send_to: decryptAES(task.send_to) || task.send_to || "",
        sent_from: decryptAES(task.sent_from) || task.sent_from || "",
        status: (decryptAES(task.status) || task.status || "completed") as any,
        title: decryptAES(task.title) || task.title || "",
      };
    });

    const senderCache = new Map<string, {
      name: string;
      firstName: string;
      lastName: string;
      job: string;
      avatar: string;
    }>();

    const enrichedCompleted = await Promise.all(
      decryptedCompleted.map(async (task) => {
        if (!task || typeof task !== "object") return task;
        const senderId = task.sent_from;
        if (!senderId) return task;

        let senderInfo = senderCache.get(senderId);
        if (!senderInfo) {
          try {
            const user = await fetchAndDecryptUser(senderId);
            if (user) {
              senderInfo = {
                name: user.fullName || user.firstName || senderId,
                firstName: user.firstName || senderId,
                lastName: user.lastName || "",
                job: user.job || "",
                avatar: user.avatarLetter || senderId[0]?.toUpperCase() || "U",
              };
              senderCache.set(senderId, senderInfo);
            }
          } catch (e) {
            console.warn(`Could not load user data for sender ${senderId}:`, e);
          }
        }

        return {
          ...task,
          sender_name: senderInfo?.name || task.sender_name || senderId,
          sender_first_name: senderInfo?.firstName || task.sender_first_name || senderId,
          sender_last_name: senderInfo?.lastName || task.sender_last_name || "",
          sender_job: senderInfo?.job ?? task.sender_job ?? "",
          sender_avatar: senderInfo?.avatar || task.sender_avatar || senderId[0]?.toUpperCase() || "U",
        };
      })
    );

    return enrichedCompleted;
  } catch (err) {
    console.warn("Could not fetch completed tasks from Firebase:", err);
    return [];
  }
}

/**
 * Fetches completed tasks assigned to a specific user ID checking the send_to key.
 */
export async function fetchUserCompleted(userId: string = "mo991999"): Promise<RequestTask[]> {
  const allCompleted = await fetchAllCompleted();
  return allCompleted.filter(
    (task) => task && typeof task === "object" && task.send_to === userId
  );
}

