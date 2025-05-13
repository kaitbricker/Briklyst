import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { themes, Theme } from '@/lib/themes';
import { Session } from 'next-auth';

export async function PATCH(request: Request) {
  try {
    const session = await getServerSession(authOptions) as Session & {
      user: { id: string };
    };
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { storefrontId, themeId } = await request.json();

    // Validate theme exists
    const theme = themes.find((t) => t.id === themeId);
    if (!theme) {
      return NextResponse.json(
        { error: 'Invalid theme ID' },
        { status: 400 }
      );
    }

    // Get user's storefront
    const storefront = await prisma.storefront.findFirst({
      where: {
        id: storefrontId,
        userId: session.user.id,
      },
    });

    if (!storefront) {
      return NextResponse.json(
        { error: 'Storefront not found' },
        { status: 404 }
      );
    }

    // Update storefront theme
    await prisma.storefront.update({
      where: {
        id: storefrontId,
      },
      data: {
        templateId: themeId,
        templateOverrides: {
          primaryColor: theme.primaryColor,
          backgroundColor: theme.backgroundColor,
          textColor: theme.textColor,
          accentColor: theme.accentColor,
          fontFamily: theme.fontFamily,
          buttonStyle: theme.buttonStyle
        },
      },
    });

    return NextResponse.json(
      { message: 'Theme updated successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Theme update error:', error);
    return NextResponse.json(
      { error: 'Failed to update theme' },
      { status: 500 }
    );
  }
} 