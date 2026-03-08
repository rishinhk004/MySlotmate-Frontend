// ── Matches: hosts table ────────────────────────────────────────────────────

export type ApplicationStatus =
  | "draft"
  | "pending"
  | "under_review"
  | "approved"
  | "rejected";

export interface Host {
  id: string; // uuid
  user_id: string; // uuid → users.id
  account_id: string | null;
  first_name: string;
  last_name: string;
  phn_number: string | null;
  city: string | null;
  avatar_url: string | null;
  tagline: string | null;
  bio: string | null;
  application_status: ApplicationStatus;
  experience_desc: string | null;
  moods: string[]; // e.g. ["adventure","social","wellness"]
  description: string | null; // 300-char host description
  preferred_days: string[];
  group_size: number | null;
  government_id_url: string | null;
  submitted_at: string | null;
  approved_at: string | null;
  rejected_at: string | null;
  is_identity_verified: boolean;
  is_email_verified: boolean;
  is_phone_verified: boolean;
  is_super_host: boolean;
  is_community_champ: boolean;
  expertise_tags: string[]; // e.g. ["#Minimalism","#Wellness"]
  social_instagram: string | null;
  social_linkedin: string | null;
  social_website: string | null;
  avg_rating: number;
  total_reviews: number;
  created_at: string;
  updated_at: string;
}

// ── Matches: events table ───────────────────────────────────────────────────

export type EventMood = "adventure" | "social" | "wellness" | "creative" | "chill";
export type EventStatus = "draft" | "published" | "paused" | "cancelled" | "completed";
export type CancellationPolicy = "flexible" | "moderate" | "strict";

export interface Event {
  id: string;
  host_id: string;
  title: string;
  hook_line: string | null;
  mood: EventMood | null;
  description: string | null;
  cover_image_url: string | null;
  gallery_urls: string[];
  time: string; // ISO 8601
  end_time: string | null;
  is_online: boolean;
  location: string | null;
  location_lat: number | null;
  location_lng: number | null;
  duration_minutes: number | null;
  capacity: number;
  min_group_size: number | null;
  max_group_size: number | null;
  price_cents: number | null;
  is_free: boolean;
  is_recurring: boolean;
  recurrence_rule: string | null;
  cancellation_policy: CancellationPolicy | null;
  ai_suggestion: string | null;
  status: EventStatus;
  created_at: string;
  updated_at: string;
}

// ── Matches: reviews table ──────────────────────────────────────────────────

export interface Review {
  id: string;
  event_id: string;
  user_id: string;
  rating: number; // 1-5
  name: string | null; // reviewer display name
  description: string;
  photo_urls: string[];
  reply: string[];
  sentiment_score: number | null;
  created_at: string;
  updated_at: string;
}

// ── Matches: users table (for reviewer display) ─────────────────────────────

export interface User {
  id: string;
  auth_uid: string;
  name: string;
  phn_number: string | null;
  email: string;
  avatar_url: string | null;
  city: string | null;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
}

// ── Composite type used by the profile page ─────────────────────────────────

export interface HostPublicProfile {
  host: Host;
  gallery_urls: string[]; // aggregated from host's events
  total_events_hosted: number;
  total_people_met: number;
  reviews: (Review & { reviewer: Pick<User, "id" | "name" | "avatar_url"> })[];
  upcoming_events: Event[];
}

// ══════════════════════════════════════════════════════════════════════════════
//  DUMMY DATA — will be replaced by API calls
// ══════════════════════════════════════════════════════════════════════════════

const HOST_ID = "b1c2d3e4-f5a6-7890-abcd-ef1234567890";
const USER_ID = "a0b1c2d3-e4f5-6789-abcd-ef0123456789";

export const dummyHost: Host = {
  id: HOST_ID,
  user_id: USER_ID,
  account_id: null,
  first_name: "Ananya",
  last_name: "Sharma",
  phn_number: "+15031234567",
  city: "Portland, Oregon",
  avatar_url:
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face",
  tagline: "Calm Listener • Creative Soul",
  bio: `Hi there! I'm Sarah, a creative soul who loves deep conversations and quiet moments. I believe every person has a story worth hearing. Originally a graphic designer, I found my true calling in connecting with people through art and mindful conversation.

When I'm not hosting, you can find me sketching in local cafes or hiking the rainy trails of Oregon. Join me for a painting session or a calm coffee chat where we can just be ourselves.`,
  application_status: "approved",
  experience_desc: "Art workshops and mindful conversations",
  moods: ["social", "wellness", "creative"],
  description:
    "Creative soul who connects people through art and mindful conversation.",
  preferred_days: ["sat", "sun"],
  group_size: 8,
  government_id_url: null,
  submitted_at: "2025-06-01T10:00:00Z",
  approved_at: "2025-06-05T14:30:00Z",
  rejected_at: null,
  is_identity_verified: true,
  is_email_verified: true,
  is_phone_verified: true,
  is_super_host: false,
  is_community_champ: true,
  expertise_tags: ["#Calm", "#Creative", "#Empathetic", "#Cozy"],
  social_instagram: "https://instagram.com/ananyasharma",
  social_linkedin: "https://linkedin.com/in/ananyasharma",
  social_website: "https://ananyasharma.com",
  avg_rating: 4.9,
  total_reviews: 84,
  created_at: "2025-06-01T10:00:00Z",
  updated_at: "2026-03-01T08:00:00Z",
};

