package com.example.DuoForMe.controller;

import com.example.DuoForMe.repository.SetRiotDataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.DuoForMe.service.SetRiotDataService;

@RestController
@RequestMapping("/api/riotuser")
public class SetRiotDataController {
    @Autowired
    private SetRiotDataService setRiotDataService;
    @Autowired
    private SetRiotDataRepository setRiotDataRepository;

    @GetMapping("/setriotdata/{tier}/{step}")
    public String set(@PathVariable String tier, @PathVariable String step) throws Exception {
        setRiotDataService.insert(tier, step);
        return "success";
    }
}
