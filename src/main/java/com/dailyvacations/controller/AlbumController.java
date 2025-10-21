package com.dailyvacations.controller;

import com.dailyvacations.model.Album;
import com.dailyvacations.model.Day;
import com.dailyvacations.model.Photo;
import com.dailyvacations.service.AlbumStorageService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.Principal;
import java.util.Base64;
import java.util.List;

@Controller
@RequestMapping("/albums")
public class AlbumController {

    private final AlbumStorageService albumService;

    public AlbumController(AlbumStorageService albumService) {
        this.albumService = albumService;
    }

    @GetMapping("/new")
    public String showCreateAlbumForm() {
        return "create-album";
    }

    @PostMapping("/create")
    public String createAlbum(@RequestParam("name") String name,
                              @RequestParam("description") String description,
                              @RequestParam("daysCount") int daysCount,
                              Principal principal,
                              jakarta.servlet.http.HttpServletRequest request) {

        Album album = new Album();
        album.setName(name);
        album.setDescription(description);

        for (int i = 0; i < daysCount; i++) {
            Day day = new Day();
            String pageTextParam = "days[" + i + "].pageText";
            String pageText = request.getParameter(pageTextParam);
            if (pageText != null) {
                day.setPageText(pageText);
            }

            for (int j = 0; j < 4; j++) {
                String descParam = "days[" + i + "].photos[" + j + "].description";
                String fileParam = "days[" + i + "].photos[" + j + "].file";
                String photoDescription = request.getParameter(descParam);

                try {
                    var multipartRequest = (org.springframework.web.multipart.MultipartHttpServletRequest) request;
                    MultipartFile file = multipartRequest.getFile(fileParam);

                    if (file != null && !file.isEmpty()) {
                        String imageData = Base64.getEncoder().encodeToString(file.getBytes());
                        day.addPhoto(new Photo(photoDescription, imageData));
                    } else {
                        day.addPhoto(new Photo(photoDescription, null));
                    }
                } catch (IOException e) {
                    // Handle exception
                }
            }
            album.addDay(day);
        }

        albumService.saveAlbum(principal.getName(), album);

        return "redirect:/home";
    }

    @GetMapping("/view/{albumId}")
    public String viewAlbum(@PathVariable("albumId") Long albumId, Principal principal, Model model) {
        Album album = albumService.getAlbumById(principal.getName(), albumId);

        if (album == null) {
            return "redirect:/home";
        }

        model.addAttribute("album", album);
        return "album-view";
    }
}
