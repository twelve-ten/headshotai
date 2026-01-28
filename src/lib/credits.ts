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

export async function recordGeneration(
  userId: string,
  style: string
): Promise<void> {
  await prisma.generation.create({
    data: {
      userId,
      style,
    },
  });
}
