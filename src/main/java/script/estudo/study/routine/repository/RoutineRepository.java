package script.estudo.study.routine.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import script.estudo.study.routine.model.Routine;

public interface RoutineRepository extends JpaRepository<Routine, Long > {

}