package io.inconcept.trmntr.repository;

import io.inconcept.trmntr.domain.Label;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Label entity.
 */
@SuppressWarnings("unused")
public interface LabelRepository extends JpaRepository<Label,Long> {

    Page<Label> findByNameIgnoreCaseContaining(String name, Pageable pageable);
}
