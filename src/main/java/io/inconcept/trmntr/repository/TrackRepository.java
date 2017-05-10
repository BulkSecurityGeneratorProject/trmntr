package io.inconcept.trmntr.repository;

import io.inconcept.trmntr.domain.Track;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Track entity.
 */
@SuppressWarnings("unused")
public interface TrackRepository extends JpaRepository<Track,Long> {

    Page<Track> findByTitleIgnoreCaseContaining(String title, Pageable pageable);
}
