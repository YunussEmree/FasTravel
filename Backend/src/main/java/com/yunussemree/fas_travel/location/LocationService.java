package com.yunussemree.fas_travel.location;

import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicLong;

@Service
public class LocationService {

    private LinkedList<Location> locations = new LinkedList<>();
    private AtomicLong idGenerator = new AtomicLong(1);

    public Location addLocation(Location location) {
        location.setId(idGenerator.getAndIncrement());
        locations.add(location);
        return location;
    }

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

    public Location updateLocation(Long id, Location updatedLocation) {
        Optional<Location> location = locations.stream()
                .filter(loc -> loc.getId().equals(id))
                .findFirst();

        if (location.isPresent()) {
            Location existingLocation = location.get();
            existingLocation.setName(updatedLocation.getName());
            existingLocation.setDate(updatedLocation.getDate());
            existingLocation.setNote(updatedLocation.getNote());
            existingLocation.setGidildi(updatedLocation.isGidildi()); // Gidildi alanını güncelle
            return existingLocation;
        }
        return null;
    }


    public LinkedList<Location> getAllLocations() {
        return locations;
    }

}
