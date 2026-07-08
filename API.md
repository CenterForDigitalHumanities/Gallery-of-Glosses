# Gallery of Glosses - JSON-LD API Endpoints

This document describes the JSON-LD API endpoints available for accessing Glosses and Manuscripts data.

## Overview

The Gallery of Glosses provides RESTful API endpoints that return data in JSON-LD format, following Linked Data principles. All endpoints return data with proper `@context`, `@type`, and `@id` annotations using schema.org vocabulary and custom Gallery of Glosses terms.

Each endpoint accepts a resource ID and returns the corresponding gloss or manuscript as a static, prerendered JSON file for GitHub Pages compatibility.

## Endpoints

### Glosses

#### Get Individual Gloss
```
GET /api/glosses/{id}
```

Returns a single gloss in JSON-LD format.

**Parameters:**
- `id` - The gloss ID (can be the full RERUM URI or just the ID portion)

**Response Format:**
```json
{
  "@context": {
    "@vocab": "http://schema.org/",
    "gog": "https://galleryofglosses.org/terms/",
    "rerum": "http://store.rerum.io/v1/id/"
  },
  "@type": "Comment",
  "@id": "https://store.rerum.io/v1/id/...",
  "identifier": "https://store.rerum.io/v1/id/...",
  "name": "Gloss title",
  "text": "Gloss text content",
  "inLanguage": "la",
  "encodingFormat": "text/html",
  "creator": {
    "@type": "Person",
    "@id": "..."
  },
  "description": "Gloss description",
  "gog:canonicalReference": "Matthew 5:1",
  "gog:section": "5",
  "gog:subsection": "1",
  "gog:document": "Gospel of Matthew",
  "gog:targetedText": "Beati",
  "keywords": ["tag1", "tag2"],
  "gog:notes": "Additional notes"
}
```

**Content-Type:** `application/ld+json`

### Manuscripts

#### Get Individual Manuscript
```
GET /api/manuscripts/{id}
```

Returns a single manuscript in JSON-LD format.

**Parameters:**
- `id` - The manuscript ID (can be the full RERUM URI or just the ID portion)

**Response Format:**
```json
{
  "@context": {
    "@vocab": "http://schema.org/",
    "gog": "https://galleryofglosses.org/terms/",
    "rerum": "http://store.rerum.io/v1/id/"
  },
  "@type": "Manuscript",
  "@id": "https://store.rerum.io/v1/id/...",
  "identifier": "MS-123",
  "name": "Manuscript title",
  "url": "https://example.com/manuscript",
  "dateCreated": "1200",
  "provenance": "...",
  "gog:originLocal": "Paris",
  "gog:originRegion": "France",
  "gog:originAuthority": "Bibliothèque nationale",
  "gog:iiifManifest": "https://example.com/iiif/manifest.json",
  "keywords": ["medieval", "latin"],
  "gog:notes": "Additional notes"
}
```

**Content-Type:** `application/ld+json`

## Vocabularies

### Schema.org
The endpoints use schema.org as the primary vocabulary (http://schema.org/):
- `Comment` - Used for Gloss objects
- `Manuscript` - Used for Manuscript objects
- `ItemList` and `ListItem` - Used for collections
- Standard properties: `name`, `text`, `identifier`, `url`, `dateCreated`, `inLanguage`, `encodingFormat`, `creator`, `description`, `keywords`, `provenance`

### Gallery of Glosses Custom Terms
Custom terms are prefixed with `gog:` (https://galleryofglosses.org/terms/):
- `gog:canonicalReference` - Biblical reference for the gloss
- `gog:section` - Section identifier
- `gog:subsection` - Subsection identifier
- `gog:document` - Document name
- `gog:targetedText` - The text being glossed
- `gog:targetCollection` - Collection identifier
- `gog:notes` - Additional notes
- `gog:originLocal` - Local origin (for manuscripts)
- `gog:originRegion` - Regional origin (for manuscripts)
- `gog:originAuthority` - Authoritative origin (for manuscripts)
- `gog:iiifManifest` - IIIF manifest URL (for manuscripts)
- `gog:baseProject` - Base project identifier (for manuscripts)

## Error Responses

All endpoints return JSON error responses with appropriate HTTP status codes:

```json
{
  "error": "Error message description"
}
```

Common status codes:
- `404` - Resource not found
- `500` - Internal server error

## Usage Examples

### Fetch a specific gloss
```bash
curl -H "Accept: application/ld+json" https://galleryofglosses.org/api/glosses/610c54deffce846a83e70625
```

### Fetch a specific manuscript
```bash
curl -H "Accept: application/ld+json" https://galleryofglosses.org/api/manuscripts/610ad6f1ffce846a83e70613
```

## Implementation Notes

1. All API routes are marked as `dynamic: 'error'` to ensure static prerendering for GitHub Pages compatibility.
2. Each endpoint uses `generateStaticParams` to produce all valid routes at build time.
3. The endpoints fetch data from the RERUM store and transform it into JSON-LD format.
4. Each resource has both a URI (`@id`) that can be dereferenced and an `identifier` property.
5. The endpoints support both full RERUM URIs and short ID formats as parameters.
