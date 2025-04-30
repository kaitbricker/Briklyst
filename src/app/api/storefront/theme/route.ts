import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { themes } from '@/lib/themes';

export async function PATCH(request: Request) {
  try {
    const { storefrontId, themeId } = await request.json();

    // Validate theme exists
    const theme = themes.find((t) => t.id === themeId);
    if (!theme) {
      return NextResponse.json(
        { error: 'Invalid theme ID' },
        { status: 400 }
      );
    }

    // Update storefront theme
    await prisma.storefront.update({
      where: {
        id: storefrontId,
      },
      data: {
        themeId,
        primaryColor: theme.primaryColor,
        backgroundColor: theme.backgroundColor,
        textColor: theme.textColor,
        accentColor: theme.accentColor,
        fontFamily: theme.fontFamily.body,
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