export interface HalLink {
  /**
   * Its presence indicates that the link is to be deprecated (i.e.
   * removed) at a future date.  Its value is a URL that SHOULD provide
   * further information about the deprecation.
   *
   * A client SHOULD provide some notification (for example, by logging a
   * warning message) whenever it traverses over a link that has this
   * property. The notification SHOULD include the deprecation property's
   * value so that a client manitainer can easily find information about
   * the deprecation.
   */
  deprecation?: string;
  /**
   * Its value is either a URI [RFC3986](https://tools.ietf.org/html/rfc3986)
   * or a URI Template [RFC6570](https://tools.ietf.org/html/rfc6570).
   *
   * If the value is a URI Template then the Link Object SHOULD have a
   * "templated" attribute whose value is true.
   */
  href: string;
  /**
   * Its value is a string and is intended for indicating the language of
   * the target resource (as defined by [RFC5988](https://tools.ietf.org/html/rfc5988)).
   */
  hreflang?: string;
  /**
   * Its value MAY be used as a secondary key for selecting Link Objects
   * which share the same relation type.
   */
  name?: string;
  /**
   * Its value is a string which is a URI that hints about the profile (as
   * defined by [I-D.wilde-profile-link]) of the target resource.
   */
  profile?: string;
  /**
   * Its value is boolean and SHOULD be true when the Link Object's "href"
   * property is a URI Template.
   *
   * Its value SHOULD be considered false if it is undefined or any other
   * value than true.
   */
  templated?: boolean;
  /**
   * Its value is a string and is intended for labelling the link with a
   * human-readable identifier (as defined by [RFC5988](https://tools.ietf.org/html/rfc5988)).
   */
  title?: string;
  /**
   * Its value is a string used as a hint to indicate the media type
   * expected when dereferencing the target resource.
   */
  type?: string;
}
