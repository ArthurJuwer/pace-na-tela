import { useCallback } from "react";

const useFormatValue = () => {
  // Formata números com casas decimais
  const formatNumber = useCallback((num, decimalPlaces = 2) => {
    if (num === undefined || num === null) return undefined;
    return new Intl.NumberFormat("pt-BR", {
      minimumFractionDigits: decimalPlaces,
      maximumFractionDigits: decimalPlaces,
    }).format(num);
  }, []);

  // Formata valores booleanos
  const formatBoolean = useCallback((boolean) => {
    return boolean ? "Sim" : "Não";
  }, []);

  // Converte segundos para formato hh:mm:ss
  const formatTime = useCallback((seconds) => {
    if (!seconds) return undefined;
  
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
  
    const timeParts = [];
  
    if (h > 0) timeParts.push(String(h).padStart(2, "0"));
    timeParts.push(String(m).padStart(2, "0"));
    timeParts.push(String(s).padStart(2, "0"));
  
    return timeParts.join(":");
  }, []);
  

  // Formata datas
  const formatDate = useCallback((dateString) => {
    if (!dateString) return undefined;
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
    if (value === undefined || value === null) return undefined;
    return `${formatNumber(value)} ${unit}`;
  }, [formatNumber]);

  // Função principal para formatar baseado no tipo de dado
  const formatValue = useCallback((key, value) => {
    const numberFormats = {
      distance: ["km", 1000], // Convertendo metros para km
      average_speed: ["km/h"],
      calories: ["kcal"],
      kilojoules: ["kJ"],
      max_speed: ["km/h"],
      steps: ["passos"],
      total_elevation_gain: ["m"],
      elev_high: ["m"],
      elev_low: ["m"],
    };

    if (numberFormats[key]) {
      const [unit, divisor = 1] = numberFormats[key];
      return formatWithUnit(value / divisor, unit);
    }

    const timeKeys = ["elapsed_time", "moving_time"];
    if (timeKeys.includes(key)) return formatTime(value);

    if (key === "start_date") return formatDate(value);
    if (typeof value === "boolean") return formatBoolean(value);

    return value; // Retorna o valor original caso não se encaixe nos formatos definidos
  }, [formatTime, formatDate, formatWithUnit, formatNumber, formatBoolean]);

  return { formatValue, formatTime, formatDate, formatBoolean };
};

export default useFormatValue;
