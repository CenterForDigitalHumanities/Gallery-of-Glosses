import { NextResponse } from 'next/server';
import { grabProperties, processManuscript } from '@/lib/utils';
import { manuscriptToJsonLD } from '@/lib/jsonld';
import { RERUM } from '@/configs/rerum-links';

// Mark this route as dynamic since it fetches external data
export const dynamic = 'force-dynamic';

type Params = Promise<{ id: string }>

/**
 * GET /api/manuscripts/[id]
 * Returns a single manuscript in JSON-LD format
 */
export async function GET(
  request: Request,
  { params }: { params: Params }
) {
  try {
    const { id } = await params;
    
    // Construct the full ID if needed
    const targetId = id.includes("store.rerum.io") ? id : RERUM + id;

    const res = await grabProperties(targetId);
    const data = await res.json();

    if (!data || data.length === 0) {
      return NextResponse.json(
        { error: 'Manuscript not found' },
        { status: 404 }
      );
    }

    let manuscript: any = {};
    for (const item of data) {
      if (!item?.body) continue;
      const key = Object.keys(item.body)[0];
      manuscript[key] = item.body[key].value ?? item.body[key];
    }

    const processedManuscript = processManuscript(manuscript, targetId);
    const jsonLDManuscript = manuscriptToJsonLD(processedManuscript);

    return NextResponse.json(jsonLDManuscript, {
      headers: {
        'Content-Type': 'application/ld+json',
      },
    });
  } catch (error) {
    console.error('Error fetching manuscript:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
