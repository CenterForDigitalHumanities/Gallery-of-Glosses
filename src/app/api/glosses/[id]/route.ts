import { NextResponse } from 'next/server';
import { grabProperties, processGloss, grabProductionGlosses } from '@/lib/utils';
import { glossToJsonLD } from '@/lib/jsonld';

// Static generation for GitHub Pages compatibility
export const dynamic = 'error';

type Params = Promise<{ id: string }>

/**
 * Generate static params for all glosses at build time
 */
export async function generateStaticParams(): Promise<Array<{ id: string }>> {
  try {
    const collectionList = await grabProductionGlosses();
    if (!collectionList?.itemListElement) {
      console.warn('No glosses found for static generation');
      return [];
    }

    return collectionList.itemListElement.map((item: any) => ({
      id: item['@id'].split('/').pop() || item['@id'],
    }));
  } catch (error) {
    console.error('Error generating gloss static params:', error);
    return [];
  }
}

/**
 * GET /api/glosses/[id]
 * Returns a single gloss in JSON-LD format (prerendered as static .json)
 */
export async function GET(
  request: Request,
  { params }: { params: Params }
) {
  try {
    const { id } = await params;
    
    // grabProperties handles ID normalization internally
    const targetId = id;

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
