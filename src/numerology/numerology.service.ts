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
  detailedGuidance: string;
  monthlyInsights: string[];
  energyLevel: string;
  bestDays: string[];
  cautionDays: string[];
}

export interface YearlyReportResult {
  title: string;
  year: number;
  lifePath: number;
  yearlyNumber: number;
  summary: string;
  detailedPrediction: string;
  majorThemes: string[];
  opportunities: string[];
  challenges: string[];
  guidance: string;
  luckyColor: string;
  luckyNumber: number;
  affirmation: string;
  quote: string;
  focusArea: string;
  tips: string[];
  monthlyHighlights: string[];
  spiritualGrowth: string;
  careerInsights: string;
  relationshipInsights: string;
  healthGuidance: string;
  financialOutlook: string;
  personalDevelopment: string;
  futureVision: string;
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

  getYearlyPrediction(
    dob: string,
    yearStr?: string,
  ): {
    year: number;
    lifePath: number;
    yearlyNumber: number;
    message: string;
  } & YearlyReportResult {
    const targetYear = yearStr ? parseInt(yearStr) : new Date().getFullYear();
    const lifePath = this.calculateLifePath(dob);
    const total = this.sumDigits(targetYear) + lifePath;
    const yearlyNumber = this.reduceToSingleDigit(total);

    const report = this.generateYearlyReport(yearlyNumber, targetYear);

    return {
      ...report,
      year: targetYear,
      lifePath,
      yearlyNumber,
      message: 'Yearly prediction generated successfully',
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
        title: 'Ignite Your Leadership: A Month of Bold New Beginnings',
        summary: 'This month marks a powerful turning point in your journey—a cosmic invitation to step into your authentic power and lead with unwavering confidence. The universe is aligning to support your boldest dreams and most ambitious visions. This is your moment to break free from limitations, embrace your natural leadership abilities, and inspire others through your courageous actions. The energy of new beginnings surrounds you, creating a fertile ground for planting seeds of transformation that will bloom throughout the year.',
        focusThemes: ['Initiative', 'Courage', 'Self-Reliance', 'Innovation', 'Personal Power'],
        challenges: ['Impatience', 'Aggression', 'Loneliness', 'Overwhelm', 'Perfectionism'],
        guidance: 'Lead by example, but remember to listen. Channel your energy into projects that excite you and build momentum for the year ahead. Your natural charisma and determination will attract opportunities and people who resonate with your vision.',
        detailedGuidance: 'This month, the universe is calling you to step into your role as a natural leader and innovator. Your life path number 1 energy is amplified, giving you the courage to pursue your most ambitious goals. Focus on taking decisive action rather than overthinking. Your intuition is particularly strong now—trust it completely. This is an excellent time to start new projects, launch creative endeavors, or take on leadership roles that challenge you to grow. Remember that true leadership comes from serving others while staying true to your authentic self.',
        monthlyInsights: [
          'Your confidence will reach new heights this month',
          'New opportunities will present themselves in unexpected ways',
          'Your natural magnetism will attract supportive people',
          'This is an ideal time for career advancement or business ventures',
          'Your creative energy will be at its peak'
        ],
        energyLevel: 'High - Perfect for taking action and making bold moves',
        bestDays: ['1st', '10th', '19th', '28th'],
        cautionDays: ['4th', '13th', '22nd', '31st'],
        luckyColor: 'Red',
        luckyNumber: 1,
        affirmation: 'I am a powerful catalyst for positive change, leading with wisdom and compassion.',
        quote: 'Start where you are. Use what you have. Do what you can. The future belongs to those who believe in the beauty of their dreams. – Arthur Ashe',
        focusArea: 'Taking Decisive Action and Inspiring Others',
        tips: [
          'Set one bold goal and take the first step within 48 hours',
          'Practice power poses and self-affirmation each morning',
          'Reach out to someone who inspires you and share your vision',
          'Document your ideas and insights in a leadership journal',
          'Take calculated risks that align with your core values',
          'Surround yourself with people who challenge and support your growth'
        ],
      },
      6: {
        title: 'Nurture & Heal: A Month of Deep Connection and Emotional Growth',
        summary: 'This month brings a profound opportunity to deepen your relationships and foster emotional healing on multiple levels. The universe is calling you to embrace your role as a natural nurturer and healer, both for yourself and others. Your compassion and empathy will be your greatest assets, creating ripples of positive change in your community. This is a time to prioritize family bonds, strengthen friendships, and invest in your own emotional well-being. The energy of love and healing surrounds you, making it the perfect time to address old wounds and create space for new, meaningful connections.',
        focusThemes: ['Family Support', 'Emotional Balance', 'Healing', 'Compassion', 'Community Service'],
        challenges: ['Overcommitting', 'Neglecting self-care', 'People-pleasing', 'Emotional overwhelm', 'Boundary setting'],
        guidance: 'Support others, but set healthy boundaries. Make time for self-care and let your kindness ripple outward. Your natural nurturing abilities will be amplified this month, but remember that you cannot pour from an empty cup.',
        detailedGuidance: 'The number 6 energy brings a powerful focus on love, family, and healing this month. You\'ll find yourself naturally drawn to care for others, but it\'s crucial to maintain balance. This is an excellent time for family gatherings, relationship counseling, or healing work. Your intuitive abilities are heightened, allowing you to sense what others need before they ask. Use this gift wisely and remember to extend the same compassion to yourself. This month may bring opportunities to heal old family wounds or strengthen bonds with loved ones.',
        monthlyInsights: [
          'Your relationships will deepen significantly this month',
          'Healing opportunities will present themselves naturally',
          'Your home environment will become more harmonious',
          'You\'ll feel a strong pull toward service and helping others',
          'Emotional breakthroughs are likely to occur'
        ],
        energyLevel: 'Moderate to High - Focus on nurturing and healing',
        bestDays: ['6th', '15th', '24th'],
        cautionDays: ['3rd', '12th', '21st', '30th'],
        luckyColor: 'Pink',
        luckyNumber: 6,
        affirmation: 'I nurture myself and others with love, respect, and healthy boundaries.',
        quote: 'To love oneself is the beginning of a lifelong romance. The greatest gift you can give someone is your presence. – Oscar Wilde',
        focusArea: 'Compassion in Action and Emotional Healing',
        tips: [
          'Schedule a dedicated self-care day this month',
          'Volunteer or help a friend in need',
          'Express gratitude to your loved ones daily',
          'Create a healing space in your home',
          'Practice active listening with family and friends',
          'Set clear boundaries to protect your energy'
        ],
      },
      8: {
        title: 'Ambition & Achievement: A Month of Strategic Success and Abundance',
        summary: 'This month brings powerful opportunities for material success and professional advancement. The universe is aligning to support your most ambitious goals and financial aspirations. Your natural leadership abilities and business acumen will be at their peak, making this an ideal time for career moves, business ventures, or major financial decisions. The energy of abundance surrounds you, but remember that true success comes from balancing material achievements with spiritual growth and meaningful relationships.',
        focusThemes: ['Goals', 'Authority', 'Discipline', 'Financial Growth', 'Leadership'],
        challenges: ['Burnout', 'Power Struggles', 'Material Obsession', 'Workaholism', 'Neglecting relationships'],
        guidance: 'Balance ambition with self-care. Recognize your achievements and share your success with others. Your drive for success is admirable, but remember that true abundance includes health, relationships, and personal fulfillment.',
        detailedGuidance: 'The number 8 energy brings a strong focus on material success and achievement this month. You\'ll find yourself naturally drawn to ambitious projects and financial opportunities. This is an excellent time for career advancement, business launches, or major investments. Your organizational skills and strategic thinking will be particularly strong. However, be mindful of maintaining balance—success without fulfillment is empty. Use your achievements as a platform to help others and create positive impact in your community.',
        monthlyInsights: [
          'Major career opportunities will present themselves',
          'Your financial situation will improve significantly',
          'You\'ll feel more confident in leadership roles',
          'Strategic partnerships will prove beneficial',
          'Your hard work will finally pay off'
        ],
        energyLevel: 'High - Perfect for ambitious projects and career moves',
        bestDays: ['8th', '17th', '26th'],
        cautionDays: ['2nd', '11th', '20th', '29th'],
        luckyColor: 'Gold',
        luckyNumber: 8,
        affirmation: 'I am focused, disciplined, and open to abundance in all areas of life.',
        quote: 'Success is liking yourself, liking what you do, and liking how you do it. The way to get started is to quit talking and begin doing. – Maya Angelou',
        focusArea: 'Purposeful Progress and Strategic Achievement',
        tips: [
          'Review and update your financial goals',
          'Celebrate every win, no matter how small',
          'Delegate tasks to avoid burnout',
          'Invest in your professional development',
          'Create a vision board for your goals',
          'Share your success with your team or community'
        ],
      },
      9: {
        title: 'Release & Renew: A Month of Transformation and Spiritual Growth',
        summary: 'This month marks a powerful period of completion and transformation in your life journey. The universe is calling you to release what no longer serves your highest good and make space for new blessings and opportunities. Your compassion and wisdom will be your greatest assets as you navigate this period of change. This is a time for forgiveness, letting go of old patterns, and embracing the lessons that have brought you to this moment. The energy of completion surrounds you, preparing you for a beautiful new beginning.',
        focusThemes: ['Compassion', 'Release', 'Transformation', 'Spiritual Growth', 'Wisdom'],
        challenges: ['Emotional Overwhelm', 'Resentment', 'Over-giving', 'Fear of change', 'Holding onto the past'],
        guidance: 'Reflect on what you need to release. Practice forgiveness and share your wisdom with others. This month is about completing cycles and preparing for new beginnings.',
        detailedGuidance: 'The number 9 energy brings a powerful focus on completion and spiritual growth this month. You\'ll find yourself naturally drawn to reflection and introspection. This is an excellent time for therapy, spiritual practices, or deep inner work. Your intuitive abilities and wisdom will be heightened, allowing you to see situations from a higher perspective. This month may bring closure to long-standing issues or relationships that no longer serve your growth.',
        monthlyInsights: [
          'Old patterns and habits will naturally fall away',
          'Your spiritual awareness will deepen significantly',
          'You\'ll feel called to help others in meaningful ways',
          'Closure will come to long-standing issues',
          'New opportunities will emerge as you release the old'
        ],
        energyLevel: 'Moderate - Focus on reflection and release',
        bestDays: ['9th', '18th', '27th'],
        cautionDays: ['1st', '10th', '19th', '28th'],
        luckyColor: 'Silver',
        luckyNumber: 9,
        affirmation: 'I embrace endings as opportunities for growth and transformation.',
        quote: 'Sometimes letting things go is an act of far greater power than defending or hanging on. The wound is the place where the Light enters you. – Eckhart Tolle',
        focusArea: 'Letting Go and Spiritual Transformation',
        tips: [
          'Declutter your physical and digital spaces',
          'Write a letter of forgiveness (even if you don\'t send it)',
          'Share your wisdom and lessons with others',
          'Practice meditation or spiritual reflection daily',
          'Create a ritual to honor what you\'re releasing',
          'Focus on gratitude for the lessons learned'
        ],
      },
      // Add more for 2–5, 7, 11, etc.
    };

