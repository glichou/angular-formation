import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'plural',
    standalone: true
})
export class PluralPipe implements PipeTransform {
    transform(str: string, nb: number): string {
        return str + (nb > 1 ? 's' : '')
    }
}