import { Line } from './Line';

export type RouteSegment = {
  /**
   * `enter` = enter to `line` at this `station`
   *
   * `switch` = switch to `line` at this `station`
   *
   * `exit` = exit `line` at `station`
   */

  action: 'enter' | 'switch' | 'exit';
  station: string;
  line: Line;
};

export type Route = RouteSegment[];