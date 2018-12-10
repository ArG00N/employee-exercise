package io.bitfactory.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.bitfactory.config.Constants;
import io.bitfactory.domain.Post;
import io.bitfactory.domain.User;
import io.bitfactory.repository.PostRepository;
import io.bitfactory.repository.UserRepository;
import io.bitfactory.security.AuthoritiesConstants;
import io.bitfactory.service.MailService;
import io.bitfactory.service.PostService;
import io.bitfactory.service.UserService;
import io.bitfactory.service.dto.PostDTO;
import io.bitfactory.service.dto.UserDTO;
import io.bitfactory.web.rest.errors.BadRequestAlertException;
import io.bitfactory.web.rest.errors.EmailAlreadyUsedException;
import io.bitfactory.web.rest.errors.LoginAlreadyUsedException;
import io.bitfactory.web.rest.util.HeaderUtil;
import io.bitfactory.web.rest.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/api")
public class PostResource {

    private final Logger log = LoggerFactory.getLogger(PostResource.class);
    private final PostService postService;

    public PostResource(PostService postService) {
        this.postService = postService;
    }

    @PostMapping("/posts")
    @Timed
    public ResponseEntity<Post> createPost(@Valid @RequestBody PostDTO postDTO) throws URISyntaxException {
        log.debug("REST request to save Post : {}", postDTO);

        if (postDTO.getId() != null) {
            throw new BadRequestAlertException("A new user cannot already have an ID", "userManagement", "idexists");
            // Lowercase the user login before comparing with database
        }
         else {
            Post newPost = postService.createPost(postDTO);
            return ResponseEntity.created(new URI("/api/posts/" + newPost.getId()))
                .headers(HeaderUtil.createAlert( "post.created", newPost.getId().toString()))
                .body(newPost);
        }
    }

    @PutMapping("/posts")
    @Timed
    public ResponseEntity<PostDTO> updateUser(@Valid @RequestBody PostDTO postDTO) {
        log.debug("REST request to update Post : {}", postDTO);
        Optional<PostDTO> updatedUser = postService.updateUser(postDTO);
        return ResponseUtil.wrapOrNotFound(updatedUser,
            HeaderUtil.createAlert("post.updated", postDTO.getId().toString()));
    }

    @GetMapping("/posts")
    @Timed
    public ResponseEntity<List<Post>> getAllPosts() {
        final List<Post> posts = postService.getAllPosts();
        return new ResponseEntity<>(posts, HttpStatus.OK);
    }

}
