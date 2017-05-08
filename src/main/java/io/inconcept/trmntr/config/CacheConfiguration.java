package io.inconcept.trmntr.config;

import io.github.jhipster.config.JHipsterProperties;
import org.ehcache.config.builders.CacheConfigurationBuilder;
import org.ehcache.config.builders.ResourcePoolsBuilder;
import org.ehcache.expiry.Duration;
import org.ehcache.expiry.Expirations;
import org.ehcache.jsr107.Eh107Configuration;

import java.util.concurrent.TimeUnit;

import org.springframework.boot.autoconfigure.AutoConfigureAfter;
import org.springframework.boot.autoconfigure.AutoConfigureBefore;
import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
@AutoConfigureAfter(value = { MetricsConfiguration.class })
@AutoConfigureBefore(value = { WebConfigurer.class, DatabaseConfiguration.class })
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        JHipsterProperties.Cache.Ehcache ehcache =
            jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(Expirations.timeToLiveExpiration(Duration.of(ehcache.getTimeToLiveSeconds(), TimeUnit.SECONDS)))
                .build());
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            cm.createCache(io.inconcept.trmntr.domain.User.class.getName(), jcacheConfiguration);
            cm.createCache(io.inconcept.trmntr.domain.Authority.class.getName(), jcacheConfiguration);
            cm.createCache(io.inconcept.trmntr.domain.User.class.getName() + ".authorities", jcacheConfiguration);
            cm.createCache(io.inconcept.trmntr.domain.SocialUserConnection.class.getName(), jcacheConfiguration);
            cm.createCache(io.inconcept.trmntr.domain.Album.class.getName(), jcacheConfiguration);
            cm.createCache(io.inconcept.trmntr.domain.Album.class.getName() + ".tracks", jcacheConfiguration);
            cm.createCache(io.inconcept.trmntr.domain.Artist.class.getName(), jcacheConfiguration);
            cm.createCache(io.inconcept.trmntr.domain.Artist.class.getName() + ".tracks", jcacheConfiguration);
            cm.createCache(io.inconcept.trmntr.domain.Entry.class.getName(), jcacheConfiguration);
            cm.createCache(io.inconcept.trmntr.domain.Label.class.getName(), jcacheConfiguration);
            cm.createCache(io.inconcept.trmntr.domain.Label.class.getName() + ".releases", jcacheConfiguration);
            cm.createCache(io.inconcept.trmntr.domain.Member.class.getName(), jcacheConfiguration);
            cm.createCache(io.inconcept.trmntr.domain.Member.class.getName() + ".playlists", jcacheConfiguration);
            cm.createCache(io.inconcept.trmntr.domain.Playlist.class.getName(), jcacheConfiguration);
            cm.createCache(io.inconcept.trmntr.domain.Playlist.class.getName() + ".entries", jcacheConfiguration);
            cm.createCache(io.inconcept.trmntr.domain.Playlist.class.getName() + ".members", jcacheConfiguration);
            cm.createCache(io.inconcept.trmntr.domain.Track.class.getName(), jcacheConfiguration);
            cm.createCache(io.inconcept.trmntr.domain.Track.class.getName() + ".entries", jcacheConfiguration);
            // jhipster-needle-ehcache-add-entry
        };
    }
}
