import { Component, OnInit } from '@angular/core';
import { LocationService } from '../services/location.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  nereye: string = '';
  tarih: string = '';
  not: string = '';
  seyahatListesi: any[] = [];

  constructor(private locationService: LocationService) {}

  ngOnInit() {
    this.getLocations();
    console.log(this.seyahatListesi);
  }

  getLocations() {
    this.locationService.getLocations().subscribe((locations) => {
      this.seyahatListesi = locations;
    });
  }

  ekle() {
    if (this.nereye && this.tarih) {
      const newLocation = { name: this.nereye, date: this.tarih, note: this.not };
  
      this.locationService.addLocation(newLocation).subscribe(
        (addedLocation) => {
          this.seyahatListesi = [...this.seyahatListesi, addedLocation]; // Yeni bir liste oluşturun
          this.nereye = '';
          this.tarih = '';
          this.not = '';
        },
        (error) => {
          console.error('Hata:', error);
        }
      );
    } else {
      alert('Lütfen tüm alanları doldurun!');
    }
  }
  

  sil(index: number) {
    const location = this.seyahatListesi[index];

    this.locationService.deleteLocation(location.id).subscribe(() => {
      this.seyahatListesi.splice(index, 1);
    });
  }

  duzenle(index: number) {
    const item = this.seyahatListesi[index];
    this.nereye = item.name;
    this.tarih = item.date;
    this.not = item.note;

    this.locationService.deleteLocation(item.id).subscribe(() => {
      this.seyahatListesi.splice(index, 1);
    });
  }

  gidildi(index: number) {
    const location = this.seyahatListesi[index];

  
    // `gidildi` durumunu tersine çevir
    const updatedLocation = { ...location, gidildi: !location.gidildi };
  
    // Backend'e güncelleme isteği gönder
    this.locationService.updateLocation(location.id, updatedLocation).subscribe(
      (response) => {
        // Backend'den dönen güncel veriyi listeye yaz
        this.seyahatListesi[index] = response;
  
        // Başarılı güncelleme için bildirim/log
        console.log(`'gidildi' durumu güncellendi:`, response);
      },
      (error) => {
        // Hata durumunda eski değeri geri al
        console.error(`'gidildi' durumu güncellenirken hata oluştu:`, error);
        alert('Güncelleme sırasında bir hata oluştu!');
      }
    );
    alert(updatedLocation.gidildi);
  }
  

  trackByFn(index: number, item: any): any {
    return item.id; // Benzersiz bir ID'yi kullanarak değişiklikleri takip edin
  }
  
}
