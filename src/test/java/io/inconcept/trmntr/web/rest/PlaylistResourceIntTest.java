package io.inconcept.trmntr.web.rest;

import io.inconcept.trmntr.TrmntrApp;

import io.inconcept.trmntr.domain.Playlist;
import io.inconcept.trmntr.repository.PlaylistRepository;
import io.inconcept.trmntr.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.ZoneOffset;
import java.time.ZoneId;
import java.util.List;

import static io.inconcept.trmntr.web.rest.TestUtil.sameInstant;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the PlaylistResource REST controller.
 *
 * @see PlaylistResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TrmntrApp.class)
public class PlaylistResourceIntTest {

    private static final String DEFAULT_SHOW_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_SHOW_NUMBER = "BBBBBBBBBB";

    private static final String DEFAULT_THEME = "AAAAAAAAAA";
    private static final String UPDATED_THEME = "BBBBBBBBBB";

    private static final String DEFAULT_GUEST = "AAAAAAAAAA";
    private static final String UPDATED_GUEST = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_AIR_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_AIR_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_SHOW_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_SHOW_TYPE = "BBBBBBBBBB";

    private static final String DEFAULT_RECORD_URL = "AAAAAAAAAA";
    private static final String UPDATED_RECORD_URL = "BBBBBBBBBB";

    private static final ZonedDateTime DEFAULT_CREATE_TIME = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_CREATE_TIME = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final ZonedDateTime DEFAULT_UPDATE_TIME = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_UPDATE_TIME = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    @Autowired
    private PlaylistRepository playlistRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restPlaylistMockMvc;

    private Playlist playlist;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        PlaylistResource playlistResource = new PlaylistResource(playlistRepository);
        this.restPlaylistMockMvc = MockMvcBuilders.standaloneSetup(playlistResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Playlist createEntity(EntityManager em) {
        Playlist playlist = new Playlist()
            .showNumber(DEFAULT_SHOW_NUMBER)
            .theme(DEFAULT_THEME)
            .guest(DEFAULT_GUEST)
            .airDate(DEFAULT_AIR_DATE)
            .showType(DEFAULT_SHOW_TYPE)
            .recordUrl(DEFAULT_RECORD_URL)
            .createTime(DEFAULT_CREATE_TIME)
            .updateTime(DEFAULT_UPDATE_TIME);
        return playlist;
    }

    @Before
    public void initTest() {
        playlist = createEntity(em);
    }

    @Test
    @Transactional
    public void createPlaylist() throws Exception {
        int databaseSizeBeforeCreate = playlistRepository.findAll().size();

        // Create the Playlist
        restPlaylistMockMvc.perform(post("/api/playlists")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(playlist)))
            .andExpect(status().isCreated());

        // Validate the Playlist in the database
        List<Playlist> playlistList = playlistRepository.findAll();
        assertThat(playlistList).hasSize(databaseSizeBeforeCreate + 1);
        Playlist testPlaylist = playlistList.get(playlistList.size() - 1);
        assertThat(testPlaylist.getShowNumber()).isEqualTo(DEFAULT_SHOW_NUMBER);
        assertThat(testPlaylist.getTheme()).isEqualTo(DEFAULT_THEME);
        assertThat(testPlaylist.getGuest()).isEqualTo(DEFAULT_GUEST);
        assertThat(testPlaylist.getAirDate()).isEqualTo(DEFAULT_AIR_DATE);
        assertThat(testPlaylist.getShowType()).isEqualTo(DEFAULT_SHOW_TYPE);
        assertThat(testPlaylist.getRecordUrl()).isEqualTo(DEFAULT_RECORD_URL);
        assertThat(testPlaylist.getCreateTime()).isEqualTo(DEFAULT_CREATE_TIME);
        assertThat(testPlaylist.getUpdateTime()).isEqualTo(DEFAULT_UPDATE_TIME);
    }

    @Test
    @Transactional
    public void createPlaylistWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = playlistRepository.findAll().size();

