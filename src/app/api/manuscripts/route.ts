import { NextResponse } from 'next/server';
import { grabProductionManuscripts, grabProperties, processManuscript } from '@/lib/utils';
import { manuscriptToJsonLD, createJsonLDCollection } from '@/lib/jsonld';

// Mark this route as dynamic since it fetches external data
export const dynamic = 'force-dynamic';

/**
 * Fetch and process a single manuscript from a collection item
 */
async function fetchManuscript(item: { "@id": string }) {
  try {
    const targetId = item["@id"];
    const res = await grabProperties(targetId);
    const data = await res.json();

    let manuscript: Record<string, any> = {};
    for (const d of data) {
      if (!d?.body) continue;
      const key = Object.keys(d.body)[0];
      manuscript[key] = d.body[key].value ?? d.body[key];
    }

    const processedManuscript = processManuscript(manuscript, targetId);
    return manuscriptToJsonLD(processedManuscript);
  } catch (err) {
    console.error(`Failed to fetch manuscript ${item["@id"]}:`, err);
    return null;
  }
}

/**
 * GET /api/manuscripts
 * Returns all manuscripts in JSON-LD format
 */
export async function GET() {
  try {
    const collectionList = await grabProductionManuscripts();

    if (!collectionList || !collectionList.itemListElement) {
      return NextResponse.json(
        { error: 'Unable to fetch manuscripts' },
        { status: 500 }
      );
    }

    const results = await Promise.allSettled(
      collectionList.itemListElement.map(fetchManuscript)
    );

    const manuscripts = results
      .filter((r): r is PromiseFulfilledResult<any> => r.status === 'fulfilled')
      .map((r) => r.value)
      .filter((m): m is any => m !== null);

    const collection = createJsonLDCollection(manuscripts, 'Manuscript');

    return NextResponse.json(collection, {
      headers: {
        'Content-Type': 'application/ld+json',
      },
    });
  } catch (error) {
    console.error('Error fetching manuscripts:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
