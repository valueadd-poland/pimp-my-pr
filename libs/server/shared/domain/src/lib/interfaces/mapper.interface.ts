export interface Mapper<I, O> {
  mapFrom(param: I): O;
  mapTo(param: O): I;
}
