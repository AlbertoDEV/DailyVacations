package com.dailyvacations.controller;

import com.dailyvacations.service.AlbumStorageService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.security.Principal;

@Controller
public class HomeController {

    private final AlbumStorageService albumService;

    public HomeController(AlbumStorageService albumService) {
        this.albumService = albumService;
    }

    @GetMapping("/")
    public String index() {
        return "index";
    }

    @GetMapping("/login")
    public String login() {
        return "login";
    }

    @GetMapping("/home")
    public String home(Model model, Principal principal) {
        if (principal != null) {
            model.addAttribute("albums", albumService.getAlbumsByUsername(principal.getName()));
        }
        return "home";
    }
}
