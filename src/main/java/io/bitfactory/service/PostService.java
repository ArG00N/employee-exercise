package io.bitfactory.service;

import io.bitfactory.config.Constants;
import io.bitfactory.domain.Authority;
import io.bitfactory.domain.Post;
import io.bitfactory.domain.User;
import io.bitfactory.repository.AuthorityRepository;
import io.bitfactory.repository.PersistentTokenRepository;
import io.bitfactory.repository.PostRepository;
import io.bitfactory.repository.UserRepository;
import io.bitfactory.security.AuthoritiesConstants;
import io.bitfactory.security.SecurityUtils;
import io.bitfactory.service.dto.PostDTO;
import io.bitfactory.service.dto.UserDTO;
import io.bitfactory.service.util.RandomUtil;
import io.bitfactory.web.rest.errors.EmailAlreadyUsedException;
import io.bitfactory.web.rest.errors.InvalidPasswordException;
import io.bitfactory.web.rest.errors.LoginAlreadyUsedException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cache.CacheManager;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.*;
import java.util.stream.Collectors;

/**
 * Service class for managing posts.
 *
 */
@Service
@Transactional
public class PostService {

    private final Logger log = LoggerFactory.getLogger(PostService.class);
    private final PostRepository postRepository;

    public PostService(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    public Post createPost(PostDTO postDto) {

        Post post = new Post();
        post.setTitle(postDto.getTitle());
        post.setText(postDto.getText());
        post.setCreationDate(postDto.getCreationDate());
        postRepository.save(post);
        return post;
    }

    public Optional<PostDTO> updateUser(PostDTO postDto) {
        return Optional.of(postRepository
            .findById(postDto.getId()))
            .filter(Optional::isPresent)
            .map(Optional::get)
            .map(post -> {
                post.setTitle(postDto.getTitle());
                post.setText(postDto.getText());
                return post;
            })
            .map(PostDTO::new);
    }

    @Transactional(readOnly = true)
    public List<Post> getAllPosts() {
        return postRepository.findAll(new Sort(Sort.Direction.DESC, "creationDate"));
    }

}
