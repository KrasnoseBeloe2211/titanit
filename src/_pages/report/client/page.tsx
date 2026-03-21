"use client";

import { useEffect } from "react";
import { useReportStore } from "@/entities/report/model/reportStore";
import { toChartData } from "@/entities/report/lib/transform";
import { BarChartBlock } from "@/shared/ui/charts/BarChart";
import { Card, CardContent, Typography, Box, Grid } from "@mui/material";

export default function Page() {
  const { summary, metrics, fetchReport } = useReportStore();

  useEffect(() => {
    fetchReport();
  }, []);

  const data = toChartData(metrics);

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <Typography 
        variant="h4" 
        sx={{ 
          mb: 4, 
          fontWeight: 700,
          background: "linear-gradient(135deg, #00FF88 0%, #00CC6A 100%)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Ваш результат
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Card>
            <CardContent>
              <Typography 
                variant="h6" 
                sx={{ 
                  mb: 2,
                  color: "#00FF88",
                }}
              >
                Общая характеристика
              </Typography>
              <Typography 
                sx={{ 
                  fontSize: "18px",
                  lineHeight: 1.7,
                  color: "text.secondary",
                }}
              >
                {summary}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography 
                variant="body2" 
                sx={{ color: "text.secondary", mb: 2 }}
              >
                Количество метрик
              </Typography>
              <Typography 
                variant="h2" 
                sx={{ 
                  fontWeight: 700,
                  color: "#00FF88",
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                {data.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3 }}>
                Ваши метрики
              </Typography>
              <BarChartBlock data={data} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
