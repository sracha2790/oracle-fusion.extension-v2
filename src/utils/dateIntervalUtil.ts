export class DateIntervalUtil {
  async getIntervalTimes(
    last: string,
    dtPattern: string,
    interval: number,
    period: string,
    prior: number,
    future: number,
    combinedTenth: boolean,
  ) {
    let milliseconds = 1;
    if (period == 'day') {
      milliseconds = 86400 * 1000;
    } else if (period == 'hour') {
      milliseconds = 3600 * 1000;
    }
    if (period == 'minute') {
      milliseconds = 60 * 1000;
    } else if (period == 'second') {
      milliseconds = 1000;
    } else if (period == 'millisecond') {
      milliseconds = 1;
    }

    let patterns = ['yyyy', 'yy', 'MM', 'dd', 'HH', 'mm', 'ss', 'SSS'];
    let usePatterns = [];

    for (let ptn of patterns) {
      if (dtPattern.includes(ptn)) {
        usePatterns.push(ptn);
      }
    }

    let startDt;
    if (last && typeof last == 'string' && last.trim() != '') {
      try {
        startDt = new Date(last);
      } catch (e) {
        console.log('Caught : ' + e);
        console.error(e);
      }
    } else {
      startDt = new Date();
    }
    if (prior > 0) {
      startDt = new Date(startDt.getTime() - milliseconds * prior);
    }
    /* startDate became prior from the last date, so add that prior for the end value */
    let endDate = new Date(startDt.getTime() + milliseconds * (prior + future + 1));
    let runnDate: Date = startDt;
    let dateSuffixes = [];
    while (runnDate.getTime() < endDate.getTime()) {
      let str = dtPattern;
      for (let ptn of usePatterns) {
        let val = '';
        if (ptn == 'yyyy') {
          val = runnDate.getFullYear().toString();
        } else if (ptn == 'yy') {
          val = runnDate.getFullYear().toString().substr(-2);
        } else if (ptn == 'MM') {
          val = runnDate.getMonth() < 10 ? '0' + (runnDate.getMonth() + 1) : '' + (runnDate.getMonth() + 1);
        } else if (ptn == 'dd') {
          val = runnDate.getDate() < 10 ? '0' + runnDate.getDate() : '' + runnDate.getDate();
        } else if (ptn == 'HH') {
          val = runnDate.getHours() < 10 ? '0' + runnDate.getHours() : '' + runnDate.getHours();
        } else if (ptn == 'mm') {
          val = runnDate.getMinutes() < 10 ? '0' + runnDate.getMinutes() : '' + runnDate.getMinutes();
        } else if (ptn == 'ss') {
          val = runnDate.getSeconds() < 10 ? '0' + runnDate.getSeconds() : '' + runnDate.getSeconds();
        } else if (ptn == 'SSS') {
          val = runnDate.getSeconds() < 10 ? '0' + runnDate.getMilliseconds() : '' + runnDate.getMilliseconds();
        }
        str = str.replace(ptn, val);
      }
      dateSuffixes.push(str);
      runnDate = new Date(runnDate.getTime() + milliseconds * interval);
    }
    if (combinedTenth) {
      for (let idx = 0; idx < dateSuffixes.length; idx++) {
        dateSuffixes[idx] = dateSuffixes[idx].substr(0, dateSuffixes[idx].length - 1);
      }
    }
    dateSuffixes = dateSuffixes.filter((v, i, a) => a.indexOf(v) === i);
    return dateSuffixes;
  }
}