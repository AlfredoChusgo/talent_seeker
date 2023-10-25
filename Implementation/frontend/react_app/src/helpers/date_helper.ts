import { format } from 'date-fns';

export class DateHelper {

    static formatDateToDdMmYyyy(date: Date): string {
        return format(date, 'dd/MM/yyyy');
      }
}