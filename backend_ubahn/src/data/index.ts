/**
 * Contains the read raw data from `lines.json`.
 */

import { Line } from '../domain/lines/types/Line';

export const lines = require('./lines.json') as Line[];
