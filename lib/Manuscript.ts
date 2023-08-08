/**
 * The Manuscript class represents a single manuscript in the application.
 */
export class Manuscript {
  // The properties of the manuscript, such as its title, identifier, alternative, city, etc.
  title: string;
  identifier: string;
  alternative: string;
  city: string;
  repository: string;
  origin: string;
  region: string;
  date: number;
  institution: string;
  provenance: string;
  "tpen://base-project": string;
  url: string;
  notes: string;

  /**
   * The constructor for the Manuscript class.
   * It takes in a partial manuscript object, which is an object that may only include some of the manuscript properties.
   * If the title property is missing, an error is thrown.
   * Other properties are set to safe default values if they are not included in the data object.
   *
   * @param {Partial<Manuscript>} data - The manuscript data object.
   * @throws {Error} If the title property is missing from the data object.
   */
  constructor(data: Partial<Manuscript>) {
    this.title = data.title || "";
    this.identifier = data.identifier || "";
    this.alternative = data.alternative || "";
    this.city = data.city || "";
    this.repository = data.repository || "";
    this.origin = data.origin || "";
    this.region = data.region || "";
    this.date = data.date || 0;
    this.institution = data.institution || "";
    this.provenance = data.provenance || "";
    this["tpen://base-project"] = data["tpen://base-project"] || "";
    this.url = data.url || "";
    this.notes = data.notes || "";
  }
}
