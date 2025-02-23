import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimeHandlerService {


  /**
   * Gets the current date and time as a timestamp.
   *
   * @returns {number} The current date and time in seconds since the Unix epoch.
   */
  getNowAsTimestamp(): number {
    return this.toTimestamp(new Date());
  }


  /**
   * Converts a Date object to a Unix timestamp (seconds since epoch).
   *
   * @param date - The Date object to convert.
   * @returns The Unix timestamp corresponding to the given date.
   */
  toTimestamp(date: Date): number {
    return Math.round(date.getTime() / 1000);
  }
}
