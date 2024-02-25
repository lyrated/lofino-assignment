import { Line } from '../types/Line';
import { Route } from '../types/Route';
import { getAccessibleLines } from './getAccessibleLines';

/**
 * returns the `Route` from `originStation` to `destinationStation`.
 * If there are multiple possible routes, you can return any of those routes.
 *
 * You can assume `allLines` to be the sample data included in this project, which means you can make the following assumptions:
 *  - all stations are interconnected, so it should always be possible to find a valid Route.
 *  - there's a finite set of stations with a size of around ~100
 *
 * @returns a structure like e.g.
 * ```json
 * [{
 *   "action": "enter",
 *   "station": "Otisstraße",
 *   "line": (U6)
 * }, {
 *   "action": "switch",
 *   "station": "Leopoldplatz",
 *   "line": (U9)
 *  }, {
 *   "action": "exit",
 *   "station": "Hansaplatz",
 *   "line": (U9)
 *  }]
 * ```
 */
export function getRoute(
  originStation: string,
  destinationStation: string,
  allLines: Line[]
): Route {
  let result: Route = [];
  return findRoute(originStation, destinationStation, allLines, result);
}

function findRoute(
  originStation: string,
  destinationStation: string,
  allLines: Line[],
  result: Route
) {
  const linesOrigin: Line[] = allLines.filter((line) => {
    return line.stations.includes(originStation);
  });
  const linesDestination: Line[] = allLines.filter((line) => {
    return line.stations.includes(destinationStation);
  });

  if (linesOrigin.length === 0 || linesDestination.length === 0) {
    throw new Error('Origin or destination not found.');
  }

  let [sameLine] = linesOrigin.filter((line) => {
    return linesDestination.find((l) => l.name === line.name);
  });

  if (sameLine) {
    result = [
      ...result,
      {
        action: result.length === 0 ? 'enter' : 'switch',
        station: originStation,
        line: sameLine,
      },
      {
        action: 'exit',
        station: destinationStation,
        line: sameLine,
      },
    ];

    return result;
  }

  for (let line of linesOrigin) {
    for (let station of line.stations) {
      // search for a line that matches destination
      const matchedLines = getAccessibleLines(line, station, linesDestination);

      if (matchedLines.length > 0) {
        result = [
          ...result,
          {
            action: result.length === 0 ? 'enter' : 'switch',
            station: originStation,
            line: line,
          },
        ];
        result = findRoute(station, destinationStation, allLines, result);
      }
    }
  }

  // TODO: repeat with a different station that has access to another line

  return result;
}
