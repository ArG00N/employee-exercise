package io.bitfactory.repository;
import io.bitfactory.domain.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the User entity.
 */
@Repository
public interface PostRepository extends JpaRepository<Post, Long> {

}
