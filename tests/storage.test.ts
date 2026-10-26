import { describe, it, expect, beforeEach } from 'vitest';
import { createBackup, restoreBackup, WORDS_KEY } from '../src/utils/storage';
import { claimReward, rewardsClaimedCount, isRewardClaimed, loadUserStats, addXP } from '../src/utils/gamification';

class MemStorage {
  private m = new Map<string, string>();
  get length() { return this.m.size; }
  key(i: number) { return [...this.m.keys()][i] ?? null; }
  getItem(k: string) { return this.m.has(k) ? this.m.get(k)! : null; }
  setItem(k: string, v: string) { this.m.set(k, String(v)); }
  removeItem(k: string) { this.m.delete(k); }
  clear() { this.m.clear(); }
}

beforeEach(() => {
  (globalThis as any).localStorage = new MemStorage();
});

describe('ehtiyat nüsxə', () => {
  it('yaradılır və bərpa olunur', () => {
    localStorage.setItem(WORDS_KEY, JSON.stringify([{ id: 1, word: 'a', az: 'b', box: 2 }]));
    localStorage.setItem('wordbrick_blitz_highscore', '120');
    localStorage.setItem('other_app_key', 'zzz');
    const backup = createBackup();
    expect(backup).not.toContain('other_app_key');
    localStorage.clear();
    const res = restoreBackup(backup);
    expect(res.ok).toBe(true);
    expect(res.restoredKeys).toBe(2);
    expect(localStorage.getItem('wordbrick_blitz_highscore')).toBe('120');
  });
});

describe('XP: gündəlik bir dəfəlik mükafat', () => {
  it('eyni açar ikinci dəfə verilmir', () => {
    expect(claimReward('chest')).toBe(true);
    expect(claimReward('chest')).toBe(false);
    expect(isRewardClaimed('chest')).toBe(true);
  });
});