        // Create the Playlist with an existing ID
        playlist.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPlaylistMockMvc.perform(post("/api/playlists")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(playlist)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<Playlist> playlistList = playlistRepository.findAll();
        assertThat(playlistList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkShowNumberIsRequired() throws Exception {
        int databaseSizeBeforeTest = playlistRepository.findAll().size();
        // set the field null
        playlist.setShowNumber(null);

        // Create the Playlist, which fails.

        restPlaylistMockMvc.perform(post("/api/playlists")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(playlist)))
            .andExpect(status().isBadRequest());

        List<Playlist> playlistList = playlistRepository.findAll();
        assertThat(playlistList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkAirDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = playlistRepository.findAll().size();
        // set the field null
        playlist.setAirDate(null);

        // Create the Playlist, which fails.

        restPlaylistMockMvc.perform(post("/api/playlists")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(playlist)))
            .andExpect(status().isBadRequest());

        List<Playlist> playlistList = playlistRepository.findAll();
        assertThat(playlistList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkShowTypeIsRequired() throws Exception {
        int databaseSizeBeforeTest = playlistRepository.findAll().size();
        // set the field null
        playlist.setShowType(null);

        // Create the Playlist, which fails.

        restPlaylistMockMvc.perform(post("/api/playlists")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(playlist)))
            .andExpect(status().isBadRequest());

        List<Playlist> playlistList = playlistRepository.findAll();
        assertThat(playlistList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllPlaylists() throws Exception {
        // Initialize the database
        playlistRepository.saveAndFlush(playlist);

        // Get all the playlistList
        restPlaylistMockMvc.perform(get("/api/playlists?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(playlist.getId().intValue())))
            .andExpect(jsonPath("$.[*].showNumber").value(hasItem(DEFAULT_SHOW_NUMBER.toString())))
            .andExpect(jsonPath("$.[*].theme").value(hasItem(DEFAULT_THEME.toString())))
            .andExpect(jsonPath("$.[*].guest").value(hasItem(DEFAULT_GUEST.toString())))
            .andExpect(jsonPath("$.[*].airDate").value(hasItem(DEFAULT_AIR_DATE.toString())))
            .andExpect(jsonPath("$.[*].showType").value(hasItem(DEFAULT_SHOW_TYPE.toString())))
            .andExpect(jsonPath("$.[*].recordUrl").value(hasItem(DEFAULT_RECORD_URL.toString())))
            .andExpect(jsonPath("$.[*].createTime").value(hasItem(sameInstant(DEFAULT_CREATE_TIME))))
            .andExpect(jsonPath("$.[*].updateTime").value(hasItem(sameInstant(DEFAULT_UPDATE_TIME))));
    }

    @Test
    @Transactional
    public void getPlaylist() throws Exception {
        // Initialize the database
        playlistRepository.saveAndFlush(playlist);

        // Get the playlist
        restPlaylistMockMvc.perform(get("/api/playlists/{id}", playlist.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(playlist.getId().intValue()))
            .andExpect(jsonPath("$.showNumber").value(DEFAULT_SHOW_NUMBER.toString()))
            .andExpect(jsonPath("$.theme").value(DEFAULT_THEME.toString()))
            .andExpect(jsonPath("$.guest").value(DEFAULT_GUEST.toString()))
            .andExpect(jsonPath("$.airDate").value(DEFAULT_AIR_DATE.toString()))
            .andExpect(jsonPath("$.showType").value(DEFAULT_SHOW_TYPE.toString()))
            .andExpect(jsonPath("$.recordUrl").value(DEFAULT_RECORD_URL.toString()))
            .andExpect(jsonPath("$.createTime").value(sameInstant(DEFAULT_CREATE_TIME)))
            .andExpect(jsonPath("$.updateTime").value(sameInstant(DEFAULT_UPDATE_TIME)));
    }

    @Test
    @Transactional
    public void getNonExistingPlaylist() throws Exception {
        // Get the playlist
        restPlaylistMockMvc.perform(get("/api/playlists/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePlaylist() throws Exception {
        // Initialize the database
        playlistRepository.saveAndFlush(playlist);
        int databaseSizeBeforeUpdate = playlistRepository.findAll().size();

        // Update the playlist
        Playlist updatedPlaylist = playlistRepository.findOne(playlist.getId());
        updatedPlaylist
            .showNumber(UPDATED_SHOW_NUMBER)
            .theme(UPDATED_THEME)
            .guest(UPDATED_GUEST)
            .airDate(UPDATED_AIR_DATE)
            .showType(UPDATED_SHOW_TYPE)
            .recordUrl(UPDATED_RECORD_URL)
            .createTime(UPDATED_CREATE_TIME)
            .updateTime(UPDATED_UPDATE_TIME);

        restPlaylistMockMvc.perform(put("/api/playlists")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPlaylist)))
            .andExpect(status().isOk());

        // Validate the Playlist in the database
        List<Playlist> playlistList = playlistRepository.findAll();
        assertThat(playlistList).hasSize(databaseSizeBeforeUpdate);
        Playlist testPlaylist = playlistList.get(playlistList.size() - 1);
        assertThat(testPlaylist.getShowNumber()).isEqualTo(UPDATED_SHOW_NUMBER);
        assertThat(testPlaylist.getTheme()).isEqualTo(UPDATED_THEME);
        assertThat(testPlaylist.getGuest()).isEqualTo(UPDATED_GUEST);
        assertThat(testPlaylist.getAirDate()).isEqualTo(UPDATED_AIR_DATE);
        assertThat(testPlaylist.getShowType()).isEqualTo(UPDATED_SHOW_TYPE);
        assertThat(testPlaylist.getRecordUrl()).isEqualTo(UPDATED_RECORD_URL);
        assertThat(testPlaylist.getCreateTime()).isEqualTo(UPDATED_CREATE_TIME);
        assertThat(testPlaylist.getUpdateTime()).isEqualTo(UPDATED_UPDATE_TIME);
    }

    @Test
    @Transactional
    public void updateNonExistingPlaylist() throws Exception {
        int databaseSizeBeforeUpdate = playlistRepository.findAll().size();

        // Create the Playlist

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restPlaylistMockMvc.perform(put("/api/playlists")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(playlist)))
            .andExpect(status().isCreated());

        // Validate the Playlist in the database
        List<Playlist> playlistList = playlistRepository.findAll();
        assertThat(playlistList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deletePlaylist() throws Exception {
        // Initialize the database
        playlistRepository.saveAndFlush(playlist);
        int databaseSizeBeforeDelete = playlistRepository.findAll().size();

        // Get the playlist
        restPlaylistMockMvc.perform(delete("/api/playlists/{id}", playlist.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Playlist> playlistList = playlistRepository.findAll();
        assertThat(playlistList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Playlist.class);
    }
}
