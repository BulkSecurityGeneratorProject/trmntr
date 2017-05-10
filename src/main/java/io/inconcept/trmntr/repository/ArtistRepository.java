package io.inconcept.trmntr.repository;

import io.inconcept.trmntr.domain.Artist;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Artist entity.
 */
@SuppressWarnings("unused")
public interface ArtistRepository extends JpaRepository<Artist,Long> {

    Page<Artist> findByNameIgnoreCaseContaining(String name, Pageable pageable);
}
