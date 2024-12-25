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
          this.seyahatListesi = [...this.seyahatListesi, addedLocation];
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

  isEditing: boolean = false;
  editingIndex: number | null = null;
  
  duzenle(index: number) {
    this.isEditing = true;
    this.editingIndex = index;
  
    const item = this.seyahatListesi[index];
    this.nereye = item.name;
    this.tarih = item.date;
    this.not = item.note;
  }
  
  kaydet() {
    if (this.editingIndex !== null) {
      const index = this.editingIndex;
      const updatedLocation = {
        ...this.seyahatListesi[index],
        name: this.nereye,
        date: this.tarih,
        note: this.not,
      };
  
      this.locationService.updateLocation(updatedLocation.id, updatedLocation).subscribe(
        (response) => {
          this.seyahatListesi[index] = response;
          this.isEditing = false;
          this.editingIndex = null;
          this.nereye = '';
          this.tarih = '';
          this.not = '';
        },
        (error) => {
          console.error(`Düzenleme sırasında hata:`, error);
          alert('Düzenleme sırasında bir hata oluştu!');
        }
      );
    }
  }
  
  
  gidildi(index: number) { //TODO: Fix and implement this method
    const location = this.seyahatListesi[index];
  
    const updatedLocation = { ...location, gidildi: !location.gidildi };
  
    this.locationService.updateLocation(location.id, updatedLocation).subscribe(
      (response) => {
        this.seyahatListesi[index] = response;
  
        console.log(`'gidildi' durumu güncellendi:`, response);
      },
      (error) => {
        console.error(`'gidildi' durumu güncellenirken hata oluştu:`, error);
        alert('Güncelleme sırasında bir hata oluştu!');
      }
    );
  }
  
  

  trackByFn(index: number, item: any): any {
    return item.id;
  }
  
}
