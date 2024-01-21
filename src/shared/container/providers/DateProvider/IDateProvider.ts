

interface IDateProvider {
    comparacaoHoras(tempo_final: Date): number;
    converteParaUtc(data: Date): string;
    dateNow(): Date;
    compareEmDias(tempo_inicial: Date, tempo_final: Date): number;
    addDays(days: number): Date;
    addHours(hours: number): Date;
    compareIfBefore(start_date: Date, end_date: Date): boolean;
}

export { IDateProvider };