import { eq, InferSelectModel } from "drizzle-orm";
import { user } from "./auth-schema";
import { db } from "./db";
import { userRole, rolesEnum, Role } from "./schema";

export async function findUserRole(
  targetUser: InferSelectModel<typeof user>,
): Promise<Role | null> {
  const [role] = await db
    .select()
    .from(userRole)
    .where(eq(userRole.ownerId, targetUser.id));

  return role?.role ?? null;
}
