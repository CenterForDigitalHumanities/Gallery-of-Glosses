import { glossToJsonLD, manuscriptToJsonLD, createJsonLDCollection } from '../jsonld';

describe('JSON-LD Conversion Utilities', () => {
  describe('glossToJsonLD', () => {
    it('should convert a ProcessedGloss to JSON-LD format with all fields', () => {
      const gloss = {
        targetId: 'https://store.rerum.io/v1/id/12345',
        title: 'Test Gloss',
        targetCollection: 'GoG-Named-Glosses',
        section: '5',
        subsection: '1',
        tags: ['tag1', 'tag2'],
        textFormat: 'text/html',
        textLanguage: 'la',
        textValue: 'Lorem ipsum',
        creator: 'https://example.com/user/123',
        document: 'Gospel of Matthew',
        canonicalReference: 'Matthew 5:1',
        description: 'A test gloss',
        targetedText: 'Beati',
        notes: 'Some notes'
      };

      const jsonLD = glossToJsonLD(gloss);

      expect(jsonLD).toHaveProperty('@context');
      expect(jsonLD['@type']).toBe('Comment');
      expect(jsonLD['@id']).toBe(gloss.targetId);
      expect(jsonLD.identifier).toBe(gloss.targetId);
      expect(jsonLD.name).toBe(gloss.title);
      expect(jsonLD.text).toBe(gloss.textValue);
      expect(jsonLD.inLanguage).toBe(gloss.textLanguage);
      expect(jsonLD.encodingFormat).toBe(gloss.textFormat);
      expect(jsonLD.creator['@type']).toBe('Person');
      expect(jsonLD.creator['@id']).toBe(gloss.creator);
      expect(jsonLD.description).toBe(gloss.description);
      expect(jsonLD['gog:canonicalReference']).toBe(gloss.canonicalReference);
      expect(jsonLD['gog:section']).toBe(gloss.section);
      expect(jsonLD['gog:subsection']).toBe(gloss.subsection);
      expect(jsonLD['gog:document']).toBe(gloss.document);
      expect(jsonLD['gog:targetedText']).toBe(gloss.targetedText);
      expect(jsonLD.keywords).toEqual(gloss.tags);
      expect(jsonLD['gog:notes']).toBe(gloss.notes);
      expect(jsonLD['gog:targetCollection']).toBe(gloss.targetCollection);
    });

    it('should handle minimal gloss data', () => {
      const gloss = {
        targetId: 'https://store.rerum.io/v1/id/12345',
        title: '',
        targetCollection: 'GoG-Named-Glosses',
        section: '',
        subsection: ''
      };

      const jsonLD = glossToJsonLD(gloss);

      expect(jsonLD['@type']).toBe('Comment');
      expect(jsonLD['@id']).toBe(gloss.targetId);
      expect(jsonLD.name).toBe('');
      expect(jsonLD.text).toBe('');
      expect(jsonLD).not.toHaveProperty('inLanguage');
      expect(jsonLD).not.toHaveProperty('creator');
    });
  });

  describe('manuscriptToJsonLD', () => {
    it('should convert a ProcessedManuscript to JSON-LD format with all fields', () => {
      const manuscript = {
        targetId: 'https://store.rerum.io/v1/id/67890',
        targetCollection: 'GoG-Manuscripts',
        provenance: 'Test provenance',
        url: 'https://example.com/manuscript',
        identifier: 'MS-123',
        _originLocal: 'Paris',
        _originRegion: 'France',
        _originAuthority: 'Bibliothèque nationale',
        _iiifManifest: 'https://example.com/iiif/manifest.json',
        date: '1200',
        title: 'Test Manuscript',
        baseProject: 'Gallery of Glosses',
        notes: 'Some notes',
        tags: ['medieval', 'latin']
      };

      const jsonLD = manuscriptToJsonLD(manuscript);

      expect(jsonLD).toHaveProperty('@context');
      expect(jsonLD['@type']).toBe('Manuscript');
      expect(jsonLD['@id']).toBe(manuscript.targetId);
      expect(jsonLD.identifier).toBe(manuscript.identifier);
      expect(jsonLD.name).toBe(manuscript.title);
      expect(jsonLD.url).toBe(manuscript.url);
      expect(jsonLD.dateCreated).toBe(manuscript.date);
      expect(jsonLD.provenance).toBe(manuscript.provenance);
      expect(jsonLD['gog:originLocal']).toBe(manuscript._originLocal);
      expect(jsonLD['gog:originRegion']).toBe(manuscript._originRegion);
      expect(jsonLD['gog:originAuthority']).toBe(manuscript._originAuthority);
      expect(jsonLD['gog:iiifManifest']).toBe(manuscript._iiifManifest);
      expect(jsonLD['gog:notes']).toBe(manuscript.notes);
      expect(jsonLD.keywords).toEqual(manuscript.tags);
      expect(jsonLD['gog:targetCollection']).toBe(manuscript.targetCollection);
      expect(jsonLD['gog:baseProject']).toBe(manuscript.baseProject);
    });

    it('should handle minimal manuscript data', () => {
      const manuscript = {
        targetId: 'https://store.rerum.io/v1/id/67890',
        targetCollection: 'GoG-Manuscripts',
        date: ''
      };

      const jsonLD = manuscriptToJsonLD(manuscript);

      expect(jsonLD['@type']).toBe('Manuscript');
      expect(jsonLD['@id']).toBe(manuscript.targetId);
      expect(jsonLD.identifier).toBe(manuscript.targetId);
      expect(jsonLD.name).toBe('');
      expect(jsonLD).not.toHaveProperty('url');
      expect(jsonLD).not.toHaveProperty('provenance');
    });
  });

  describe('createJsonLDCollection', () => {
    it('should create a JSON-LD collection with proper structure', () => {
      const items = [
        { '@id': 'item1', name: 'Item 1' },
        { '@id': 'item2', name: 'Item 2' },
        { '@id': 'item3', name: 'Item 3' }
      ];

      const collection = createJsonLDCollection(items, 'Gloss');

      expect(collection).toHaveProperty('@context');
      expect(collection['@type']).toBe('ItemList');
      expect(collection.name).toBe('Gallery of Glosses Gloss Collection');
      expect(collection.numberOfItems).toBe(3);
      expect(collection.itemListElement).toHaveLength(3);
      expect(collection.itemListElement[0]['@type']).toBe('ListItem');
      expect(collection.itemListElement[0].position).toBe(1);
      expect(collection.itemListElement[0].item).toEqual(items[0]);
      expect(collection.itemListElement[2].position).toBe(3);
    });

    it('should handle empty collection', () => {
      const collection = createJsonLDCollection([], 'Manuscript');

      expect(collection['@type']).toBe('ItemList');
      expect(collection.name).toBe('Gallery of Glosses Manuscript Collection');
      expect(collection.numberOfItems).toBe(0);
      expect(collection.itemListElement).toHaveLength(0);
    });
  });
});
