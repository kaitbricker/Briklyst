# Project Issues

## Open Issues

### Fix NextAuth Type Definitions

**Status**: Open  
**Priority**: Medium  
**Created**: [Current Date]

#### Description
The `src/auth.ts` file has TypeScript errors related to NextAuth type definitions. We're currently using `@ts-nocheck` as a temporary workaround, but we need proper type safety.

#### Specific Problems
1. Type conflicts between NextAuth's built-in types and our custom types
2. Mismatches between Prisma User model and session types
3. Issues with JWT and Session type declarations

#### Required Changes
1. Properly extend NextAuth's Session type to include our custom fields:
   - `emailAlerts`
   - `weeklyReport`
   - `monthlyReport`

2. Update JWT type declarations to match our token structure

3. Ensure type safety in callbacks:
   - `session` callback
   - `jwt` callback

#### Technical Details
Current problematic types:
```typescript
declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      email?: string | null
      name?: string | null
      image?: string | null
      emailAlerts?: boolean
      weeklyReport?: boolean
      monthlyReport?: boolean
    }
  }
}
```

#### Acceptance Criteria
- [ ] Remove `@ts-nocheck` comment
- [ ] All TypeScript errors resolved
- [ ] Proper type definitions for all custom fields
- [ ] Type safety maintained in all callbacks
- [ ] No regression in existing functionality

#### Related Files
- `src/auth.ts`
- `prisma/schema.prisma`

## Closed Issues

*No closed issues yet* 