    return (
      map[number] || {
        title: 'Balanced Growth: A Month of Steady Progress and Mindful Reflection',
        summary: 'This month brings a beautiful opportunity for steady, sustainable growth and deep reflection. The universe is supporting your patient approach to life, allowing you to build strong foundations for future success. This is a time to embrace the power of small, consistent actions and trust in the natural rhythm of your personal development. Your wisdom and patience will be your greatest assets as you navigate this period of quiet transformation.',
        focusThemes: ['Stability', 'Patience', 'Reflection', 'Consistency', 'Inner Growth'],
        challenges: ['Indecision', 'Stagnation', 'Impatience', 'Self-doubt', 'Comparison'],
        guidance: 'Stay consistent and trust the process. Growth often happens quietly and in ways that aren\'t immediately visible. Your steady progress is building something beautiful.',
        detailedGuidance: 'This month, the universe is encouraging you to embrace a more measured approach to life. Your natural wisdom and patience will serve you well as you navigate this period of steady growth. This is an excellent time for reflection, planning, and building strong foundations. Trust that your consistent efforts are creating positive change, even if the results aren\'t immediately apparent.',
        monthlyInsights: [
          'Your patience will be rewarded with meaningful progress',
          'Small consistent actions will lead to significant results',
          'Your inner wisdom will guide you through decisions',
          'This is a time for building rather than rushing',
          'Your steady approach will inspire others'
        ],
        energyLevel: 'Moderate - Perfect for steady progress and reflection',
        bestDays: ['5th', '14th', '23rd'],
        cautionDays: ['7th', '16th', '25th'],
        luckyColor: 'Gray',
        luckyNumber: number,
        affirmation: 'I grow quietly, consistently, and confidently, trusting in my own timing.',
        quote: 'Balance is not something you find; it\'s something you create. The journey of a thousand miles begins with a single step.',
        focusArea: 'Reflection and Steady Progress',
        tips: [
          'Keep a journal of your progress and insights',
          'Set one small, achievable goal and commit to it',
          'Practice mindfulness or meditation daily',
          'Reflect on your growth and celebrate small wins',
          'Trust your intuition and inner wisdom',
          'Focus on consistency rather than perfection'
        ],
      }
    );
  }

  private generateYearlyReport(number: number, year: number): YearlyReportResult {
    const map: Record<number, YearlyReportResult> = {
      1: {
        title: 'The Year of New Beginnings and Leadership',
        year,
        lifePath: 0, // Will be set by caller
        yearlyNumber: number,
        summary: 'This year marks a powerful new beginning in your life journey. The universe is aligning to support your boldest dreams and most ambitious visions. This is your year to step into your authentic power, embrace leadership opportunities, and create the life you truly desire.',
        detailedPrediction: 'The year ahead holds tremendous potential for personal transformation and professional success. Your natural leadership abilities will be amplified, creating opportunities for advancement in your career and personal life. This is a year of firsts—new projects, new relationships, new opportunities that will shape your future in profound ways. The energy of innovation and fresh starts surrounds you, making it the perfect time to pursue goals you\'ve been putting off. Your confidence will grow throughout the year as you take bold steps toward your dreams. This is also a year of independence and self-reliance, where you\'ll learn to trust your instincts and make decisions that align with your true self. The universe is supporting your growth, but it requires courage and determination on your part. Embrace the challenges as opportunities for growth, and remember that every great leader started with a single step into the unknown.',
        majorThemes: ['New Beginnings', 'Leadership', 'Innovation', 'Independence', 'Personal Power'],
        opportunities: ['Career advancement', 'New business ventures', 'Leadership roles', 'Creative projects', 'Personal growth'],
        challenges: ['Impatience', 'Overwhelm', 'Loneliness', 'Perfectionism', 'Fear of failure'],
        guidance: 'This year, focus on taking bold action toward your goals. Trust your instincts and don\'t be afraid to be the first to try something new. Your natural charisma and determination will attract opportunities and people who support your vision.',
        luckyColor: 'Red',
        luckyNumber: 1,
        affirmation: 'I am a powerful leader who creates positive change in the world.',
        quote: 'The future belongs to those who believe in the beauty of their dreams. Start where you are, use what you have, do what you can.',
        focusArea: 'Leadership and Innovation',
        tips: [
          'Set one major goal for the year and take action daily',
          'Practice public speaking or presentation skills',
          'Network with other leaders and innovators',
          'Start a new project or hobby that excites you',
          'Take calculated risks that align with your values',
          'Document your journey and share your insights'
        ],
        monthlyHighlights: [
          'January: Set intentions and launch new projects',
          'February: Focus on building momentum and confidence',
          'March: Take on leadership roles and responsibilities',
          'April: Innovate and try new approaches',
          'May: Celebrate early wins and plan next steps',
          'June: Expand your influence and reach',
          'July: Take bold action on major goals',
          'August: Lead others through challenges',
          'September: Innovate and adapt to changes',
          'October: Consolidate gains and plan ahead',
          'November: Share your wisdom with others',
          'December: Reflect on growth and set new intentions'
        ],
        spiritualGrowth: 'This year will bring profound spiritual growth as you learn to trust your inner wisdom and develop your intuitive abilities. You\'ll discover new depths of self-awareness and connection to your higher purpose.',
        careerInsights: 'Major career opportunities await you this year. Your leadership skills will be recognized, and you may be offered promotions or new roles that challenge you to grow. Consider starting your own business or taking on more responsibility in your current position.',
        relationshipInsights: 'This year will bring new relationships into your life, particularly with people who share your vision and values. Existing relationships may deepen as you become more confident in expressing your authentic self.',
        healthGuidance: 'Focus on building physical strength and endurance this year. Regular exercise and a healthy diet will support your ambitious goals and high energy levels.',
        financialOutlook: 'This year holds potential for significant financial growth, especially through new ventures or career advancement. Be strategic about investments and don\'t be afraid to invest in yourself and your goals.',
        personalDevelopment: 'This is a year of major personal growth. You\'ll develop new skills, gain confidence, and discover hidden talents. Focus on continuous learning and self-improvement.',
        futureVision: 'By the end of this year, you\'ll have established yourself as a leader in your field and created a strong foundation for future success. The seeds you plant this year will bear fruit for years to come.'
      },
      6: {
        title: 'The Year of Love, Family, and Healing',
        year,
        lifePath: 0,
        yearlyNumber: number,
        summary: 'This year brings a profound focus on love, family, and healing. The universe is calling you to deepen your relationships, nurture your loved ones, and create a more harmonious home environment.',
        detailedPrediction: 'The year ahead will be deeply transformative in matters of the heart and home. Your natural nurturing abilities will be amplified, creating opportunities to heal old wounds and strengthen family bonds. This is a year of emotional growth and relationship development, where you\'ll learn to balance giving to others with caring for yourself. The energy of love and compassion surrounds you, making it the perfect time to address family issues, deepen romantic relationships, or create a more nurturing home environment. You\'ll find yourself drawn to healing work, whether for yourself or others, and your intuitive abilities will be heightened. This year will also bring opportunities to serve your community and make a positive impact through acts of kindness and compassion. Your home will become a sanctuary of peace and love, and you\'ll attract people who appreciate your caring nature. This is a year to prioritize emotional well-being and create lasting bonds with those you love most.',
        majorThemes: ['Love', 'Family', 'Healing', 'Compassion', 'Home'],
        opportunities: ['Relationship healing', 'Family reconciliation', 'Home improvements', 'Community service', 'Emotional growth'],
        challenges: ['Overgiving', 'Neglecting self-care', 'Family conflicts', 'Emotional overwhelm', 'Boundary setting'],
        guidance: 'This year, focus on creating balance between caring for others and caring for yourself. Your compassion is a gift, but remember that you cannot pour from an empty cup.',
        luckyColor: 'Pink',
        luckyNumber: 6,
        affirmation: 'I nurture myself and others with love, creating harmony in all my relationships.',
        quote: 'The greatest gift you can give someone is your presence. To love oneself is the beginning of a lifelong romance.',
        focusArea: 'Love and Healing',
        tips: [
          'Schedule regular self-care time',
          'Create a healing space in your home',
          'Practice active listening with loved ones',
          'Set healthy boundaries in relationships',
          'Express gratitude daily',
          'Volunteer or help others in need'
        ],
        monthlyHighlights: [
          'January: Focus on self-care and personal healing',
          'February: Deepen romantic relationships',
          'March: Strengthen family bonds',
          'April: Create a more nurturing home environment',
          'May: Practice compassion and forgiveness',
          'June: Celebrate love and relationships',
          'July: Focus on emotional balance',
          'August: Nurture friendships and community',
          'September: Heal old wounds and patterns',
          'October: Create family traditions',
          'November: Express gratitude and appreciation',
          'December: Celebrate the love in your life'
        ],
        spiritualGrowth: 'This year will bring deep spiritual growth through love and compassion. You\'ll develop a stronger connection to your heart center and learn to see the divine in all beings.',
        careerInsights: 'Your caring nature will open doors in helping professions or roles that involve nurturing others. Consider careers in healthcare, education, counseling, or community service.',
        relationshipInsights: 'This year will bring healing and growth in all your relationships. You may reconcile with family members, deepen romantic bonds, or form new friendships based on mutual care and respect.',
        healthGuidance: 'Focus on emotional and mental health this year. Consider therapy, meditation, or other healing practices that help you process emotions and maintain balance.',
        financialOutlook: 'Financial stability will come through helping others or creating value in your community. Consider how you can monetize your caring nature or healing abilities.',
        personalDevelopment: 'This year will teach you the importance of self-love and healthy boundaries. You\'ll develop greater emotional intelligence and learn to care for others without losing yourself.',
        futureVision: 'By the end of this year, you\'ll have created a more loving and harmonious life, with stronger relationships and a deeper sense of purpose in serving others.'
      },
      8: {
        title: 'The Year of Success, Abundance, and Achievement',
        year,
        lifePath: 0,
        yearlyNumber: number,
        summary: 'This year brings powerful opportunities for material success and professional achievement. The universe is aligning to support your most ambitious goals and financial aspirations.',
        detailedPrediction: 'The year ahead holds tremendous potential for material success and professional advancement. Your natural business acumen and leadership abilities will be at their peak, creating opportunities for significant financial growth and career advancement. This is a year of building, creating, and achieving—where your hard work and determination will finally pay off in tangible ways. The energy of abundance surrounds you, making it the perfect time for major investments, business ventures, or career moves that align with your long-term goals. You\'ll find yourself naturally drawn to ambitious projects and opportunities that challenge you to grow. This year will also bring recognition for your achievements and opportunities to lead others toward success. However, remember that true abundance includes health, relationships, and personal fulfillment, not just material wealth. Use your success as a platform to help others and create positive impact in your community. This is a year to think big, act strategically, and build something lasting that will benefit you and others for years to come.',
        majorThemes: ['Success', 'Abundance', 'Achievement', 'Leadership', 'Material Growth'],
        opportunities: ['Career advancement', 'Business opportunities', 'Financial growth', 'Leadership roles', 'Strategic partnerships'],
        challenges: ['Workaholism', 'Neglecting relationships', 'Material obsession', 'Burnout', 'Power struggles'],
        guidance: 'This year, focus on building sustainable success that includes all areas of your life. Use your achievements as a platform to help others and create positive impact.',
        luckyColor: 'Gold',
        luckyNumber: 8,
        affirmation: 'I am successful, abundant, and use my achievements to help others.',
        quote: 'Success is liking yourself, liking what you do, and liking how you do it. The way to get started is to quit talking and begin doing.',
        focusArea: 'Strategic Success and Abundance',
        tips: [
          'Set ambitious but achievable goals',
          'Invest in your professional development',
          'Build strategic partnerships',
          'Celebrate your achievements',
          'Share your success with others',
          'Maintain work-life balance'
        ],
        monthlyHighlights: [
          'January: Set ambitious goals for the year',
          'February: Focus on building momentum',
          'March: Take on new challenges and responsibilities',
          'April: Invest in your growth and development',
          'May: Celebrate early wins and achievements',
          'June: Expand your influence and reach',
          'July: Make strategic moves and decisions',
          'August: Lead others toward success',
          'September: Consolidate gains and plan ahead',
          'October: Share your knowledge and expertise',
          'November: Reflect on achievements and growth',
          'December: Plan for even greater success next year'
        ],
        spiritualGrowth: 'This year will teach you that true success includes spiritual fulfillment and service to others. You\'ll develop a deeper understanding of abundance and learn to use your success for the greater good.',
        careerInsights: 'Major career opportunities await you this year. Your leadership and business skills will be recognized, and you may be offered promotions, new roles, or opportunities to start your own business.',
        relationshipInsights: 'Your success may create some distance in relationships as you focus on your goals. Make time for loved ones and remember that true success includes meaningful relationships.',
        healthGuidance: 'Maintain your health while pursuing ambitious goals. Regular exercise and stress management will be crucial for sustaining your high energy and focus.',
        financialOutlook: 'This year holds potential for significant financial growth through career advancement, business opportunities, or wise investments. Be strategic and seek professional advice when needed.',
        personalDevelopment: 'This year will develop your leadership skills, business acumen, and ability to achieve ambitious goals. Focus on continuous learning and personal growth.',
        futureVision: 'By the end of this year, you\'ll have achieved significant material success and created a strong foundation for continued growth and abundance in all areas of your life.'
      },
      9: {
        title: 'The Year of Completion, Wisdom, and Spiritual Growth',
        year,
        lifePath: 0,
        yearlyNumber: number,
        summary: 'This year marks a powerful period of completion and spiritual transformation. The universe is calling you to release what no longer serves you and embrace your role as a wise teacher and healer.',
        detailedPrediction: 'The year ahead will be deeply transformative as you complete important cycles in your life and prepare for new beginnings. This is a year of profound spiritual growth, where you\'ll develop greater wisdom, compassion, and understanding of your life\'s purpose. The energy of completion surrounds you, making it the perfect time to let go of old patterns, relationships, or situations that no longer serve your highest good. You\'ll find yourself naturally drawn to healing work, spiritual practices, and helping others through their own transformations. This year will also bring opportunities to share your wisdom and experience with others, whether through teaching, counseling, or simply being a source of support and guidance. Your intuitive abilities will be heightened, allowing you to see situations from a higher perspective and offer valuable insights to those around you. This is a year to embrace your role as a wise elder, teacher, or healer, and to use your life experience to make a positive impact in the world.',
        majorThemes: ['Completion', 'Wisdom', 'Spiritual Growth', 'Healing', 'Teaching'],
        opportunities: ['Spiritual development', 'Teaching or mentoring', 'Healing work', 'Community service', 'Personal transformation'],
        challenges: ['Letting go', 'Emotional overwhelm', 'Overgiving', 'Fear of change', 'Holding onto the past'],
        guidance: 'This year, focus on releasing what no longer serves you and embracing your role as a wise teacher and healer. Trust the process of transformation and share your wisdom with others.',
        luckyColor: 'Silver',
        luckyNumber: 9,
        affirmation: 'I am wise, compassionate, and use my experience to help others grow and heal.',
        quote: 'Sometimes letting things go is an act of far greater power than defending or hanging on. The wound is the place where the Light enters you.',
        focusArea: 'Spiritual Growth and Wisdom',
        tips: [
          'Practice meditation or spiritual reflection daily',
          'Share your wisdom and experience with others',
          'Let go of what no longer serves you',
          'Engage in healing work or therapy',
          'Focus on gratitude and forgiveness',
          'Embrace your role as a teacher or mentor'
        ],
        monthlyHighlights: [
          'January: Reflect on the past year and set intentions',
          'February: Focus on spiritual practices and inner growth',
          'March: Begin releasing old patterns and habits',
          'April: Share your wisdom with others',
          'May: Engage in healing work or therapy',
          'June: Practice forgiveness and compassion',
          'July: Focus on community service and helping others',
          'August: Deepen your spiritual practices',
          'September: Let go of what no longer serves you',
          'October: Embrace your role as a teacher or mentor',
          'November: Practice gratitude and appreciation',
          'December: Prepare for new beginnings and cycles'
        ],
        spiritualGrowth: 'This year will bring profound spiritual growth and development. You\'ll deepen your connection to your higher self and develop greater wisdom and compassion.',
        careerInsights: 'Your wisdom and experience will open doors in teaching, counseling, healing, or other helping professions. Consider how you can use your life experience to help others.',
        relationshipInsights: 'This year will bring healing and transformation in your relationships. You may need to let go of some relationships while deepening others based on mutual growth and understanding.',
        healthGuidance: 'Focus on emotional and spiritual healing this year. Consider therapy, meditation, or other practices that help you process and release old wounds.',
        financialOutlook: 'Financial stability will come through helping others or sharing your wisdom and experience. Consider how you can monetize your knowledge and healing abilities.',
        personalDevelopment: 'This year will teach you the importance of wisdom, compassion, and service to others. You\'ll develop greater emotional intelligence and spiritual awareness.',
        futureVision: 'By the end of this year, you\'ll have completed important cycles in your life and be ready for new beginnings. You\'ll have developed greater wisdom and be ready to help others on their own journeys.'
      }
    };

    return (
      map[number] || {
        title: 'The Year of Balanced Growth and Steady Progress',
        year,
        lifePath: 0,
        yearlyNumber: number,
        summary: 'This year brings opportunities for steady, sustainable growth in all areas of your life. The universe is supporting your patient approach to personal development and success.',
        detailedPrediction: 'The year ahead will be one of steady progress and balanced growth across all areas of your life. Your patient and methodical approach will serve you well as you work toward your goals. This is a year of building strong foundations and creating sustainable success that will last for years to come. The energy of stability and consistency surrounds you, making it the perfect time for long-term planning and gradual improvement. You\'ll find that your steady efforts will compound over time, leading to significant results by the end of the year. This is also a year of learning and personal development, where you\'ll acquire new skills and knowledge that will benefit you in the future. Your wisdom and patience will be your greatest assets as you navigate this year of growth and development.',
        majorThemes: ['Growth', 'Stability', 'Learning', 'Patience', 'Consistency'],
        opportunities: ['Skill development', 'Long-term planning', 'Steady progress', 'Learning opportunities', 'Personal growth'],
        challenges: ['Impatience', 'Self-doubt', 'Comparison', 'Slow progress', 'Indecision'],
        guidance: 'This year, focus on consistent effort and trust in the process of growth. Your steady progress will lead to meaningful results over time.',
        luckyColor: 'Green',
        luckyNumber: number,
        affirmation: 'I grow steadily and consistently, trusting in my own timing and process.',
        quote: 'The journey of a thousand miles begins with a single step. Balance is not something you find; it\'s something you create.',
        focusArea: 'Steady Growth and Development',
        tips: [
          'Set long-term goals and work toward them consistently',
          'Focus on learning and personal development',
          'Practice patience and trust in the process',
          'Celebrate small wins and progress',
          'Maintain balance in all areas of your life',
          'Trust your own timing and pace'
        ],
        monthlyHighlights: [
          'January: Set intentions and create a plan for the year',
          'February: Focus on building momentum and consistency',
          'March: Take on new learning opportunities',
          'April: Practice patience and trust in the process',
          'May: Celebrate progress and small wins',
          'June: Focus on balance and well-being',
          'July: Continue steady progress toward goals',
          'August: Reflect on growth and development',
          'September: Adjust plans and strategies as needed',
          'October: Focus on learning and skill development',
          'November: Practice gratitude and appreciation',
          'December: Reflect on the year and plan for the future'
        ],
        spiritualGrowth: 'This year will bring steady spiritual growth and development. You\'ll deepen your connection to your inner wisdom and develop greater trust in the process of life.',
        careerInsights: 'Your steady approach will lead to gradual career advancement and recognition. Focus on building skills and relationships that will benefit you long-term.',
        relationshipInsights: 'This year will bring steady growth in your relationships. Focus on building deep, meaningful connections based on mutual respect and understanding.',
        healthGuidance: 'Focus on building healthy habits and maintaining balance. Regular exercise and self-care will support your steady growth and development.',
        financialOutlook: 'Financial stability will come through steady effort and wise planning. Focus on building long-term wealth and security.',
        personalDevelopment: 'This year will teach you the importance of patience, consistency, and trust in your own process. You\'ll develop greater self-awareness and inner strength.',
        futureVision: 'By the end of this year, you\'ll have made steady progress toward your goals and built a strong foundation for continued growth and success in all areas of your life.'
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
