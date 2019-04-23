import { Component, Input } from '@angular/core';

export interface StatusEvent {
  startTime: Date;
  status: boolean;
}

export interface StatusEventWithDuration {
  startTime: Date;
  endTime?: Date;
  duration?: number;
  status: boolean;
}

@Component({
  selector: 'pm-status-chart',
  templateUrl: './status-chart.component.html',
  styleUrls: ['./status-chart.component.scss'],
})
export class StatusChartComponent {
  @Input() public set data(value: StatusEvent[]) {
    this.normalizedData = this.calculateEventsDuration(value);
  }
  private normalizedData: StatusEventWithDuration[];

  public getData() {
    return this.normalizedData;
  }

  private calculateEventsDuration(data: StatusEvent[]): StatusEventWithDuration[] {
    const seed: StatusEventWithDuration[] = [];
    const currentTime = new Date();
    return data
      .reduce((acc, cur, index) => {
        if (acc.length === 0) {
          return [cur];
        }

        acc[index - 1] = {
          ...acc[index - 1],
          endTime: cur.startTime,
          duration: (cur.startTime.getTime() - acc[index - 1].startTime.getTime()) / 1000,
        };

        return acc.concat(cur);
      }, seed)
      .map((statusEventWithDuration: StatusEventWithDuration) =>
        statusEventWithDuration.endTime === undefined
          ? {
              ...statusEventWithDuration,
              endTime: currentTime,
              duration: (currentTime.getTime() - statusEventWithDuration.startTime.getTime()) / 1000,
            }
          : statusEventWithDuration,
      );
  }

  public getTooltipInfo(statusEventWithDuration: StatusEventWithDuration) {
    const downTime = 'Downtime';
    const uptime = 'Uptime';
    return `${
      statusEventWithDuration.status ? uptime : downTime
    } started at ${statusEventWithDuration.startTime.toLocaleString()} and last for ${Math.round(
      statusEventWithDuration.duration / 60,
    )} minutes`;
  }
}
