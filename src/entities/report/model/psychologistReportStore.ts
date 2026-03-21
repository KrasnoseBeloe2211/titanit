import { create } from 'zustand';
import { getReport } from '../api/getReport';

interface PsychologistReportState {
  metrics: Record<string, number>;
  fetchReport: () => Promise<void>;
}

export const usePsychologistReportStore = create<PsychologistReportState>((set) => ({
  metrics: {},

  fetchReport: async () => {
    const res = await getReport();

    if (res.succes) {
      set({
        metrics: res.data.metrics,
      });
    }
  },
}));
