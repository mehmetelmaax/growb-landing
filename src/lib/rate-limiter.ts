export interface RateLimitEntry {
  count: number;
  resetAt: number;
}

export class InMemoryRateLimiter {
  private store = new Map<string, RateLimitEntry>();
  private windowMs: number;
  private maxRequests: number;

  constructor(windowMs = 10 * 60 * 1000, maxRequests = 5) {
    this.windowMs = windowMs;
    this.maxRequests = maxRequests;
  }

  check(ip: string): { allowed: boolean; remaining: number; resetInMs: number } {
    const now = Date.now();
    const entry = this.store.get(ip);

    if (!entry || now > entry.resetAt) {
      this.store.set(ip, { count: 1, resetAt: now + this.windowMs });
      return { allowed: true, remaining: this.maxRequests - 1, resetInMs: this.windowMs };
    }

    if (entry.count >= this.maxRequests) {
      return { allowed: false, remaining: 0, resetInMs: Math.max(0, entry.resetAt - now) };
    }

    entry.count += 1;
    return {
      allowed: true,
      remaining: this.maxRequests - entry.count,
      resetInMs: Math.max(0, entry.resetAt - now),
    };
  }

  reset(ip?: string) {
    if (ip) {
      this.store.delete(ip);
    } else {
      this.store.clear();
    }
  }
}

export const globalInMemoryRateLimiter = new InMemoryRateLimiter(10 * 60 * 1000, 5);
