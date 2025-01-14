import { Component, Input, SimpleChanges } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-sale-timer',
    imports: [TranslateModule],
    templateUrl: './sale-timer.component.html',
    styleUrl: './sale-timer.component.scss'
})
export class SaleTimerComponent {
  @Input() startDate: string | null = null;
  @Input() endDate: string | null = null;
  @Input() title: string | null = null;

  public remainingTime: any = null;
  private timerInterval: any = null;

  ngOnChanges(changes: SimpleChanges) {
    this.clearTimer();

    if (changes['startDate']?.currentValue && changes['endDate']?.currentValue) {
      this.startDate = this.parseDate(changes['startDate'].currentValue);
      this.endDate = this.parseDate(changes['endDate'].currentValue);

      if (this.startDate && this.endDate && new Date(this.endDate).getTime() > Date.now()) {
        this.updateTimer();

        this.timerInterval = setInterval(() => {
          this.updateTimer();
        }, 1000);
      }
    }
  }

  private updateTimer() {
    if (this.startDate && this.endDate) {
      const now = Date.now();
      const startDateTime = new Date(this.startDate).getTime();
      const endDateTime = new Date(this.endDate).getTime();

      if (now >= endDateTime) {
        this.remainingTime = {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0
        };
        this.clearTimer();
        return;
      }

      const targetDate = now < startDateTime ? startDateTime : endDateTime;
      this.calculateTimeDifference(targetDate);
    }
  }

  private calculateTimeDifference(targetDate: number) {
    const now = Date.now();
    const timeDiff = targetDate - now;

    this.remainingTime = {
      days: Math.floor(timeDiff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((timeDiff % (1000 * 60)) / 1000)
    };
  }

  private parseDate(dateStr: string): string | null {
    // Ensure the date is in ISO format
    const parsedDate = new Date(dateStr);
    return isNaN(parsedDate.getTime()) ? null : parsedDate.toISOString();
  }

  private clearTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
    this.remainingTime = null;
  }

  ngOnDestroy() {
    this.clearTimer();
  }
}
