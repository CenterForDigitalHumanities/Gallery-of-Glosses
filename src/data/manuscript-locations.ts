// GeoJSON-LD data for manuscript holding locations
// Follows IIIF navPlace extension: https://iiif.io/api/extension/navplace/
// Coordinates sourced from Geonames/Wikipedia for each holding institution's city.

export interface ManuscriptLocation {
  /** Manuscript identifier (shelfmark) */
  identifier: string;
  /** Holding institution name */
  institution: string;
  /** City */
  city: string;
  /** Country */
  country: string;
  /** Latitude (WGS84) */
  lat: number;
  /** Longitude (WGS84) */
  lon: number;
  /** Geonames ID for the city */
  geonameId: string;
}

export const manuscriptLocations: ManuscriptLocation[] = [
  {
    identifier: "Cambridge, Pembroke 67",
    institution: "Pembroke College, Cambridge",
    city: "Cambridge",
    country: "United Kingdom",
    lat: 52.2053,
    lon: 0.1218,
    geonameId: "2653941",
  },
  {
    identifier: "Cambridge, Pembroke 70",
    institution: "Pembroke College, Cambridge",
    city: "Cambridge",
    country: "United Kingdom",
    lat: 52.2053,
    lon: 0.1218,
    geonameId: "2653941",
  },
  {
    identifier: "Cambridge, Trinity College B.1.10",
    institution: "Trinity College, Cambridge",
    city: "Cambridge",
    country: "United Kingdom",
    lat: 52.2053,
    lon: 0.1218,
    geonameId: "2653941",
  },
  {
    identifier: "Engelberg, Stiftsbibliothek 82",
    institution: "Stiftsbibliothek Engelberg",
    city: "Engelberg",
    country: "Switzerland",
    lat: 46.8667,
    lon: 8.3833,
    geonameId: "2660718",
  },
  {
    identifier: "Oxford, Bodleian Library, Laud. Misc. 69",
    institution: "Bodleian Library, Oxford",
    city: "Oxford",
    country: "United Kingdom",
    lat: 51.7548,
    lon: -1.2544,
    geonameId: "2640729",
  },
  {
    identifier: "Hereford, Cathedral Library O. VI. 4",
    institution: "Hereford Cathedral Library",
    city: "Hereford",
    country: "United Kingdom",
    lat: 52.0561,
    lon: -2.7154,
    geonameId: "2645425",
  },
  {
    identifier: "Laon, Bibliothèque municipale, 74",
    institution: "Bibliothèque municipale de Laon",
    city: "Laon",
    country: "France",
    lat: 49.5633,
    lon: 3.6244,
    geonameId: "3024635",
  },
  {
    identifier: "London, BL, Harley 46",
    institution: "British Library, London",
    city: "London",
    country: "United Kingdom",
    lat: 51.5074,
    lon: -0.1278,
    geonameId: "2643743",
  },
  {
    identifier: "Montpellier, Bibliothèque de l'école de médecine, H 155",
    institution: "Bibliothèque de l'école de médecine, Montpellier",
    city: "Montpellier",
    country: "France",
    lat: 43.6108,
    lon: 3.8767,
    geonameId: "2988507",
  },
  {
    identifier: "Paris, BnF, lat. 17233",
    institution: "Bibliothèque nationale de France",
    city: "Paris",
    country: "France",
    lat: 48.8566,
    lon: 2.3522,
    geonameId: "2968815",
  },
  {
    identifier: "Oxford, Bodleian Library, Auct. D. 5. 5",
    institution: "Bodleian Library, Oxford",
    city: "Oxford",
    country: "United Kingdom",
    lat: 51.7548,
    lon: -1.2544,
    geonameId: "2640729",
  },
  {
    identifier: "Paris, Bibliothèque Mazarine 113",
    institution: "Bibliothèque Mazarine, Paris",
    city: "Paris",
    country: "France",
    lat: 48.8566,
    lon: 2.3522,
    geonameId: "2968815",
  },
  {
    identifier: "Tours, Bibliothèque municipale 117",
    institution: "Bibliothèque municipale de Tours",
    city: "Tours",
    country: "France",
    lat: 47.3941,
    lon: 0.6848,
    geonameId: "2991214",
  },
  {
    identifier: "Vatican City, Biblioteca Apostolica Vaticana, Pal. lat. 51",
    institution: "Biblioteca Apostolica Vaticana",
    city: "Vatican City",
    country: "Vatican City",
    lat: 41.9029,
    lon: 12.4534,
    geonameId: "3164605",
  },
  {
    identifier: "Sankt Gallen, Stiftsbibliothek 57",
    institution: "Stiftsbibliothek Sankt Gallen",
    city: "Sankt Gallen",
    country: "Switzerland",
    lat: 47.4235,
    lon: 9.3745,
    geonameId: "2659811",
  },
  {
    identifier: "Valenciennes, Bibliothèque municipale 73",
    institution: "Bibliothèque municipale de Valenciennes",
    city: "Valenciennes",
    country: "France",
    lat: 50.3594,
    lon: 3.525,
    geonameId: "2983992",
  },
  {
    identifier: "Laon, Bibliothèque municipale, 73",
    institution: "Bibliothèque municipale de Laon",
    city: "Laon",
    country: "France",
    lat: 49.5633,
    lon: 3.6244,
    geonameId: "3024635",
  },
];

// Unique cities for quick reference
export const uniqueCities = Object.fromEntries(
  manuscriptLocations.map((loc) => [loc.geonameId, { city: loc.city, lat: loc.lat, lon: loc.lon }])
);

/**
 * Returns a IIIF navPlace-compatible GeoJSON FeatureCollection for a subset of locations.
 */
export function toNavPlaceFeatureCollection(
  locations: ManuscriptLocation[],
  baseId: string
) {
  return {
    id: `${baseId}/feature-collection`,
    type: "FeatureCollection" as const,
    features: locations.map((loc, idx) => ({
      id: `${baseId}/feature/${idx}`,
      type: "Feature" as const,
      properties: {
        label: { en: [`${loc.identifier} — ${loc.institution}`] },
        identifier: loc.identifier,
        institution: loc.institution,
        city: loc.city,
        country: loc.country,
        geonameId: loc.geonameId,
      },
      geometry: {
        type: "Point" as const,
        coordinates: [loc.lon, loc.lat],
      },
    })),
  };
}
