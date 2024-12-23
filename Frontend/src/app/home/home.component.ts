import { Component } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  model: { nereye: string; tarih: string; not: string } = { nereye: '', tarih: '', not: '' };

  nereye: string = '';
  tarih: string = '';
  not: string = '';

  seyahatListesi: { nereye: string; tarih: string; not: string; gidildi: boolean }[] = [];

  ekle() {
    if (this.nereye && this.tarih) {
      this.seyahatListesi.push({
        nereye: this.nereye,
        tarih: this.tarih,
        not: this.not,
        gidildi: false
      });

      // Alanları temizle
      this.nereye = '';
      this.tarih = '';
      this.not = '';
    } else {
      alert('Lütfen tüm alanları doldurun!');
    }
  }

  sil(index: number) {
    this.seyahatListesi.splice(index, 1);
  }

  duzenle(index: number) {
    const item = this.seyahatListesi[index];
    this.nereye = item.nereye;
    this.tarih = item.tarih;
    this.not = item.not;
    this.seyahatListesi.splice(index, 1);
  }

  gidildi(index: number) {
    this.seyahatListesi[index].gidildi = !this.seyahatListesi[index].gidildi;
  }
}
