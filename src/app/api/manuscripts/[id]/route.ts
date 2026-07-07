import { NextResponse } from 'next/server';
import { grabProperties, processManuscript, grabProductionManuscripts } from '@/lib/utils';
import { manuscriptToJsonLD } from '@/lib/jsonld';

// Static generation for GitHub Pages compatibility
export const dynamic = 'error';

type Params = Promise<{ id: string }>

/**
 * Generate static params for all manuscripts at build time
 */
export async function generateStaticParams(): Promise<Array<{ id: string }>> {
  try {
    const collectionList = await grabProductionManuscripts();
    if (!collectionList?.itemListElement) {
      console.warn('No manuscripts found for static generation');
      return [];
    }

    return collectionList.itemListElement.map((item: any) => ({
      id: item['@id'].split('/').pop() || item['@id'],
    }));
  } catch (error) {
    console.error('Error generating manuscript static params:', error);
    return [];
  }
}

/**
 * GET /api/manuscripts/[id]
 * Returns a single manuscript in JSON-LD format (prerendered as static .json)
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