export const dummyReviews: HostPublicProfile["reviews"] = [
  {
    id: "r1a2b3c4-d5e6-7890-abcd-ef1234567890",
    event_id: "e1a2b3c4-d5e6-7890-abcd-ef1234567890",
    user_id: "u1a2b3c4-0000-0000-0000-000000000001",
    rating: 5,
    name: "Michael T.",
    description:
      "Sarah is incredibly easy to talk to. I left feeling heard and much lighter.",
    photo_urls: [],
    reply: [],
    sentiment_score: 0.95,
    created_at: "2026-03-06T12:00:00Z",
    updated_at: "2026-03-06T12:00:00Z",
    reviewer: {
      id: "u1a2b3c4-0000-0000-0000-000000000001",
      name: "Michael T.",
      avatar_url:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
    },
  },
  {
    id: "r1a2b3c4-d5e6-7890-abcd-ef1234567891",
    event_id: "e1a2b3c4-d5e6-7890-abcd-ef1234567890",
    user_id: "u1a2b3c4-0000-0000-0000-000000000002",
    rating: 5,
    name: "Elena R.",
    description:
      "The watercolor session was so relaxing. Sarah's studio has such a good vibe.",
    photo_urls: [],
    reply: [],
    sentiment_score: 0.92,
    created_at: "2026-03-01T09:00:00Z",
    updated_at: "2026-03-01T09:00:00Z",
    reviewer: {
      id: "u1a2b3c4-0000-0000-0000-000000000002",
      name: "Elena R.",
      avatar_url:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
    },
  },
  {
    id: "r1a2b3c4-d5e6-7890-abcd-ef1234567892",
    event_id: "e1a2b3c4-d5e6-7890-abcd-ef1234567891",
    user_id: "u1a2b3c4-0000-0000-0000-000000000003",
    rating: 5,
    name: "Jessie K.",
    description:
      "A genuine connection. Highly recommend if you need a break from the noise.",
    photo_urls: [],
    reply: [],
    sentiment_score: 0.88,
    created_at: "2026-02-15T15:00:00Z",
    updated_at: "2026-02-15T15:00:00Z",
    reviewer: {
      id: "u1a2b3c4-0000-0000-0000-000000000003",
      name: "Jessie K.",
      avatar_url:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face",
    },
  },
];

export const dummyEvents: Event[] = [
  {
    id: "e1a2b3c4-d5e6-7890-abcd-ef1234567890",
    host_id: HOST_ID,
    title: "Mindful Watercolor Session",
    hook_line: "Relax and express yourself through colors",
    mood: "creative",
    description:
      "Relax and express yourself through colors. No prior experience needed, just bring an open mind and we'll provide all the supplies.",
    cover_image_url:
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&h=300&fit=crop",
    gallery_urls: [],
    time: "2026-03-18T14:00:00Z",
    end_time: "2026-03-18T16:00:00Z",
    is_online: false,
    location: "Sarah's Art Studio, Portland",
    location_lat: 45.5155,
    location_lng: -122.6789,
    duration_minutes: 120,
    capacity: 10,
    min_group_size: 3,
    max_group_size: 10,
    price_cents: 4500,
    is_free: false,
    is_recurring: false,
    recurrence_rule: null,
    cancellation_policy: "moderate",
    ai_suggestion: null,
    status: "published",
    created_at: "2026-02-01T10:00:00Z",
    updated_at: "2026-03-01T08:00:00Z",
  },
  {
    id: "e1a2b3c4-d5e6-7890-abcd-ef1234567891",
    host_id: HOST_ID,
    title: "Sunday Morning Coffee Chat",
    hook_line: "Start your Sunday the mindful way",
    mood: "chill",
    description:
      "Start your Sunday with a warm beverage and a meaningful conversation about life and dreams.",
    cover_image_url:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop",
    gallery_urls: [],
    time: "2026-03-19T10:00:00Z",
    end_time: "2026-03-19T11:30:00Z",
    is_online: false,
    location: "Blue Star Donuts, Portland",
    location_lat: 45.5225,
    location_lng: -122.6587,
    duration_minutes: 90,
    capacity: 6,
    min_group_size: 2,
    max_group_size: 6,
    price_cents: 1500,
    is_free: false,
    is_recurring: true,
    recurrence_rule: "FREQ=WEEKLY;BYDAY=SU",
    cancellation_policy: "flexible",
    ai_suggestion: null,
    status: "published",
    created_at: "2026-02-10T10:00:00Z",
    updated_at: "2026-03-01T08:00:00Z",
  },
];

export const dummyGalleryUrls: string[] = [
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=300&fit=crop",
];

export const dummyHostPublicProfile: HostPublicProfile = {
  host: dummyHost,
  gallery_urls: dummyGalleryUrls,
  total_events_hosted: 142,
  total_people_met: 300,
  reviews: dummyReviews,
  upcoming_events: dummyEvents,
};
