package com.yunussemree.fas_travel.location;

import org.springframework.web.bind.annotation.*;

import java.util.LinkedList;

@RestController
@RequestMapping("${api.prefix}/locations")
public class LocationController {

    private LocationService locationService;

    public LocationController(){
        this.locationService = new LocationService();
    }

    @GetMapping
    public LinkedList<Location> getAllLocations() {
        return locationService.getAllLocations();
    }

    @PostMapping
    public Location addLocation(@RequestBody Location location) {
        return locationService.addLocation(location);
    }

    @DeleteMapping("/{id}")
    public boolean deleteLocation(@PathVariable Long id) {
        return locationService.deleteLocation(id);
    }

    @PutMapping("/{id}")
    public Location updateLocation(@PathVariable Long id, @RequestBody Location updatedLocation) {
        Location location = locationService.updateLocation(id, updatedLocation);
        if (location == null) {
            throw new RuntimeException("Location with id " + id + " not found.");
        }
        return location;
    }
}
