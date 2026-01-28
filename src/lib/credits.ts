import { prisma } from "./prisma";

export async function getUserCredits(userId: string): Promise<number> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { credits: true },
  });
  return user?.credits ?? 0;
}

export async function deductCredit(userId: string): Promise<{
  success: boolean;
  remainingCredits: number;
  error?: string;
}> {
  try {
    // Use transaction to prevent race conditions
    const result = await prisma.$transaction(async (tx) => {
      const user = await tx.user.findUnique({
        where: { id: userId },
        select: { credits: true },
      });

      if (!user) {
        throw new Error("User not found");
      }

      if (user.credits < 1) {
        throw new Error("Insufficient credits");
      }

      const updatedUser = await tx.user.update({
        where: { id: userId },
        data: { credits: { decrement: 1 } },
        select: { credits: true },
      });

      return updatedUser.credits;
    });

    return {
      success: true,
      remainingCredits: result,
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        success: false,
        remainingCredits: 0,
        error: error.message,
      };
    }
    return {
      success: false,
      remainingCredits: 0,
      error: "Failed to deduct credit",
    };
  }
}

export async function addCredits(
  userId: string,
  amount: number
): Promise<{ success: boolean; newBalance: number }> {
  try {
    const user = await prisma.user.update({
      where: { id: userId },
      data: { credits: { increment: amount } },
      select: { credits: true },
    });
    return { success: true, newBalance: user.credits };
  } catch {
    return { success: false, newBalance: 0 };
  }
}

export async function refundCredit(userId: string): Promise<{
  success: boolean;
  newBalance: number;
}> {
  try {
    const user = await prisma.user.update({
      where: { id: userId },
      data: { credits: { increment: 1 } },
      select: { credits: true },
    });
    return { success: true, newBalance: user.credits };
  } catch (error) {
    console.error("Failed to refund credit:", error);
    return { success: false, newBalance: 0 };
  }
}

export async function recordGeneration(
  userId: string,
  style: string,
  inputHash?: string,
  outputUrl?: string
): Promise<void> {
  await prisma.generation.create({
    data: {
      userId,
      style,
      inputHash,
      outputUrl,
    },
  });
}

export async function getCachedGeneration(
  userId: string,
  inputHash: string
): Promise<string | null> {
  const cached = await prisma.generation.findFirst({
    where: {
      userId,
      inputHash,
      outputUrl: { not: null },
    },
    orderBy: { createdAt: "desc" },
    select: { outputUrl: true },
  });
  return cached?.outputUrl ?? null;
}

export function hashGeneration(imageBase64: string, style: string): string {
  // Simple hash using first 1KB of image + style
  // Full crypto hash would be more robust but this is efficient
  const sample = imageBase64.slice(0, 1024);
  let hash = 0;
  const str = `${style}:${sample}`;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return `${style}-${hash.toString(36)}`;
}
