# Why Use env.ts vs Direct process.env?

## Comparison

### ❌ Without env.ts (Direct process.env)

```typescript
// In axios.ts
const baseURL = process.env.NEXT_PUBLIC_API_URL || "";
const timeout = parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || "30000");

// In auth.service.ts
localStorage.setItem("token", result.token); // Hardcoded "token"

// In components
const maxSize = parseInt(process.env.NEXT_PUBLIC_MAX_FILE_SIZE || "5242880");
const isEnabled = process.env.NEXT_PUBLIC_ENABLE_REGISTRATION === "true";
```

**Problems:**
- ❌ No type safety (everything is `string | undefined`)
- ❌ Manual parsing everywhere (`parseInt`, `=== "true"`)
- ❌ Hardcoded defaults scattered across codebase
- ❌ Easy to make mistakes (typos, missing || "")
- ❌ No validation (could be wrong type, wrong format)
- ❌ Hard to refactor (change var name = find/replace everywhere)
- ❌ No autocomplete in IDE

### ✅ With env.ts (Centralized)

```typescript
// In axios.ts
import { env } from "@/lib/env";
const baseURL = env.apiUrl; // Already validated, has default
const timeout = env.apiTimeout; // Already a number!

// In auth.service.ts
import { env } from "@/lib/env";
localStorage.setItem(env.tokenStorageKey, result.token); // Can change key name in one place

// In components
import { env } from "@/lib/env";
const maxSize = env.maxFileSize; // Already a number!
const isEnabled = env.enableRegistration; // Already a boolean!
```

**Benefits:**
- ✅ Type safety (TypeScript knows `env.apiTimeout` is a number)
- ✅ Automatic parsing (no manual `parseInt` or `=== "true"`)
- ✅ Centralized defaults
- ✅ Early validation (fails fast if required var missing)
- ✅ Easy refactoring (change var name once)
- ✅ IDE autocomplete (knows all available vars)
- ✅ Consistent usage across codebase

## Real-World Example

### Scenario: You need to change the token storage key

**Without env.ts:**
```typescript
// Search through entire codebase for "token"
localStorage.setItem("token", ...); // Found in 5 files
localStorage.getItem("token"); // Found in 3 files
localStorage.removeItem("token"); // Found in 2 files
// Change all 10 occurrences manually
```

**With env.ts:**
```typescript
// Change once in env.ts
tokenStorageKey: getEnv("NEXT_PUBLIC_TOKEN_STORAGE_KEY", "auth_token"),

// All code automatically uses new key
// No other changes needed!
```

## When You Can Skip env.ts

You can skip `env.ts` if:
1. ✅ You only have 1-2 simple env vars (like just `NEXT_PUBLIC_API_URL`)
2. ✅ You don't need type coercion (all values are strings)
3. ✅ You don't need defaults
4. ✅ You're okay with manual parsing everywhere

## When You Should Use env.ts

You should use `env.ts` if:
1. ✅ You have multiple env vars (5+)
2. ✅ You need type coercion (numbers, booleans)
3. ✅ You want early validation
4. ✅ You want better developer experience
5. ✅ You're building a production app (not just a prototype)

## Recommendation

For your Mohabbat app, **keep `env.ts`** because:
- You already have multiple env vars
- You're using it for API URL, timeout, token key, etc.
- It's already set up and working
- It provides better maintainability as the app grows

The small upfront cost of setting up `env.ts` pays off as your app grows and you add more configuration.

