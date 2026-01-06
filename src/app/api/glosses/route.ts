import { NextResponse } from 'next/server';
import { grabProductionGlosses, grabProperties, processGloss } from '@/lib/utils';
import { glossToJsonLD, createJsonLDCollection } from '@/lib/jsonld';

// Mark this route as dynamic since it fetches external data
export const dynamic = 'force-dynamic';

/**
 * GET /api/glosses
 * Returns all glosses in JSON-LD format
 */
export async function GET() {
  try {
    const collectionList = await grabProductionGlosses();
    
    if (!collectionList || !collectionList.itemListElement) {
      return NextResponse.json(
        { error: 'Unable to fetch glosses' },
        { status: 500 }
      );
    }

    const glosses: any[] = [];

    // Process each gloss
    for (const item of collectionList.itemListElement) {
      const targetId = item["@id"];
      const res = await grabProperties(targetId);
      const data = await res.json();
      
      let gloss: any = {};
      for (const item of data) {
        if (!item?.body) continue;
        const key = Object.keys(item.body)[0];
        gloss[key] = item.body[key].value ?? item.body[key];
      }

      const processedGloss = processGloss(gloss, targetId);
      const jsonLDGloss = glossToJsonLD(processedGloss);
      glosses.push(jsonLDGloss);
    }

    const collection = createJsonLDCollection(glosses, 'Gloss');

    return NextResponse.json(collection, {
      headers: {
        'Content-Type': 'application/ld+json',
      },
    });
  } catch (error) {
    console.error('Error fetching glosses:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
