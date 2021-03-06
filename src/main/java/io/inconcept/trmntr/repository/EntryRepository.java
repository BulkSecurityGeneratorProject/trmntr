package io.inconcept.trmntr.repository;

import io.inconcept.trmntr.domain.Entry;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Entry entity.
 */
@SuppressWarnings("unused")
public interface EntryRepository extends JpaRepository<Entry,Long> {

    Page<Entry> findByPlaylistId(Long id, Pageable pageable);
}
