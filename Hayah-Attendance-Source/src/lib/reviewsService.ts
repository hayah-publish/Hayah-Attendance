import { fetchAndDecryptUser } from "./userService";
import { RequestTask } from "./tasksService";
import { decryptAES } from "./updatesService";

export interface ReviewTask extends RequestTask {}

const FIREBASE_REVIEWS_URL = "https://hayah-att-default-rtdb.firebaseio.com/requests/reviews.json";

export const FALLBACK_REVIEWS: ReviewTask[] = [
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
  {
    code: "h-03",
    info: "مراجعة جودة الفيديو والاستماع لصوت المعلق الصوتي والتأكد من مخرجات الحروف",
    priority: "high",
    publish_date: "الثلاثاء, 6 أكتوبر 2026",
    publish_time: "11:03 AM",
    send_to: "mo991999",
    sent_from: "razki03",
    status: "not started",
    title: "مراجعة فيديو واسكريبت العمالقة ",
    sender_name: "Rahma Ahmed",
    sender_first_name: "Rahma",
    sender_last_name: "Ahmed",
    sender_job: "Ui/Ux",
    sender_avatar: "R",
  },
];

/**
 * Fetches all review tasks from Firebase Realtime Database under requests/reviews.json,
 * decrypts encrypted fields, and enriches them with sender name and job fetched from the users node.
 */
export async function fetchAllReviews(): Promise<ReviewTask[]> {
  try {
    const res = await fetch(FIREBASE_REVIEWS_URL, {
      cache: "no-store",
    });

    let rawReviews: ReviewTask[] = [];
    if (!res.ok) {
      rawReviews = FALLBACK_REVIEWS;
    } else {
      const data = await res.json();
      if (!data) {
        rawReviews = FALLBACK_REVIEWS;
      } else if (Array.isArray(data)) {
        rawReviews = data.filter(Boolean);
      } else if (typeof data === "object") {
        rawReviews = Object.values(data);
      }
    }

    if (rawReviews.length === 0) {
      rawReviews = FALLBACK_REVIEWS;
    }

    // Decrypt all fields of each review (fallback handles already plain text gracefully)
    const decryptedReviews: ReviewTask[] = rawReviews.map((review) => {
      if (!review || typeof review !== "object") return review;
      return {
        ...review,
        code: decryptAES(review.code) || review.code || "",
        info: decryptAES(review.info) || review.info || "",
        priority: (decryptAES(review.priority) || review.priority || "low") as any,
        publish_date: decryptAES(review.publish_date) || review.publish_date || "",
        publish_time: decryptAES(review.publish_time) || review.publish_time || "",
        send_to: decryptAES(review.send_to) || review.send_to || "",
        sent_from: decryptAES(review.sent_from) || review.sent_from || "",
        status: (decryptAES(review.status) || review.status || "not started") as any,
        title: decryptAES(review.title) || review.title || "",
      };
    });

    const senderCache = new Map<string, {
      name: string;
      firstName: string;
      lastName: string;
      job: string;
      avatar: string;
    }>();

    const enrichedReviews = await Promise.all(
      decryptedReviews.map(async (review) => {
        if (!review || typeof review !== "object") return review;
        const senderId = review.sent_from;
        if (!senderId) return review;


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
          ...review,
          sender_name: senderInfo?.name || review.sender_name || senderId,
          sender_first_name: senderInfo?.firstName || review.sender_first_name || senderId,
          sender_last_name: senderInfo?.lastName || review.sender_last_name || "",
          sender_job: senderInfo?.job ?? review.sender_job ?? "",
          sender_avatar: senderInfo?.avatar || review.sender_avatar || senderId[0]?.toUpperCase() || "U",
        };
      })
    );

    return enrichedReviews;
  } catch (err) {
    console.warn("Could not fetch reviews from Firebase, using fallback:", err);
    return FALLBACK_REVIEWS;
  }
}

/**
 * Fetches review tasks assigned to a specific user ID checking the send_to key.
 */
export async function fetchUserReviews(userId: string = "mo991999"): Promise<ReviewTask[]> {
  const allReviews = await fetchAllReviews();
  return allReviews.filter(
    (review) => review && typeof review === "object" && review.send_to === userId
  );
}
