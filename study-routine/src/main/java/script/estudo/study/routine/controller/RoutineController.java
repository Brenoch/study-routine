package script.estudo.study.routine.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import script.estudo.study.routine.model.Routine;
import script.estudo.study.routine.service.RoutineService;
import java.util.List;

@RestController
@RequestMapping("/routine")
public class RoutineController {

    private final RoutineService routineService;

    public RoutineController(RoutineService routineService) {
        this.routineService = routineService;
    }

    @GetMapping
    public List<Routine> getAll() {return routineService.getAll();}

    @PostMapping
    public Routine create(@RequestBody Routine routine) {return routineService.save(routine); }
}
