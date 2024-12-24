package com.yunussemree.fas_travel.location;

import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicLong;

// LocationService class
@Service
public class LocationService {

    private LinkedList<Location> locations = new LinkedList<>();
    private AtomicLong idGenerator = new AtomicLong(1);

    // Ekleme metodu
    public Location addLocation(Location location) {
        location.setId(idGenerator.getAndIncrement());
        locations.add(location);
        return location;
    }

    // Silme metodu
    public boolean deleteLocation(Long id) {
        Optional<Location> location = locations.stream()
                .filter(loc -> loc.getId().equals(id))
                .findFirst();

        if (location.isPresent()) {
            locations.remove(location.get());
            return true;
        }
        return false;
    }

    // Düzenleme metodu
    public Location updateLocation(Long id, Location updatedLocation) {
        Optional<Location> location = locations.stream()
                .filter(loc -> loc.getId().equals(id))
                .findFirst();

        if (location.isPresent()) {
            Location existingLocation = location.get();
            existingLocation.setName(updatedLocation.getName());
            existingLocation.setDate(updatedLocation.getDate());
            existingLocation.setNote(updatedLocation.getNote());
            return existingLocation;
        }
        return null;
    }

    // Tüm verileri listeleme
    public LinkedList<Location> getAllLocations() {
        return locations;
    }
}
