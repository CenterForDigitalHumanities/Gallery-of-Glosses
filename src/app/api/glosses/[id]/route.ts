import { NextResponse } from 'next/server';
import { grabProperties, processGloss } from '@/lib/utils';
import { glossToJsonLD } from '@/lib/jsonld';
import { RERUM } from '@/configs/rerum-links';

// Mark this route as dynamic since it fetches external data
export const dynamic = 'force-dynamic';

type Params = Promise<{ id: string }>

/**
 * GET /api/glosses/[id]
 * Returns a single gloss in JSON-LD format
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
        { error: 'Gloss not found' },
        { status: 404 }
      );
    }

    let gloss: any = {};
    for (const item of data) {
      if (!item?.body) continue;
      const key = Object.keys(item.body)[0];
      gloss[key] = item.body[key].value ?? item.body[key];
    }

    const processedGloss = processGloss(gloss, targetId);
    const jsonLDGloss = glossToJsonLD(processedGloss);

    return NextResponse.json(jsonLDGloss, {
      headers: {
        'Content-Type': 'application/ld+json',
      },
    });
  } catch (error) {
    console.error('Error fetching gloss:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
