package com.dailyvacations.service;

import com.dailyvacations.model.Album;
import com.dailyvacations.model.User;
import com.dailyvacations.repository.AlbumRepository;
import com.dailyvacations.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;

@Service
public class AlbumStorageService {

    private final AlbumRepository albumRepository;
    private final UserRepository userRepository;

    public AlbumStorageService(AlbumRepository albumRepository, UserRepository userRepository) {
        this.albumRepository = albumRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public void saveAlbum(String username, Album album) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        album.setUser(user);
        albumRepository.save(album);
    }

    @Transactional(readOnly = true)
    public List<Album> getAlbumsByUsername(String username) {
        return userRepository.findByUsername(username)
                .map(user -> albumRepository.findByUserId(user.getId()))
                .orElse(Collections.emptyList());
    }

    @Transactional(readOnly = true)
    public Album getAlbumById(String username, Long albumId) {
        return albumRepository.findById(albumId)
                .filter(album -> album.getUser().getUsername().equals(username))
                .orElse(null);
    }
}
