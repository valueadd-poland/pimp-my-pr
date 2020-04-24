// Units are represented by the value of hours within it.
// Unfortunately, values on the right side must be a string to iterate over enum as key-value Object
export enum TimeUnit {
  Hour = '1',
  Day = '24',
  Week = '168',
  Month = '720',
  Year = '8760'
}
