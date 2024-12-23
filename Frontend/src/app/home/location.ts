export class Location {
    nereye: string;
    tarih: string;
    not: string;

    constructor(nereye?: string, tarih?: string, not?: string) {
        this.nereye = nereye || '';
        this.tarih = tarih || '';
        this.not = not || '';
    }
    
  }