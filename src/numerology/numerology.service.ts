import { Injectable } from '@nestjs/common';

export interface PredictionResult {
  prediction: string;
  luckyColor: string;
  luckyNumber: number;
  affirmation: string;
  luckyActivity: string;
  quote: string;
  focusArea: string;
}

export interface DailyPredictionResult extends PredictionResult {
  date: string;
  lifePath: number;
  dailyNumber: number;
  message: string;
}

@Injectable()
export class NumerologyService {
  getDailyPrediction(dob: string, dateStr?: string): DailyPredictionResult {
    const targetDate = dateStr ? new Date(dateStr) : new Date();
    const lifePath = this.calculateLifePath(dob);
    const dailyNumber = this.calculateDailyNumber(lifePath, targetDate);
    const prediction = this.generatePrediction(dailyNumber);

    return {
      date: targetDate.toISOString().split('T')[0],
      lifePath,
      dailyNumber,
      ...prediction,
      message: 'Daily prediction generated successfully',
    };
  }

  private calculateLifePath(dob: string): number {
    const digits = dob.replace(/[^0-9]/g, '');
    let sum = [...digits].reduce((acc, digit) => acc + +digit, 0);
    while (![11, 22, 33].includes(sum) && sum > 9) {
      sum = [...sum.toString()].reduce((a, b) => +a + +b, 0);
    }
    return sum;
  }

  private calculateDailyNumber(lifePath: number, date: Date): number {
    let sum = date.getDate() + (date.getMonth() + 1) + date.getFullYear() + lifePath;
    while (sum > 9) {
      sum = Math.floor(sum / 10) + (sum % 10);
    }
    return sum;
  }

  private generatePrediction(dailyNumber: number): PredictionResult {
    const map: Record<number, PredictionResult> = {
      1: {
        prediction: 'Today is a day for new beginnings and taking initiative.',
        luckyColor: 'Red',
        luckyNumber: 1,
        affirmation: 'I am bold and courageous.',
        luckyActivity: 'Start something new.',
        quote: 'The future belongs to those who believe in the beauty of their dreams.',
        focusArea: 'Initiative',
      },
      2: {
        prediction: 'Today is a day for communication and collaboration.',
        luckyColor: 'Blue',
        luckyNumber: 2,
        affirmation: 'I communicate effectively and listen well.',
        luckyActivity: 'Have a conversation with a friend.',
        quote: 'The more you listen, the more you learn.',
        focusArea: 'Communication',
      },
      3: {
        prediction: 'Today is a day for creativity and expression.',
        luckyColor: 'Green',
        luckyNumber: 3,
        affirmation: 'I express myself creatively and freely.',
        luckyActivity: 'Write a poem or paint a picture.',
        quote: 'Creativity is the greatest form of expression.',
        focusArea: 'Creativity',
      },
      4: {
        prediction: 'Today is a day for stability and organization.',
        luckyColor: 'Yellow',
        luckyNumber: 4,
        affirmation: 'I stay organized and grounded.',
        luckyActivity: 'Clean your workspace.',
        quote: 'Organization is the key to success.',
        focusArea: 'Organization',
      },
      5: {
        prediction: 'Today is a day for adventure and change.',
        luckyColor: 'Orange',
        luckyNumber: 5,
        affirmation: 'I embrace change and new experiences.',
        luckyActivity: 'Try a new activity or hobby.',
        quote: 'The only way to do great work is to love what you do.',
        focusArea: 'Adventure',
      },
      6: {
        prediction: 'Today is a day for family and relationships.',
        luckyColor: 'Pink',
        luckyNumber: 6,
        affirmation: 'I nurture and care for my relationships.',
        luckyActivity: 'Spend time with family or friends.',
        quote: 'The best way to love someone is to be there for them.',
        focusArea: 'Family',
      },
      7: {
        prediction: 'Today is a day for introspection and spiritual growth.',
        luckyColor: 'Purple',
        luckyNumber: 7,
        affirmation: 'I seek wisdom and inner peace.',
        luckyActivity: 'Practice meditation or yoga.',
        quote: 'The more you know yourself, the more you know the universe.',
        focusArea: 'Introspection',
      },
      8: {
        prediction: 'Today is a day for financial stability and abundance.',
        luckyColor: 'Gold',
        luckyNumber: 8,
        affirmation: 'I manage my finances wisely and attract wealth.',
        luckyActivity: 'Review your budget or invest in something.',
        quote: 'Money is energy, and energy flows where attention goes.',
        focusArea: 'Finance',
      },
      9: {
        prediction: 'Today is a day for completion and letting go.',
        luckyColor: 'Silver',
        luckyNumber: 9,
        affirmation: 'I release what no longer serves me.',
        luckyActivity: 'Clear your space or declutter.',
        quote: 'The only way to do great work is to love what you do.',
        focusArea: 'Completion',
      },
    };

    return (
      map[dailyNumber] || {
        prediction: 'Stay grounded and balanced today.',
        luckyColor: 'Gray',
        luckyNumber: dailyNumber,
        affirmation: 'I flow with the rhythm of life.',
        luckyActivity: 'Reflect quietly.',
        quote: 'Balance is not something you find, it’s something you create.',
        focusArea: 'Balance',
      }
    );
  }
}
