import { HalLink } from './hal-link.interface';

export interface HalResource<
  Embedded extends {
    [key: string]: any | any[];
  } = {
    [key: string]: HalResource | HalResource[];
  },
  Links extends string = any
> {
  /**
   * It is an object whose property names are link relation types (as
   * defined by [RFC5988](https://tools.ietf.org/html/rfc5988)) and values
   * are either a Resource Object or an array of Resource Objects.
   *
   * Embedded Resources MAY be a full, partial, or inconsistent version of
   * the representation served from the target URI.
   */
  _embedded?: Embedded;
  /**
   * It is an object whose property names are link relation types (as
   * defined by [RFC5988](https://tools.ietf.org/html/rfc5988)) and values
   * are either a Link Object or an array of Link Objects.
   * The subject resource of these links is the Resource Object
   * of which the containing "_links" object is a property.
   */
  links: { [L in Links]?: HalLink };
}
