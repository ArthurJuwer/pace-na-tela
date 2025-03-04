import { useCallback } from "react";

const useFormatValue = () => {
  // Formata números com casas decimais
  const formatNumber = useCallback((num, decimalPlaces = 2) => {
    if (num === undefined || num === null) return "--";
    return new Intl.NumberFormat("pt-BR", {
      minimumFractionDigits: decimalPlaces,
      maximumFractionDigits: decimalPlaces,
    }).format(num);
  }, []);

  // Converte segundos para formato hh:mm:ss
  const formatTime = useCallback((seconds) => {
    if (!seconds) return "--";
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return [h, m, s].map((v) => String(v).padStart(2, "0")).join(":");
  }, []);

  // Formata datas
  const formatDate = useCallback((dateString) => {
    if (!dateString) return "--";
    return new Date(dateString).toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }, []);

  // Adiciona unidades a valores numéricos
  const formatWithUnit = useCallback((value, unit) => {
    if (value === undefined || value === null) return "--";
    return `${formatNumber(value)} ${unit}`;
  }, [formatNumber]);

  // Função principal para formatar baseado no tipo de dado
  const formatValue = useCallback((key, value) => {
    switch (key) {
      case "distance":
        return formatWithUnit(value / 1000, "km"); // Supondo que a distância venha em metros
      case "average_speed":
        return formatWithUnit(value, "km/h");
      case "elapsed_time":
      case "moving_time":
        return formatTime(value);
      case "start_date":
        return formatDate(value);
      case "calories":
        return formatWithUnit(value, "kcal");
      case "kilojoules":
        return formatWithUnit(value, "kJ");
      case "max_speed":
        return formatWithUnit(value, "km/h");
      case "steps":
        return formatWithUnit(value, "passos");
      default:
        return formatNumber(value);
    }
  }, [formatTime, formatDate, formatWithUnit, formatNumber]);

  return { formatValue };
};

export default useFormatValue;
