import { create } from 'zustand';
import { getReport } from '../api/getReport';

interface ClientReportState {
  metrics: Record<string, number>;
  summary: string;
  description: string;
  fetchReport: () => Promise<void>;
}

export const useClientReportStore = create<ClientReportState>((set) => ({
  metrics: {},
  summary: '',
  description: '',

  fetchReport: async () => {
    const res = await getReport();

    if (res.succes) {
      set({
        metrics: res.data.metrics,
        summary: res.data.summary,
        description: res.data.description || '',
      });
    }
  },
}));
