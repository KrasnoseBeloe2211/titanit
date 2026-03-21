"use client";

import { useEffect } from "react";
import { useReportStore } from "@/entities/report/model/reportStore";
import { toChartData } from "@/entities/report/lib/transform";
import { BarChartBlock } from "@/shared/ui/charts/BarChart";
import { Card, CardContent, Typography, Box, Grid } from "@mui/material";

export default function Page() {
  const { metrics, fetchReport } = useReportStore();

  useEffect(() => {
    fetchReport();
  }, []);

  const data = toChartData(metrics);
  const averageValue = data.length > 0 
    ? Math.round(data.reduce((sum, item) => sum + item.value, 0) / data.length) 
    : 0;

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
        Отчёт для психолога
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography 
                variant="body2" 
                sx={{ color: "text.secondary", mb: 1 }}
              >
                Средний показатель
              </Typography>
              <Typography 
                variant="h3" 
                sx={{ 
                  fontWeight: 700,
                  color: "#00FF88",
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                {averageValue}%
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography 
                variant="body2" 
                sx={{ color: "text.secondary", mb: 1 }}
              >
                Всего метрик
              </Typography>
              <Typography 
                variant="h3" 
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

        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3 }}>
                Динамика показателей
              </Typography>
              <BarChartBlock data={data} />
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Детализация по метрикам
              </Typography>
              <Grid container spacing={2}>
                {data.map((item, index) => (
                  <Grid size={{ xs: 6, sm: 4, md: 2 }} key={item.name}>
                    <Box
                      sx={{
                        p: 2,
                        borderRadius: 3,
                        background: "rgba(0, 255, 136, 0.08)",
                        border: "1px solid rgba(0, 255, 136, 0.2)",
                        textAlign: "center",
                      }}
                    >
                      <Typography
                        variant="caption"
                        sx={{
                          display: "block",
                          color: "text.secondary",
                          mb: 1,
                          textTransform: "uppercase",
                          letterSpacing: "0.5px",
                          fontSize: "11px",
                        }}
                      >
                        {item.name}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "24px",
                          fontWeight: 700,
                          color: "#00FF88",
                          fontFamily: "'JetBrains Mono', monospace",
                        }}
                      >
                        {item.value}%
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
