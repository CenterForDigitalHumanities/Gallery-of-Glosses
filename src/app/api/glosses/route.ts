import { NextResponse } from 'next/server';
import { grabProductionGlosses, grabProperties, processGloss } from '@/lib/utils';
import { glossToJsonLD, createJsonLDCollection } from '@/lib/jsonld';

// Mark this route as dynamic since it fetches external data
export const dynamic = 'force-dynamic';

/**
 * Fetch and process a single gloss from a collection item
 */
async function fetchGloss(item: { "@id": string }) {
  try {
    const targetId = item["@id"];
    const res = await grabProperties(targetId);
    const data = await res.json();

    let gloss: Record<string, any> = {};
    for (const d of data) {
      if (!d?.body) continue;
      const key = Object.keys(d.body)[0];
      gloss[key] = d.body[key].value ?? d.body[key];
    }

    const processedGloss = processGloss(gloss, targetId);
    return glossToJsonLD(processedGloss);
  } catch (err) {
    console.error(`Failed to fetch gloss ${item["@id"]}:`, err);
    return null;
  }
}

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

    const results = await Promise.allSettled(
      collectionList.itemListElement.map(fetchGloss)
    );

    const glosses = results
      .filter((r): r is PromiseFulfilledResult<any> => r.status === 'fulfilled')
      .map((r) => r.value)
      .filter((g): g is any => g !== null);

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
