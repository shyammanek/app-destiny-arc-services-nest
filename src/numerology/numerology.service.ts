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
  tips: string[];
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
        title: 'Ignite Your Leadership',
        summary: 'Step boldly into new beginnings. This month is your launchpad—embrace independence, set clear intentions, and let your confidence inspire those around you.',
        focusThemes: ['Initiative', 'Courage', 'Self-Reliance'],
        challenges: ['Impatience', 'Aggression', 'Loneliness'],
  guidance: 'Lead by example, but remember to listen. Channel your energy into projects that excite you and build momentum for the year ahead.',
  luckyColor: 'Red',
  luckyNumber: 1,
  affirmation: 'I am a catalyst for positive change.',
  quote: 'Start where you are. Use what you have. Do what you can. – Arthur Ashe',
  focusArea: 'Taking Action',
        tips: [
          'Set one bold goal and take the first step.',
          'Practice self-affirmation each morning.',
          'Reach out to someone who inspires you.',
        ],
      },
      6: {
        title: 'Nurture & Heal',
  summary: 'A month to deepen connections and foster emotional growth. Prioritize family, community, and your own healing journey. Your compassion is your superpower.',
  focusThemes: ['Family Support', 'Emotional Balance', 'Healing'],
  challenges: ['Overcommitting', 'Neglecting self-care', 'People-pleasing'],
  guidance: 'Support others, but set healthy boundaries. Make time for self-care and let your kindness ripple outward.',
  luckyColor: 'Pink',
  luckyNumber: 6,
  affirmation: 'I nurture myself and others with love and respect.',
  quote: 'To love oneself is the beginning of a lifelong romance. – Oscar Wilde',
  focusArea: 'Compassion in Action',
        tips: [
          'Schedule a self-care day this month.',
          'Volunteer or help a friend in need.',
          'Express gratitude to your loved ones.',
        ],
      },
      8: {
        title: 'Ambition & Achievement',
  summary: 'Harness your drive for success. This month is about setting ambitious goals, making strategic moves, and celebrating your progress—without losing sight of what matters most.',
  focusThemes: ['Goals', 'Authority', 'Discipline'],
  challenges: ['Burnout', 'Power Struggles', 'Material Obsession'],
  guidance: 'Balance ambition with self-care. Recognize your achievements and share your success with others.',
  luckyColor: 'Gold',
  luckyNumber: 8,
  affirmation: 'I am focused, disciplined, and open to abundance.',
  quote: 'Success is liking yourself, liking what you do, and liking how you do it. – Maya Angelou',
  focusArea: 'Purposeful Progress',
        tips: [
          'Review your financial goals and adjust as needed.',
          'Celebrate a recent win, no matter how small.',
          'Delegate tasks to avoid burnout.',
        ],
      },
      9: {
        title: 'Release & Renew',
  summary: 'Let go of what no longer serves you. This is a month for closure, forgiveness, and making space for new blessings. Compassion and empathy will guide your way.',
  focusThemes: ['Compassion', 'Release', 'Transformation'],
  challenges: ['Emotional Overwhelm', 'Resentment', 'Over-giving'],
  guidance: 'Reflect on what you need to release. Practice forgiveness and share your wisdom with others.',
  luckyColor: 'Silver',
  luckyNumber: 9,
  affirmation: 'I embrace endings as opportunities for growth.',
  quote: 'Sometimes letting things go is an act of far greater power than defending or hanging on. – Eckhart Tolle',
  focusArea: 'Letting Go',
        tips: [
          'Declutter your space or digital life.',
          'Write a letter of forgiveness (even if you don’t send it).',
          'Share a lesson you’ve learned with someone else.',
        ],
      },
      // Add more for 2–5, 7, 11, etc.
    };

    return (
      map[number] || {
        title: 'Balanced Growth',
        summary: 'A month for steady progress and mindful reflection. Embrace patience and let small steps lead to meaningful change.',
        focusThemes: ['Stability', 'Patience'],
        challenges: ['Indecision', 'Stagnation'],
        guidance: 'Stay consistent and trust the process. Growth often happens quietly.',
        luckyColor: 'Gray',
        luckyNumber: number,
        affirmation: 'I grow quietly, consistently, and confidently.',
        quote: 'Balance is not something you find; it’s something you create.',
        focusArea: 'Reflection',
        tips: [
          'Keep a journal of your progress.',
          'Set one small, achievable goal.',
          'Practice mindfulness or meditation.',
        ],
      }
    );
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
