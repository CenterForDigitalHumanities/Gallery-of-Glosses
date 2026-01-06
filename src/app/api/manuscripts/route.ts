import { NextResponse } from 'next/server';
import { grabProductionManuscripts, grabProperties, processManuscript } from '@/lib/utils';
import { manuscriptToJsonLD, createJsonLDCollection } from '@/lib/jsonld';

// Mark this route as dynamic since it fetches external data
export const dynamic = 'force-dynamic';

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

    const manuscripts: any[] = [];

    // Process each manuscript
    for (const item of collectionList.itemListElement) {
      const targetId = item["@id"];
      const res = await grabProperties(targetId);
      const data = await res.json();
      
      let manuscript: any = {};
      for (const item of data) {
        if (!item?.body) continue;
        const key = Object.keys(item.body)[0];
        manuscript[key] = item.body[key].value ?? item.body[key];
      }

      const processedManuscript = processManuscript(manuscript, targetId);
      const jsonLDManuscript = manuscriptToJsonLD(processedManuscript);
      manuscripts.push(jsonLDManuscript);
    }

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
