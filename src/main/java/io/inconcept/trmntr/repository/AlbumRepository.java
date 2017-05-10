package io.inconcept.trmntr.repository;

import io.inconcept.trmntr.domain.Album;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Album entity.
 */
@SuppressWarnings("unused")
public interface AlbumRepository extends JpaRepository<Album,Long> {

    Page<Album> findByTitleIgnoreCaseContaining(String title, Pageable pageable);
}
