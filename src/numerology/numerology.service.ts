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

export interface MonthlyReportResult {
  title: string;
  summary: string;
  focusThemes: string[];
  challenges: string[];
  guidance: string;
  luckyColor: string;
  luckyNumber: number;
  affirmation: string;
  quote: string;
  focusArea: string;
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

  getMonthlyOverview(
    dob: string,
    monthStr?: string,
  ): {
    month: string;
    lifePath: number;
    monthlyNumber: number;
    message: string;
  } & MonthlyReportResult {
    const targetMonth = monthStr ? new Date(`${monthStr}-01`) : new Date();
    const year = targetMonth.getFullYear();
    const month = targetMonth.getMonth() + 1;

    const lifePath = this.calculateLifePath(dob);
    const total = month + this.sumDigits(year) + lifePath;
    const monthlyNumber = this.reduceToSingleDigit(total);

    const report = this.generateMonthlyReport(monthlyNumber);

    return {
      month: `${year}-${String(month).padStart(2, '0')}`,
      lifePath,
      monthlyNumber,
      ...report,
      message: 'Monthly overview prediction generated successfully',
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

  private sumDigits(n: number): number {
    return [...n.toString()].reduce((sum, digit) => sum + +digit, 0);
  }

  private reduceToSingleDigit(n: number): number {
    while (![11, 22, 33].includes(n) && n > 9) {
      n = [...n.toString()].reduce((sum, digit) => sum + +digit, 0);
    }
    return n;
  }

  private generateMonthlyReport(number: number): MonthlyReportResult {
    const map: Record<number, MonthlyReportResult> = {
      1: {
        title: 'Leadership and New Beginnings',
        summary: 'This month encourages you to take the lead and step into new opportunities. Independence and confidence will bring rewards.',
        focusThemes: ['Initiative', 'Courage', 'Self-Reliance'],
        challenges: ['Impatience', 'Aggression', 'Loneliness'],
        guidance: 'Be bold but not reckless. Use your energy to inspire others.',
        luckyColor: 'Red',
        luckyNumber: 1,
        affirmation: 'I lead with courage and clarity.',
        quote: 'The journey of a thousand miles begins with one step. – Lao Tzu',
        focusArea: 'Action',
      },

      6: {
        title: 'Emotional Growth and Service',
        summary: 'This month brings a nurturing energy centered around family, community, and emotional healing.',
        focusThemes: ['Family support', 'Emotional balance', 'Healing'],
        challenges: [
          'Overcommitting',
          'Neglecting self-care',
          'People-pleasing',
        ],
        guidance: 'Support others but don’t lose yourself. Make time for emotional boundaries.',
        luckyColor: 'Pink',
        luckyNumber: 6,
        affirmation: 'I give and receive love freely. I am a source of peace.',
        quote: 'The best way to find yourself is to lose yourself in the service of others. – Gandhi',
        focusArea: 'Care',
      },

      8: {
        title: 'Success and Ambition',
        summary: 'This is a month of career focus and financial empowerment. Stay disciplined and make confident decisions.',
        focusThemes: ['Goals', 'Authority', 'Discipline'],
        challenges: ['Burnout', 'Power struggles', 'Material obsession'],
        guidance: 'Channel your ambition with balance. Avoid neglecting relationships.',
        luckyColor: 'Gold',
        luckyNumber: 8,
        affirmation: 'I am capable, focused, and ready to succeed.',
        quote: 'Success is not final; failure is not fatal: It is the courage to continue that counts. – Winston Churchill',
        focusArea: 'Achievement',
      },

      9: {
        title: 'Completion and Compassion',
        summary: 'This month invites closure, forgiveness, and deeper empathy. Let go of what no longer serves you.',
        focusThemes: ['Compassion', 'Release', 'Transformation'],
        challenges: ['Emotional overwhelm', 'Resentment', 'Over-giving'],
        guidance: 'Wrap up old cycles with grace. Give back to others through your experiences.',
        luckyColor: 'Silver',
        luckyNumber: 9,
        affirmation: 'I am open to endings and embrace transformation.',
        quote: 'What you leave behind is not what is engraved in stone monuments, but what is woven into the lives of others. – Pericles',
        focusArea: 'Closure',
      },
      // Add more for 2–5, 7, 11, etc.
    };

    return map[number] || {
      title: 'Balanced Growth',
      summary: 'This is a neutral month offering space for reflection and subtle progress.',
      focusThemes: ['Stability', 'Patience'],
      challenges: ['Indecision', 'Stagnation'],
      guidance: 'Keep steady. Sometimes slow is the fastest way forward.',
      luckyColor: 'Gray',
      luckyNumber: number,
      affirmation: 'I grow quietly, consistently, and confidently.',
      quote: 'Balance is not something you find; it’s something you create.',
      focusArea: 'Reflection',
    };
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

    return map[dailyNumber] || {
      prediction: 'Stay grounded and balanced today.',
      luckyColor: 'Gray',
      luckyNumber: dailyNumber,
      affirmation: 'I flow with the rhythm of life.',
      luckyActivity: 'Reflect quietly.',
      quote: 'Balance is not something you find, it’s something you create.',
      focusArea: 'Balance',
    };
  }
}
