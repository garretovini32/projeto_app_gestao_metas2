
import { HabitLog } from '../types';

const toYYYYMMDD = (d: Date): string => d.toISOString().split('T')[0];

export const isHabitCompletedToday = (logs: HabitLog[]): boolean => {
    const todayStr = toYYYYMMDD(new Date());
    return logs.some(log => log.date === todayStr);
};

export const calculateStreak = (logs: HabitLog[]): { currentStreak: number } => {
    if (logs.length === 0) {
        return { currentStreak: 0 };
    }

    const sortedDates = [...new Set(logs.map(log => log.date))].sort().reverse();
    
    let currentStreak = 0;
    const today = new Date();
    const todayStr = toYYYYMMDD(today);
    
    let expectedDate = today;

    if (!sortedDates.includes(todayStr)) {
        // If not completed today, start checking from yesterday
        expectedDate.setDate(expectedDate.getDate() - 1);
    }
    
    for (const dateStr of sortedDates) {
        const expectedDateStr = toYYYYMMDD(expectedDate);
        if (dateStr === expectedDateStr) {
            currentStreak++;
            expectedDate.setDate(expectedDate.getDate() - 1);
        } else {
            // Found a gap in the streak
            break;
        }
    }

    return { currentStreak };
};
