function requireEnv(key: string) {
  const value = process.env[key];

  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }

  return value;
}

export const env = {
  get DATABASE_URL() {
    return requireEnv("DATABASE_URL");
  },
  get NEXT_PUBLIC_SUPABASE_URL() {
    return requireEnv("NEXT_PUBLIC_SUPABASE_URL");
  },
  get NEXT_PUBLIC_SUPABASE_ANON_KEY() {
    return requireEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY");
  },
  get SUPABASE_SERVICE_ROLE_KEY() {
    return requireEnv("SUPABASE_SERVICE_ROLE_KEY");
  },
  get ADMIN_EMAILS() {
    return requireEnv("ADMIN_EMAILS");
  },
  get SUPABASE_STORAGE_BUCKET() {
    return process.env.SUPABASE_STORAGE_BUCKET || "posts";
  },
};

export const adminEmails = (process.env.ADMIN_EMAILS || "")
  .split(",")
  .map((email) => email.trim().toLowerCase())
  .filter(Boolean);
