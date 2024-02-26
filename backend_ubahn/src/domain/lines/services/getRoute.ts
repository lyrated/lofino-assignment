import { Line } from '../types/Line';
import { Route } from '../types/Route';
import { getAccessibleLines } from './getAccessibleLines';

interface RouteSuggestion {
  line: Line;
  route: Route;
}

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
  const originLines: Line[] = allLines.filter((line) => {
    return line.stations.includes(originStation);
  });

  const destinationLines: Line[] = allLines.filter((line) => {
    return line.stations.includes(destinationStation);
  });

  if (originLines.length === 0 || destinationLines.length === 0) {
    throw new Error('Station not found.');
  }

  const routeSuggestion: RouteSuggestion[] = originLines.map((line) => {
    return {
      line: line,
      route: [
        {
          action: 'enter',
          station: originStation,
          line: line,
        },
      ],
    };
  });

  return findRoute(
    routeSuggestion,
    destinationStation,
    destinationLines,
    allLines
  );
}

function findRoute(
  routeSuggestion: RouteSuggestion[],
  destinationStation: string,
  destinationLines: Line[],
  allLines: Line[]
): Route {
  for (const suggestion of routeSuggestion) {
    let { line, route } = suggestion;

    if (line.stations.includes(destinationStation)) {
      route.push({
        action: 'exit',
        station: destinationStation,
        line: line,
      });
      return route;
    }

    for (const currentStation of line.stations) {
      // for simplicity only consider first matched line for solution
      const [matchedLine] = getAccessibleLines(
        line,
        currentStation,
        destinationLines
      );

      if (matchedLine) {
        route.push(
          {
            action: 'switch',
            station: currentStation,
            line: matchedLine,
          },
          {
            action: 'exit',
            station: destinationStation,
            line: matchedLine,
          }
        );
        return route;
      }

      const accessibleLines = getAccessibleLines(
        line,
        currentStation,
        allLines
      );

      if (accessibleLines.length === 0) {
        continue;
      }

      const newSuggestion: RouteSuggestion[] = accessibleLines.map((l) => {
        return {
          line: l,
          route: [
            ...route,
            {
              action: 'switch',
              station: currentStation,
              line: l,
            },
          ],
        };
      });

      findRoute(
        newSuggestion,
        destinationStation,
        destinationLines,
        accessibleLines
      );
    }
  }

  return [];
}
