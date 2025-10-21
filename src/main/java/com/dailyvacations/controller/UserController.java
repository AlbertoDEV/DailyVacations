package com.dailyvacations.controller;

import com.dailyvacations.service.CustomUserDetailsService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class UserController {

    private final CustomUserDetailsService userDetailsService;

    public UserController(CustomUserDetailsService userDetailsService) {
        this.userDetailsService = userDetailsService;
    }

    @GetMapping("/register")
    public String showRegistrationForm() {
        return "register";
    }

    @PostMapping("/register")
    public String processRegistration(@RequestParam("username") String username,
                                      @RequestParam("email") String email,
                                      @RequestParam("password") String password,
                                      Model model) {

        boolean isSaved = userDetailsService.saveNewUser(username, email, password);

        if (!isSaved) {
            // Si el usuario ya existe, mostramos un error en el formulario.
            // Para esto, necesitaríamos añadir una sección de errores en `register.html`.
            // Por simplicidad en este paso, lo redirigimos de nuevo con un parámetro de error.
            return "redirect:/register?error";
        }

        // Si el registro es exitoso, lo redirigimos a la página de login.
        return "redirect:/login?success";
    }
}
