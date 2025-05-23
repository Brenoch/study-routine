package script.estudo.study.routine.service;

import org.springframework.stereotype.Service;
import script.estudo.study.routine.model.Routine;
import script.estudo.study.routine.repository.RoutineRepository;

import java.util.List;
@Service
public class RoutineService {

    private final RoutineRepository routineRepository;

    public RoutineService(RoutineRepository routineRepository) {
        this.routineRepository = routineRepository;
    }

    public List<Routine> getAll() {return routineRepository.findAll();}
    public Routine save(Routine routine) {return routineRepository.save(routine);}
    public void delete(Long id){routineRepository.deleteById(id);}

    public Routine update(Long id, Routine routine) {
        if (!routineRepository.existsById(id)) {
            throw new RuntimeException("Rotina não encontrada.");
        }
        routine.setId(id);
        return routineRepository.save(routine);
    }


    public Routine getById(Long id) {
        return routineRepository.findById(id).orElseThrow(() -> new RuntimeException("Rotina não encontrada"));
    }
}


