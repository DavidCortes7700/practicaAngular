import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'vocalToNumber',
  standalone: true
})
export class VocalToNumberPipe implements PipeTransform {

  transform(value: string): string {
    const newValues: { [key: string]: string } = {
      'a': '4',
      'e': '3',
      'i': '1',
      'o': '0',
      'u': '6'
  };
    let resultado = '';

    for(let i = 0; i<value.length;i++){
      const caracter = value[i].toLowerCase();
      if(newValues[caracter]){
        resultado += newValues[caracter];
      }else{
        resultado += value[i]
      }
    }
    return resultado;
  }
}
