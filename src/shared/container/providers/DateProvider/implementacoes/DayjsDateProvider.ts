import { IDateProvider } from "../IDateProvider";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

class DayjsDateProvider implements IDateProvider {


    comparacaoHoras(tempo_final: Date): number {
        const tempo_final_utc = this.converteParaUtc(tempo_final);
        const tempo_incial_utc = this.converteParaUtc(this.dateNow());

        return dayjs(tempo_final_utc).diff(tempo_incial_utc, "hours");
    }

    converteParaUtc(data: Date): string {
        return dayjs(data).utc().local().format();
    }

    dateNow(): Date {
        return dayjs().toDate();
    }

    compareEmDias(tempo_inicial: Date, tempo_final: Date): number {
        const tempo_final_utc = this.converteParaUtc(tempo_final);
        const tempo_incial_utc = this.converteParaUtc(tempo_inicial);

        return dayjs(tempo_final_utc).diff(tempo_incial_utc, "days");
    }

    addDays(days: number) {
        return dayjs().add(days, "days").toDate();
    }

    addHours(hours: number): Date {
        return dayjs().add(hours, "days").toDate();
    }

    compareIfBefore(start_date: Date, end_date: Date): boolean {
        return dayjs(start_date).isBefore(end_date);
    }

}

export { DayjsDateProvider }