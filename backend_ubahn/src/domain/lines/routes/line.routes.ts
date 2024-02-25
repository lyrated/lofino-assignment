import express from 'express';

import { lines } from '../../../data';
import { getAccessibleLines } from '../services/getAccessibleLines';
import { getLineById } from '../services/getLineById';
import { getNextStops } from '../services/getNextStops';
import { Direction } from '../types/Direction';

const router = express.Router();

router.get(
  '/',
  /**
   * returns an array of line information from the route "/"":
   *
   * ```json
   * {
   *  "name": "string";
   *  "color": "string";
   * }
   * ```
   */
  (req, res) => {
    const responseItems = lines.map((line) => ({
      name: line.name,
      color: line.color,
    }));
    res.send(responseItems);
  }
);

router.get(
  '/:id',
  /**
   * returns a specific line by id, e.g. `GET /lines/U8`
   */
  (req, res) => {
    // find the specific line by key
    const requestedLineId = req.params.id;

    const requestedLine = getLineById(requestedLineId, lines);

    if (!requestedLine) {
      res.sendStatus(404);
      return;
    }

    res.send(requestedLine);
  }
);

router.get(
  '/:line/:station/changes',
  /**
   * returns all accessible lines of a specific station as Line object - e.g. GET /lines/U2/Stadtmitte/changes
   */
  (req, res) => {
    const requestedLineId = req.params.line;
    const requestedStation = req.params.station;
    const requestedLine = getLineById(requestedLineId, lines);

    if (!requestedLine) {
      res.sendStatus(404);
      return;
    }

    const accessibleLines = getAccessibleLines(
      requestedLine,
      requestedStation,
      lines
    );
    res.send(accessibleLines);
  }
);

router.get(
  '/:line/:station/next',
  /**
   * returns n stops from a specific station - e.g. GET /lines/U5/Weberwiese/next
   */
  (req, res) => {
    const requestedLinedId = req.params.line;
    const requestedStation = req.params.station;
    const requestedLine = getLineById(requestedLinedId, lines);

    // these params should be properly validated
    const requestedDirection = req.query.direction as Direction;
    const requestedAmount =
      typeof req.query.n === 'string' ? parseInt(req.query.n) : undefined;

    if (!requestedLine) {
      res.sendStatus(404);
      return;
    }

    try {
      const nextStations = getNextStops(
        requestedLine,
        requestedStation,
        requestedDirection,
        requestedAmount
      );
      res.send(nextStations);
    } catch (e) {
      res.sendStatus(404);
    }
  }
);

export const lineRoutes = router;
